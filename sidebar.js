const sidebarBurgerBtn = document.querySelector("#burgerBtnDiv");
const sidebarAddListBtn = document.querySelector("#sidebarAddBtn");
const sidebarAddListText = document.querySelector("#newListText");
const sidebarDeleteBtn = document.querySelector("#sidebarDeleteBtn");

sidebarBurgerBtn.addEventListener("click", changeWidth);
sidebarAddListBtn.addEventListener("click", addNewList);
sidebarAddListText.addEventListener("keyup", (e) => e.key === "Enter" ? addNewList : null);
sidebarDeleteBtn.addEventListener("click", deleteListItem);

let listArray = [];



function changeWidth(e){

    const sidebar = document.querySelector("#sidebarsection");
    //const sidebarContent = document.querySelector("#sidebarContent");

    //console.log(sidebar.offsetWidth);                           //The HTMLElement.offsetWidth read-only property returns the layout width of an element as an integer


    //Check if sidebar is extended or retracted:
    if(sidebar.offsetWidth == 68){                              //Sidebar is retracted -> extend it

        sidebar.style.width = "375px";
        //sidebarContent.style.display = "unset";

        hideSidebarContent(false);

    } else {                                                    //Sidebar is extended -> retract it

        sidebar.style.width = "68px";
        //sidebarContent.style.display = "none";

        hideSidebarContent(true);
    }

}


function hideSidebarContent(hide){

    const sidebarContent = document.querySelector("#sidebarContent");

    switch (hide){

        case false:
            sidebarContent.style.display = "unset";
            break;

        case true:
            sidebarContent.style.display = "none";
            break;

        default:
            break;

    }

}


function addNewList(e){

    const amountOfLi = document.querySelectorAll(".sidebarListItem").length;    //Wieviele Li sind vorhanden?
    const listName = document.querySelector("#newListText");                    //Text aus dem input lesen
    const list = document.querySelector("#sidebarList");

    if(listName === ""){                                                        //Überprüfen, ob Textfeld ausgefüllt ist

        window.alert("Bitte gib einen Namen ein!");

    }else{

        let newLi = createNewLi(listName.value);                                //Neues Element erzeugen

        list.appendChild(newLi);                                                //Neues Element zur Liste hinzufügen

        listName.value = "";                                                    //textfeld zurücksetzen

        listArray.push(newLi);

        console.table(listArray)

    }

}

function createNewLi(listName){

    const newItem = document.createElement("li");
    newItem.className = "sidebarListItem";
    newItem.innerText = listName;

    return newItem;

}


function deleteListItem(e){

    const sidebarList = document.querySelector("#sidebarList").addEventListener("click", (e) => {

        for(let i = 0; i < listArray.length; i++){
            if(listArray[i.innerText] === e.target.innerText){
                listArray.splice(i-1, 1);
                console.log(listArray)
                console.log(2)
            }
        }

        

    })

}