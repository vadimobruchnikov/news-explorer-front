export { BaseComponent }

class BaseComponent {
    
    constructor({popupElement, menuOpen, buttonClose, overlayClose, buttonSubmit, submitAction, redirectElement, redirectAction, errorElement}) {
        this.popupElement = popupElement || null;
        this.menuOpen = menuOpen || null;
        this.buttonClose = buttonClose || null;
        this.overlayClose = overlayClose || null;
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
        if(this.overlayClose) 
            this.overlayClose.addEventListener('click', this.popupClose.bind(this));
        if(this.buttonSubmit)
            this.buttonSubmit.addEventListener('click', this.submitFunc.bind(this)); 
        if(this.redirectAction)
            this.redirectElement.addEventListener('click', this.redirectClick.bind(this)); 
        // клик на оверлее
        if(this.popupElement)
            this.popupElement.addEventListener('click', this.popupClose.bind(this));
    }

    popupOpen() {
        this.hideErrors();
        this.popupElement.classList.remove('hidden');
    }

    popupClose() {
        this.hideErrors();
        this.popupElement.classList.add('hidden');
    }

    submitFunc(event) {
        this.hideErrors();
        event.preventDefault();
    	event.stopPropagation();
        this.submitAction(this);
    }

    redirectClick(event) {
        this.hideErrors();
        this.popupClose();
        this.redirectAction(this);
    }

    showErrors(message) {
        this.errorElement.textContent = message;
        this.errorElement.classList.remove('hidden');
    }

    hideErrors() {
        this.errorElement.classList.add('hidden');
    }
}
