import Component from '../../../views/component.js';
import Error404 from '../../../views/pages/error404.js';
import MedicamentDB from '../../../models/drugs.js';


class Info extends Component {
    constructor() {
        super();

        this.model = new MedicamentDB();
    }

    getData() {
        return new Promise(resolve => this.model.getDrug(this.request.id).then(medicamentDB => resolve(medicamentDB)));
    }


    render(medicamentDB) {
        return new Promise(resolve => {
            let html;

            if (Object.keys(medicamentDB).length) {
                const { id, drugName, application, contraindication, limitationMilk, limitationMeet, dosage, constdosage, unit, method, days } = medicamentDB;

                html = `
                    <ul>
						<li class="item-ative" data-id="${id}">
						<span>${drugName}</span>
							<div class="inform">
								<button class="btn-acardion">Применение</button>
								<div class="application">
									${application}
								</div>
								<button class="btn-acardion">Противопоказания</button>
								<div class="contraindication">
									${contraindication}
								</div>
								<button class="btn-acardion">Ограничения</button>
								<div class="limitation">
									<p>По мясу: <span>${+limitationMeet ? limitationMeet + ' дней' : 'без ограничений'}</span></p>
									<p>По молоку: <span>${+limitationMilk ? limitationMilk + ' дней' : 'без ограничений'}</span></p>
								</div>
								<button class="btn-acardion">Дозировка</button>
								<div class="dosage">
									<label for="dos">Введите массу КРС:</label>
									<input type="number" class="dosageInput" id="dos" placeholder="кг">
									<p>Ваша доза:<span data-dosage="${dosage}" data-constdosage="${constdosage}" data-unit="${unit}" class="result"></span></p>
									<p>Способ введения: ${method}</p>
									<p>Количество дней: ${days}</p>
								</div>
							</div>
						</li>
					</ul>
                    `;
            } else {
                html = new Error404().render();
            }

            resolve(html);
        });
    }


    afterRender() {
        this.setActions();
        this.removeInputConstDosage();
    }



}

export default Info;