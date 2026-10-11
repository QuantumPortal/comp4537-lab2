

const newNoteButton = document.getElementById("new-note");
const existingNoteDiv = document.getElementById("existing-notes");

newNoteButton.addEventListener("click", () => {
    createNote()
})

window.addEventListener('load', () => {
    const allNotes = Object.entries(localStorage);
    allNotes.forEach(([key, value]) => {
        createNote(Note.fromJSON(value))
    });


})

function createNote(newNote = null) {
    newNote ??= new Note("")
    if (!localStorage.getItem(newNote.id)) {
        localStorage.setItem(newNote.id, JSON.stringify(newNote))
    }

    let newNoteWriteElem = document.createElement("textarea");
    newNoteWriteElem.id = newNote.id;
    newNoteWriteElem.textContent = newNote.content;
    newNoteWriteElem.classList.add('note-textarea');
    newNoteWriteElem.style.resize = "none";

    let newNoteRemove = document.createElement("button")
    newNoteRemove.innerText = "remove"

    let newNoteDiv = document.createElement("div")
    newNoteDiv.style.order = -Math.floor(newNote.timestamp/1000)
    newNoteDiv.classList.add('note-div');
    newNoteDiv.appendChild(newNoteWriteElem);
    newNoteDiv.appendChild(newNoteRemove);
    

    existingNoteDiv.prepend(newNoteDiv);

    newNoteWriteElem.addEventListener('change', (event) => {
        newNote.updateContent(event.target.value);
        newNoteDiv.style.order = -Math.floor(newNote.timestamp/1000)
        localStorage.removeItem(newNote.id)
        localStorage.setItem(newNote.id, JSON.stringify(newNote))
    })

    newNoteRemove.addEventListener('click', () => {
        localStorage.removeItem(newNote.id)
        newNoteDiv.remove();
    })
}