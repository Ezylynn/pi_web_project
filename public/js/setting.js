
import {getFullscreenElement, toggleFullscreen, enableFullScreenOnKeyPress, removeFullScreenOnKeyPress } from "./lib/fullScreen.js"

const inputs = document.querySelectorAll("input")
const testForm = document.querySelector("#test-form")
const role = document.querySelector(".user-role")



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


testForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(this)
    const testData = {};
    for (const [key, value] of formData.entries()) {
        testData[key] = value;
    }
    fetch(`/api/v1/${role.value}/setting/test`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            start_time: testData.start_time,
            end_time: testData.end_time,
            test_name: testData.test_name,
            test_date: testData.test_date
        })
    }).then(response => {
        
        if(!response.ok){
            return response.text().then(text => { throw new Error(text) });
        }
        
        return response.text()
        
    
    }).then(html => {
        console.log(html)
        document.querySelector("#test-info-section").innerHTML = html
    }).catch(err => {
        console.error("Error", err)
    })
});
enableFullScreenOnKeyPress();