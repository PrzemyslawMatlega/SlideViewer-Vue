<template>
  <div>
    <div class="click" @click="getImgList"> CLICK ME</div>
  </div>
</template>
<script>
  import firebase from '../../myFireBase.js'

  export default {
    data() {
      return {
        storageRef: Function,
        imgsListToCompare: [],

      }
    },
    methods: {
      getAllImages() {

        const listRef = this.storageRef.child('slide_viewer_imgs/1.jpg');

        listRef.getDownloadURL().then(function (url) {
        }).catch(function (error) {
          switch (error.code) {
            case 'storage/object-not-found':
              break;

            case 'storage/unauthorized':
              break;

            case 'storage/canceled':
              break;

            case 'storage/unknown':
              break;
          }
        });
      },

      getImgList() {
        const listRef = this.storageRef.child('slide_viewer_imgs');
        const vm = this;

        listRef.listAll().then(function (res) {
          res.items.forEach(function (itemRef) {
            console.log(itemRef);

            vm.checkForNewImgs(itemRef)
          });
        }).catch(function (error) {
          console.log(error)
        });

      },
      checkForNewImgs(currentItem){
          // For a new and old value in watcher           
            if(!this.imgsListToCompare.includes(currentItem.location.path)){
              // const copiedArray = this.imgsListToCompare.slice();
              copiedArray.push(currentItem.location.path);
              // this.imgsListToCompare = copiedArray;
            }
      },
      
    },
    watch:{
      // imgsListToCompare(newList, oldList){
      //     console.log('new List -', newList , 'Old list', oldList);
      // }
    },
    created() {
      this.storageRef = firebase.storage().ref();
    }
  }

</script>
