import { API_URL, TIMEOUT } from './config.js';


async function timeoutPromise(promise, ms = TIMEOUT) {
const timeout = new Promise((_, reject) =>
setTimeout(() => reject(new Error('timeout')), ms)
);
return Promise.race([promise, timeout]);
}


export async function fetchJSON(path, options = {}) {
const url = path.startsWith('http') ? path : `${API_URL}${path}`;
try {
const res = await timeoutPromise(fetch(url, {
headers: { 'Content-Type': 'application/json' },
...options,
}));


if (!res.ok) {
const text = await res.text();
throw new Error(`HTTP ${res.status}: ${text}`);
}


// Попробуем распарсить JSON (если есть контент)
const contentType = res.headers.get('content-type') || '';
if (contentType.includes('application/json')) return res.json();
return res.text();
} catch (err) {
console.error('fetchJSON error', url, err);
throw err;
}
}


// Пример экспорта полезных запросов
export const api = {
getStands: () => fetchJSON('/stands'),
getStand: (id) => fetchJSON(`/stands/${id}`),
getCatalog: () => fetchJSON('/catalog'),
};