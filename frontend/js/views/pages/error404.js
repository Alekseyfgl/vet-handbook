import Component from '../../views/component.js';

class Error404 extends Component {
    render() {

        return new Promise(resolve => {
            resolve(`         
                <div class="error">       
                    <p>404 Error - Page Not Found</p> 
                </div>             
            `);
        });
    }

    afterRender() { }
}

export default Error404;