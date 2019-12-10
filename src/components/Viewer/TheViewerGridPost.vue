<template>
  <div class="viewerGrid__thumbnail">
    <img :src="url" alt="">
  </div>
</template>

<script>
  export default {
    props: {
      url: String,
    }

  }

</script>

<style lang="scss">
  .viewerGrid__thumbnail {

    border: 1px solid black;
    cursor: pointer;
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    transition: all 0.3s cubic-bezier(.25, .8, .25, 1);

    &:hover {
      box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
    }
  }

</style>
