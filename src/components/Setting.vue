<template>
  <div>
    <!-- Your template code here -->
  </div>
</template>

<script>
export default {
  name: "Setting",
  data() {
    return {
      // Your data properties here
    };
  },
  methods: {
    // Your methods here
  },
  mounted() {
    // Your mounted hook code here
  },
  activated() {
    // Your activated hook code here

    this.$store.commit("setSelectedMenu", "/setting");
  },
};
</script>

<style scoped>
/* Your component styles here */
</style>
