
document.addEventListener("DOMContentLoaded", () => {
    console.log("Park Residence Loaded");

    const progress = document.querySelector(".progress-bar");
    const percent = document.getElementById("percent");

    let value = 35;

    if(progress){
        progress.style.width = value + "%";
    }

    if(percent){
        percent.innerText = value + "%";
    }
});
