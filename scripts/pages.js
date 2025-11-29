import { api } from './api.js';
export async function renderCatalog(container) {
container.innerHTML = `<div class="py-4"><h1 class="text-xl font-semibold">Каталог</h1><div id="catalog-list" class="mt-4"></div></div>`;
const listEl = container.querySelector('#catalog-list');
try {
const data = await api.getCatalog();
// ожидаем, что data — массив товаров
if (!Array.isArray(data)) {
listEl.innerHTML = '<p class="text-slate-600">Нет данных</p>';
return;
}
listEl.innerHTML = data.map(item => (
`<article class="p-3 border rounded mb-3">\
<h3 class=\"font-medium\">${item.name}</h3>\
<p class=\"text-sm text-slate-600\">${item.description || ''}</p>\
</article>`
)).join('\n');
} catch (err) {
listEl.innerHTML = `<p class="text-red-500">Ошибка загрузки: ${err.message}</p>`;
}
}


export async function renderStand(container, params) {
const { id } = params;
container.innerHTML = `<div class="py-4">\
<h1 class="text-xl font-semibold">Стенд ${id}</h1>\
<div id=\"stand-content\" class=\"mt-4\">Загрузка...</div>\
</div>`;


const content = container.querySelector('#stand-content');
try {
const data = await api.getStand(id);
// Предполагаем объект
content.innerHTML = `
<div class="p-3 border rounded">\
<h2 class=\"text-lg font-medium\">${data.title || 'Стенд'}</h2>\
<p class=\"text-sm text-slate-600 mt-2\">${data.description || ''}</p>\
</div>
`;
} catch (err) {
content.innerHTML = `<p class="text-red-500">Ошибка: ${err.message}</p>`;
}
}


export async function renderInfo(container) {
container.innerHTML = `
<section class="py-4">\
<h1 class="text-xl font-semibold">Информация</h1>\
<p class="mt-2 text-slate-600">Здесь можно поместить контактные данные, FAQ и т.д.</p>\
</section>
`;
}