let dialogue;

// Fetch json file which contains data for all dialogue and text and responses
function getDialogue() {
    fetch("./text.json")
    .then((res) => {
        if (!res.ok) {
            throw new Error
                (`HTTP error! Status: ${res.status}`);
        }
        return res.json();
    })
    .then((data) =>
        //dialogue = data)
       doSomething(data))
    .catch((error) =>
        console.error("Unable to fetch data:", error));

}
function doSomething(data) {
    dialogue = data;
}

document.addEventListener("DOMContentLoaded", () => {
    getDialogue();
    console.log(`test`)
});

function startAdventure() {
    let tempPath = `data1`;
    console.log("started")
    console.log(dialogue)
    console.log(dialogue[tempPath].text);

    let newElement = document.createElement(`p`)
    newElement.innerText = dialogue;
}