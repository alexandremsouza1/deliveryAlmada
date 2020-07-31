<template>
  <div>
  <!-- debug -->
  </div>
</template>

<script>
export default {
  name: 'debug',
  props: [
    "item"
  ],
  data () {
    return {}
  },
  created: function() {
    console.log("debug", this.item);
    debugger
  }
}
</script>

