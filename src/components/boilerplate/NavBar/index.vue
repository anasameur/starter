<template>
  <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" color="primary" dark app height="58" fixed>
    <!-- hamburger icon for activing sidebar drawer -->
    <v-toolbar-side-icon @click.stop="toggleSideBar"></v-toolbar-side-icon>
    <v-spacer v-if="$vuetify.breakpoint.xs"></v-spacer>
    <!-- Application logo -->
    <!-- Small screen -->
    <v-toolbar-title class="ml-0 c-toolbar">
      <v-layout row justify-center v-if="$vuetify.breakpoint.xs">
        <v-flex xs3>
          <v-avatar tile>
            <img src="@/assets/logo.png" alt="Engie Cofely" class="c-img" />
          </v-avatar>
        </v-flex>
      </v-layout>
      <!-- Large screen -->
      <v-avatar tile v-else class="ml-2">
        <img src="@/assets/logo.png" alt="Engie Cofely" class="c-img" />
      </v-avatar>
    </v-toolbar-title>
    <!-- Search Bar -->
    <v-text-field
      flat
      solo-inverted
      prepend-icon="search"
      clearable
      :label="generateMessage('search')"
      class="hidden-xs-only mt-2 c-search"
      v-model.lazy="searchQuery"
    >
    </v-text-field>
    <v-spacer></v-spacer>
    <!-- Rigth menu for small screen-->
    <v-menu
      offset-y
      origin="center center"
      :nudge-bottom="10"
      transition="slide-y-transition"
      :min-width="180"
      v-if="$vuetify.breakpoint.xs"
    >
      <v-btn icon slot="activator">
        <v-icon>more_vert</v-icon>
      </v-btn>
      <c-setting-list></c-setting-list>
    </v-menu>
    <v-toolbar-items class="mr-0" v-if="!$vuetify.breakpoint.xs">
      <!-- Notifications menu -->
      <v-menu offset-y origin="center center" class="elelvation-1 c-button-menu" :nudge-bottom="14" transition="slide-y-transition">
        <v-btn flat class="c-button-toolbar" slot="activator">
          <v-badge color="red" overlap>
            <span slot="badge">3</span>
            <v-icon medium>notifications</v-icon>
          </v-badge>
        </v-btn>
        <c-notification-list></c-notification-list>
      </v-menu>
      <v-menu offset-y origin="center center" :nudge-bottom="10" transition="slide-y-transition" :min-width="58">
        <v-btn flat small class="c-button-toolbar" slot="activator">
          <v-avatar size="30px" color="grey lighten-4">
            <img src="@/assets/avatar.png" alt="Profil Setting" />
          </v-avatar>
        </v-btn>
        <c-setting-list></c-setting-list>
      </v-menu>
    </v-toolbar-items>
  </v-toolbar>
</template>

<script>
import CNotificationList from '@/components/widgets/NotificationList';
import CSettingList from '@/components/widgets/SettingList';
import { generateMessage } from '@/utils/i18n';

export default {
  name: 'c-toolbar',
  components: {
    CNotificationList,
    CSettingList,
  },
  data() {
    return {};
  },
  computed: {
    searchQuery: {
      get() {
        return this.$store.state.global.searchQuery;
      },
      set(value) {
        this.$store.dispatch('global/searchFor', value);
      },
    },
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('boilerplate/toggleSideBar');
    },
    generateMessage,
  },
};
</script>
<style scoped>
.c-toolbar {
  width: 233px; /* aside_width - toolbar_icon_width*/
  font-size: 16px;
  height: 100%;
  padding: 6px;
}
.c-img {
  height: 40px;
  width: 58px !important;
}
.c-search {
  min-width: 350px;
}
.c-button-toolbar {
  min-width: 65px !important;
}
/* On screens that are between 720 and 600px  */
@media screen and (min-width: 600px) and (max-width: 720px) {
  .c-search {
    min-width: 280px;
  }
}
/* On screens that are between 900 and 600px  */
@media screen and (min-width: 600px) and (max-width: 850px) {
  .c-toolbar {
    width: 95px;
  }
}
</style>
