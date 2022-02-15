let taskList = [];
let listNumber = 0;

class taskItem {
    constructor(message, id){
        this.edit = false;
        this.done = false;
        this.index = id;
        
        let li = document.createElement("li");
        li.className = "taskItem";

        let check = document.createElement("input");
        check.id        = id;
        check.type      = "checkbox";
        check.className = "liCheckbox";

        let para = document.createElement("p");
        para.className = "liParagraph";
        para.textContent = message;
        para.addEventListener("keydown", (event) => {
            if (event.code === "Enter") {
                this.edit = false;
                para.contentEditable = this.edit;
            }
        });
        para.addEventListener("mousedown", (event) => {
            console.log(`editButton ${this.index} clicked`)
            let para = this.item.querySelectorAll("p")[0];
            this.edit = !this.edit;
            para.contentEditable = this.edit;
        });
        let edit = document.createElement("input");
        edit.id        = id;
        edit.type      = "submit";
        edit.className = "liEdit liButton";
        edit.value     = "";
        edit.addEventListener("click", () => {
            console.log(`editButton ${this.index} clicked`)
            let para = this.item.querySelectorAll("p")[0];
            this.edit = !this.edit;
            para.contentEditable = this.edit;
        });

        let done = document.createElement("input");
        done.id        = id;
        done.type      = "submit";
        done.className = "liDone liButton";
        done.value     = "";
        done.addEventListener("click", () =>{
            console.log(`doneButton ${this.index} clicked`)
            let para = this.item.querySelectorAll("p")[0];
            this.done = !this.done;
            if (this.done) {
                para.style.textDecoration = "line-through";       
            }else{
                para.style.textDecoration = "none";
            }
        });

        li.appendChild(check);
        li.appendChild(para);
        li.appendChild(edit);
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
        taskList[taskList.length] = new taskItem(message, taskList.length); 
    }
    updateTaskList_HTML();
}

const saveCurrentList = () => {
    //let cookie[listNumber] = taskList; //TODO: cookie saving here ?

}
const loadSavedList = (listIndexToLoad) => {
    taskList = cookie[listIndexToLoad]; // TODO: cookie loading here ? 
    updateTaskList_HTML();
    listNumber = listIndexToLoad;
}