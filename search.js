let getSearch = document.querySelectorAll(".search-page");
//let getSearchBtn = document.querySelector("#search-btn");
let getSearchLen = getSearch.length;


let search =  ()=> {
    let array = [];
    if (getSearchLen == 2 && getSearch[0].value && getSearch[1].value) {
        for (let i = 0; i < getSearchLen; i++) {
            array.push(getSearch[i].value);
        //window.location.href = "index.html";
        }
        sessionStorage.setItem("searchItem", array);
        window.open("index1.html");
    }else {
        alert("Missing something, try again 😁");
    }
};

for (let i = 0; i < getSearchLen; i++) {
    getSearch[i].addEventListener('keydown', function(event) {
        // 3. Check the event object
        if (event.keyCode === 13 || event.key === 'Enter') {
            search();
            // 4. Perform the desired action. 
            // Add your code here to handle the Enter key press event
        }
        });
}