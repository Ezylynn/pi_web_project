import {getFullscreenElement, toggleFullscreen, enableFullScreenOnKeyPress } from "./lib/fullScreen.js"
const timer = document.querySelector(".timer");
const form = document.querySelector("form");
const mainElement = document.querySelector("main");
const instruction = document.querySelector(".instruction");
const startButton = document.querySelector(".start-quiz");
const testContainer = document.querySelector(".container");
const overlayMessage = document.querySelector(".overlay");
const centeredMessage = document.querySelector(".centered-message")
let warningTimes = 0;

function makeFullscreen(){
    return mainElement.requestFullscreen() ||  mainElement.webkitRequestFullscreen() || mainElement.mozRequestFullScreen() || mainElement.mozRequestFullScreen() || mainElement.msRequestFullscreen();
}
function redirectToResult(result){
    fetch(`/api/v1/result/${result}`, { method: "POST" })
                .then(response => {
                    if (response.redirected) {
                        window.location.href = response.url; 
                      } else if (!response.ok) {
                        throw new Error('Network response was not ok');
                      }
                      
                    })
                
                .catch(err => console.error("Error:", err));
}

function displayWarningMessage(message){
    overlayMessage.style.display = "flex";
    centeredMessage.innerText = message
}


document.addEventListener('paste', (event) => {
    redirectToResult("suspended")
   
});
document.addEventListener('visibilitychange', () => {
    redirectToResult("suspended")
});
window.addEventListener('blur', () => {
    redirectToResult("suspended")
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

document.addEventListener("fullscreenchange", (event) => {
    if (!document.fullscreenElement) { 
        warningTimes++; 
        let warningStatement;
        
        
        if (warningTimes === 1) {
            warningStatement = 'You exited the screen. This is the first warning!';
            
        } else if (warningTimes === 2) {
            warningStatement = 'You exited the screen. This is the second and last warning!';
            
        } else {
           
            return redirectToResult("suspended") 
        }
        
        displayWarningMessage(warningStatement)
    }
});


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

        timer.innerText =
            (remainingHours.toString().length === 1 ? "0" + remainingHours : remainingHours) + ":" +
            (remainingMinutes.toString().length === 1 ? "0" + remainingMinutes : remainingMinutes) + ":" +
            (remainingSeconds.toString().length === 1 ? "0" + remainingSeconds : remainingSeconds);

        if (distance < 0) {
            clearInterval(x);
        
            form.submit();
        }
        
    }, 1000);
}



enableFullScreenOnKeyPress();