let makePage;
let getBody;
let items;
let getInput;

getBody = document.body;
items = []
let getWrapper = document.querySelector("#wrapper");
let getPaginate = document.querySelector("#paginate");
let movie_list = [];
let rows = 5;
let currentPage;
let currPage = parseInt(sessionStorage.getItem("currentPage"));
getInput = document.querySelector("#input");
let getPrevBtn = document.querySelector("#btn-prev");
let getNextBtn = document.querySelector("#btn-next");
let getBackBtn = document.querySelector("#back-btn");


getBackBtn.style.visibility = "hidden";

getBackBtn.addEventListener("click", ()=> {
    location.reload();
});


if (currPage) {
    currentPage = currPage;
}else{
    currentPage = 1;
}

getPrevBtn.textContent = "Prev";
getNextBtn.textContent = "Next";


let btnPerPage = 4;

// This is to make that when the current page exceeds 1 or number > num_of_page, it sets the page to the exact page



//This is an object that contain all our functions of the page
makePage = {
    // The Display funcion is used to call all useful function. Calling two or more function just by calling one is cool
    //It's killing two birds with one stone 😁
    Display: function () {
        //This calls the getItems() that which returns a Promise, the ".then" is used to output the return value of the Promise returned.
        //NB. The 'this' means we are referring to a function that belongs to this "makePage" Object.
        this.getItems().then((result)=> {
            console.log(result[2]);
            // We need the "result" because that is what is returned from the getItem() which returns a Promise. A Promise return is not like a regular return so we needed the .then to get the return value.
            // So we called the DisplayList function of THIS object which takes 4 parameters, one being the first index of the returned Promise. Because it returns an Array/List
            this.DisplayList(result[0], getWrapper, rows, currentPage);
        });
        // This calls the Paginate() of THIS Object
        this.Paginate();

        //end of the Display() of THIS makePage Object.
    },

    // THIS Object getItems() is an async Function that's why you see the async b4 the function declaration
    getItems: async ()=> {
/*
        // We are making a request to our movie api (kinda stored the value in a file, but if you change in to our movie api it will still work) using the await keyword
        // We are able to use await because this is an asynchronous function
        // the await keyword means it waits till the request is done because we are making a request which can take time to repond
        const request = await fetch("./data/data_song.json");
        const response = await request.json(); //this give us our response in json format

        // Our returned json (key, value pair file) formatted response has a key named "results" which has a value that is a list #check our json file for confirmation
        let items_title = [];
        items_list = response.similartracks.track;

        //NB. Our response.result value which is a list containing another dictionary in Python/ object in Javascript (key, value pair datatype) separated by comma. It's a LIST OF OBJECTS / DICTIONARIES.

        let items_date = {}; // This is to store our items_list.result[index] release_date(key) values, which are strings. NB. the INDEX is because we will be looping through our LIST OF OBJECTS to get each movies details.

 // This is to get the title of each movie
        let items_overview = {}; // this is for the overview of each movie.


        for (let i = 0; i < ((items_list.length)/2); i++) {
            items_title.push(items_list[i].name);
            items_overview[items_list[i].name] = items_list[i].artist.name;
        }
        //So this is the loop i was talking bout, going through our LIST OF OBJECTS.
        for (let i in items_list) {
            each_item = items_list[i]; // stores each items details in a variable.

            movieTitle = each_item.title; // stores each movies titles.

            items_title.push(movieTitle); // appends all movies titles into a list.

            items_date[movieTitle] = each_item.release_date; // guess that 😁.

            items_overview[movieTitle] = each_item.overview; // and this

        };*/

            let items_title = [];
            let items_date = {};
            let items_overview = {};

            let token  = `BQDpaPQn671mrrFc0E4qpG6M5agDEqBtLS8RRVzabmuqLL7CHw6bU1mdlCGZN42F6T-38wz1ewGAlrwtbpbinajMFQbBP9eWeyF9ByHCQfBQac5O95o`;

            let res = await fetch(`https://api.spotify.com/v1/search?query=justin bieber deserve you&type=track&limit=3&access_token=${token}`);
            let data = await res.json();
            let dataList = data.tracks.items;
            let seed_tracks = "";
            let seed_artists = "";
            let seed_genres = [];

            let date_length = dataList.length;

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

            let res_recommendation = await fetch(url);
            console.log(url);
            let data_recommendation = await res_recommendation.json();
            let recommendationList = data_recommendation.tracks;
            for (let i = 0; i < recommendationList.length; i++) {
                items_title.push(recommendationList[i].name);

                items_date[recommendationList[i].name] = recommendationList[i].artists[0].name;

                items_overview[recommendationList[i].name] = recommendationList[i].album.images[0].url;

                //console.log(recommendationList[i].name, recommendationList[i].artists[0].name);
            }


        // This is to calculate our number of page due to the length of movie title list divide by the number of movies we wanna show on each page
        let page = Math.ceil(items_title.length / rows);


        // this stores our number of pages in sessionStorage so we can use it somewhere else without using the "this.getItem().then" stuff get it?
        //sessionStorage.setItem("numOfPage", page);

        //this returns 4 important things we need from this function
        return [items_title, items_date, items_overview, page];

        // end of THIS OBJECTS getItem().
    },


    // This is for Displaying our list per page #5 or any amount it doesn't matter.
    DisplayList: function (items, wrapper, row, page) {

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
        
        for (let i = perPage; i < row+perPage; i++) { //this makes sure that the specified number of movie items are displayed. 
            itemDiv = document.createElement("div");
            /*itemDivImg = document.createElement("img");
            itemDivImg.src = items_img[items[i]];*/
            itemDiv.classList.add("item");
            itemDiv.textContent = items[i];

            wrapper.appendChild(itemDiv);
            movie_list.push(itemDiv);
        }

        this.getItems().then((result) => {
            //we are doing this so when you click on a movie it changes to the details of the selected movie.
            res_date = result[1];
            res_overview = result[2];

            let getItem1 = async ()=> {

                for (let i in movie_list) {
                    movieDiv = movie_list[i];
                    movie_list[i].addEventListener("click", ()=> {
                        getBackBtn.style.visibility = "visible";
                        movieName = movie_list[i].textContent;
                        newContent =  `<div class="artist">Artist: ${res_overview[movieName]}</div><div class="title">Title: ${movieName}</div><div class="date">Release date: ${res_date[movieName]}</div><button class="watch-btn" title="stream online">Listen</button>`;
                        getBody.innerHTML = newContent;
                        getPaginate.innerHTML = "";
                        getPrevBtn.style.display = "none";
                        getNextBtn.style.display = "none";
                    });
                }
            }

            getItem1();

        });

    },

    creatBtn: function (numPage) {
        //this is a special function for creating our buttons
            let btn = document.createElement("Button");
            btn.classList.add("btn");
            btn.textContent = numPage;
    
            if (numPage == currentPage) btn.classList.add("active"); // we do this to add a special class name "active" which makes our current button show colors
            return btn;
    },

    Paginate: function () {
        // The very special function which almost everything is done
        let buttons = [];
        this.getItems().then((result)=> {
            page = result[3]; // we first of all get the number of button that needs to be created.


            for (let i = 1; i < page+1; i++){
                //then we loop through them creating our button
                let button = this.creatBtn(i);
                buttons.push(button) // Then creating a list of button elements # USEFUL LATER ON
            };


            for(let i = 0; i < buttons.length; i++) {
                // now we are looping through our button list, told you it will be useful😁
                buttons[i].addEventListener("click", ()=> {
                    // then for each of the buttons we are make an event listerner of when it's clicked

                    this.btnColor(buttons[i], buttons); // then calling our function that colors our button when any of them is clicked # later implemented... hold on
                    this.DisplayList(result[0], getWrapper, rows, i+1); //Now we are calling our displayList depending on which button is clicked
                    // so if you click on button 2 we want page 2's list to show not page 1's, Right? Well that's what this guy those

                    sessionStorage.setItem("currentPage", i+1); // now am storing our current page in sessionStorage so when we are in page 2 if we refresh the page it still stays in page 2 not otherwise.
                    currentPage = sessionStorage.getItem("currentPage");
                    //alert(currentPage);
                });
            };

            let numOfBtnPage = Math.ceil(buttons.length / btnPerPage);
            let btnCurrPage = sessionStorage.getItem("btnPage") || 1;

            this.displayBtn(buttons, btnPerPage, getPaginate, btnCurrPage);

           /* getPrevBtn.addEventListener("click", ()=> {
                if (btnCurrPage > 1) {
                    btnCurrPage--;
                }
                let mylist = this.displayBtn(buttons, btnPerPage, getPaginate, btnCurrPage);
                sessionStorage.setItem("btnPage", btnCurrPage);
                this.DisplayList(result[0], getWrapper, rows, mylist[btnPerPage-1]);
                this.btnColor(buttons[mylist[btnPerPage-1]-1], buttons);
                sessionStorage.setItem("currentPage", mylist[btnPerPage-1]);
            });

            getNextBtn.addEventListener("click", ()=> {
                if (btnCurrPage < numOfBtnPage) {
                    btnCurrPage++;
                }
                let mylist = this.displayBtn(buttons, btnPerPage, getPaginate, btnCurrPage);
                sessionStorage.setItem("btnPage", btnCurrPage);
                this.DisplayList(result[0], getWrapper, rows, mylist[0]);
                this.btnColor(buttons[mylist[0]-1], buttons);
                sessionStorage.setItem("currentPage", mylist[0]);
            })*/

        });
    },

    btnColor: function (btnNum, btnClass) {
        for (let i = 0; i < btnClass.length; i++) {
            btnClass[i].classList.remove("active");
        }
        btnNum.classList.add("active");
    },

    displayBtn: function (btnList, row, wrapper, page) {

        let mylist = [];

        if (wrapper) {
            wrapper.innerHTML = "";
        };

        page--;

        btnListStart = page*row;

        for (let i=btnListStart; i < btnListStart+row; i++) {
            mylist.push(i+1);
            wrapper.appendChild(btnList[i]);
        };

        return mylist;
    }

};

makePage.Display(); 
