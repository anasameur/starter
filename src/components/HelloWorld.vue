<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center> <b>HelloWorld API message:</b> {{ message }} </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    message: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
b {
  text-decoration: underline;
}
</style>
