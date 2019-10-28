<template>
  <div id="app">
    <TheNavbar @switchPopup="isUploadPopupOn = !isUploadPopupOn" />

    <transition name="fade">
      <TheUploadPopup 
      v-if="isUploadPopupOn"
      @switchPopup="isUploadPopupOn = !isUploadPopupOn" />
    </transition>
  <keep-alive>
    <TheViewer/>
  </keep-alive>
  </div>
</template>

<script>
  import TheNavbar from './components/TheNavbar';
  import TheUploadPopup from './components/TheUploadPopup';
  import TheViewer from './components/Viewer/TheViewer'

  export default {
    name: 'app',
    data() {
      return {
        isUploadPopupOn: false,
      }
    },
    components: {
      TheNavbar,
      TheUploadPopup,
      TheViewer
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
