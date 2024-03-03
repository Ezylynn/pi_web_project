import {getFullscreenElement, toggleFullscreen, enableFullScreenOnKeyPress, removeFullScreenOnKeyPress } from "./lib/fullScreen.js"

const inputs = document.querySelectorAll("input")
const form = document.querySelector(".add_user_container form")
const tableData = document.querySelector(".table-section table tbody")
inputs.forEach(input => {
    // Disable fullscreen toggle on input focus
    input.addEventListener("focus", () => {
        
        removeFullScreenOnKeyPress();
    });
    // Re-enable fullscreen toggle on input blur (losing focus)
    input.addEventListener("blur", () => {
        enableFullScreenOnKeyPress();
    });
});


form.addEventListener("submit", function(e) {
    e.preventDefault();
    const data = new FormData(this)
    const formData = {};
    for (const [key, value] of data.entries()) {
        formData[key] = value;
    }
    fetch(`/api/v1/superadmin/manage-account`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            full_name: formData.full_name,
            email: formData.email,
            username: formData.username,
            password: formData.password
        })
    }).then(response => {
        
        if(!response.ok){
            return response.text().then(text => { throw new Error(text) });
        }
        
        return response.text()
        
    
    }).then(html => {
        
        tableData.innerHTML = html
    }).catch(err => {
        console.error("Error", err)
    })
});


enableFullScreenOnKeyPress();