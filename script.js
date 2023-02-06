const input = document.querySelector('.question');
const windowChat = document.querySelector('.windowChat');
const send = document.querySelector('.send');

let text = '';
let time = new Date().toLocaleTimeString().slice(0,-3);
const obj ={
    question:''
}

console.log(time);

// How to log into console in javascript?

function message() {
    input.addEventListener("input", function () {
        text = input.value
        console.log(text);
    })
    send.addEventListener("click", function () {
        sendMessage()
        fetchКequest() 
        
    })
    input.addEventListener("keydown",function (e) {
        if(e.keyCode == 13){
        e.preventDefault()
        sendMessage()
        fetchКequest() 
        }
        //e.shiftKey 
    })
}
 function fetchКequest() {
    fetch('https://chat-gpt-example.vercel.app/makeRequest', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(
            obj
        )
        })
        .then(response => {
        return response.json()
        })
        .then(res => {
            let a = res.answer;
            createElement(a)           
        })
 }

 function createElement(answer) {
    
    let message2 = document.createElement('div')
    let messageBot = document.createElement('pre')
    let time2 = document.createElement('span')
    message2.classList.add('message2')
    messageBot.classList.add('messageBot')
    time2.classList.add('time2')
    time2.innerHTML = time;
    let b  = answer.split('\n')
    console.log(b);
    // messageBot.innerText = a или так 
    for (let i = 0; i < b.length; i++) {
        if(b[i] == ''){
            messageBot.innerHTML += b[i] + "<br>";
        }      
        if(b[i] != ''){
            messageBot.innerHTML += b[i] + '<br>';
        }               
    }
    message2.appendChild(time2)
    message2.appendChild(messageBot)
    windowChat.appendChild(message2)  
    function handleButtonClick() {
        message2.scrollIntoView({block: "center", behavior: "smooth"});
     }
     handleButtonClick()
 }
 

 function sendMessage() {
    if(text == '')return

    else{
        let message = document.createElement('div');
        let myMessage = document.createElement('pre');
        let myTime = document.createElement('span');
        message.classList.add('message');
        myMessage.classList.add('myMessage');
        myTime.classList.add('time')
        myMessage.innerHTML = text;
        myTime.innerHTML = time;
        obj.question = text;  
        
        message.appendChild(myTime)
        message.appendChild(myMessage)
        windowChat.appendChild(message)  

    

        function handleButton() {
            message.scrollIntoView({block: "center", behavior: "smooth"});
         }
         handleButton() 
    }
   
}

message()