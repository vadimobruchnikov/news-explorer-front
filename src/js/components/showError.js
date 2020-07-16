export { ShowError }


class ShowError {

    constructor({ errorPopup, errorTextElement }) {
        this.errorPopup = errorPopup || null;
        this.errorTextElement = errorTextElement || null;
        this.init();
    }

    init() {
        this.errorPopup.classList.add('hidden');
    }

    disapearingOn() {
        this.errorPopup.classList.add('disappearing');
    }

    disapearingOff() {
        this.errorPopup.classList.add('hidden');
        this.errorPopup.classList.remove('disappearing');
    }

    show(error) {
        if(error) {
            this.errorTextElement.textContent = error.message ? error.message : error;
            this.errorPopup.classList.remove('hidden');
            setTimeout(this.disapearingOn.bind(this), 50);  
            setTimeout(this.disapearingOff.bind(this), 2500); // через 2.5 сек плавно скрыть
        }
    }
}
