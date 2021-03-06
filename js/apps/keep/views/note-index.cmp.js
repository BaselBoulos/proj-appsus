import { eventBus } from '../../../services/event-bus.service.js'
import { msgService } from './../../../services/msg.service.js'
import { noteService } from '../services/note.service.js'
import noteList from './../cmps/note-list.cmp.js'
import noteAdd from './../cmps/note-add.cmp.js'
import noteFilter from './../cmps/note-filter.cmp.js'

export default {
    name: 'note-app',
    components: {
        noteList,
        noteAdd,
        noteFilter
    },
    template: `
        <section class="note-app">
            <note-filter @filterBy="setFilter" :notes="notes" />
            <div class="main-keep-container">
                <note-add :noteTypes="noteTypes" @noteSaved="addNote" />
                <note-list :noteTypes="noteTypes" :pinnedNotes="getPinnedNotes" :otherNotes="getOtherNotes"
                    @notePinned="pinNote"
                    @noteColored="colorNote"
                    @noteShare="shareNote"
                    @noteEdit="editNote"
                    @noteUpdateEdit="submitEdit"
                    @noteDuplicate="duplicateNote"
                    @noteRemove="removeNote"
                    @toggleTodo="todoToggle"
                    />
            </div> 
        </section>
    `,
    data() {
        return {
            notes: [],
            noteTypes: {
                text: {
                    icon: 'far fa-edit',
                    placeholder: 'What\'s on your mind...',
                    title: 'Text',
                    cmp: 'note-text'
                },
                todos: {
                    icon: 'fas fa-list-ul',
                    placeholder: 'Enter todos, comma separated...',
                    title: 'Todos',
                    cmp: 'note-todos'
                },
                img: {
                    icon: 'far fa-image',
                    placeholder: 'Enter an image URL...',
                    title: 'Image',
                    cmp: 'note-img'
                },
                vid: {
                    icon: 'fab fa-youtube',
                    placeholder: 'Enter a youtube URL...',
                    title: 'Video',
                    cmp: 'note-vid'
                }
            },
            filterBy: null,
            note: '',
            noteData: {
                title: null,
                txt: null
            }
        }
    },
    created() {
        this.loadNotes()
        if (this.$route.query.title) {
            this.note = noteService.getTemplateNote()
            this.noteData.title = this.$route.query.title
            this.noteData.txt = this.$route.query.body
            this.addNote(this.note, this.noteData)
            this.$router.push('/keep')
        }
    },
    methods: {
        loadNotes() {
            noteService.query()
                .then(notes => {
                    this.notes = notes
                })
        },
        addNote(noteTemplate, noteData) {
            noteService.addNote(noteTemplate, noteData)
                .then(note => {
                    this.notes = [note, ...this.notes]
                })
                .then(msgService.sendMsg('success', 'Note was successfully added.'))
                .catch(() => msgService.sendMsg('error', 'Invalid inputs, please try again.'))
        },
        pinNote(noteId) {
            const idx = this.notes.findIndex(note => note.id === noteId)
            this.notes[idx].isPinned = !this.notes[idx].isPinned
            noteService.pinNote(noteId)
                .then(this.loadNotes)
                .then(msgService.sendMsg('success', `Note was successfully ${this.notes[idx].isPinned ? 'pinned' : 'unpinned'}.`))
                .catch(() => msgService.sendMsg('error', 'Something went wrong, please try again.'))
        },
        colorNote(noteId, color) {
            const idx = this.notes.findIndex(note => note.id === noteId)
            this.notes[idx].style.backgroundColor = color
            noteService.colorNote(noteId, color)
        },
        shareNote(noteId) {
            const idx = this.notes.findIndex(note => note.id === noteId)
            const url = noteService.prepareParams(this.notes[idx])
            this.$router.push(url)
        },
        editNote(noteId) {
            const idx = this.notes.findIndex(note => note.id === noteId)
            this.notes[idx].isEditing = !this.notes[idx].isEditing
        },
        submitEdit(noteEdit) {
            noteService.editNote(noteEdit)
                .then(this.loadNotes)
                .then(msgService.sendMsg('success', 'Note was successfully edited.'))
                .catch(() => msgService.sendMsg('error', 'Something went wrong, please try again.'))
        },
        duplicateNote(noteId) {
            const idx = this.notes.findIndex(note => note.id === noteId)
            noteService.dupNote(this.notes[idx])
                .then(this.loadNotes)
                .then(msgService.sendMsg('success', 'Note was successfully duplicated.'))
                .catch(() => msgService.sendMsg('error', 'Something went wrong, please try again.'))
        },
        removeNote(noteId) {
            noteService.removeNote(noteId)
                .then(this.loadNotes)
                .then(msgService.sendMsg('success', 'Note was successfully removed.'))
                .catch(() => msgService.sendMsg('error', 'Something went wrong, please try again.'))
        },
        todoToggle(todo, note) {
            const idx = this.notes.findIndex(updatedNote => updatedNote.id === note.id)
            this.notes[idx].isDone = !this.notes[idx].isDone
            noteService.toggleTodo(todo, note)
                .then(this.loadNotes)
        },
        setFilter(filter) {
            this.filterBy = filter
        }
    },
    computed: {
        getPinnedNotes() {
            if (this.filterBy) {
                var { type } = this.filterBy
            }
            return this.notes.filter(note => {
                if (type !== 'all' && type) return (note.isPinned && note.type === type)
                else return note.isPinned
            })
        },
        getOtherNotes() {
            if (this.filterBy) {
                var { type } = this.filterBy
            }
            return this.notes.filter(note => {
                if (type !== 'all' && type) return (!note.isPinned && note.type === type)
                else return !note.isPinned
            })
        }
    }
}