const socket = io();
console.log('this is chat js ')

var names;
var dropdown = document.querySelector(".dropdown-menu")

function closeForm() {
      
    document.getElementById("myForm").style.display = "none";
    names = document.getElementById("email").value;

    
    if (!names) {
        window.location.reload(); 
    }
        
        
    

    document.getElementById("logicchat").style.display = "block";

    socket.emit('joined-user', names);

}



socket.on('user-connected', (socket_name) => {

    userJoinLeft(socket_name, 'online');

});


function userJoinLeft(name, status) {

    var div = document.createElement("div")


    var content = `<a class="dropdown-item" href="#">   <p><b>${name}</b> ${status} 🟢 </p></a>  `;

    div.innerHTML = content;

    dropdown.appendChild(div);


}









// do {
//     names = prompt("Enter your NAME TO JOIN");

// } while (!names);







///////////////////////////////////////// [ send Message ]/////////////////////////////////////////////////



function text() {

    var x = document.getElementById("exampleFormControlTextarea1").value;
    // 
    //var nextPage= document.getElementById("nexthtml");
    var div = document.createElement("div");
    div.style.width = "300px";
    div.style.padding = "10px";
    // div.style.margin = "15%";
    div.style.marginTop = "1%";
    div.style.marginBottom = "1%";
    div.style.marginRight = "26%";
    div.style.borderRadius = "16px";
    // div.style.border = "15px solid green";
    // div.style.marginLeft= "80%";
    div.style.background = "#ffffff";
    div.innerHTML = x;
    document.getElementById("get").appendChild(div);
    // document.getElementById("nexthtml").appendChild(div );

    document.getElementById("exampleFormControlTextarea1").value = "";
    // document.body.scrollHeight = 0;
    // document.documentElement.scrollTop = 0;
    window.scrollTo(0, document.body.scrollHeight);
    /////////////////////////////////////////////////////////////////////

    let msg = {
        user: names,
        message: x
    }
    // send to server

    socket.emit('message', msg)

}

//////////////////////////////////////////////////////[ recive Message ]/////////////////////////////////////////////

socket.on('message', (msg) => {





    // <h4>${msg.user}</h4>
    let markup = `
    
    <p>${msg.message}</p>
    `



    var div = document.createElement("div");
    div.style.width = "300px";
    div.style.padding = "10px";
    // div.style.margin = "15%";
    // div.style.border = "15px solid green";
    div.style.marginLeft = "15%";
    div.style.marginTop = "1%";
    div.style.marginBottom = "1%";
    div.style.background = "#DCF8C6";
    div.style.borderRadius = "16px";

    div.innerHTML = markup;
    document.getElementById("get").appendChild(div);

    window.scrollTo(0, document.body.scrollHeight);


    /////////////////////////[online ]///////////////////////





})


///////////////////////////////////////// [ clear chat ]////////////////////////////////////////////////////////

function clearchat() {

    var x = document.getElementById("loader");
    // if (x.style.display === "none") {
    x.style.display = "block";
    // } else {
    //   x.style.display = "none";
    // }

    window.scrollTo(0, document.body.scrollHeight);
    window.scrollTo(0, document.body.scrollHeight);
    window.scrollTo(0, document.body.scrollHeight);
    window.scrollTo(0, document.body.scrollHeight);
    window.scrollTo(0, document.body.scrollHeight);

}

function load() {
    window.location.reload();
}



