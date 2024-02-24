import {getFullscreenElement, toggleFullscreen, enableFullScreenOnKeyPress } from "./lib/fullScreen.js"



const sortStates = {
    full_name: false,
    default: false,
    grade: false,
    score: false
  };
  function changeArrowToDefault(name) {
    Object.keys(sortStates).forEach((key) => {
      if (key !== name) {
        sortStates[key] = false;
      }
    });
  }
  
  function updateEventListeners() {
    // Re-select the elements in the DOM
    const toggleSortName = document.querySelector("#toggle-sort-name");
    const toggleSortId = document.querySelector("#toggle-sort-id");
    const toggleSortClass = document.querySelector("#toggle-sort-class");
    const toggleSortPi = document.querySelector("#toggle-sort-pi");
  
    toggleSortName.addEventListener("click", () => {
        changeArrowToDefault("full_name");
        sortStates.full_name = !sortStates.full_name;
        fetchSort("full_name", sortStates.full_name);
      });
      toggleSortId.addEventListener("click", () => {
        changeArrowToDefault("default");
        sortStates.default = !sortStates.default;
        fetchSort("default", sortStates.default);
      });
      toggleSortClass.addEventListener("click", () => {
        changeArrowToDefault("grade");
        sortStates.grade = !sortStates.grade;
        fetchSort("grade", sortStates.grade);
      });
      toggleSortPi.addEventListener("click", () => {
        changeArrowToDefault("score");
        sortStates.score = !sortStates.score;
        fetchSort("score", sortStates.score);
      });
  }
  
  function fetchSort(type, state) {
    fetch("/api/v1/teacher/leaderboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ sortType: type, state: state })
    })
    .then(response => response.text())
    .then(html => {
      document.querySelector(".table-section").innerHTML = html;
      updateEventListeners(); 
      applyArrowState(); 
    }).catch(err => {
      console.error(err);
    });
  }




function applyArrowState() {
    document.querySelectorAll(".material-symbols-outlined").forEach(arrow => {
        arrow.classList.remove('rotated');
    });
    // Apply the rotated class based on the stored sort state
    if (sortStates.full_name) {
      document.querySelector(".sort_name .material-symbols-outlined").classList.add('rotated');
      changeArrowToDefault("full_name")
    }
    if (sortStates.default) {
      document.querySelector(".sort_id .material-symbols-outlined").classList.add('rotated');
      changeArrowToDefault("default")
    }
    if (sortStates.grade) {
      document.querySelector(".sort_class .material-symbols-outlined").classList.add('rotated');
      changeArrowToDefault("grade")
    }
    if (sortStates.score) {
      document.querySelector(".sort_no__pi_correct .material-symbols-outlined").classList.add('rotated');
      changeArrowToDefault("score")
    }
  }

// Initial attachment of event listeners
updateEventListeners();
enableFullScreenOnKeyPress();