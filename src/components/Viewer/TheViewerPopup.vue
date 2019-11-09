<template>
  <div class="viewerPopup">
    <div v-if="!(currentIndex =='First')" 
    class="viewerPopup__arrow viewerPopup__arrow--left"
     @click="$emit('changeSlide', -1)" >
     &lsaquo;</div>

   <transition name="fade" mode="out-in" :key="currentPost.name">

    <div class="viewerPopup__wrapper" >
      <div class="viewerPopup__img">
        <img :src="currentPost.url" alt="">
      </div>
      <div class="content">
        <div class="content__close" @click="$emit('closePopup')">
          <img src="../../assets/img/close.svg" alt="">
        </div>
      </div>
    </div>

   </transition>
    
    <div v-if="!(currentIndex =='Last')"
    class="viewerPopup__arrow viewerPopup__arrow--right" 
    @click="$emit('changeSlide', 1)">
    &rsaquo;</div>
  </div>

</template>
<script>
  export default {
    props: {
      currentPost: Object,
      currentIndex: String,
    },
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
      width: 110rem;
      height: 80rem;
      padding: 1rem;

      .content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 40%;
        padding: 1rem;
        background: #fff;

        &__close {
          align-self: flex-end;
          width: 3rem;
          height: 3rem;
          cursor: pointer;

          img {
            width: 100%;
            height: 100%;

          }
        }
      }

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }
    
    &__arrow{
      font-size: 15rem;
      padding: 4rem;
      color: rgba(255, 255, 255, 0.349);
      transition: 0.5s all ease;
      cursor: pointer;

      &:hover{
          color: rgba(255, 255, 255, 0.991);
      }

    }
    &__img {
      background: rgba(0, 0, 0, 0.733);
      width: 60%;
    }
  }

</style>
