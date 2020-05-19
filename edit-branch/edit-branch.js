window.onload = function () {
    let form = document.getElementById('editForm');
    const url_string = window.location.href;
    const url = new URL(url_string);
    const id = url.searchParams.get('id');
    form.onsubmit = function (event) {
        event.preventDefault();
        if (id) {
            updateBranch(id);
        } else {
            createBranch();
        }
    }
    if (id) {
        fetchBranch(id);
    }
};

function createBranch() {
    let branchName = document.getElementById('name').value;
    let createReq = {
        name: branchName
    };

    let http = new XMLHttpRequest();
    http.open('POST', 'http://localhost:8080/api/branches');
    http.setRequestHeader('Content-Type', 'application/json');
    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 201) {
            window.location.replace('../list-branches/list-branches.html');
        }
    };
    http.send(JSON.stringify(createReq));
}

function fetchBranch(id) {
    let http = new XMLHttpRequest();
    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            document.getElementById('name').value = JSON.parse(this.responseText).name;
        }
    };
    http.open('GET', 'http://localhost:8080/api/branches/' + id);
    http.send();
}

function updateBranch(id) {
    let branchName = document.getElementById('name').value;
    let createReq = {
        name: branchName
    };

    let http = new XMLHttpRequest();
    http.open('PUT', 'http://localhost:8080/api/branches/' + id);
    http.setRequestHeader('Content-Type', 'application/json');
    http.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 204) {
            window.location.replace('../list-branches/list-branches.html');
        }
    };
    http.send(JSON.stringify(createReq));
}



