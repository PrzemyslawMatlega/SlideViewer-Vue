<template>
  <div id="app">
    
    <router-view
     name="nav"
     :key="navKey"
     @logut="navKey = navKey++"
     @switchPopup="isUploadPopupOn = !isUploadPopupOn" 
     />

    <keep-alive>
      <router-view
        name="main"   
        :isUploadPopupOn="isUploadPopupOn"
        @closeUpload="isUploadPopupOn = false">
      
      </router-view>
    </keep-alive>


  </div>
</template>
<script>
  import TheNavbar from './components/TheNavbar';
  import TheViewer from './components/Viewer/TheViewer'
  import Login from './components/Login'

  export default {
    name: 'app',
    props:{
        navigation: Boolean
    },
    data() {
      return {
        isUploadPopupOn: false,
        navKey: 0,
      }
    },

    components: {
      TheNavbar,
      TheViewer,
      Login
    }
  }
</script>

<style lang="scss">
  html {

    font-size: 62.50%;

    * {
      box-sizing: border-box;
    }
  }

  body {
    padding: 0;
    margin: 0;
  }

  #app {
  font-family: 'Open Sans Condensed', sans-serif;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s;
  }

  .fade-enter,
  .fade-leave-to {
    opacity: 0;
  }
</style>
