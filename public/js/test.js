// import {getFullscreenElement, toggleFullscreen, enableFullScreenOnKeyPress, removeFullScreenOnKeyPress} from "./lib/fullScreen.js"
// const timer = document.querySelector(".timer");

// const mainElement = document.querySelector("main");
// const instruction = document.querySelector(".instruction");
// const startButton = document.querySelector(".start-quiz");
// const testContainer = document.querySelector(".container");
// const overlayMessage = document.querySelector(".overlay");
// const centeredMessage = document.querySelector(".centered-message");
// const strongElement = document.createElement("strong")
// const studentAnswer = document.querySelector("#student-answer");
// const userId = document.querySelector(".userId");
// const testCode = document.querySelector("#test-code")
// const inputs = document.querySelectorAll("input")


// const submitTest = document.querySelector(".submit");
// strongElement.innerText = "F";

// let warningTimes = 0;
// let eventHandled = false;
// // function activateProtection(){
// //     document.addEventListener('paste', (event) => {
// //         event.preventDefault();
       
// //     });
// //     document.addEventListener('visibilitychange', () => {
// //         if (!eventHandled && document.visibilityState === 'hidden') {
// //             eventHandled = true;
// //             debouncedRedirectToResult("suspended");
// //         }
// //     });
    
// //     window.addEventListener('blur', () => {
// //         if (!eventHandled) {
// //             eventHandled = true;
// //             debouncedRedirectToResult("suspended");
// //         }
// //     });
// //     document.addEventListener("fullscreenchange", warnToFullscreenChange);
// // }

// function activateProtection() {
//     document.addEventListener('paste', (event) => {
//         event.preventDefault();
//     });

//     // Apply debounce to visibilitychange event
//     document.addEventListener('visibilitychange', debounce(() => {
//         if (!eventHandled && document.visibilityState === 'hidden') {
//             eventHandled = true;
//             redirectToResult("suspended");
//         }
//     }, 400));

//     // Apply debounce to blur event
//     window.addEventListener('blur', debounce(() => {
//         if (!eventHandled) {
//             eventHandled = true;
//             redirectToResult("suspended");
//         }
//     }, 400));

//     document.addEventListener("fullscreenchange", warnToFullscreenChange);
// }

// function fetchTime() {
//     fetch(`/api/v1/student/test/pi-test/${userId.value}`, {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: JSON.stringify({
//             test_code: testCode.value
//         })
//     })
//     .then(response => {
//         if (!response.ok) {
//             alert("Test Code Typed Incorrectly!")
//         }
//         return response.json();
//     }).then(response => {
        
//         const { time } = response;
//         let timeArray = time.split(":")
//         timer.style.display = "block";
//         testContainer.style.display = "block";
//         instruction.style.display = "none";
//         mainElement.style.display = "block";
        

//         setTimer(parseInt(timeArray[0]), parseInt(timeArray[1]), parseInt(timeArray[2])); 
//         makeFullscreen();
//         activateProtection();
//     }).catch(err => {
//         console.error(err); 
//     });
// }
// // function debounce(func, wait) {
// //     let timeout;
// //     return function executedFunction(...args) {
// //         const later = () => {
// //             clearTimeout(timeout);
// //             func(...args);
// //         };
// //         clearTimeout(timeout);
// //         timeout = setTimeout(later, wait);
// //     };
// // };

// function debounce(func, delay) {
//     let timeoutId = null;
//     return function (...args) {
//         clearTimeout(timeoutId);
//         timeoutId = setTimeout(() => {
//             func.apply(this, args);
//         }, delay);
//     };
// }

// const debouncedRedirectToResult = debounce((result) => {
//     redirectToResult(result);
// }, 100); 

// function makeFullscreen(){
//     return mainElement.requestFullscreen() ||  mainElement.webkitRequestFullscreen() || mainElement.mozRequestFullScreen() || mainElement.mozRequestFullScreen() || mainElement.msRequestFullscreen();
// }
// function redirectToResult(result){
//     fetch(`/api/v1/student/pi-test/result/${result}/${userId.value}`, { 
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json"
//         },
//         body: 
//             JSON.stringify({
                
//                 studentAnswer: studentAnswer.value,
//                 remainingTime: timer.innerText.toString()
//             })
        
//     })
//     .then(response => {
//         if (response.redirected) {
//             console.log(response.url)
//             window.location.href = response.url; 
//         } else if (!response.ok) {
//             throw new Error('Network response was not ok');
//         }
                      
//     })
                
//     .catch(err => console.error("Error:", err));
// }

// function displayWarningMessage(message) {
//     if (overlayMessage && centeredMessage) {
//         // Make sure the overlay and the message elements are available
//         overlayMessage.style.display = "flex"; // Show the overlay
        
