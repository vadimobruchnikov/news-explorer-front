import { handleValidate } from "./validate";
  
export { BaseComponent }
export const HIDDEN_CLASS_NAME = `hidden`; // TODO Перенести в конфиг

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
        
        if(this.popupElement) {
            // клик на оверлее = на самом же элементе приводит к закрытию
            this.popupElement.addEventListener('click', (event) => {
                if (this.popupElement && (event.target.id === this.popupElement.id)) {
                    this.popupClose(event);
                }
            });

            // скрывать по Esc
            document.addEventListener('keydown', (event) => {
                if(event.key == "Escape") {
                    this.popupClose(event);
                }
            });
        }
    }

    popupOpen() {
        if(this.popupElement) {
            this.popupElement.classList.remove(HIDDEN_CLASS_NAME);
        }
    }

    popupClose(event = undefined) {
        if(this.popupElement) {
            this.popupElement.classList.add(HIDDEN_CLASS_NAME);
        }
    }
}
