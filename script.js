let taskList = [];
let taskList_List = [];

class taskItem {
    constructor(msg, id, dn){
        this.index      = id;
        this.message    = msg;
        this.done       = dn;

        this.edit   = false;
        this.delete = false;

        //Add new list element in HTML
        let li = document.createElement("li");
        li.className = "taskItem";

        //Add new HTML input element
        let check = document.createElement("input");
        check.id        = this.index;
        check.type      = "checkbox";
        check.checked   = this.done;
        check.className = "liCheckbox";

        //Add even listener when checkbox gets checked or unchecked(mark text with line through)
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

        //add the text paragraph of the task
        let para = document.createElement("p");
        para.className = "liParagraph";
        para.textContent = this.message;
        if (this.done) {
            para.style.textDecoration = "line-through";
        } 

        //Add event listener for changing/edit the text with a click, make the text editable when clicked
        para.addEventListener("mousedown", () => {
            console.log(`editButton ${this.index} clicked`)
            let para = this.item.querySelectorAll("p")[0];
            if (!this.edit) {
                this.edit = !this.edit;
                para.contentEditable = this.edit;
                updateTaskList_JS();          
            }
        });

        //Add event listener to exit the edit mode when user pressed enter, make the text not editable again
        para.addEventListener("keydown", (event) => {
            if (event.code === "Enter") {
                this.edit = false;
                para.contentEditable = this.edit;
                this.message = para.textContent;
                updateTaskList_JS();
            }
        });


        //Add the delete/done button in HTML
        let done = document.createElement("input");
        done.id        = id;
        done.type      = "submit";
        done.className = "liDone liButton";
        done.value     = ""; //FONTAWESOME TEXT HERE !

        //Add event listener when delete/done buton clicked, set delete true and update the list
        done.addEventListener("click", () =>{
            this.delete = true;
            updateTaskList_JS();
        });

        //Add the differnet HTML under/child elements to the list element 
        li.appendChild(check);
        li.appendChild(para);
        li.appendChild(done);

        this.item = li;
    }
}

const updateTaskList_JS = () =>{
    //Check for tasks marked as delete and delete them from current list .. then save the list in storage and reload HTML    
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
    //Reload/update the current HTML/Page

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
    if (loaded) {
        loaded.forEach(task => {
            updated[updated.length] = new taskItem(task.message, task.index, task.done);
        });     
    }
    taskList = updated;
    updateTaskList_JS();
}

loadSavedList();