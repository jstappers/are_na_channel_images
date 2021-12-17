// ca2311caffb3fa11bb286497661accd339c073f7e64411a63ab49d010527b894

let channelurl = localStorage.channelurl;
let authkey = localStorage.auth;

let count = 0;


if (channelurl == "null" || channelurl == null) {
    let channelurl = prompt("Channel url", "https://api.are.na/v2/channels/");
    localStorage.setItem("channelurl", channelurl);
} 

if (authkey == "null" || authkey == null) {
    let authkey = prompt("Authentication", "");
    localStorage.setItem("auth", authkey);
} 

function setChannelUrl() {
    let channelurl = prompt("Channel url", "https://api.are.na/v2/channels/");
    localStorage.setItem("channelurl", channelurl);
    location.reload(); 
}

function setAuthKey() {
    let authkey = prompt("Authentication", "");
    localStorage.setItem("auth", authkey);
    location.reload(); 
}

function fisherYatesShuffle(arr) {
    for (var i = arr.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1)); //random index
        [arr[i], arr[j]] = [arr[j], arr[i]]; // swap
    }
}


async function fetchObjects() {
    try {
        let res = await fetch(channelurl, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + authkey
            }});
        return await res.json();
    } catch (error) {
        console.log(error);
    }
}



async function renderObjects() {
    let objects = await fetchObjects();
    let contents = objects.contents;
    
    console.log(contents);
    
    console.log(contents.length);

    const random = Math.floor(Math.random() * contents.length);
    // let randomitem = (random, contents[random]);
    let randomitem = contents[count];
    let dateitem = Date.parse(randomitem.connected_at)

    let image = randomitem.image.large.url;
    let filesize = randomitem.image.original.file_size_display
    console.log(image);
    console.log(filesize);
    document.getElementById("image").src = image;
    document.getElementById("filesize").innerHTML = filesize;
    document.getElementById("title").innerHTML = randomitem.title;
    document.getElementById("date").innerHTML = randomitem.connected_at;
    document.getElementById("channelbutton").innerHTML = channelurl;
    console.log(count);

    if (count < contents.length - 1){
        count++; 
    }
    else {
        count = 0;
    }
    
    
}

renderObjects();
setInterval(renderObjects, 5000);