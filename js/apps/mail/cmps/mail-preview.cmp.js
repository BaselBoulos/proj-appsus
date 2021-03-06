import longText from '../../../cmps/long-txt.cmp.js'

export default {
  name: 'mail-preview',
  props: ['mail'],
  components: {
    longText,
  },
  template: `
        <section class="mail-container" :class="isReadBgc" @click="read(mail.id)" >
          <div class="mail-content">
            <span class="mail-star" :class="colorStar" @click.stop.prevent="toggleStar(mail.id)"> 
              </span>
              <span class="mail-from">{{mail.from}}</span>
              <long-text class="mail-subject capitalize" v-bind:txt="mail.subject" /> 
            </div>
            <span class="mail-timestamp">{{timeToShow}}</span>
            <section class="mail-actions">
            <span @click.stop.prevent="toggleRead(mail.id)">
                <i :class="toggleEnvelope" class="envelope-icon"></i>
              </span>
          </section>
      </section>
  `,

  methods: {
    read(mailId) {
      this.$emit('read-mail', mailId)
    },
    toggleStar(mailId) {
      this.$emit('toggle-star', mailId)
    },
    toggleRead(mailId) {
      this.$emit('toggle-read', mailId)
    },
  },
  computed: {
    isReadBgc() {
      return this.mail.isRead ? 'mail-read ' : 'mail-unread'
    },
    colorStar() {
      return this.mail.isStarred ? 'fa fa-star checked' : 'far fa-star'
    },
    toggleEnvelope() {
      return this.mail.isRead ? 'fas fa-envelope-open' : 'fas fa-envelope'
    },
    timeToShow() {
      return this.mail.updatedAt
    },
  },
}
