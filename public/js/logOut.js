const logOut = document.querySelector("#log-out");
const userRole = document.querySelector(".user-role").value;
console.log(userRole)
logOut.addEventListener("click", () => {
    fetch(`/api/v1/${userRole}/log-out`, {method: "DELETE"})
    .then(response => {
        if (response.redirected) {
            window.location.href = response.url; 
            } else if (!response.ok) {
            throw new Error('Network response was not ok');
            }
                      
        })
                
    .catch(err => console.error("Error:", err));
            
})