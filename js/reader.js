

const existingNoteDiv = document.getElementById("existing-notes");

function createNote(newNote) {
    let newNoteWriteElem = document.createElement("textarea");
    newNoteWriteElem.id = newNote.id;
    newNoteWriteElem.textContent = newNote.content;
    newNoteWriteElem.classList.add('note-textarea');
    newNoteWriteElem.style.resize = "none";

    let newNoteDiv = document.createElement("div")
    newNoteDiv.style.order = -Math.floor(newNote.timestamp/1000)
    newNoteDiv.classList.add('note-div');
    newNoteDiv.appendChild(newNoteWriteElem);
    

    existingNoteDiv.prepend(newNoteDiv);
}

window.addEventListener('load', () => {
    
    loadNotes();
})

window.addEventListener('storage', (event) => {
    existingNoteDiv.replaceChildren();
    loadNotes();
});

function loadNotes() {
    const allNotes = Object.entries(localStorage);

    console.log(allNotes)
    allNotes.forEach(([key, value]) => {
        console.log(value)
        createNote(Note.fromJSON(value))
    });
}