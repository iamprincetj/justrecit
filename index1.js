
let getSearchItem = document.querySelector("#search-item");
let getSearchBtn = document.querySelector("#search-btn");

getSearchItem.style.visibility = "hidden";
getSearchItem.addEventListener("keyup", (e)=> {
    if (e.keyCode === 13) {

        if (getSearchItem.value) {
            sessionStorage.setItem("searchItem", getSearchItem.value);
            sessionStorage.setItem("currentPage", 1);
            window.location.href = "landingpage.html"
        }else {
            alert("Please enter a song name");
        }
    }
});
if (getSearchBtn) {
    getSearchBtn.addEventListener("click", ()=> {
        getSearchItem.style.visibility = "visible";
        getSearchItem.focus();
        getSearchBtn.style.visibility = "hidden";
    });
}else {
    getSearchItem.style.visibility = "visible";
}