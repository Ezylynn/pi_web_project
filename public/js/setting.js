import { response } from "express";
import {getFullscreenElement, toggleFullscreen, enableFullScreenOnKeyPress } from "./lib/fullScreen.js"


const testForm = document.querySelector("#test-form")



testForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const formData = new FormData(this)
    const testData = {};
    for (const [key, value] of formData.entries()) {
        testData[key] = value;
    }
    fetch("/api/v1/teacher/setting/test", {
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
            throw new Error("Response was not okay")
        }
        return response.text()
        
    
    }).then(html => {
        document.querySelector("#test-info-section").innerHTML = html
    }).catch(err => {
        console.error("Error", err)
    })
});
enableFullScreenOnKeyPress();