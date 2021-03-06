import notePreview from './note-preview.cmp.js'
import noteEdit from './note-edit.cmp.js'
import noteActions from './note-actions.cmp.js'

export default {
    name: 'note-list',
    props: ['pinnedNotes','otherNotes','noteTypes'],
    components: {
        notePreview,
        noteEdit,
        noteActions
    },
    template: `
    <section class="notes-list">
        <div v-if="pinnedNotes.length > 0" class="pinned-notes masonry">
            <h2 class="pinned-notes-header">Pinned notes</h2>
            <div v-for="(note, idx) in pinnedNotes" :class="{ pinned: note.isPinned }" class="note-card" :style="note.style">
                <div class="note-indicators">
                    <span class="note-type-indicator"><i :class="noteTypes[note.type].icon"></i></span>
                    <span class="pinned-note-pin"><i class="fas fa-thumbtack"></i></span>
                </div>
                <note-preview @toggleTodo="todoDone" :note="note" />
                <note-edit :note="note" v-if="note.isEditing" @noteSaved="noteSubmitEdit" />
                <note-actions :note="note"
                    @notePinned="notePin"
                    @noteColored="noteColor"
                    @noteShare="noteShare"
                    @noteEdit="noteEdit"
                    @noteDuplicate="noteDuplicate"
                    @noteRemove="noteRemove" 
                    />
            </div>
        </div>
        <div class="other-notes masonry">
        <h2 class="unpinned-notes-header">Other notes</h2>
            <div v-for="(note, idx) in otherNotes" class="note-card" :style="note.style">
                <div class="note-indicators">
                    <span class="note-type-indicator"><i :class="noteTypes[note.type].icon"></i></span>
                </div>
                <note-edit :note="note" v-if="note.isEditing" @noteSaved="noteSubmitEdit" />
                <note-preview @toggleTodo="todoDone" :note="note" />
                <note-actions :note="note"
                    @notePinned="notePin"
                    @noteColored="noteColor"
                    @noteShare="noteShare"
                    @noteEdit="noteEdit"
                    @noteDuplicate="noteDuplicate"
                    @noteRemove="noteRemove" 
                    />
            </div>
        </div>
    </section>
    `,
    methods: {
        notePin(noteId) {
            this.$emit('notePinned', noteId)
        },
        noteColor(noteId, color) {
            this.$emit('noteColored', noteId, color)    
        },
        noteShare(noteId) {
            this.$emit('noteShare', noteId)
        },
        noteEdit(noteId) {
            this.$emit('noteEdit', noteId)
        },
        noteSubmitEdit(newNote) {
            this.$emit('noteUpdateEdit', newNote)
        },
        noteDuplicate(noteId) {
            this.$emit('noteDuplicate', noteId)
        },
        noteRemove(noteId) {
            this.$emit('noteRemove', noteId)
        },
        todoDone(todo, note) {
            this.$emit('toggleTodo', todo, note)
        }
    },
}