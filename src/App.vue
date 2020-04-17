<template>
  <router-view></router-view>
</template>

<script>
  export default {
    data() {
      const item = {
        date: '',
        name: '',
        address: ''
      };
      return {
        // tableData: Array(20).fill(item)
      }
    }
  };
</script>
