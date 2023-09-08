let getIframe = document.querySelector("#iframe");
let getMusicId = sessionStorage.getItem("musicId");

let url = `https://open.spotify.com/embed/track/${getMusicId}`;

getIframe.src = url;