<template>
  <v-list class="pa-0">
    <v-subheader>
      <v-icon class="mr-3">account_circle</v-icon>
      {{ user ? user : generateMessage('boilerplate.unknown_user') }}
    </v-subheader>
    <v-divider></v-divider>
    <v-list-tile v-for="(item, index) in items" @click="item.click" ripple="ripple" rel="noopener" :key="index">
      <v-list-tile-action v-if="item.icon">
        <v-icon>{{ item.icon }}</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>{{ generateMessage(item.title) }}</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <v-divider></v-divider>
    <v-list-tile v-for="item in languages" :key="item.value" @click="setLanguage(item.value)">
      <v-list-tile-content>
        <v-list-tile-title>{{ item.label }}</v-list-tile-title>
      </v-list-tile-content>
      <v-list-tile-action>
        <v-avatar :tile="true" :size="24">
          <img :src="item.icon" alt="avatar" />
        </v-avatar>
      </v-list-tile-action>
    </v-list-tile>
  </v-list>
</template>

<script>
import { mapGetters } from 'vuex';
import { generateMessage } from '@/utils/i18n';

export default {
  name: 'c-setting-list',
  data: () => ({
    languages: [
      {
        value: 'en',
        label: 'English',
        icon: 'https://countryflags.io/us/flat/24.png',
      },
      {
        value: 'fr',
        label: 'Français',
        icon: 'https://countryflags.io/fr/flat/24.png',
      },
    ],
    items: [],
  }),
  created() {
    this.setItem();
  },
  computed: {
    authenticated: {
      get() {
        return this.isAuthenticated();
      },
      set(val) {
        const loginItem = this.items.find((obj) => obj.id === 'login');
        loginItem.title = val ? 'boilerplate.logout' : 'boilerplate.login';
        loginItem.click = val ? this.logout : this.login;
      },
    },
    ...mapGetters({ user: 'global/user' }),
    ...mapGetters({ darkThemeEnabled: 'boilerplate/darkThemeEnabled' }),
  },
  watch: {
    darkThemeEnabled(enabled) {
      const themeItem = this.items.find((obj) => obj.id === 'theme');
      themeItem.title = this.getThemeTitle(enabled);
    },
  },
  methods: {
    setItem() {
      this.items = [
        {
          id: 'login',
          icon: 'exit_to_app',
          href: '#',
          title: 'boilerplate.logout',
          click: this.logout,
        },
        {
          id: 'settings',
          icon: 'settings',
          href: '#',
          title: 'boilerplate.settings',
          click: (e) => {
            // eslint-disable-next-line
            console.log(e);
          },
        },
        {
          id: 'theme',
          icon: 'wb_sunny',
          href: '#',
          title: this.getThemeTitle(this.darkThemeEnabled),
          click: this.toggleDarkTheme,
        },
      ];
    },
    async isAuthenticated() {
      this.authenticated = await this.$auth.isAuthenticated();
    },
    toggleDarkTheme() {
      this.$store.dispatch('boilerplate/toggleDarkTheme');
    },
    async logout() {
      this.$store.dispatch('global/setUser', null);
      this.$store.dispatch('boilerplate/setAuthenticated', false);
      try {
        await this.$auth.logout();
        await this.isAuthenticated();
      } catch (error) {
        // logout function do 2 things sequencely
        // at first clearing localStorage and second destroying user session on server
        // if origin are not allowed cors error will be raised
        // this leads to clearing localStorage but not destroying session
        // to fix the issue origin most be declared on the trusted oring in okta org
        // this fix are juste for not blocking vue js app
        await this.isAuthenticated();
      }
    },
    async login() {
      this.$store.dispatch('boilerplate/setAuthenticated', true);
      await this.$auth.loginRedirect('/');
      await this.isAuthenticated();
    },
    setLanguage(language) {
      this.$store.dispatch('boilerplate/setLanguage', language);
    },
    getThemeTitle(darkThemeEnabled) {
      return darkThemeEnabled ? 'boilerplate.light' : 'boilerplate.dark';
    },
    generateMessage,
  },
};
</script>
