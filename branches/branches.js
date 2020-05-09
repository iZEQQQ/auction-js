const branches = {
    "ids": [
        1,
        2,
        3
    ]
};
window.onload = function () {
    console.log(branches);
    renderTable();
};

function renderTable() {

    let tBody = document.getElementById('branchesData');

    branches.ids.forEach(id => {
        let tr = document.createElement('tr');
        let tdId = document.createElement('td');
        let textId = document.createTextNode(id+'');
        tdId.appendChild(textId);
        tr.appendChild(tdId);
        tBody.appendChild(tr);
    });

}

