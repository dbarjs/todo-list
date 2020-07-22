<template>
  <v-app dark>
    <v-app-bar :clipped-left="clipped" fixed app elevation="2">
      <v-toolbar-title v-text="title" />
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleDarkTheme">
        <v-icon v-if="darkTheme">mdi-brightness-4</v-icon>
        <v-icon v-else>mdi-brightness-7</v-icon>
      </v-btn>
    </v-app-bar>
    <v-main>
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
import store from 'store2'
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      items: [
        {
          icon: 'mdi-apps',
          title: 'Welcome',
          to: '/',
        },
        {
          icon: 'mdi-chart-bubble',
          title: 'Inspire',
          to: '/inspire',
        },
      ],
      right: true,
      rightDrawer: false,
      title: 'To-do List',
      darkTheme: false,
    }
  },
  created() {
    this.darkTheme = store('@TodoList:dark') || false
    this.setDarkTheme(this.darkTheme)
    console.log(this.$vuetify.theme.themes)
  },
  methods: {
    setDarkTheme(state) {
      this.darkTheme = !!state
      this.$vuetify.theme.dark = !!state
      store('@TodoList:dark', !!state)
    },
    toggleDarkTheme() {
      this.setDarkTheme(!this.darkTheme)
    },
  },
}
</script>
