window.onload = function () {
    let form = document.getElementById('editForm');
    form.onsubmit = function (event) {
        event.preventDefault();
        createBranch();
    }

};


function createBranch() {
    let inputName = document.getElementById('name');
    //TODO obiekt js zawiera nazwe z controlki zmiana na stringa a nastwylac


}