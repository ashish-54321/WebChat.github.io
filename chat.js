

const socket = io();
console.log('this is chat js ')
var i=0;
var names;
var dropdown = document.querySelector(".dropdown-menu")
var dropdownSidepanel = document.querySelector(".side-panel-user")
var container = document.querySelector(".msgbox")

function closeForm() {

    document.getElementById("myForm").style.display = "none";
    names = document.getElementById("email").value;

    if (!names) {
        window.location.reload();
    }
    document.getElementById("logicchat").style.display = "block";

    socket.emit('joined-user', names);

}


/////////////////////////////////////////////////////////////////////////////////////////////////////////

socket.on('user-disconnected', (left) => {
    let div = document.createElement("div")

    div.innerHTML = `<p><b>${left}</b> left the chat</p>`;

    div.classList.add("status");
    container.appendChild(div);





})

////////////////////////////////////////////////////////////////////////////////////////////////
socket.on('user-list', (users) => {
    dropdown.innerHTML = "";
    dropdownSidepanel.innerHTML = "";
    users_arr = Object.values(users);
    for (let i = 0; i < users_arr.length; i++) {
        let div = document.createElement("div");
        let sidediv = document.createElement("div");
        var content = `<a class="dropdown-item" href="#">   <p><b>${users_arr[i]}</b> online  🟢</p> </a><hr>  `;
        div.innerHTML = content;
        sidediv.innerHTML = content;
        dropdown.appendChild(div);
        dropdownSidepanel.appendChild(sidediv);

    }



})


///////////////////////////////////////// [ send Message ]/////////////////////////////////////////////////


function text() {

     /////////////////////////////////////////////////////////// [current time starts hear] ///////////////////////////////
    // 👇️ from CURRENT DATE
    const now = new Date();
    const current = now.getHours() + ':' + now.getMinutes();

    const withPmAm = now.toLocaleTimeString('en-US', {
        // en-US can be set to 'default' to use user's browser settings
        hour: '2-digit',
        minute: '2-digit',
    });

    console.log(withPmAm);
    //////////////////////////////////////////////////////  [ current ends hear] /////////////////////////////////////////


    var x = document.getElementById("exampleFormControlTextarea1").value;

    var div = document.createElement("div");

    div.innerHTML =  `<p style="margin-bottom: 1px;">${x}</p>
    <span> <h6> ${withPmAm} </h6></span>`;

    div.classList.add("message");
    div.classList.add("income");
    container.appendChild(div);


    document.getElementById("exampleFormControlTextarea1").value = "";

    container.scrollTop = container.scrollHeight;

    let msg = {
        user: names,
        message: x
    }
    // send to server

    socket.emit('message', msg)

}

//////////////////////////////////////////////////////[ recive Message ]/////////////////////////////////////////////

socket.on('message', (msg) => {

    /////////////////////////////////////////////////////////// [current time starts hear] ///////////////////////////////
    // 👇️ from CURRENT DATE
    const now = new Date();
    const current = now.getHours() + ':' + now.getMinutes();

    const withPmAm = now.toLocaleTimeString('en-US', {
        // en-US can be set to 'default' to use user's browser settings
        hour: '2-digit',
        minute: '2-digit',
    });

    console.log(withPmAm);
    //////////////////////////////////////////////////////  [ current ends hear] /////////////////////////////////////////


    let markup = `
    <p style="margin-bottom: 1px;">${msg.message}</p>
    <span> <h6> ${withPmAm} </h6></span>
    `
    let usermarkup = ` <h5>${msg.user}</h5>`
    var div = document.createElement("div");
    var userdiv = document.createElement("div");

    div.innerHTML = markup;
    userdiv.innerHTML = usermarkup;
    div.classList.add("message");
    div.classList.add("outcome");
    userdiv.classList.add("h5");
    container.appendChild(div);
    container.appendChild(userdiv);

    container.scrollTop = container.scrollHeight;
})


///////////////////////////////////////// [ clear chat ]////////////////////////////////////////////////////////

function clearchat() {

    container.innerHTML = "";

}


function load() {

    var x = document.getElementById("loader");

    x.style.display = "block";

    container.scrollTop = container.scrollHeight;
    container.scrollTop = container.scrollHeight;
    container.scrollTop = container.scrollHeight;
    container.scrollTop = container.scrollHeight;
    container.scrollTop = container.scrollHeight;
    window.location.reload();
}

function sendFile() {
    
    document.getElementById("send-file").style.display = "block";
    document.getElementById("form-txt").style.display = "none";

}

function sendFileBtn() {
  
    //alert(" This feture is under Mantainace");
   let markup = `<img src="upload${i}.jpg" alt="select File" />`
        console.log(markup +"this file in chat.js");
        var div = document.createElement("div");
        var x = div.innerHTML = markup;
        div.classList.add("message");
        div.classList.add("income");

        container.appendChild(div);
        container.scrollTop = container.scrollHeight;

        let msg = {
            user: names,
            message: x
        }
        
        socket.emit('message', msg)

    
        
    // }

    document.getElementById("send-file").style.display = "none";
    document.getElementById("form-txt").style.display = "block";
}


function cancelBtn() {
    document.getElementById("send-file").style.display = "none";
    document.getElementById("form-txt").style.display = "block";
}

function upload(files) {
    socket.emit("upload", files[0], i, (status) => {
        console.log(status);
    });
}

socket.on("imgStack", (j) => {
    i = j;
})


