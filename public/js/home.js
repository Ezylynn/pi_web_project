const getFullscreenElement = () => {
    return document.fullscreenElement
    || document.webkitFullscreenElement
    || document.mozFullscreenElement
    || document.msFullscreenElement;
}

const toggleFullscreen = () => {
    if (!getFullscreenElement()){ 
        if (document.documentElement.requestFullscreen){
            document.documentElement.requestFullscreen();
        }else if (document.documentElement.webkitRequestFullscreen){
            document.documentElement.webkitRequestFullscreen();
        }else if (document.documentElement.mozRequestFullScreen){
            document.documentElement.mozRequestFullScreen();
        }else if (document.documentElement.msRequestFullscreen){
            document.documentElement.msRequestFullscreen();
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

document.addEventListener("keydown", e => {
    if (e.key === 'f' || e.key === 'F'){
        toggleFullscreen();
    }
})