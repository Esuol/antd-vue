<template>
  <div class="PageHeader">
    <a-layout-header class="Header">
      <a-icon
        class="trigger"
        :type="collapsed ? 'menu-unfold' : 'menu-fold'"
        @click="$emit('trigger', !collapsed)" />

      <div class="right">
        <a-dropdown>
          <div class="pointer">
            <a-avatar icon="user" />
            <span class="username">
              {{ userInfo.username }}
            </span>
          </div>
          <a-menu slot="overlay">
            <a-menu-item @click.native="logout">
              <span>退出登录</span>
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
      <span
        class="right , changeStyle"
        @click="showModal">更换主题</span>
    </a-layout-header>
    <breadcrumb />

    <div>
      <a-modal
        v-model="visible"
        :width="500"
        title="主题修改"
        ok-text="确认"
        cancel-text="重置主题"
        :body-style="{margin: ' 0 auto'}"
        @ok="hideModal"
        @cancel="cancelHide">
        <!-- <photo-shop @getColors="getColor" /> -->
        <color-theme :data-form="dataForm" />
      </a-modal>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Breadcrumb from './Breadcrumb'
import colorTheme from '@/components/colorTheme'

export default {
  name: 'PageHeader',
  components: {
    Breadcrumb,
    colorTheme
  },
  props: {
    collapsed: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      visible: false,
      colors: {},
      dataForm: [
        { name: '@primary-color', color: '#1890ff' },
        { name: '@link-color', color: '#1890ff' },
        { name: '@secondary-color', color: '#0000ff' },
        { name: '@text-color', color: '#1987a7' },
        { name: '@text-color-secondary', color: '#eb2f96' },
        { name: '@heading-color', color: '#fa8c16' },
        { name: '@layout-header-background', color: '#000' },
        { name: '@btn-primary-bg', color: '#397dcc' }
      ]
    }
  },
  computed: {
    ...mapState({
      userInfo: state => state.user.info
    })
  },
  created () {
    this.style = this.arrayToObj(this.dataForm)
    let vars = {}
    vars = Object.assign({}, this.style, JSON.parse(localStorage.getItem('app-theme')))
    window.less.modifyVars(vars)
  },
  methods: {
    logout () {
      this.$store.dispatch('user/logout')
    },
    showModal () {
      this.visible = true
    },
    hideModal () {
      this.visible = false
    },
    cancelHide () {
      localStorage.setItem('app-theme', '{}')
      this.visible = false
      window.less.modifyVars(this.arrayToObj(this.dataForm))
    },
    getColor (res) {
      this.colors = res
    },
    arrayToObj (arr) {
      let obj = {}
      for (let i = 0; i < arr.length; i++) {
        obj[arr[i].name] = arr[i].color
      }
      return obj
    }
  }
}
</script>

<style scoped>
.PageHeader .right {
  float: right;
  margin: 0 16px;
}

.PageHeader .username {
  float: right;
  max-width: 10em;
  padding: 0 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.PageHeader .pointer {
  cursor: pointer;
}

.PageHeader .Header {
  position: relative;
  background: #fff;
  padding: 0;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}

.trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

.trigger:hover {
  color: #1890ff;
}

.changeStyle {
  cursor: pointer;
}
</style>