//         centeredMessage.innerText = message; // Set the warning message
//         centeredMessage.appendChild(document.createTextNode(" Press "));
//         centeredMessage.appendChild(strongElement);
//         centeredMessage.appendChild(document.createTextNode(" To Re-Enter Fullscreen."));
//     } else {
//         console.error('Overlay elements are not found.');
//     }
// }

// function warnToFullscreenChange(event){
//     if (!document.fullscreenElement) { 
//         warningTimes++; 
//         let warningStatement;
        
        
//         if (warningTimes === 1) {
//             warningStatement = `You exited the screen. This is the first warning!
//             `;
            
//         } else if (warningTimes === 2) {
//             warningStatement = `
//             You exited the screen. This is the second and last warning!
//             `;
            
//         } else {
            
//             return redirectToResult("suspended") 
//         }
        
//         displayWarningMessage(warningStatement)
//     }
// }
// function setTimer(hours, minutes, seconds) {
    
//     var distance = hours * 3600 + minutes * 60 + seconds;
//     timer.innerText = (hours.toString().length === 1 ? "0" + hours : hours) + ":" +
//             (minutes.toString().length === 1 ? "0" + minutes : minutes) + ":" +
//             (seconds.toString().length === 1 ? "0" + seconds : seconds); 
    
//     var x = setInterval(function() {
//         distance -= 1;
//         var remainingHours = Math.floor(distance / 3600);
//         var remainingMinutes = Math.floor((distance % 3600) / 60);
//         var remainingSeconds = Math.floor(distance % 60);

        

//         if (distance <= 0) {
            
//             redirectToResult("done")
            
//             clearInterval(x);
           
            
//         }
//         timer.innerText =
//             (remainingHours.toString().length === 1 ? "0" + remainingHours : remainingHours) + ":" +
//             (remainingMinutes.toString().length === 1 ? "0" + remainingMinutes : remainingMinutes) + ":" +
//             (remainingSeconds.toString().length === 1 ? "0" + remainingSeconds : remainingSeconds);
        
//     }, 1000);
// }


// inputs.forEach(input => {
//     // Disable fullscreen toggle on input focus
//     input.addEventListener("focus", () => {
//         console.log("hello")
//         removeFullScreenOnKeyPress();
//     });
//     // Re-enable fullscreen toggle on input blur (losing focus)
//     input.addEventListener("blur", () => {
//         enableFullScreenOnKeyPress();
//     });
// });


// startButton.addEventListener("click", () => {
    
//     fetchTime()
    
    
// } 
// )




// submitTest.addEventListener("click", () => {
        
//     redirectToResult("done")
// })




    




// enableFullScreenOnKeyPress();


const timer = document.querySelector(".timer");

const mainElement = document.querySelector("main");
const instruction = document.querySelector(".instruction");
const startButton = document.querySelector(".start-quiz");
const testContainer = document.querySelector(".container");
const studentAnswer = document.querySelector("#student-answer");
const userId = document.querySelector(".userId");
const testCode = document.querySelector("#test-code");

const submitTest = document.querySelector(".submit");

function fetchTime() {
    fetch(`/api/v1/student/test/pi-test/${userId.value}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            test_code: testCode.value
        })
    })
    .then(response => {
        if (!response.ok) {
            alert("Test Code Typed Incorrectly!")
        }
        return response.json();
    }).then(response => {
        
        const { time } = response;
        let timeArray = time.split(":");
        timer.style.display = "block";
        testContainer.style.display = "block";
        instruction.style.display = "none";
        mainElement.style.display = "block";
        

        setTimer(parseInt(timeArray[0]), parseInt(timeArray[1]), parseInt(timeArray[2])); 
    }).catch(err => {
        console.error(err); 
    });
}

function redirectToResult(result) {
    fetch(`/api/v1/student/pi-test/result/${result}/${userId.value}`, { 
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            studentAnswer: studentAnswer.value,
            remainingTime: timer.innerText.toString()
        })
    })
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url; 
        } else if (!response.ok) {
            throw new Error('Network response was not ok');
        }
    })
    .catch(err => console.error("Error:", err));
}

function setTimer(hours, minutes, seconds) {
    var distance = hours * 3600 + minutes * 60 + seconds;
    timer.innerText = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
    var x = setInterval(function() {
        distance -= 1;
        var remainingHours = Math.floor(distance / 3600);
        var remainingMinutes = Math.floor((distance % 3600) / 60);
        var remainingSeconds = Math.floor(distance % 60);

        if (distance <= 0) {
            redirectToResult("done");
            clearInterval(x);
        }

        timer.innerText = `${remainingHours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }, 1000);
}

startButton.addEventListener("click", fetchTime);

submitTest.addEventListener("click", () => {
    redirectToResult("done");
});