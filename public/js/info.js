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
window.addEventListener('DOMContentLoaded', function() {
    adjustPageSize();
});

function adjustPageSize() {
    // Get the height of the content within the answer div
    var contentHeight = document.getElementById('answer').scrollHeight;

    // Add some extra padding (if needed) to account for spacing
    var padding = 20; // Adjust as needed

    // Set the height of the page to fit the content
    document.body.style.minHeight = (contentHeight + padding) + 'px';
}
enableFullScreenOnKeyPress();
