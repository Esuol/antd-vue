<template>
  <div>
    <a-layout-sider
      v-if="isShowBigMenu"
      v-model="collapsed"
      class="SiderMenu"
      :trigger="null"
      collapsible>
      <div class="logo">
        <img
          src="../images/logo.png"
          alt="logo">
        <a-tooltip placement="rightTop">
          <template slot="title">
            <span>{{ VUE_APP_NAME }} {{ VUE_APP_ENV }}</span>
          </template>
          <span
            v-if="!collapsed"
            class="testOverflow">
            {{ VUE_APP_NAME }} {{ VUE_APP_ENV }}
          </span>
        </a-tooltip>
      </div>

      <a-menu
        :selected-keys="selectedKeys"
        :open-keys="openKeys"
        theme="dark"
        mode="inline"
        @openChange="openChange"
        @select="select">
        <template v-for="item in menuList">
          <template v-if="!item.hidden">
            <a-menu-item
              v-if="item.onePage"
              :key="item.children[0].name">
              <a-icon :type="item.children[0].meta.icon" />
              <span>{{ $t(item.children[0].meta.name) }}</span>
            </a-menu-item>

            <a-menu-item
              v-else-if="!item.children"
              :key="item.name">
              <a-icon :type="item.meta.icon" />
              <span>{{ $t(item.meta.name) }}</span>
            </a-menu-item>
            <sub-menu
              v-else
              :key="item.name"
              :menu-info="item" />
          </template>
        </template>
      </a-menu>
    </a-layout-sider>

    <div>
      <a-drawer
        title=""
        placement="left"
        :closable="false"
        :visible="$store.state.menu.showsmallMenu"
        @close="onClose">
        <div class="SiderMenus">
          <div class="logo">
            <img
              src="../images/logo.png"
              alt="logo">
            <a-tooltip placement="rightTop">
              <template slot="title">
                <span style="color: #ccc">{{ VUE_APP_NAME }} {{ VUE_APP_ENV }}</span>
              </template>
              <span
                v-if="!collapsed"
                style="color: #333;margin-top:5px"
                class="testOverflow">
                {{ VUE_APP_NAME }}
              </span>
            </a-tooltip>
          </div>
        </div>

        <a-menu
          style="width:245px"
          :selected-keys="selectedKeys"
          :open-keys="openKeys"
          mode="inline"
          @openChange="openChange"
          @select="select">
          <template v-for="item in menuList">
            <template v-if="!item.hidden">
              <a-menu-item
                v-if="item.onePage"
                :key="item.children[0].name">
                <a-icon :type="item.children[0].meta.icon" />
                <span>{{ $t(item.children[0].meta.name) }}</span>
              </a-menu-item>

              <a-menu-item
                v-else-if="!item.children"
                :key="item.name">
                <a-icon :type="item.meta.icon" />
                <span>{{ $t(item.meta.name) }}</span>
              </a-menu-item>
              <sub-menu
                v-else
                :key="item.name"
                :menu-info="item" />
            </template>
          </template>
        </a-menu>
        <a-icon
          v-if="$store.state.menu.showsmallMenu"
          class="icons-copy"
          :type="$store.state.menu.showsmallMenu ? 'close':'bars'"
          @click="hideSmall" />
      </a-drawer>
    </div>

    <div
      v-if="!$store.state.menu.showBigMenu">
      <a-icon
        class="icons"
        type="bars"
        @click="showSmall" />
    </div>
  </div>
</template>

<script>
import SubMenu from './SubMenu'

export default {
  name: 'SiderMenu',
  components: { SubMenu },
  props: {
    collapsed: {
      default: false,
      type: Boolean
    }
  },
  data () {
    return {
      VUE_APP_ENV: process.env.VUE_APP_ENV,
      VUE_APP_NAME: process.env.VUE_APP_NAME,
      menuList: [],
      openKeys: [this.$route.matched[0].name],
      rootSubmenuKeys: [],
      selectedKeys: [],
      subMenuCollapsed: true,
      currentClientWidth: document.body.clientWidth,
      isShowBigMenu: true
    }
  },
  watch: {
    $route ({ name }) {
      this.openChange([name.split('_')[0]])
      this.updateDefaultKeys()
    },
    currentClientWidth (newVal, oldVal) {
      this.modifyMenu()
    }
  },
  created () {
    this.initProject()
  },
  methods: {
    updateDefaultKeys () {
      let routeName = this.$route.meta.routeName
      this.selectedKeys = [routeName]
    },
    select ({ key }) {
      this.$router.push({ name: key })
    },
    openChange (menuItem) {
      this.openKeys = menuItem
    },
    initProject () {
      this.menuList = this.$router.options.routes
      this.updateDefaultKeys()
      let timer = null
      window.onresize = () => {
        if (timer) clearTimeout(this.timmer)

        timer = setTimeout(() => {
          this.currentClientWidth = document.body.clientWidth
        }, 1000)
      }
      this.modifyMenu()
    },
    modifyMenu () {
      if (this.currentClientWidth < 768) {
        this.isShowBigMenu = false
        this.$store.commit('menu/update', false)
      } else {
        this.$store.commit('menu/updateSmall', false)
        this.isShowBigMenu = true
        this.$store.commit('menu/update', true)
      }
    },
    onClose () {
      this.$store.commit('menu/updateSmall', false)
    },
    showSmall () {
      this.$store.commit('menu/updateSmall', true)
      this.$emit('moveRight')
    },
    hideSmall () {
      this.$store.commit('menu/updateSmall', false)
      this.$emit('moveLeft')
    }
  }
}

</script>

<style scoped>
.SiderMenu {
  height: 100vh;
}

.SiderMenu .logo {
  display: flex;
  justify-content: center;
  background-color: #002140;
  height: 64px;
  padding: 16px;
  color: #ffffff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.SiderMenus .logo {
  display: flex;
  justify-content: center;
  height: 64px;
  padding: 16px;
  color: #ffffff;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.SiderMenu .logo img {
  height: 100%;
}

.SiderMenus .logo img {
  height: 100%;
}

.SiderMenu .logo span {
  height: 100%;
  text-indent: 10px;
}

.SiderMenus .logo span {
  height: 100%;
  text-indent: 10px;
}

.SiderMenu .logo span {
  font-size: 20px;
}

.testOverflow {
  width: 10em;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.icons{
  position: fixed;
  top: 14px;
  left: 0px;
  width: 40px;
  height: 40px;
  padding-top: 12px;
  box-shadow: 0px 0px 10px 0 #999;
  z-index: 100;
}

.drawer {
  position: relative
}
.icons-copy{
  width: 40px;
  height: 40px;
  padding-top: 12px;
  z-index: 100;
  background: #fff;
  position: absolute;
  right: -40px;
  top:14px
}

</style>
