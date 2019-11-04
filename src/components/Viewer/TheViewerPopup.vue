<template>
  <div class="viewerPopup">
    <div class="viewerPopup__wrapper" @click="$emit('closePopup')">
      <img :src="currentPost.url" alt="">

    </div>
  </div>
</template>
<script>
  export default {
    props: {
      currentPost: Object,
    }


  }

</script>

<style lang="scss">
  .viewerPopup {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.698);
    width: 100%;
    height: 100%;
    font-size: 1.6rem;

    &__wrapper {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      width: 70rem;
      height: 35rem;
      background: #fff;
      padding: 1rem;
    }
  }

</style>
