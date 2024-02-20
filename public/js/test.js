import {getFullscreenElement, toggleFullscreen, enableFullScreenOnKeyPress } from "./lib/fullScreen.js"
const timer = document.querySelector(".timer");

const mainElement = document.querySelector("main");
const instruction = document.querySelector(".instruction");
const startButton = document.querySelector(".start-quiz");
const testContainer = document.querySelector(".container");
const overlayMessage = document.querySelector(".overlay");
const centeredMessage = document.querySelector(".centered-message");
const strongElement = document.createElement("strong")
const studentAnswer = document.querySelector("#student-answer");
const userId = document.querySelector(".userId");

const submitTest = document.querySelector(".submit");
strongElement.innerText = "F";

let warningTimes = 0;
let eventHandled = false;

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

const debouncedRedirectToResult = debounce((result) => {
    redirectToResult(result);
}, 100); 

function makeFullscreen(){
    return mainElement.requestFullscreen() ||  mainElement.webkitRequestFullscreen() || mainElement.mozRequestFullScreen() || mainElement.mozRequestFullScreen() || mainElement.msRequestFullscreen();
}
function redirectToResult(result){
    fetch(`/api/v1/student/result/${result}/${userId.value}`, { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: 
            JSON.stringify({
                
                studentAnswer: studentAnswer.value,
                remainingTime: timer.innerText.toString()
            })
        
    })
    .then(response => {
        if (response.redirected) {
            console.log(response.url)
            window.location.href = response.url; 
        } else if (!response.ok) {
            throw new Error('Network response was not ok');
        }
                      
    })
                
    .catch(err => console.error("Error:", err));
}

function displayWarningMessage(message){
    overlayMessage.style.display = "flex";
    centeredMessage.innerText = message;
    centeredMessage.appendChild(document.createTextNode(" Press "))
    centeredMessage.appendChild(strongElement);
    centeredMessage.appendChild(document.createTextNode(" To Re-Enter Fullscreen."))

    
}

function warnToFullscreenChange(event){
    if (!document.fullscreenElement) { 
        warningTimes++; 
        let warningStatement;
        
        
        if (warningTimes === 1) {
            warningStatement = `You exited the screen. This is the first warning!
            `;
            
        } else if (warningTimes === 2) {
            warningStatement = `
            You exited the screen. This is the second and last warning!
            `;
            
        } else {
            
            return redirectToResult("suspended") 
        }
        
        displayWarningMessage(warningStatement)
    }
}
function setTimer(hours, minutes, seconds) {
    
    var distance = hours * 3600 + minutes * 60 + seconds;
    timer.innerText = (hours.toString().length === 1 ? "0" + hours : hours) + ":" +
            (minutes.toString().length === 1 ? "0" + minutes : minutes) + ":" +
            (seconds.toString().length === 1 ? "0" + seconds : seconds); 
    
    var x = setInterval(function() {
        distance -= 1;
        var remainingHours = Math.floor(distance / 3600);
        var remainingMinutes = Math.floor((distance % 3600) / 60);
        var remainingSeconds = Math.floor(distance % 60);

        

        if (distance <= 0) {
            
            redirectToResult("done")
            
            clearInterval(x);
           
            
        }
        timer.innerText =
            (remainingHours.toString().length === 1 ? "0" + remainingHours : remainingHours) + ":" +
            (remainingMinutes.toString().length === 1 ? "0" + remainingMinutes : remainingMinutes) + ":" +
            (remainingSeconds.toString().length === 1 ? "0" + remainingSeconds : remainingSeconds);
        
    }, 1000);
}


document.addEventListener('paste', (event) => {
    event.preventDefault();
   
});
document.addEventListener('visibilitychange', () => {
    if (!eventHandled && document.visibilityState === 'hidden') {
        eventHandled = true;
        debouncedRedirectToResult("suspended");
    }
});

window.addEventListener('blur', () => {
    if (!eventHandled) {
        eventHandled = true;
        debouncedRedirectToResult("suspended");
    }
});
startButton.addEventListener("click", () => {
    timer.style.display = "block";
    testContainer.style.display = "block";
    instruction.style.display = "none";
    mainElement.style.display = "block";
    setTimer(0,0,15);
    makeFullscreen();
} 
)

document.addEventListener("fullscreenchange", warnToFullscreenChange);


submitTest.addEventListener("click", () => {
        
    redirectToResult("done")
})


    




enableFullScreenOnKeyPress();