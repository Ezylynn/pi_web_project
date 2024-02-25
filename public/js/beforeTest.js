import {getFullscreenElement, toggleFullscreen, enableFullScreenOnKeyPress } from "./lib/fullScreen.js"




const inputs = document.querySelectorAll("input")

inputs.forEach(input => {
    // Disable fullscreen toggle on input focus
    input.addEventListener("focus", () => {
        console.log("hello")
        removeFullScreenOnKeyPress();
    });
    // Re-enable fullscreen toggle on input blur (losing focus)
    input.addEventListener("blur", () => {
        enableFullScreenOnKeyPress();
    });
});
const mainElement = document.querySelector("main");
const startButton = document.querySelector(".start-quiz");
function makeFullscreen(){
    return mainElement.requestFullscreen() ||  mainElement.webkitRequestFullscreen() || mainElement.mozRequestFullScreen() || mainElement.mozRequestFullScreen() || mainElement.msRequestFullscreen();
}
startButton.addEventListener("click", () => {
    timer.style.display = "block";
    testContainer.style.display = "block";
    instruction.style.display = "none";
    mainElement.style.display = "block";
    setTimer(0,35,0);
    makeFullscreen();
} 
)

enableFullScreenOnKeyPress();