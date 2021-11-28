import Component from '../../../views/component.js';
import MedicamentDB from '../../../models/drugs.js';

class AddAndList extends Component {
    constructor() {
        super();

        this.model = new MedicamentDB();
    }

    getData() {
        return new Promise(resolve => this.model.getDrugsList().then(medicamentDB => resolve(medicamentDB)));
    }


    render(medicamentDB) {
        return new Promise(resolve => {
            medicamentDB.sort((firstDrugName, secondDrugName) => firstDrugName.drugName > secondDrugName.drugName ? 1 : -1);

            resolve(`
            <ul>
              ${medicamentDB.map(list => this.getListHTML(list)).join('\n ')}
            </ul>     
            <div class="message"><i class="fas fa-envelope"></i></div>
            `);
        });
    }


    getListHTML(medicamentDB) {
        return `
        <li class="item" data-id="${medicamentDB.id}">
            <span class="drug-name" data-id="${medicamentDB.id}">${medicamentDB.drugName}</span>
        </li>
        `;
    }

    afterRender() {
        this.setActions();
    }

    redirectToDrugInfo(id) {
        location.hash = `#/full-info/${id}`;
    }

}

export default AddAndList;
