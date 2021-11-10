import { noteService } from './../services/note.service.js'
import notePreview from './note-preview.cmp.js'

export default {
    name: 'note-list',
    props: ['notes'],
    components: {
        notePreview
    },
    template: `
    <section class="notes-list">
        <div v-for="note in notes" :key="note.id" class="note-card">
            <note-preview :note="note" @click.native="previewNote" />
            <div class="note-actions">
                <span @click="notePin(note.id); $emit('listChanged')">pin</span>
                <span @click="noteColorChange(note.id); $emit('listChanged')">color</span>
                <span @click="noteShare(note.id); $emit('listChanged')">share</span>
                <span @click="noteEdit(note.id); $emit('listChanged')">edit</span>
                <span @click="noteDuplicate(note.id); $emit('listChanged')">duplicate</span>
                <span @click="noteRemove(note.id)">remove</span>
            </div>
        </div>
    </section>
    `,
    methods: {
        notePin(noteId) {
            noteService.pinNote(noteId)
        },
        noteColorChange(noteId) {
            console.log('color' ,noteId)
        },
        noteShare(noteId) {
            console.log('share' , noteId)
        },
        noteEdit(noteId) {
            console.log('edit' ,noteId)
        },
        noteDuplicate(noteId) {
            console.log('duplicate',noteId)
        },
        noteRemove(noteId) {
            noteService.removeNote(noteId)
                .then(() => {
                    this.$emit('listChanged')
                    // flash-msg
                })
        },
        previewNote() {
            
        }
    },
}