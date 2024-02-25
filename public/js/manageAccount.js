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

// const sortStates = {
//     full_name: false,
//     default: false,
//     email: false,
//     username: false
//   };
//   function changeArrowToDefault(name) {
//     Object.keys(sortStates).forEach((key) => {
//       if (key !== name) {
//         sortStates[key] = false;
//       }
//     });
//   }
  
//   function updateEventListeners() {
//     // Re-select the elements in the DOM
//     const toggleSortUsername = document.querySelector("#toggle-sort-username");
//     const toggleSortId = document.querySelector("#toggle-sort-id");
//     const toggleSortFullName = document.querySelector("#toggle-sort-full-name");
//     const toggleSortEmail = document.querySelector("#toggle-sort-email");
    
  
//     toggleSortUsername.addEventListener("click", () => {
//         console.log("username")
//         changeArrowToDefault("username");
//         sortStates.username = !sortStates.username;
//         fetchSort("username", sortStates.username);
//       });
//       toggleSortId.addEventListener("click", () => {
//         changeArrowToDefault("default");
//         sortStates.default = !sortStates.default;
//         fetchSort("default", sortStates.default);
//       });
//       toggleSortFullName.addEventListener("click", () => {
//         changeArrowToDefault("full_name");
//         sortStates.full_name = !sortStates.full_name;
//         fetchSort("full_name", sortStates.full_name);
//       });
//       toggleSortEmail.addEventListener("click", () => {
//         changeArrowToDefault("email");
//         sortStates.email = !sortStates.email;
//         fetchSort("email", sortStates.email);
//       });
      
//   }
  
//   function fetchSort(type, state) {
//     fetch(`/api/v1/superadmin/manage-account/sort`, {
//       method: "PUT",
//       headers: {
//         "Content-Type": "application/json"
//       },
//       body: JSON.stringify({ sortType: type, state: state })
//     })
//     .then(response => response.text())
//     .then(html => {
//       tableData.innerHTML = html;
//       updateEventListeners(); 
//       applyArrowState(); 
//     }).catch(err => {
//       console.error(err);
//     });
//   }




// function applyArrowState() {
//     document.querySelectorAll(".material-symbols-outlined").forEach(arrow => {
//         arrow.classList.remove('rotated');
//     });
//     // Apply the rotated class based on the stored sort state
//     if (sortStates.full_name) {
//       document.querySelector(".sort_username .material-symbols-outlined").classList.add('rotated');
//       changeArrowToDefault("username")
//     }
//     if (sortStates.default) {
//       document.querySelector(".sort_id .material-symbols-outlined").classList.add('rotated');
//       changeArrowToDefault("default")
//     }
//     if (sortStates.grade) {
//       document.querySelector(".sort_email .material-symbols-outlined").classList.add('rotated');
//       changeArrowToDefault("email")
//     }
//     if (sortStates.score) {
//       document.querySelector(".sort_full_name .material-symbols-outlined").classList.add('rotated');
//       changeArrowToDefault("full_name")
//     }
//   }
enableFullScreenOnKeyPress();