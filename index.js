// Load environment variables from .env file
import { clientS, clientId } from './spotify key.js';

let getMusicContainer = document.querySelectorAll(".flip-card");
let getMusicContainerBack = document.querySelectorAll(".flip-card-back");

getMusicContainerBack.forEach((music)=> {
    let makePara = document.createElement("p");
    makePara.classList.add("show");
    makePara.textContent = "Listen Now";
    music.appendChild(makePara);
})



let makePage;
let getBody;
let items;
let getInput;
let perPage;

getBody = document.body;
items = []
let getPaginateContainer = document.querySelector("#paginate-container");
let getWrapper = document.querySelector("#wrapper");
let getPaginate = document.querySelector("#paginate");
let rows = 5;
let currentPage;
let currPage = parseInt(sessionStorage.getItem("currentPage"));
getInput = document.querySelector("#input");
let getPrevBtn = document.querySelector("#btn-prev");
let getNextBtn = document.querySelector("#btn-next");

let search_query = sessionStorage.getItem("searchItem");

if (currPage) {
    currentPage = currPage;
}else{
    currentPage = 1;
}

let token = localStorage.getItem("access_token");
let expiration_time = localStorage.getItem("expiration_time");




function getToken () {
    const request = new XMLHttpRequest();
    request.open('POST', 'https://accounts.spotify.com/api/token', false);  // `false` makes the request synchronous
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(`grant_type=client_credentials&client_id=${clientId}&client_secret=${clientS}`);
    
    if (request.status === 200) {
        let data = JSON.parse(request.responseText);
        token = data.access_token;
        expiration_time = Date.now() + (data.expires_in * 1000);
        localStorage.setItem("access_token", token);
        localStorage.setItem("expiration_time", expiration_time);
        console.log(`Access token received: ${token}`);
    }else {
        alert("Sorry, Something is wrong. Refresh the page");
    }
    
}


// Get the initial token
if (!token || Date.now() > expiration_time) {
    getToken();
}

// Get a new token every hour
setInterval(() => {
    if (!token || Date.now() > expiration_time) {
        getToken();
    }
}, (3600-300) * 1000);


makePage = async()=> {

    //let res = await fetch(`https://api.spotify.com/v1/search?query=${search_query}&type=track&limit=3&access_token=${token}`);
    let res = await fetch(`https://api.spotify.com/v1/search?access_token=${token}&query=${search_query}&type=track&limit=3`).catch((error) => {
        console.log(error);
        alert("Sorry there was an error, go again please");
    });
    let data = await res.json().catch((error) => {
        console.log(error);
        alert("Sorry there was an error, go again please");
    });
    let dataList = data.tracks.items;
    let seed_tracks = "";
    let seed_artists = "";
    let seed_genres = [];

    let date_length = dataList.length;
    if (date_length == 0) {
        alert("Sorry there was an error, go again please");
    }

    for (let i = 0; i < date_length; i++) {
        if (i < date_length - 1) {
            seed_tracks += dataList[i].id + ",";
        }else{
            seed_tracks += dataList[i].id;
        }
        seed_artists = dataList[i].album.artists[0].id;
    };

    let res_genre = await fetch(`https://api.spotify.com/v1/artists/${seed_artists}?type=track&access_token=${token}`);
    let data_genre = await res_genre.json();
    let genreList = data_genre.genres;

    let genre_length = genreList.length;

    let random = Math.floor(Math.random() * genre_length);
    seed_genres = genreList[random];



    let url = `https://api.spotify.com/v1/recommendations?type=track&seed_tracks=${seed_tracks}&seed_artists=${seed_artists}&seed_genres=${seed_genres}&access_token=${token}`



    //let url =  `./data/mysong.json`;

    let items_title = [];
    let items_artist = {};
    let items_image = {}
    let items_id = {}

    let res_recommendation = await fetch(url);
    let data_recommendation = await res_recommendation.json();
    let recommendationList = data_recommendation.tracks;
    
    for (let i = 0; i < recommendationList.length; i++) {
        items_title.push(recommendationList[i].name);

        items_artist[recommendationList[i].name] = recommendationList[i].artists[0].name;

        items_image[recommendationList[i].name] = recommendationList[i].album.images[1].url;
        items_id[recommendationList[i].name] = recommendationList[i].id;
    }

    
    let page = Math.ceil(items_title.length / rows);
    let allDataList = [items_title, items_artist, items_image, page, items_id];
    DisplayList(allDataList, getWrapper, rows, currentPage);
    Paginate(allDataList);
}

makePage();

