<template>
  <div class="viewerPopup">
    <div class="arrow-box">
      <div v-show="!(currentIndex =='First')" class="viewerPopup__arrow viewerPopup__arrow--left"
        @click="$emit('changeSlide', -1)">
        &lsaquo;</div>
    </div>

    <transition name="fade" mode="out-in">

      <div class="viewerPopup__wrapper" :key="currentPost.name">
        <div class="viewerPopup__img">
          <img :src="currentPost.url" alt="">
        </div>

        <div class="content">
          <div class="content__close" @click="$emit('closePopup')">
            <img src="../../assets/img/close.svg" alt="">
          </div>
          <div class="content__info">
            <span class="content__author">Author</span>
            <span class="content__email">{{currentPost.author}}</span>
          </div>
          <div class="content__removeBtn" @click="$emit('delateCurentPost')">
            <p>delate this post</p>
          </div>

          <div class="comments">
            <div class="comments__box">

            </div>
          
              <textarea cols="30" rows="4" class="comments__input"></textarea>
              <div class="comments__send">Add posts </div>

         
          </div>

        </div>
      </div>

    </transition>

    <div class="arrow-box">
      <div v-show="!(currentIndex =='Last')" class="viewerPopup__arrow viewerPopup__arrow--right"
        @click="$emit('changeSlide', 1)">
        &rsaquo;
      </div>
    </div>
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
    display: grid;
    grid-template-columns: 1fr auto 1fr;
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

    .arrow-box {
      min-width: 140px;
    }

    &__wrapper {
      display: flex;
      width: 95rem;
      height: 65rem;
      padding: 1rem;

      .content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        width: 40%;
        padding: 1rem;
        background: #fff;

        &__email {
          display: block;
          width: 100%;
          text-align: center;
          letter-spacing: 0.2rem;
          font-size: 2rem;
          text-transform: uppercase;
          margin: 0.5rem 0 2rem;
        }

        &__author {
          display: block;
          width: 100%;
          text-align: center;
          letter-spacing: 0.8rem;
          font-size: 1.6rem;
          margin-top: 1rem;
          text-transform: uppercase;
        }

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

        &__removeBtn {
          text-align: center;
          border: 1px solid black;
          cursor: pointer;
          background: #f1f1f1;
        }
      }

      .comments {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        &__box{
          flex-grow: 1;
          border: 1px solid #cecece;
          margin: 1rem 0;
        }
        &__input{
          width: 100%;
          border: 1px solid #8a8787;
          resize: none;
          font-family: Roboto;
          font-size: 16px;
          letter-spacing: 1px;
          line-height: 20px;
        }
        &__send{
          align-self: flex-end;
          margin: 1.5rem 0;
          width: 15rem;
          text-transform: uppercase;
          text-align: center;
          padding: 0.4rem;
          border: 2px solid rgb(11, 122, 26);
          cursor: pointer;
        }

      }



      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    &__arrow {
      font-size: 15rem;
      padding: 4rem;
      color: rgba(255, 255, 255, 0.349);
      transition: 0.5s all ease;
      cursor: pointer;

      &:hover {
        color: rgba(255, 255, 255, 0.991);
      }

    }

    &__img {
      background: rgba(0, 0, 0, 0.733);
      width: 60%;
    }
  }

</style>
