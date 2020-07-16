import { handleValidate } from "./validate";
import { BaseComponent, HIDDEN_CLASS_NAME } from "./basecomponent";
  
export { PopupComponent }

class PopupComponent extends BaseComponent {
    
    constructor({menuOpen, popupElement, buttonClose, buttonSubmit, submitAction, redirectElement, redirectAction, submitForm, errorElement}) {
        
        super({menuOpen, popupElement, buttonClose, buttonSubmit, submitAction, redirectElement, redirectAction, submitForm, errorElement});

    } 

    popupOpen() {
        this.hideErrors();
        // если нет кнопки сабмита, а функция есть, то вызываем ее сразу
        if((!this.buttonSubmit)&&(this.submitAction)) {
            this.submitAction(undefined);
        } else {
            this.popupElement.classList.remove(HIDDEN_CLASS_NAME);
        }
    }

    popupClose(event = undefined) {
        if(event) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.hideErrors();
        this.popupElement.classList.add(HIDDEN_CLASS_NAME);
    }

    _submitFunc(event = undefined) {
        if(event) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.hideErrors();
        this.submitAction(event);
    }

    redirectClick(event) {
        event.preventDefault();
        event.stopPropagation();
        this.popupClose(undefined);
        this.redirectAction(undefined);
    }

    showErrors(message) {
        if (this.errorElement) {
            this.errorElement.textContent = message;
            this.errorElement.classList.remove(HIDDEN_CLASS_NAME);
        }
    }

    hideErrors() {
        if (this.errorElement) {
            this.errorElement.classList.add(HIDDEN_CLASS_NAME);
        }
    }
}
