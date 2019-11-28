import {Popup} from "./popup.js";
import {getElement} from "./utils.js";
export {imgPreview};

const imgPreview = new Popup({   
    mainContainer: getElement('#preview'), 
    openFunction: function (event) {
        getElement('#preview').classList.add('popup_is-opened');
        //getElement('.popup__content_image').src = event.target.style.backgroundImage.split('"')[1];
        getElement('.popup__content_image').src = urlImageToSrc(event.target.style.backgroundImage);
    }, 
    closeControl: getElement('.popup__close_preview') 
});
