import {handleValidate, submitButtonStatus} from "../utils/utils.js";
export {Popup};

class Popup {

    constructor( {form, mainContainer, openControl, openFunction, saveFunction, 
                  closeControl, submitControl, inputs, cardsContainer} ) {
       
        this.form = form;
        this.mainContainer = mainContainer || null;
        this.openControl = openControl || null;
        this.openFunction = openFunction || null;
        this.saveFunction = saveFunction || null;
        this.closeControl = closeControl || null;
        this.submitControl = submitControl || null;
        this.inputs = inputs || null;
        this.cardsContainer = cardsContainer || null;
        this.addEventListeners();
    }
    
    open() {
        this.mainContainer.classList.add('popup_is-opened');
        this.openFunction();
        submitButtonStatus(this.submitControl, false);
        this.isLoading(false);
    }

    close() {
        if (this.form) this.form.reset();
        if (this.mainContainer) this.mainContainer.classList.remove('popup_is-opened');
    }

    save() {
        event.preventDefault();
        this.saveFunction();
    }

    isLoading(loading) {

        this.submitControl.textContent = loading ? 'Загрузка...' : 'Сохранить';

    }
    addEventListeners() {

        if (this.openControl) this.openControl.addEventListener('click', this.open.bind(this));
        if (this.form) this.form.addEventListener('submit', this.save.bind(this));
        if (this.closeControl) this.closeControl.addEventListener('click', this.close.bind(this));
        if (this.inputs) {
            for (const inputItem of this.inputs) {
                inputItem.addEventListener('input', handleValidate);
            } 
        }
    }
   
}

/**
 * TODO 8#:
 * 
 * Можно использовать свойство setter
 * 
 * Внутри класса 
 * set onSave(fn) { this.saveFunction = fn }
 * save(e) {
 *  e.preventDefault()
 *  return typeof this.saveFunction === 'function' && this.saveFunction()
 * }
 * 
 * после инициализации
 * cardPopup.onSave = () => {}
 * 
 * https://coryrylan.com/blog/javascript-es6-class-syntax
 */