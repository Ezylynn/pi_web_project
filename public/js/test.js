import {getFullscreenElement, toggleFullscreen, enableFullScreenOnKeyPress } from "./lib/fullScreen.js"
const timer = document.querySelector(".timer");
const form = document.querySelector("form");
const mainElement = document.querySelector("main");
const instruction = document.querySelector(".instruction");
const startButton = document.querySelector(".start-quiz");
const testContainer = document.querySelector(".container");
let warningTimes = 0;


startButton.addEventListener("click", () => {
    timer.style.display = "block";
    testContainer.style.display = "block";
    instruction.style.display = "none";
    mainElement.style.display = "block";
    setTimer(0,35,0);
    mainElement.requestFullscreen() ||  mainElement.webkitRequestFullscreen() || mainElement.mozRequestFullScreen() || mainElement.mozRequestFullScreen() || mainElement.msRequestFullscreen();
} 
)

document.addEventListener("fullscreenchange", (event) => {
    if (!document.fullscreenElement) { // Check if the user has exited fullscreen
        warningTimes++; // Increment the counter
        let warningStatement;
        
        // Provide warnings based on the number of times fullscreen was exited
        if (warningTimes === 1) {
            warningStatement = 'You exited the screen. This is the first warning!';
        } else if (warningTimes === 2) {
            warningStatement = 'You exited the screen. This is the second and last warning!';
        } else {
            // Make a POST request to the server if fullscreen has been exited more than twice
            return fetch("/api/v1/result/suspended", { method: "POST" })
                .then(response => {
                    if (response.redirected) {
                        window.location.href = response.url; // Redirect the window to the new URL
                      } else if (!response.ok) {
                        throw new Error('Network response was not ok');
                      }
                      // Handle additional logic if needed upon successful suspension
                    })
                
                .catch(err => console.error("Error:", err)); // Log any errors that occur during the fetch
        }
        
        alert(warningStatement); // Show the warning message to the user
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
            timer.innerHTML = "DONE";
            form.submit();
        }
        
    }, 1000);
}



enableFullScreenOnKeyPress();