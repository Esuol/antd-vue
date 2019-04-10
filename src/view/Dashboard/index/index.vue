<template>
  <div>{{ a }}</div>
</template>

<script>
export default {
  name: 'DashboardIndex',
  data () {
    return {
      a: 1
    }
  },
  created () {
    this.a = 2
  }
}
</script>

<style>

</style>
