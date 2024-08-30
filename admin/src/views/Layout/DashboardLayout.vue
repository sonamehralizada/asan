<template>
  <div class="wrapper">
    <notifications></notifications>
    <div class="main-content">

      <div  @click="$sidebar.displaySidebar(false)">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <router-view></router-view>
        </fade-transition>
      </div>
      <!-- <content-footer v-if="!$route.meta.hideFooter"></content-footer> -->
    </div>
  </div>
</template>
<script>
  import PerfectScrollbar from 'perfect-scrollbar';
  import 'perfect-scrollbar/css/perfect-scrollbar.css';

  function hasElement(className) {
    return document.getElementsByClassName(className).length > 0;
  }

  function initScrollbar(className) {
    if (hasElement(className)) {
      new PerfectScrollbar(`.${className}`);
    } else {
      setTimeout(() => {
        initScrollbar(className);
      }, 100);
    }
  }

  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import DashboardContent from './Content.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      DashboardContent,
      FadeTransition
    },
    methods: {
      initScrollbar() {
        let isWindows = navigator.platform.startsWith('Win');
        if (isWindows) {
          initScrollbar('sidenav');
        }
      },
      logout(){
        this.clearCookie('authToken');
        this.$router.push('/asanlogin');
      },
      authValidation() {
        try {
          const expireDate = this.getCookie('tokenExpire');
          if (expireDate) {
            const tokenExpireDate = new Date(expireDate);
            const currentDate = new Date();

            if (tokenExpireDate < currentDate) {
              this.clearCookie('authToken');
              this.clearCookie('tokenExpire');
              this.$router.push('/asanlogin');
              console.log('Token has expired and cookies cleared.');
            } else {
              console.log('Token is still valid until:', tokenExpireDate);
            }
          } else {
            console.log('No expiration information found in cookies.');
            this.$router.push('/asanlogin');
          }
        } catch (error) {
          console.error('Error in authValidation:', error);
          this.clearCookie('authToken');
          this.clearCookie('tokenExpire');
          this.$router.push('/asanlogin');
        }
      },
      getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) {
          return parts.pop().split(';').shift();
        }
        return null;
      },

      setCookie(name, value, expires) {
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/`;
      },

      clearCookie(name) {
        document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/';
      },
      

    },
    mounted() {
      this.initScrollbar()
      this.authValidation();

    }
  };
</script>
<style lang="scss">


</style>
