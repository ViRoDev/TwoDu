const serverLink: string = "http://localhost:3001"

window.onload = function() {
    const list = document.getElementById("list");

    getTaskList(list, 2);
}

const getTaskList = (list:HTMLElement, list_id: number) => {
    fetch(serverLink + `/task?list_id=${list_id}`)
    .then(response => {
        if(!response.ok)
            throw new Error(`Request failed with status ${response.status}`)
        return response.json();
        })
    .then(data =>{
        data.forEach(task => {
            console.log(list);
            const item = document.createElement("li");
            item.append(task.title);
            list.append(item);
        }); 
    })
    .catch((e)=> {
        console.log(e);
    });
}