import '../pages/index/index.css';
import '../js/common';
import { getElement } from "../js/utils/utils";
import { handleValidate } from "../js/components/validate";

const searchInput = getElement('#searchInput');
searchInput.addEventListener('input', (event) => {
    handleValidate(event);
    if(searchInput.value != '') {
        searchInput.classList.add('search__field_inputing');
    } else {
        searchInput.classList.remove('search__field_inputing');
    }
});
