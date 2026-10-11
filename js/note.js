class Note {
    constructor(content, id = null, timestamp = null, ) {
        this.id = id ?? crypto.randomUUID();
        this.timestamp = timestamp ?? Date.now();
        this.content = content;
    }

    toReadElem() {
        let readElem = document.createElement("div");
        readElem.id = this.id;
        readElem.classList.add('note');
        readElem.textContent = this.content;

        return readElem;
        
    }

    updateContent(newContent) {
        this.content = newContent
        this.timestamp = Date.now()
    }

    toJSON() {
        return {
            id: this.id,
            timestamp: this.timestamp,
            content: this.content
        };
    }

    static fromJSON(jsonString) {
        const data = typeof jsonString === 'string' ? JSON.parse(jsonString) : jsonString
        return new Note(data.content, data.id, data.timestamp )
    }
}