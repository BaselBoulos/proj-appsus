export default {
    name: 'note-txt',
    props: ['info'],
    template: `
        <div>
            <h3 class="note-title">{{ info.title }}</h3>
            <p class="note-body">{{ info.txt }}</p>
        </div>
    `,
}