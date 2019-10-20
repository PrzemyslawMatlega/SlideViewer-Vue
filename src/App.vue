<template>
  <div id="app">
    <Navbar></Navbar>
  </div>
</template>

<script>
  import Navbar from './components/Navbar';

  export default {
    name: 'app',
    data() {
      return {

      }
    },
    components: {
      Navbar
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

</style>