let DisplayList = function (items, wrapper, row, page) {

    if (wrapper) { // This check if our wrapper (the div to house our Movie Titles to display on each page) is not empty, if it's not it makes it empty. This is because on every page we need an empty wrapper, this ensure our movie list doesn't stay on top of each other

        wrapper.innerHTML = ""; 
    };

    // This decrements our current page value, you will see the reason later on.
    page--;


    // This is the index start of our list on each page
    // So if page is 1 (the page-- up there ☝️) means it's now zero and row is constant

    /*  So page = 0, perPage = 0 * 5 = 0 # we start from index zero of the list displaying 5 items
            page = 1, perPage = 1 * 5 = 5 # we start from index zero of the list displaying 5 items and so on
    
    */
    perPage = row * page;
    
    let itemsList = items[0];
    let items_artist = items[1];
    let items_img = items[2];
    let id = items[4];
    let getMusicContainer = document.querySelectorAll(".flip-card");
    let getMusicContainerImg = document.querySelectorAll(".card img");
    let getMusicContainerArtist = document.querySelectorAll(".card-content h2");
    let getMusicContainerOverview = document.querySelectorAll(".card-content p");

    let getHeading = document.querySelector(".heading");

    getHeading.textContent = `Just Rec - ${search_query}`;

    for (let i = 0; i < getMusicContainer.length; i++) {
        getMusicContainerImg[i].src = "";
        getMusicContainerArtist[i].textContent = "";
        getMusicContainerOverview[i].textContent = "";
    };

    
    // This is to loop through our list of movie titles and display them on each page
    let count = 0;
    let currentpage = []
    
    for (let i = perPage; i < row+perPage; i++, count++) { //this makes sure that the specified number of movie items are displayed. 
        if (itemsList[i] == undefined) break; // this is to stop the loop when we reach the end of our list, so we don't get an error
        getMusicContainerImg[count].src = items_img[itemsList[i]];
        getMusicContainerArtist[count].textContent = items_artist[itemsList[i]];
        getMusicContainerOverview[count].textContent = itemsList[i];
        currentpage.push(i);
    };

    getMusicContainer.forEach((music)=> {
        music.style.display = "block";
    });

    let musicList1 = [];

    getMusicContainerBack.forEach((music)=> {
        musicList1.push(music);
    });

    for (let i = 0; i < musicList1.length; i++) {
        musicList1[i].addEventListener("click", ()=> {
            let artist = musicList1[i].querySelector("h2").textContent;
            let musicTitle = musicList1[i].querySelector("p").textContent;
            let musicId = id[musicTitle];
            sessionStorage.setItem("musicId", musicId);
            sessionStorage.setItem("artist", artist);
            sessionStorage.setItem("musicTitle", musicTitle);
            window.open("output0.html", "_blank");
        });
    };

    // This is to check if our current page is greater than 1, if it is we want to show our previous button
    if (page > 0) {
        getPrevBtn.classList.remove("hide"); // so we remove the hide class from our previous button
    }
    else {
        getPrevBtn.classList.add("hide"); // else we add the hide class to our previous button
    }

    // This is to check if our current page is less than the number of pages we have, if it is we want to show our next button
    if (page < items[3]-1) {
        getNextBtn.classList.remove("hide"); // so we remove the hide class from our next button
    }else {
        getNextBtn.classList.add("hide"); // else we add the hide class to our next button
    }

    getPaginateContainer.style.visibility = "visible";

};

let btnColor = function (btnNum, btnClass) {
    for (let i = 0; i < btnClass.length; i++) {
        btnClass[i].classList.remove("active");
    }
    btnNum.classList.add("active");
};

let creatBtn = function (numPage) {
    //this is a special function for creating our buttons
        let btn = document.createElement("Button");
        btn.classList.add("btn");
        btn.textContent = numPage;

        if (numPage == currentPage) btn.classList.add("active"); // we do this to add a special class name "active" which makes our current button show colors
        return btn;
};

let Paginate = function (musicList) {
    // The very special function which almost everything is done
        let page = musicList[3]  // we first of all get the number of button that needs to be created.


        for (let i = 1; i < page+1; i++){//then we loop through them creating our button
            let button = creatBtn(i);
            getPaginate.appendChild(button);// Then appending each button to the div created in html, which displays our buttons down there
        };


        let buttons = document.querySelectorAll(".btn"); // this stores all our button which the class name "btn" into a list


        getPrevBtn.addEventListener("click", ()=> { // this is our previous button event listener so when it's clicked
            if (currentPage > 1) { // checks if the current page we are in is > 1, because if it' less that one or == 1 we want to stop going back

                currentPage--; // if it's true we decrement our current page by one
            }

            sessionStorage.setItem("currentPage", currentPage); // then store it in sessionStorage

            DisplayList(musicList, getWrapper, rows, currentPage); //then we want to display the list on that specific page

            btnColor(buttons[currentPage], buttons); // then put the color on the right button again
        });
        
        getNextBtn.addEventListener("click", ()=> {

            // same for this but the opposite for the Next button
            if (currentPage < page) { // if it's < the number of our pages this increments it
                currentPage++;
            };

            // you know what all this do
            sessionStorage.setItem("currentPage", currentPage);
            DisplayList(musicList, getWrapper, rows, currentPage);
            btnColor(buttons[currentPage], buttons);
        });


        for(let i = 0; i < buttons.length; i++) {
            // now we are looping through our button list, told you it will be useful😁
            buttons[i].addEventListener("click", ()=> {
                // then for each of the buttons we are make an event listerner of when it's clicked

                btnColor(buttons[i], buttons); // then calling our function that colors our button when any of them is clicked # later implemented... hold on
                DisplayList(musicList, getWrapper, rows, i); //Now we are calling our displayList depending on which button is clicked
                // so if you click on button 2 we want page 2's list to show not page 1's, Right? Well that's what this guy those

                sessionStorage.setItem("currentPage", i); // now am storing our current page in sessionStorage so when we are in page 2 if we refresh the page it still stays in page 2 not otherwise.


                currentPage = sessionStorage.getItem("currentPage");//this set or current page to our exact current page when any button is clicked
            });
        };

    
};
