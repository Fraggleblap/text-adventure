const requestURL = `/text.json`;
const request = new Request(requestURL);

const response = await fetch(request);
const dialogue = await response.json();

document.addEventListener("DOMContentLoaded", () => {
    
    
function startAdventure() {
    document.getElementById("startButton")
    document.createElement("p").innerText = dialogue.text;
}

});