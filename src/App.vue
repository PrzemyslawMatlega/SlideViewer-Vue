<template>
  <div id="app">
    
    <router-view
     name="nav"
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
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
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
