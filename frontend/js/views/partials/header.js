import Component from '../../views/component.js';

class Header extends Component {
    render() {

        return new Promise((resolve, reject) => {
            if (location.hash === '#/' || location.hash === '') {
                resolve(`
                    <div class="wrapper wr-header">
                        <div href="#" class="wr-logo">
                            <img src="./img/logo/logo.png" alt="logo-img">
                        </div>
                        <form>
                        <input type="text" id="search" placeholder="Название препарата" autocomplete="off">
                        <button id="resetSearch">×</button>
                        </form>
                </div>
                `);
            }

            reject(`
                <div class="wrapper wr-header">
                    <div href="#" class="wr-logo">
                        <img src="./img/logo/logo.png" alt="logo-img">
                    </div>
                    <button id="btn-previous">Назад</button>
                </div>
            `);

        });

    }

    previous() {
        const headerBlock = document.getElementsByTagName('header')[0],
            listDrug = document.getElementsByTagName('li');

        headerBlock.onclick = event => {
            event.preventDefault();
            const target = event.target;

            if (target.id === 'btn-previous') {
                location.hash = '#/';

            } else if (target.id === 'search') {
                
                target.oninput = (valueSearchDrug) => {
                    valueSearchDrug = target.value.toLowerCase().trim();

                    if (valueSearchDrug) {
                        for (let elemDrug of listDrug) {

                            if (elemDrug.firstElementChild.textContent.trim().toLowerCase().startsWith(valueSearchDrug)) {
                                elemDrug.classList.remove('hide');
                            } else {
                                elemDrug.classList.add('hide');
                            }
                        }
                    } else {
                        removeClassHideDrugList(listDrug);
                    }
                };

            } else if (target.id == 'resetSearch') {
                target.parentElement.reset();
                removeClassHideDrugList(listDrug);
            }
        };
    }

    callprevious() {
        this.previous();
    }
}

function removeClassHideDrugList(list) {
    for (let elemDrug of list) {
        elemDrug.classList.remove('hide');
    }
}


export default Header;
