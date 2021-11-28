import Component from '../../component.js';


class Form extends Component {

    render() {
        return new Promise(resolve => {
            resolve(`
                <div class="show-message">
                    <form class="feedback">
                    <div> 
                        <label for="userName">Ваше имя</label>
                        <input type="text" placeholder="Введите имя" id="userName">
                        <span class="check-input check-message"><i class="fas fa-check"></i></span>
                        <span class="cross-input check-message"><i class="fas fa-times"></i></span>
                    </div>
                    <div>
                        <label for="phone">Ваш телефон</label>
                        <input type="tel" placeholder="Введите телефон" id="phone">
                        <span class="check-input check-message"><i class="fas fa-check"></i></span>
                        <span class="cross-input check-message"><i class="fas fa-times"></i></span>
                    </div>
                    <div>
                        <label for="email">Ваша почта</label>
                        <input type="email" placeholder="Введите почту" id="email">
                        <span class="check-input check-message"><i class="fas fa-check"></i></span>
                        <span class="cross-input check-message"><i class="fas fa-times"></i></span>
                    </div>
                   <div>
                    <textarea placeholder="Введите сообщение" id="message"></textarea>
                   </div>
                    <button  class="submit-form" type="submit">Отправить</button>
                    </form>
                </div>
            `);
        });
    }


    afterRender() {
        this.setActions();
        this.actionEmail();
    }

}





export default Form;