let dialogue;

let noteFound = false;  // STILL NEED TO IMPLEMENT

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

function changeDial(tempPath, previousResponse) {
    if (document.getElementById(`startButton`) !== null) {
        document.getElementById(`startButton`).remove();
    }
    // console.log("started")
    // console.log(dialogue)
    // console.log(dialogue[tempPath].text);

    document.getElementById(`textArea`).innerText = dialogue[tempPath].text


    if (previousResponse !== undefined) {
        document.getElementById(`choiceBox`).innerText = previousResponse
    }

    for (let v = 0; v < 4; v++) {
        if (document.getElementById(`response` + v) !== null) {
            document.getElementById(`response` + v).remove()
        }
    }

    if (dialogue[tempPath].responses === undefined) {
        let goTo = dialogue[tempPath].goTo1
        addElement(`button`, `response1`, `Move on`, `textArea`, dialogue[tempPath], goTo)
    } else {
        for (i = 1; i < dialogue[tempPath].responses + 1; i++) {
            //console.log(dialogue[tempPath].responses)
            let goTo = `goTo` + i;
            console.log(goTo);
            goTo = dialogue[tempPath][goTo];
            console.log(goTo);
            if (i === 2 && goTo === undefined) {
                goTo = dialogue[tempPath].goTo1
            }

            let choice = `response` + i + `Choice`;
            //console.log(choice);
            addElement(`button`, `response` + i, dialogue[tempPath][choice], `textArea`, dialogue[tempPath], goTo)
        }
    }
}


function addElement(tag, id, content, afterEl, path, goTo) {
    // create a new div element
    const newDiv = document.createElement(tag);
    newDiv.id = id;
    newDiv.class = "button"
    newDiv.addEventListener("click", (e) => changeDial(goTo, path[id]));

    // and give it some content
    //const newContent = document.createTextNode(content);
    newDiv.innerText = content;

    // add the text node to the newly created div
    //newDiv.appendChild(newContent);


    // add the newly created element and its content into the DOM
    const currentDiv = document.getElementById(afterEl);
    currentDiv.after(newDiv);
}