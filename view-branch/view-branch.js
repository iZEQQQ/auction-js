$(document).ready(function () {
    fetchBranch();
});

function fetchBranch() {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const id = url.searchParams.get('id');
    $.get('http://localhost:8080/api/branches/' + id, function (data) {
        renderBranch(data);
    });
}

function renderBranch(branch) {
    $('#branchName').append(branch.name);
    $.get('http://localhost:8080/api/branches/' + branch.id + '/categories', function (data) {
        renderCategories(data);
    });
}

function renderCategories(categories) {
    let categoryData = $('#categoryData');
    categoryData.empty();
    categories.ids.forEach(category => {
        let tr = $('<tr>');
        categoryData.append(tr);
        renderCategory(tr, category);
    });
}

function renderCategory(tr, categoryId) {
    const url_string = window.location.href;
    const url = new URL(url_string);
    const id = url.searchParams.get('id');

    $.get('http://localhost:8080/api/branches/' + id + '/categories/' + categoryId, function (data) {
        tr.append($('<td>').append(data.id))
            .append($('<td>').append(data.name))
            .append($('<td>').append($('<button>').append('Edit').click(() => {
                console.log(data.id)
            })))
            .append($('<td>').append($('<button>').append('Delete').click(() => {
                deleteCategory(id, categoryId);
            })));
    });
}

function deleteCategory(branchId, categoryId) {
    $.ajax({
        url: 'http://localhost:8080/api/branches/' + branchId + '/categories/' + categoryId,
        type: 'DELETE'
    }).done(() => {
        fetchBranch();
    });
}