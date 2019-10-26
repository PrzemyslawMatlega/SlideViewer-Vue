<template>
  <div class="uploadPopup">
    <div class="uploadPopup__wrapper">

      <div class="uploadPopup__close" @click="$emit('switchPopup')">
        <img src="../assets/img/close.svg" alt="">
      </div>
      <form class="uploadForm" enctype="multipart/form-data">>
        <div class="uploadForm__fileName"><span>File Name:</span> {{fileName}}</div>
        <label for="uploadedFile" class="uploadForm__label"> Choose a file...</label>
        <input type="file" name="uploadedFile" id="uploadedFile" class="uploadForm__input" accept="image/*"
          @change="showFileName">
        <button type="submit" class="uploadForm__button" @click.prevent="uploadPickedFile">Upload!</button>

      </form>

    </div>
  </div>
</template>

<script>
  import firebase from '../myFireBase.js'
  
  export default {
    data() {
      return {
        fileName: 'File Name',
        fileToUpload : Object,
        
      }
    },
    methods: {
      showFileName(event) {
        this.fileName = event.target.value.split(/[\\\/]/g).pop();
        this.fileToUpload = event.target.files[0]
        
      },
      uploadPickedFile() {
        const uploadFirebase = firebase.storage().ref(`slide_viwer_imgs/${this.fileToUpload.name}`)
        uploadFirebase.put(this.fileToUpload)
        .then( (snapshot) => {
          console.log( snapshot)
        })
      } 
    },
  }

</script>

<style lang="scss">
  .uploadPopup {
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
      transform: translateY(-10rem);
      opacity: 0.1;
      animation-name: slidePopup;
      animation-duration: 0.5s;
      animation-fill-mode: forwards;
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

    .uploadForm {
      display: flex;
      flex-wrap: wrap;
      flex-direction: row;
      align-content: center;
      justify-content: center;
      width: 100%;
      height: 100%;

      &__fileName {
        flex-basis: 100%;
        text-align: center;
        margin: -4rem 20% 4rem;
        padding: 1rem;
        border-bottom: 1px solid #54a534;

        span {
          font-weight: bold;
          line-height: 1.5;
        }
      }

      &__label {
        @extend %buttonStyle;
      }

      &__button {
        @extend %buttonStyle;
      }

      &__input {

        width: 0.1px;
        height: 0.1px;
        opacity: 0;
        overflow: hidden;
        position: absolute;
        z-index: -1;

      }
    }
  }

  %buttonStyle {
    display: block;
    font-size: 2.5rem;
    color: #fff;
    padding: 1rem 3.5rem;
    background: #54a534;
    border: 2px solid #54a534;
    cursor: pointer;
    margin: 0 1rem;
    transition: 0.2s all ease-in-out;

    &:hover {
      border: 2px solid #39a80d;
      background: #39a80d;

    }
  }

  @keyframes slidePopup {

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

</style>
