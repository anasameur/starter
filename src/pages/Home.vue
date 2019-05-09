<template>
  <v-container text-xs-center>
    <v-layout align-center justify-center row wrap>
      <v-flex xs12>
        {{ generateMessage('home.main_message') }}
        <v-tooltip right>
          <v-btn slot="activator" icon large href="https://gitlab.engie-cofely.net/vuejs/app-starter/#app-starter" target="_blank">
            <v-icon large>code</v-icon>
          </v-btn>
          <span>{{ generateMessage('home.main_message') }}</span>
        </v-tooltip>
      </v-flex>
      <HelloWorld :message="helloWorldMessage"></HelloWorld>
    </v-layout>
  </v-container>
</template>

<script>
import HelloWorld from '@/components/HelloWorld';
import { generateMessage } from '@/utils/i18n';
import { mapGetters } from 'vuex';

export default {
  name: 'Home',
  components: { HelloWorld },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('global/initHelloWorldMessage');
  },
  computed: {
    ...mapGetters({ helloWorldMessage: 'global/helloWorldMessage' }),
  },
  methods: {
    generateMessage,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
