export const getFullscreenElement = () => {
    const mainElement = document.querySelector("main");
    return document.fullscreenElement
    || document.webkitFullscreenElement
    || document.mozFullscreenElement
    || document.msFullscreenElement;
}

export const toggleFullscreen = () => {
    const mainElement = document.querySelector("main");
    if (!getFullscreenElement()){ 
        if (mainElement.requestFullscreen){
            mainElement.requestFullscreen();
        }else if (mainElement.webkitRequestFullscreen){
            mainElement.webkitRequestFullscreen();
        }else if (mainElement.mozRequestFullScreen){
            mainElement.mozRequestFullScreen();
        }else if (mainElement.msRequestFullscreen){
            mainElement.msRequestFullscreen();
        }
    }else{
        if (document.exitFullscreen){
            document.exitFullscreen();
        }else if (document.webkitExitFullscreen){
            document.webkitExitFullscreen();
        }else if (document.mozCancelFullScreen){
            document.mozCancelFullScreen();
        }else if (document.msExitFullscreen){
            document.msExitFullscreen();
        }
    }
}

function handleFullScreenToggle(e) {
    if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
    }
}

// Function to enable the fullscreen toggle
export const enableFullScreenOnKeyPress = () => {
    document.addEventListener("keydown", handleFullScreenToggle);
};

// Function to disable the fullscreen toggle
export const removeFullScreenOnKeyPress = () => {
    document.removeEventListener("keydown", handleFullScreenToggle);
};