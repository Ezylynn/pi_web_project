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