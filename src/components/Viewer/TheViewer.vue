<template>
  <div>
    <div class="click" @click="getImagesList"> CLICK ME</div>
    <div class="viewerGrid">
      <TheViewerPost 
      v-for="(single) in images" :key="single.name" 
      :url="single.url"
       @click.native="renderPopup(single)"/>
    </div>
    <template v-if="showPoupup">
      <TheViewerPopup />
   
    </template>
  </div>
</template>
<script>
  import firebase from '../../myFireBase.js'
  import TheViewerPost from './TheViewerPost'
  import TheViewerPopup from './TheViewerPopup'

  export default {
    data() {
      return {
        storageRef: Function,
        showPoupup: false,
        imagesList: [],
        images: [],
        
      }
    },
    methods: {
      getImage(name) {
        
        const listRef = this.storageRef.child('slide_viewer_imgs/'+ name);
        listRef.getDownloadURL().then( url => this.images.push({name, url}))
        .catch( error => {
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
      getImagesList() {
        this.$http.get('https://slideviewer-fd03d.firebaseio.com/imgList.json')
          .then(response => {
            return response.json();
          }).then(data => {

            this.imagesList = data;
            const dataKeys = Object.keys(data);

            dataKeys.forEach(key =>{
               this.getImage(data[key].ID)
            })

          }, error => {
            console.log(error)
          })
      },
      renderPopup(singlePost){
        console.log(singlePost)
      }


      // getImgList() {
      //   const listRef = this.storageRef.child('slide_viewer_imgs');
      //   const vm = this;

      //   listRef.listAll().then(function (res) {
      //     res.items.forEach(function (itemRef) {
      //       console.log(itemRef);

      //       vm.checkForNewImgs(itemRef)
      //     });
      //   }).catch(function (error) {
      //     console.log(error)
      //   });

      // },
      // checkForNewImgs(currentItem){
      //     // For a new and old value in watcher           
      //       if(!this.imgsListToCompare.includes(currentItem.location.path)){
      //         // const copiedArray = this.imgsListToCompare.slice();
      //         copiedArray.push(currentItem.location.path);
      //         // this.imgsListToCompare = copiedArray;
      //       }
      // },

    },
    watch: {
      // imgsListToCompare(newList, oldList){
      //     console.log('new List -', newList , 'Old list', oldList);
      // }
    },
    created() {
      this.storageRef = firebase.storage().ref();
    },
    components:{
      TheViewerPost,
      TheViewerPopup,
    }
  }

</script>
