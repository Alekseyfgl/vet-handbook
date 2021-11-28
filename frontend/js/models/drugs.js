class MedicamentDB {

    async getDrugsList() {

        let allDrugs = await fetch('api/medicamentDB');

        try {
            if (allDrugs.ok) {
                return allDrugs.json();
            } else {
                throw new Error('request not received');
            }
        } catch (ex) {
            alert(ex.message);
        }

    }


    async getDrug(id) {

        let drug = await fetch(`/api/medicamentDB/${id}`);

        try {
            if (drug.ok) {
                return drug.json();
            } else {
                throw new Error('request not received');
            }
        } catch (ex) {
            alert(ex.message);
        }
    }
}

export default MedicamentDB;
