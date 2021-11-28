import Component from '../../views/component.js';

class Footer extends Component {

    render() {
        return new Promise(resolve => {
            resolve(`
            <p>
                &copy; All Rights Reserved,  2021
            </p>
            <p>Maksutov Aleksey</p>               
            `);
        });
    }
}

export default Footer;