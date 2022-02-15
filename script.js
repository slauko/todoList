let taskList = []
class taskItem {
    constructor(message){
        this.msg = message;
        this.done = false;
    }
    editMessage(message){
        this.msg = message;
    }
    editDone(){
        this.done = !this.done;
    }
}

const updateTaskList_HTML = () => {
    console.log("---------------")
    let list = document.querySelector("#tasklist .list")
    console.log(list.innerHTML)
    taskList.forEach(task => {
        console.log(task.msg)
    });
}

const addNewTask = () => {
    //get message from top textfield and create new task with current message
    let message = document.querySelector("#newtaskTextfield").value;
    if (message.length>0) {
        taskList[taskList.length] = new taskItem(message); 
    }
    updateTaskList_HTML();
}

const hallo = () => {
    console.log("HALLO!")
}