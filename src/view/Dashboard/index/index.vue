<template>
  <div>
    {{ a }}
    <div>
      <a-button
        type="primary"
        @click="clearToken">
        清除token信息
      </a-button>
      <a-button
        type="primary"
        @click="logout">
        登出
      </a-button>
    </div>
  </div>
</template>

<script>
import { clearToken } from '../../../utils/token'

export default {
  name: 'DashboardIndex',
  data () {
    return {
      a: 1
    }
  },
  created () {
    this.a = 2
  },
  methods: {
    clearToken () {
      clearToken()
    },
    logout () {
      this.$store.dispatch('user/logout')
    }
  }
}
</script>

<style>

</style>
