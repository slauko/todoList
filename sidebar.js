const btn = document.querySelector("#burgerBtnDiv");

btn.addEventListener("click", changeWidth);


function changeWidth(e){

    const sidebar = document.querySelector("#sidebarsection");
    //const sidebarList = document.querySelector("#sidebarList");

    //console.log(sidebar.offsetWidth); //The HTMLElement.offsetWidth read-only property returns the layout width of an element as an integer

    if(sidebar.offsetWidth == 68){

        sidebar.style.width = "375px";
        //sidebarList.style.display = "unset";

        hideSidebarContent(false);

    } else {
        sidebar.style.width = "68px";
        //sidebarList.style.display = "none";

        hideSidebarContent(true);
    }

}


function hideSidebarContent(hide){

    const sidebarList = document.querySelector("#sidebarList");

    switch (hide){

        case false:
            sidebarList.style.display = "unset";
            break;

        case true:
            sidebarList.style.display = "none";
            break;

        default:
            break;

    }

}