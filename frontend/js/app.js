import { parseRequestURL } from './helpers/utils.js';

import Header from './views/partials/header.js';
import Footer from './views/partials/footer.js';
import Error404 from './views/pages/error404.js';

import AddAndList from './views/pages/list/add-list.js';
import Info from './views/pages/list/info.js';
import Form from './views/pages/list/form.js';


const Routes = {
    '/': AddAndList,
    '/full-info/:id': Info,
    '/form': Form,
};

function router() {
    const headerContainer = document.getElementsByTagName('header')[0],
        contentContainer = document.getElementsByClassName('wr-main')[0],
        footerContainer = document.getElementsByTagName('footer')[0],
        header = new Header(),
        footer = new Footer();

    header.render()
        .then(html => {
            headerContainer.innerHTML = html;
        })
        .catch(html => {
            headerContainer.innerHTML = html;
        });
    header.previous();

    const request = parseRequestURL(),
        parsedURL = `/${request.resource || ''}${request.id ? '/:id' : ''}${request.action ? `/${request.action}` : ''}`,
        page = Routes[parsedURL] ? new Routes[parsedURL]() : new Error404();



    page.getData().then(data => {
        page.render(data).then(html => {
            contentContainer.innerHTML = html;
            page.afterRender();
        });
    });

    footer.render().then(html => footerContainer.innerHTML = html);
}



window.addEventListener('load', router);
window.addEventListener('hashchange', router);
