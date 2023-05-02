
const fs = require('fs')
const chalk = require('chalk')

const notesList = () => {
    const data = loadNotes()
    if (data.length >0) {
        console.log(chalk.bold.yellow("Notes List: "));
    } else {
        console.log(chalk.bold.red("No notes were found"));
        return
    }
    data.forEach((note)=>console.log(note.title))
}

const readNote = (title) => {
    const data = loadNotes()
    if (data.length === 0) {
        console.log(chalk.red("Note doesn't exist"))
        return
    }

    const note = data.find((note) => {
        return note.title === title
    }
    )
    if (!note) {
        console.log(chalk.red("Note doesn't exist"))
        return
    }

    console.log(chalk.inverse.green.bold(note.title))
    console.log(note.body)

}

const removeNote = (title) => {
    const data = loadNotes()
    if (data.length === 0) {
        console.log(chalk.red("Note doesn't exist"))
        return
    }

    const updatedNotes = data.filter((note) => {
        return note.title !== title
    }
    )

    const dataJson = JSON.stringify(updatedNotes);

    fs.writeFileSync('notes.json', dataJson);
    if (data.length === updatedNotes.length) {
        console.log(chalk.red("Note doesn't exist"))
    } else {
        console.log(chalk.green("removed the note with the title: ", title))
    }

}

const addNote = (title, body) => {
    const data = loadNotes()
    
    debugger
    
    const duplicateNote = data.find((note) =>note.title === title)

    if (duplicateNote) {
        console.log(chalk.red("Note already exists. "), duplicateNote)
        return
    }

    data.push({ title: title, body: body });
    const dataJson = JSON.stringify(data)
    fs.writeFileSync('notes.json', dataJson);
    console.log(chalk.green('Added the title : ', title))
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJson = dataBuffer.toString()
        const data = JSON.parse(dataJson)
        return data
    }
    catch (e) {
        return []
    }
}

module.exports = {
    removeNote: removeNote,
    addNote: addNote,
    notesList: notesList,
    readNote: readNote
}