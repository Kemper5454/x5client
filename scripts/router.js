// Простой hash router. mobile-first: минимально, легкий.
// hash без ведущего '#'
const url = hash.replace(/^#/, '') || '/';
const urlParts = url.split('/').filter(Boolean);


for (const [pattern, handler] of routes.entries()) {
const patternParts = pattern.split('/').filter(Boolean);
if (patternParts.length !== urlParts.length) continue;


const params = {};
let matched = true;
for (let i = 0; i < patternParts.length; i++) {
const p = patternParts[i];
const u = urlParts[i];
if (p.startsWith(':')) {
params[p.slice(1)] = decodeURIComponent(u);
} else if (p !== u) {
matched = false; break;
}
}


if (matched) return { handler, params };
}


// try root '/'
if (url === '/') {
const h = routes.get('/');
if (h) return { handler: h, params: {} };
}


return null;
}


export function navigate(hash) {
window.location.hash = hash;
}


export function startRouter(defaultHash = '#/') {
function onHashChange() {
const hash = window.location.hash || '#/';
const matched = matchRoute(hash);
const view = document.getElementById('view');
if (!view) return;
view.innerHTML = '';


if (matched) {
matched.handler(view, matched.params);
} else {
// 404
view.innerHTML = `<div class="py-12 text-center">\
<h2 class="text-xl font-semibold">Страница не найдена</h2>\
<p class="mt-2 text-sm text-slate-600">Попробуйте <a href="#/">главную</a>.</p>\
</div>`;
}
}


window.addEventListener('hashchange', onHashChange);
if (!window.location.hash) window.location.hash = defaultHash;
// initial render
onHashChange();
}