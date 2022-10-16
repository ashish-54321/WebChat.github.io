const socket = io();
console.log('this is chat js ')

var names;
var dropdown = document.querySelector(".dropdown-menu")
var container =document.querySelector(".msgbox")

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
    
    div.innerHTML= `<p><b>${left}</b> left the chat</p>`;

    div.classList.add("status");
    container.appendChild(div);

  

})

////////////////////////////////////////////////////////////////////////////////////////////////
socket.on('user-list', (users) => {
    dropdown.innerHTML = "";
    users_arr = Object.values(users);
    for (let i = 0; i < users_arr.length; i++) {
        let div = document.createElement("div");
        // div.innerText=
        var content = `<a class="dropdown-item" href="#">   <p><b>${users_arr[i]}</b> online  🟢</p></a>  `;
        div.innerHTML = content;

        dropdown.appendChild(div);

    }

})


///////////////////////////////////////// [ send Message ]/////////////////////////////////////////////////


function text() {

    var x = document.getElementById("exampleFormControlTextarea1").value;
   
    var div = document.createElement("div");
   
    div.innerHTML = x;
    div.classList.add("message");
    div.classList.add("income");
    container.appendChild(div);
  

    document.getElementById("exampleFormControlTextarea1").value = "";
  
    window.scrollTo(0, document.body.scrollHeight);
    
    let msg = {
        user: names,
        message: x
    }
    // send to server

    socket.emit('message', msg)

}

//////////////////////////////////////////////////////[ recive Message ]/////////////////////////////////////////////

socket.on('message', (msg) => {

    let markup = `
    
    <p>${msg.message}</p>
    `
    var div = document.createElement("div");
    
    div.innerHTML = markup;
    div.classList.add("message");
    div.classList.add("outcome");
    container.appendChild(div);

    window.scrollTo(0, document.body.scrollHeight);
})


///////////////////////////////////////// [ clear chat ]////////////////////////////////////////////////////////

function clearchat() {

    var x = document.getElementById("loader");
   
    x.style.display = "block";
   
    window.scrollTo(0, document.body.scrollHeight);
    window.scrollTo(0, document.body.scrollHeight);
    window.scrollTo(0, document.body.scrollHeight);
    window.scrollTo(0, document.body.scrollHeight);
    window.scrollTo(0, document.body.scrollHeight);

}

function load() {
    window.location.reload();
}



