var serverLink = "http://localhost:3001";
window.onload = function () {
    var list = document.getElementById("list");
    getTaskList(list, 2);
};

var getTaskList = function (list, list_id) {
    fetch(serverLink + "/task?list_id=".concat(list_id))
        .then(function (response) {
        if (!response.ok)
            throw new Error("Request failed with status ".concat(response.status));
        return response.json();
    })
        .then(function (data) {
        data.forEach(function (task) {
            console.log(list);
            var item = document.createElement("li");
            item.append(task.title);
            list.append(item);
        });
    })["catch"](function (e) {
        console.log(e);
    });
};
