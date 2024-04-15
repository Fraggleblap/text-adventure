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

    for (let v = 0; v < 5; v++) {
        if (document.getElementById(`response` + v) !== null) {
            document.getElementById(`response` + v).remove()
        }
    }

    if (dialogue[tempPath].responses === undefined) {
        let goTo = dialogue[tempPath].goTo1
        if (dialogue[tempPath].needNote !== undefined && noteFound === true) {
            goTo = dialogue[tempPath].goTo2
        }
        addElement(`button`, `response1`, `Move on`, `textArea`, dialogue[tempPath], goTo)
    } else {
        if (dialogue[tempPath].getNote !== undefined) {
            noteFound = true;
            console.log("note found");
        }
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
    // create a new element
    const newEl = document.createElement(tag);
    newEl.id = id;
    newEl.class = "button"
    newEl.addEventListener("click", (e) => changeDial(goTo, path[id]));

    // and give it some content
    newEl.innerText = content;

    // add the newly created element and its content into the DOM
    const currentEl = document.getElementById(afterEl);
    currentEl.after(newEl);
}