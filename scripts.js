let dialogue;

let noteFound = false;

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

function changeDial(tempPath, previousResponse, image) {
    if (document.getElementById(`startButton`) !== null) {
        document.getElementById(`startButton`).remove();
    }

    // console.log("started")
    // console.log(dialogue)
    // console.log(dialogue[tempPath].text);

    document.getElementById(`textArea`).innerText = dialogue[tempPath].text

    if (image !== undefined) { // if image exists, add styling to image element and set it's src
        document.getElementById(`imageBox`).style = `   display: flex;
        justify-content: center;
        align-self: center;
        width: 50%;
        border-radius: 3px;
        border-color: blueviolet;
        border-style: solid;
        margin-bottom: 2%`

        document.getElementById(`imageBox`).src = `/images/`+image+`.png`
    } else { // otherwise remove styling so there is no random purple bar
        document.getElementById(`imageBox`).style = ``
    }
    if (previousResponse !== undefined) { // set the previous text into a text area so the player can see their previous decision
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
        if (dialogue[tempPath].getNote !== undefined) { // check if player found the note in the cabinet earlier
            noteFound = true;
        }
        for (i = 1; i < dialogue[tempPath].responses + 1; i++) {
            //console.log(dialogue[tempPath].responses)
            let goTo = `goTo` + i;
            goTo = dialogue[tempPath][goTo];
            let img = `image` + i;
            if (i === 2 && goTo === undefined) { // if there is no 2nd navigation variable, default to the first
                goTo = dialogue[tempPath].goTo1
            }

            let choice = `response` + i + `Choice`;
            //console.log(choice);
            addElement(`button`, `response` + i, dialogue[tempPath][choice], `textArea`, dialogue[tempPath], goTo, img)
        }
    }
}


function addElement(tag, id, content, afterEl, path, goTo, img) {
    // create a new element
    const newEl = document.createElement(tag);
    newEl.id = id;
    newEl.class = "button"
    newEl.value = img
    newEl.addEventListener("click", (e) => changeDial(goTo, path[id], path[img]));

    // and give it some content
    newEl.innerText = content;

    // add the newly created element and its content into the DOM
    const currentEl = document.getElementById(afterEl);
    currentEl.after(newEl);
}