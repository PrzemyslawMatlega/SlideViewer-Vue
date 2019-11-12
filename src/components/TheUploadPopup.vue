<template>
  <div class="uploadPopup">
    <div class="uploadPopup__wrapper">

      <div class="uploadPopup__close" @click="$emit('switchPopup')">
        <img src="../assets/img/close.svg" alt="">
      </div>

      <form class="uploadForm" enctype="multipart/form-data">
        <div class="uploadForm__fileName">
          <span>File Name:</span> {{fileName}}
        </div>

        <label for="uploadedFile" class="uploadForm__label" 
          :class="{ buttonInactive : submitInactive }"> Choose a file...</label>

        <input type="file" name="uploadedFile" id="uploadedFile" class="uploadForm__input" accept="image/*"
          @change="showFileName" 
          :disabled="submitInactive">

        <button type="submit" class="uploadForm__button" 
          :class="{ buttonInactive : submitInactive }"
          @click.prevent="uploadPickedFile" 
          :disabled="submitInactive">
          Upload!</button>

        <div class="uploadForm__status" 
          :class="fileStatusClass">

          <transition name="fade" mode="out-in">
            <span :key="fileStatus">
              {{fileStatusComp}}
            </span>
          </transition>

        </div>

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
        fileToUpload: false,
        fileStatus: '',
        fileStatusClass: '',
        submitInactive: false,

      }
    },
    methods: {
      showFileName(event) {
        this.fileName = event.target.value.split(/[\\\/]/g).pop();
        this.fileToUpload = event.target.files[0]
      },
      uploadList(uniqueId) {
        this.$http.post('https://slideviewer-fd03d.firebaseio.com/imgList/1.json', {ID: uniqueId} )
          .then(response =>{
            console.log(response);

          },error =>{
            console.log(error);
          })

      },
      uploadPickedFile() {

        if (this.fileToUpload) {

          let uniqueId = '_' + Math.random().toString(36).substr(2, 9);
          const uploadFirebase = firebase.storage().ref(`slide_viewer_imgs/${uniqueId}`)
          const uploadTask = uploadFirebase.put(this.fileToUpload);
          const vm = this;

          uploadTask.on('state_changed',

            function progress(snapshot) {
              console.log(snapshot)
              vm.fileStatus = 'uploading'
            },
            function error(err) {
              console.log('error')
              vm.fileStatus = 'error'
            },
            function complete() {
              vm.fileStatus = 'uploaded'
              vm.uploadList(uniqueId)
            }
          )

        } else {
          this.fileStatus = 'notPicked'
        }

      },

    },
    computed: {
      fileStatusComp() {
        switch (this.fileStatus) {
          case 'notPicked':
            this.fileStatusClass = 'uploadForm__status--notPicked'
            return 'Please pick a file...'
          case 'uploading':
            this.fileStatusClass = 'uploadForm__status--uploading'
            this.submitInactive = true
            return 'File is uploading...'
          case 'uploaded':
            this.submitInactive = false
            this.fileStatusClass = 'uploadForm__status--uploaded'
            return 'File has been uploaded!'
          case 'error':
            this.fileStatusClass = 'uploadForm__status--error'
            return 'Something wents wrong :('
        }
      }
    }
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

      &__status {
        flex-basis: 100%;
        position: relative;
        bottom: -4rem;
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
        min-height: 2.2rem;

        &--notPicked {
          color: rgb(255, 145, 0);
        }

        &--uploading {
          color: rgb(30, 139, 202);
        }

        &--error {
          color: rgb(199, 39, 39);
        }

        &--uploaded {
          color: rgb(25, 206, 25);
        }
      }

      .buttonInactive {
        background: rgba(195, 195, 195, 0.643);
        border: 1px solid rgba(195, 195, 195, 0.643);

        &:hover {
          background: rgba(95, 95, 95, 0.643);
          border: 1px solid rgba(95, 95, 95, 0.643);
        }
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

  @keyframes statusAnimation {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }

  @keyframes slidePopup {

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }

</style>
