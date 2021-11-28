import { parseRequestURL } from '../helpers/utils.js';


class Component {
    constructor() {
        this.request = parseRequestURL();
    }

    getData() {
        return new Promise(resolve => resolve());
    }

    setActions() {
        const list = document.getElementsByTagName('main')[0];


        list.onclick = (event) => {
            event.stopPropagation();

            const target = event.target;
            const targetClassList = target.classList;


            switch (true) {
                case targetClassList.contains('item'):
                case targetClassList.contains('drug-name'):
                    this.redirectToDrugInfo(target.dataset.id);
                    break;

                case targetClassList.contains('btn-acardion'):
                    targetClassList.toggle('open');
                    target.nextElementSibling.classList.toggle('open-content-tab');
                    break;

                case targetClassList.contains('dosageInput'):
                    const dosageValue = target.nextElementSibling.firstElementChild;
                    target.oninput = () => {

                        if (target.value >= 10 && target.value < 1000) {
                            dosageValue.textContent = ' ' + (dosageValue.dataset.dosage * target.value).toFixed(1) + ' ' + dosageValue.dataset.unit;
                        } else {
                            dosageValue.textContent = ' введите вес от 10 кг до 1000 кг ';
                        }

                        target.value === '' && (dosageValue.textContent = null);
                    };
                    break;

                case targetClassList.contains('message'):
                case targetClassList.contains('fas'):
                    location.hash = '#/form';
                    break;

                case target.id === 'modal-successfully':
                    target.parentElement.parentElement.remove();
                    location.hash = '#/';
                    break;

                case target.id === 'modal-unsuccessfully':
                    target.parentElement.parentElement.remove();
                    break;
            }
        };


    }



    actionEmail() {
        const list = document.getElementsByTagName('main')[0];
        const formMail = list.children[0].children[0].children[0];

        clearInputMessage(userName, phone, email);


        formMail.onsubmit = async event => {
            event.preventDefault();

            formMail.insertAdjacentHTML('afterend', '<img class="spiner-svg" src="./img/svg/spinner.svg">');

            const spiner = formMail.nextElementSibling;

            const formData = {
                name: userName.value,
                phone: phone.value,
                email: email.value,
                message: message.value
            };

            try {

                switch (true) {
                    case userName.value.length < 3:
                        spiner.remove();
                        throw new Error('Too short phone.');
                        break;

                    case phone.value.length < 3:
                        spiner.remove();
                        throw new Error('Too short phone.');
                        break;

                    case email.value.length < 7:
                        spiner.remove();
                        throw new Error('Too short phone.');
                        break;
                }

                let response = await fetch('/send-mail', {
                    method: 'POST',
                    body: JSON.stringify(formData),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });


                try {
                    if (!response.ok) {
                        throw new Error('Too short name.');
                    }
                } catch (error) {
                    spiner && spiner.remove();
                    showModal(list, 'Ошибка на сервере', 'modal-unsuccessfully', 'modal-successfully');
                    this.actionEmail();
                }

                if (response.ok) {
                    spiner.remove();
                    showModal(list, 'Ваше сообщение успешно отправлено!!!', 'modal-successfully');
                }

            } catch (e) {
                spiner && spiner.remove();
                showModal(list, 'Заполните правильно форму!!!', 'modal-unsuccessfully');

                this.actionEmail();
            }
        };


        userName.oninput = event => {
            const target = event.target;
            if (target.value.length > 3) {
                target.nextElementSibling.classList.add('active');
                target.nextElementSibling.nextElementSibling.classList.remove('active');
            } else {
                target.nextElementSibling.classList.remove('active');
                target.nextElementSibling.nextElementSibling.classList.add('active');
            }

            checkEmptyInput(target.value);

        };

        phone.oninput = event => {
            const target = event.target;

            if (target.value.length > 3) {
                target.nextElementSibling.classList.add('active');
                target.nextElementSibling.nextElementSibling.classList.remove('active');
            } else {
                target.nextElementSibling.classList.remove('active');
                target.nextElementSibling.nextElementSibling.classList.add('active');
            }

            checkEmptyInput(target.value);
        };

        email.oninput = event => {
            const target = event.target;

            if (target.value.length > 6) {
                target.nextElementSibling.classList.add('active');
                target.nextElementSibling.nextElementSibling.classList.remove('active');
            } else {
                target.nextElementSibling.classList.remove('active');
                target.nextElementSibling.nextElementSibling.classList.add('active');
            }

            checkEmptyInput(target.value);
        };

    }


    removeInputConstDosage() {
        try {
            let resultDosage = document.getElementsByClassName('result')[0];
            if (+resultDosage.dataset.dosage === 0) {

                resultDosage.parentElement.previousElementSibling.previousElementSibling.remove();
                resultDosage.parentElement.previousElementSibling.remove();

                resultDosage.textContent = ' ' + resultDosage.dataset.constdosage + ' ' + resultDosage.dataset.unit;
            }
        } catch (ex) { }

    }
}


function showModal(elem, text, statusId) {
    elem.innerHTML += `
        <div class="modal-wr">
            <div class="modal">
                <p>${text}</p>
                <button id="${statusId}">Продолжить</button>
            </div>
        </div>`;
}

function checkEmptyInput(MessageInputValue) {
    const target = event.target;

    MessageInputValue === '' && (target.nextElementSibling.nextElementSibling.classList.remove('active'));
}


function clearInputMessage(...inputElement) {
    inputElement.forEach(item => {
        item.nextElementSibling.classList.remove('active');
        item.nextElementSibling.nextElementSibling.classList.remove('active');
    });
}

export default Component;
