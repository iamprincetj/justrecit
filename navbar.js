let navBarStat = false;
let getMenu = document.querySelector("#menu-img");


let displayNav = ()=> {
    let getNavUl = document.querySelector("#nav-bar ul");
    let getNavLinks = document.querySelectorAll("#nav-bar ul li a");
    let getNavInputs = document.querySelectorAll("#nav-bar ul li input");
    let inputsLen = getNavInputs.length;
    let linksLen = getNavLinks.length;

    if (navBarStat == false) {
        getNavUl.style.height = "10rem";
        getNavUl.style.display = "block";
        getNavUl.style.transition = "all 0.3s ease-in-out";

       /* for (let i = 0; i < linksLen; i++) {
            getNavLinks[i].style.display = "block";
        }
        for (let j = 0; j < inputsLen; j++) {
            getNavInputs[j].style.display = "block";
        }*/
        navBarStat = true;
    }else {
        /*for (let i = 0; i < linksLen; i++) {
            getNavLinks[i].style.display = "none";
        }
        for (let j = 0; j < inputsLen; j++) {
            getNavInputs[j].style.display = "none";
        }*/
        getNavUl.style.display = "none";
        getNavUl.style.height = "0";
        getNavUl.style.transition = "all 0.3s ease-in-out";
        navBarStat = false
    }

}

if (getMenu)
    getMenu.addEventListener("click", displayNav);


let getSearchBtn = document.querySelector("#body #main-body #search-btn");

let displaySearch = ()=> {
    let getSearchDiv = document.querySelector("#body #main-body #search");
    getSearchDiv.style.visibility = "visible";
    getSearchBtn.style.display = "none";
}

if (getSearchBtn)
    getSearchBtn.addEventListener("click", displaySearch);

let getPaginateWrapper = document.querySelector("#paginatewrapper");

if (getPaginateWrapper) {
    getPaginateWrapper.style.display = "none";
    setTimeout(()=>{
        getPaginateWrapper.style.display = "block";
    }, 1000);
};