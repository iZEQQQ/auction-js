window.onload = function () {
    fetchBranches();
};

function renderTable(branches) {

    let tBody = document.getElementById('branchesData');
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    branches.ids.forEach(id => {
        let tr = document.createElement('tr');
        tBody.appendChild(tr);
        fetchBranch(id, tr);
    });
}

function fetchBranches() {
    let http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            renderTable(JSON.parse(this.responseText));
        }
    };
    http.open('GET', 'http://localhost:8080/api/branches');
    http.send();
}

function renderRow(branch, tr) {
    let tdId = document.createElement('td');
    let textId = document.createTextNode(branch.id + '');
    tdId.appendChild(textId);
    tr.appendChild(tdId);

    let tdName = document.createElement('td');
    let textName = document.createTextNode(branch.name + '');
    tdName.appendChild(textName);
    tr.appendChild(tdName);

    let tdEdit = document.createElement('td');
    let buttonEdit = document.createElement('button');
    let textEdit = document.createTextNode('Edit');
    buttonEdit.appendChild(textEdit);
    tdEdit.appendChild(buttonEdit);
    tr.appendChild(tdEdit);

    let tdDelete = document.createElement('td');
    let buttonDelete = document.createElement('button');
    let textDelete = document.createTextNode('Delete');
    buttonDelete.appendChild(textDelete);
    tdDelete.appendChild(buttonDelete);
    tr.appendChild(tdDelete);

    let tdView = document.createElement('td');
    let buttonView = document.createElement('button');
    let textView = document.createTextNode('View');
    buttonView.appendChild(textView);
    tdView.appendChild(buttonView);
    tr.appendChild(tdView);

    buttonDelete.onclick = function () {
        deleteBranch(branch.id);
    }

    buttonEdit.onclick = function () {
        window.location.replace('../edit-branch/edit-branch.html?id=' + branch.id);
    }

    buttonView.onclick = function () {
        window.location.replace('../view-branch/view-branch.html?id=' + branch.id);
    }


}

function deleteBranch(id) {
    let http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 202) {
            fetchBranches();
        }
    };
    http.open('DELETE', 'http://localhost:8080/api/branches/' + id);
    http.send();
}


function fetchBranch(id, tr) {
    let http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            renderRow(JSON.parse(this.responseText), tr);
        }
    };
    http.open('GET', 'http://localhost:8080/api/branches/' + id);
    http.send();
}



