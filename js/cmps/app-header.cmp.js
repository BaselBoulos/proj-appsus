export default {
  name: 'app-header',
  template: `
        <header>
          <div class="header-logo">
            <router-link @click.native="scrollToTop" to="/" >
                <img src="./assets/img/Appsus-logos_transparent.png" class="header-logo" alt="logo" title="Appsus"/>
            </router-link>
          </div>
          
            <!-- Replaced with simpler logo // can uncomment-->
            <!-- <div class="logo">
                <router-link @click.native="scrollToTop" to="/" class="logo-link">
                    <img :src="getHeaderLogo" @mouseleave="mouseLeave" @mouseover="mouseHover" alt="logo" />
                </router-link>
            </div> -->
            
            <nav :class="mobileMenuOpen" class="main-nav">
                <router-link class="nav-link" @click.native="scrollToTop" to='/' active-class="active-link" exact>Home</router-link>
                <router-link class="nav-link" @click.native="scrollToTop" to='/mail/inbox' active-class="active-link">Mail</router-link>
                <router-link class="nav-link" @click.native="scrollToTop" to='/keep' active-class="active-link">Keep</router-link>
                <router-link class="nav-link" @click.native="scrollToTop" to='/book' active-class="active-link">Books</router-link>
                <router-link class="nav-link" @click.native="scrollToTop" to='/about' active-class="active-link">About</router-link>
            </nav>
            <div v-if="windowWidth" :class="mobileMenuOpen" @click="openMenu" class="hamburger">
                <span class="bar"> </span>
                <span class="bar"> </span>
                <span class="bar"> </span>
            </div>
        </header>
    `,
  data() {
    return {
      windowWidth: window.innerWidth,
      toggleMobile: false,
      burgerOpen: false,
      mouseOver: false,
    }
  },
  mounted() {
    this.$nextTick(() => {
      window.addEventListener('onresize', this.onResize)
    })
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0)
      this.burgerOpen = false
    },
    onResize() {
      this.windowWidth = window.innerWidth
      this.toggleMobile = this.windowWidth < 761 ? true : false
    },
    openMenu() {
      this.burgerOpen = !this.burgerOpen
    },
    mouseHover() {
      this.mouseOver = true
    },
    mouseLeave() {
      this.mouseOver = false
    },
  },
  computed: {
    mobileMenuOpen() {
      return this.burgerOpen ? 'mobile-active' : ''
    },
    getHeaderLogo() {
      return this.mouseOver
        ? './assets/img/vuejs-color.svg'
        : './assets/img/vuejs-shadow.svg'
    },
  },
}
