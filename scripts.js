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

function changeDial(tempPath) {
    if (document.getElementById(`startButton`) !== null) {
        document.getElementById(`startButton`).remove();
    }
    // console.log("started")
    // console.log(dialogue)
    // console.log(dialogue[tempPath].text);
    let goTo =  dialogue[tempPath].goTo;
    document.getElementById(`textArea`).innerText = dialogue[tempPath].text

    for (i = 1; i < dialogue[tempPath].responses+1; i++) {
        //console.log(dialogue[tempPath].responses)

        let choice = `response` + i + `Choice`;
        //console.log(choice);
        if (document.getElementById(`response` + i)) {
            document.getElementById(`response` + i).remove()
        }

        addElement(`button`, `response` + i, dialogue[tempPath][choice], `textArea`, goTo)
    }
}


function addElement(tag, id, content, afterEl, goTo) {
    // create a new div element
    const newDiv = document.createElement(tag);
    newDiv.id = id;
    newDiv.addEventListener("click", (e) => changeDial(goTo));

    // and give it some content
    //const newContent = document.createTextNode(content);
    newDiv.innerText = content;
    document.getElementById(`choiceBox`).innerText

    // add the text node to the newly created div
    //newDiv.appendChild(newContent);


    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById(afterEl);
    currentDiv.after(newDiv);
}