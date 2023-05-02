const yargs = require('yargs')
const notes = require('./notes')

// Adding commands using Yargs, so as to call them from command line arguments

yargs.command({
    command: 'add',
    describer: 'Adding a note',
    builder: {
        title: {
            describe: 'Title of the note',
            type: 'String',
            demandOption: true,
        },
        body: {
            describe: 'body of the note',
            type: 'String',
            demandOption: true
        }

    },
    handler(argv) {
        notes.addNote(argv.title, argv.body)
    }
})

// Adding list command
yargs.command({
    command: 'list',
    describer: 'Lists all the notes',
    handler(){
        console.log('listing all the notes')
    },

})

// Adding Read command 
yargs.command({
    command: 'read',
    describer: 'read a note',
    handler() {
        console.log('reading the notes')
    },
})

yargs.command({
    command: 'remove',
    describer: 'remove a note',
    builder: {
        title: {
            describe: 'Title of the note',
            type: 'String',
            demandOption: true,
        },
    },

    handler(argv) {
        notes.removeNote(argv.title)
    }
})

yargs.command({
    command: 'list',
    describer: 'List of all the notes',

    handler() {
        notes.notesList()
    }
})

yargs.command({
    command: 'read',
    describer: 'read a note',
    builder: {
        title: {
            describe: 'Title of the note',
            type: 'string',
            demandOption: true,
        },
    },

    handler(argv) {
        notes.readNote(argv.title)
    }
})

yargs.parse();
// console.log(yargs.argv)