import {getFullscreenElement, toggleFullscreen, enableFullScreenOnKeyPress, removeFullScreenOnKeyPress } from "./lib/fullScreen.js"
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

enableFullScreenOnKeyPress();