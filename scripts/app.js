import { addRoute, startRouter } from './router.js';
import { renderHome, renderCatalog, renderStand, renderInfo } from './pages.js';


// Роуты
addRoute('/', renderHome);
addRoute('/catalog', renderCatalog);
addRoute('/stand/:id', renderStand);
addRoute('/info', renderInfo);


// Инициализация приложения
function initAppShell() {
// Пример: можно добавить обработчики для кнопок меню
document.getElementById('open-menu')?.addEventListener('click', () => {
// простое поведение — показать нав
alert('Открыть меню — здесь можно сделать боковую панель');
});
}


window.addEventListener('DOMContentLoaded', () => {
initAppShell();
startRouter();
});