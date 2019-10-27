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
        imgsList: [],

      }
    },
    methods: {
      getAllImages() {

        const listRef = this.storageRef.child('slide_viewer_imgs/1.jpg');
        listRef.getDownloadURL().then(function (url) {
          console.log(url);
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
        const that = this;

        listRef.listAll().then(function (res) {
          res.prefixes.forEach(function (folderRef) {
            //   console.log(folderRef)
          });
          res.items.forEach(function (itemRef) {
           that.imgsList.push(itemRef.location.path)
           console.log(that.imgsList);
          });
        }).catch(function (error) {
          // Uh-oh, an error occurred!
          console.log(error)
        });


      },
    },
      created() {
        this.storageRef = firebase.storage().ref();
      }
    }

</script>
