let taskList = [];
let taskList_List = [];

class taskItem {
    constructor(msg, id, dn){
        this.index      = id;
        this.message    = msg;
        this.done       = dn;

        this.edit   = false;
        this.delete = false;

        let li = document.createElement("li");
        li.className = "taskItem";

        let check = document.createElement("input");
        check.id        = this.index;
        check.type      = "checkbox";
        check.checked   = this.done;
        check.className = "liCheckbox";
        check.addEventListener("change",(event) => {
            this.done = event.target.checked;
            let para = this.item.querySelectorAll("p")[0];
            if (this.done) {
                para.style.textDecoration = "line-through";
            }else{
                para.style.textDecoration = "";
            }
            updateTaskList_JS();
        });

        let para = document.createElement("p");
        para.className = "liParagraph";
        para.textContent = this.message;
        if (this.done) {
            para.style.textDecoration = "line-through";
        } 
        para.addEventListener("keydown", (event) => {
            if (event.code === "Enter") {
                this.edit = false;
                para.contentEditable = this.edit;
                this.message = para.textContent;
                updateTaskList_JS();
            }
        });
        para.addEventListener("mousedown", () => {
            console.log(`editButton ${this.index} clicked`)
            let para = this.item.querySelectorAll("p")[0];
            if (!this.edit) {
                this.edit = !this.edit;
                para.contentEditable = this.edit;
                updateTaskList_JS();          
            }
        });

        let done = document.createElement("input");
        done.id        = id;
        done.type      = "submit";
        done.className = "liDone liButton";
        done.value     = ""; //FONTAWESOME TEXT HERE !
        done.addEventListener("click", () =>{
            this.delete = true;
            updateTaskList_JS();
        });

        li.appendChild(check);
        li.appendChild(para);
        li.appendChild(done);

        this.item = li;
    }
}

const updateTaskList_JS = () =>{
    let updated = [];
    taskList.forEach(task => {
        if (task.delete === false) {
            task.index = updated.length;
            updated[updated.length] = task;
        }
    });
    taskList = updated;
    
    saveCurrentList();
    updateTaskList_HTML();
}

const updateTaskList_HTML = () => {
    console.log("---------------")
    let list = document.querySelector("#tasklist .list")

    //delete old list, needed for later list swapping (list1, list2, list3)
    list.innerHTML = "";

    //load new list
    taskList.forEach(task => {
        list.appendChild(task.item);
    });

    console.log(taskList)
}

const addNewTask = () => {
    //get message from top textfield and create new task with current message
    let message = document.querySelector("#newtaskTextfield").value;
    if (message.length>0) {
        taskList[taskList.length] = new taskItem(message, taskList.length, false); 
    }
    updateTaskList_JS();
    document.querySelector("#newtaskTextfield").value = "";
}

document.querySelector("#add").addEventListener("click", addNewTask);
document.querySelector("#newtaskTextfield").addEventListener("keydown", (event) => {
    if (event.code === "Enter") {
        addNewTask();
    }
});

const saveCurrentList = () => {
    let json_list = JSON.stringify(taskList);
    window.localStorage.setItem("taskList", json_list);
}
const loadSavedList = () => {
    let updated = [];
    let loaded  = JSON.parse(window.localStorage.getItem("taskList"));
    loaded.forEach(task => {
        updated[updated.length] = new taskItem(task.message, task.index, task.done);
    });
    taskList = updated;
    updateTaskList_JS();
}

loadSavedList();