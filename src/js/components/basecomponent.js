export { BaseComponent }

class BaseComponent {
    
    constructor({menuOpen, popupElement, buttonClose, buttonSubmit, submitAction, redirectElement, redirectAction, errorElement}) {
        this.menuOpen = menuOpen || null;
        this.popupElement = popupElement || null;
        this.buttonClose = buttonClose || null;
        this.buttonSubmit = buttonSubmit || null;
        this.submitAction = submitAction || null;
        this.errorElement = errorElement || null;
        this.redirectElement = redirectElement || null;
        this.redirectAction = redirectAction || null;
        this._setHandlers();    
    } 

    _setHandlers() {
        if(this.menuOpen)
            this.menuOpen.addEventListener('click', this.popupOpen.bind(this));
        if(this.buttonClose)
            this.buttonClose.addEventListener('click', this.popupClose.bind(this));
        if(this.buttonSubmit)
            this.buttonSubmit.addEventListener('click', this.submitFunc.bind(this)); 
        if(this.redirectAction)
            this.redirectElement.addEventListener('click', this.redirectClick.bind(this)); 
        // клик на оверлее = на самом же элементе приводит к закрытию
        if(this.popupElement)
            this.popupElement.addEventListener('click', this.popupClose.bind(this));
    }

    popupOpen() {
        this.hideErrors();
        // если нет кнопки сабмита, а функция есть, то вызываем ее сразу
        if((!this.buttonSubmit)&&(this.submitAction)) {
            this.submitAction(this);
        } else {
            this.popupElement.classList.remove('hidden');
        }
    }

    popupClose() {
        this.hideErrors();
        this.popupElement.classList.add('hidden');
    }

    submitFunc(event) {
        event.preventDefault();
    	event.stopPropagation();
        this.hideErrors();
        this.submitAction(this);
    }

    redirectClick(event) {
        this.hideErrors();
        this.popupClose();
        this.redirectAction(this);
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
