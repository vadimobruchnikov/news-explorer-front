import { resetError, handleValidate, activateError, validate, submitButtonStatus,
    isValidForm, isValidLink } from "../../js/components/validate";
  
export { BaseComponent }

class BaseComponent {
    
    constructor({menuOpen, popupElement, buttonClose, buttonSubmit, submitAction, redirectElement, redirectAction, submitForm, errorElement}) {
        this.menuOpen = menuOpen || null;
        this.popupElement = popupElement || null;
        this.buttonClose = buttonClose || null;
        this.buttonSubmit = buttonSubmit || null;
        this.submitAction = submitAction || null;
        this.errorElement = errorElement || null;
        this.redirectElement = redirectElement || null;
        this.redirectAction = redirectAction || null;
        this.submitForm  = submitForm || null;
        this.validatedElements = submitForm ? submitForm.querySelectorAll('input') : [];
        this._setHandlers();    
    } 

    _setHandlers() {
        if(this.menuOpen)
            this.menuOpen.addEventListener('click', this.popupOpen.bind(this));
        if(this.buttonClose)
            this.buttonClose.addEventListener('click', this.popupClose.bind(this));
        if(this.buttonSubmit)
            this.buttonSubmit.addEventListener('click', this._submitFunc.bind(this)); 
        if(this.redirectAction)
            this.redirectElement.addEventListener('click',  this.redirectClick.bind(this));
        
        this.validatedElements.forEach(function(element){
            element.addEventListener('input', function(event) {
                handleValidate(event);
            });
        });
        
        // клик на оверлее = на самом же элементе приводит к закрытию
        if(this.popupElement) {
            this.popupElement.addEventListener('click', (event) => {
                if (this.popupElement && (event.target.id === this.popupElement.id)) {
                    this.popupClose(event);
                }
            });
        }
        
    }

    popupOpen() {
        this.hideErrors();
        // если нет кнопки сабмита, а функция есть, то вызываем ее сразу
        if((!this.buttonSubmit)&&(this.submitAction)) {
            this.submitAction(undefined);
        } else {
            this.popupElement.classList.remove('hidden');
        }
    }

    popupClose(event = undefined) {
        if(event) {
            event.preventDefault();
            event.stopPropagation();
        }
        this.hideErrors();
        this.popupElement.classList.add('hidden');
    }

    _submitFunc(event = undefined) {
        if(event) {
            event.preventDefault();
            event.stopPropagation();
        }
        // VALIDATION
        this.hideErrors();
        this.submitAction(event);
    }

    redirectClick(event) {
        // this.hideErrors();
        event.preventDefault();
        event.stopPropagation();
        this.popupClose(undefined);
        this.redirectAction(undefined);
    }

    showErrors(message) {
        if (this.errorElement) {
            this.errorElement.textContent = message;
            this.errorElement.classList.remove('hidden');
        }
    }

    hideErrors() {
        if (this.errorElement) {
            this.errorElement.classList.add('hidden');
        }
    }
}
