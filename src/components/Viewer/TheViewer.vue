<template>
  <div>
    <div class="click" @click="getPostsList"> CLICK ME</div>
    <div class="viewerGrid">
      <TheViewerPost v-for="(single, index) in allPosts" :key="single.name" :url="single.url"
        @click.native="renderPopup(single, index)" />
    </div>
    <template v-if="showPopup">
      <TheViewerPopup :currentPost="currentPost[0]"  @closePopup="showPopup  = !showPopup"/>
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
        showPopup: false,
        currentPost: [],
        allPosts: [],
        allPostsIndex: [],
        incomingPosts: [],


      }
    },
    methods: {
      getImage(newPosts) {
        newPosts.forEach(singlePost => {
          this.allPostsIndex.push(singlePost);

          const listRef = this.storageRef.child('slide_viewer_imgs/' + singlePost);
          listRef.getDownloadURL().then(url => this.allPosts.push({
              name : singlePost,
              url: url,
            }))
            .catch(error => {
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
        })
      },
      checkForUpdates() {
        // Check for new posts
        let newPosts = this.incomingPosts.filter(incomingPost => !this.allPostsIndex.includes(incomingPost))
        // this.allPosts.push(...newPosts);
        this.getImage(newPosts)


        // Check for deleted posts 
        let deletedPosts = this.allPosts.filter(deletedPost => !this.incomingPosts.includes(deletedPost))
        //to do    

        this.incomingPosts = []
        console.log(this.incomingPosts);
      },
      getPostsList() {
        this.$http.get('https://slideviewer-fd03d.firebaseio.com/imgList.json')
          .then(response => {
            return response.json();
          }).then(data => {

            // this.imagesList = data;
            const dataKeys = Object.keys(data);

            dataKeys.forEach(key => {
              this.incomingPosts.push(data[key].ID)
              //  this.getImage(data[key].ID)
            })

          }, error => {
            console.log(error)
          }).then(() => this.checkForUpdates())
      },

      renderPopup(singlePost, currentIndex) {
        console.log(singlePost, currentIndex);
        this.currentPost=[],
        this.currentPost.push(singlePost, currentIndex)
        this.showPopup = true;
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
    components: {
      TheViewerPost,
      TheViewerPopup,
    }
  }

</script>
