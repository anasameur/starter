<template>
  <v-app id="container" :dark="darkThemeEnabled">
    <c-navigation-drawer></c-navigation-drawer>
    <c-toolbar></c-toolbar>
    <v-content>
      <v-container text-xs-center v-if="!authenticated">
        <v-layout align-center justify-center row wrap>
          <v-flex xs6>
            <v-alert :value="true" color="error" icon="warning" outline>
              {{ generateMessage('boilerplate.disconnected_message') }}
            </v-alert>
          </v-flex>
        </v-layout>
      </v-container>
      <router-view v-if="authenticated" />
    </v-content>
  </v-app>
</template>

<script>
import CNavigationDrawer from '@/components/boilerplate/SideBar';
import CToolbar from '@/components/boilerplate/NavBar';
import { mapGetters } from 'vuex';
import { generateMessage } from '@/utils/i18n';

export default {
  components: { CNavigationDrawer, CToolbar },
  data: () => ({}),
  async created() {
    this.$store.dispatch('boilerplate/initLocalPreference');

    try {
      const user = await this.$auth.getUser();
      this.$store.dispatch('global/setUser', user.name);
    } catch (error) {
      try {
        this.$router.replace({
          name: 'error',
          params: {
            errorCode: error.code ? error.code : JSON.parse(error.xhr.response).error,
            errorMessage: error.message ? error.message : JSON.parse(error.xhr.response).error_description,
          },
        });
      } catch (err) {
        this.$router.replace({
          name: 'error',
          params: {
            errorCode: 'Authentification error',
            errorMessage: 'Authentification error',
          },
        });
      }
    }
  },
  computed: {
    ...mapGetters({ darkThemeEnabled: 'boilerplate/darkThemeEnabled' }),
    ...mapGetters({ authenticated: 'boilerplate/authenticated' }),
  },
  methods: {
    generateMessage,
  },
};
</script>
