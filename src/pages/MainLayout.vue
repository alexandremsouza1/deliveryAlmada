<template>
    <q-layout style="position: inherit;min-height:100%">
     <q-page-container>
        <router-view :seller="this.$seller"></router-view>
     </q-page-container>
  </q-layout>
</template>

<script>

    export default {
      name: 'main',
      data () {
        return {
        }
      },
      created () {

      },
      computed: {

      }
    };
</script>


  