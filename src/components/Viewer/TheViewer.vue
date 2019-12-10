<template>
  <div>
  
    <TheViewerGrid 
      :allPosts="allPosts"
      @hasPicked="updateIndex"
      @getPostsList="getPostsList"
    />

    <transition name="fade">
        <TheViewerPopup 
        v-if="showPopup"
        :currentPost="allPosts[currentIndex]" 
        :currentIndex="currentIndexValidation"
        @closePopup="showPopup  = !showPopup" 
        @changeSlide="currentIndex += $event"
        @delateCurentPost="delateCurentPost" />
    </transition>

    <router-view>
    <transition name="fade">
      <TheViewerUpload 
        v-if="isUploadPopupOn"
        @switchPopup="$emit('closeUpload')" />
    </transition>

    </router-view>


  </div>
</template>
<script>
  import firebase from '../../myFireBase.js'
  import TheViewerGrid from './TheViewerGrid'
  import TheViewerPopup from './TheViewerPopup'
  import TheViewerUpload from './TheViewerUpload'
 
  export default {
    props:{
      isUploadPopupOn: Boolean,
    },
    data() {
      return {
        storageRef: Function,
        showPopup: false,
        allPosts: [],
        currentIndex: 0,
        allPostsNameList: [],
      }
    },
    methods: {
      delateCurentPost() {
    
        //1. Delate post from list on database
        const postToDelete = this.allPosts[this.currentIndex].name;
        firebase.database().ref(`/posts/${postToDelete}`).remove()

        //2. Delete img from storage
        this.storageRef.child(`slide_viewer_imgs/${postToDelete}`).delete().then().catch(error => console.log(error))
      
        //3. Delete from current view and change for next
        this.showPopup = false;
        this.allPosts.splice(this.currentIndex, 1)

        if(this.allPosts.length >0){
          if(this.currentIndex != 0){
            this.currentIndex = this.currentIndex -1 
          }
          this.showPopup = true;
        }


      },
      getImage(newPosts) {
    
        newPosts.forEach(singlePost => {

          this.allPostsNameList.push(singlePost.imgName);
          const listRef = this.storageRef.child('slide_viewer_imgs/' + singlePost.imgName);
          
          listRef.getDownloadURL().then(url => this.allPosts.push({
              ...singlePost,
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
      checkForUpdates(incomingPosts) {
        // Check for new posts
        let newPosts = incomingPosts.filter( incomingPost => !this.allPostsNameList.includes(incomingPost.imgName))
        this.getImage(newPosts)

        // Check for delated posts 
        let delatedPosts = this.allPosts.filter(delatedPost => !incomingPosts.includes(delatedPost))
        //to do    

        this.incomingPosts = []

      },
      getPostsList() {
        firebase.database().ref('/posts/').once('value').then((snapshot) => {
          const postsFromDB = snapshot.val();
          const incomingPosts = [];

          for (const item in postsFromDB){
              incomingPosts.push(postsFromDB[item])
          }

          this.checkForUpdates(incomingPosts);
        }, (error) => console.log(error))

      },
      updateIndex(index){
        this.currentIndex = index;
        this.showPopup = true;
      }

    },

    computed: {
      currentIndexValidation() {
        if (this.currentIndex == 0) {
          return 'First'
        } else if (this.currentIndex == (this.allPosts.length - 1)) {
          return 'Last'
        } else {
          return 'Middle'
        }
      }
    },

    created() {
      this.storageRef = firebase.storage().ref();
    },

    components: {
      TheViewerUpload,
      TheViewerPopup,
      TheViewerGrid,
      
    }
  }

</script>


<style lang="scss">
  .viewerGrid {
    width: 70%;
    margin: 5rem auto;
    display: grid;
    grid-template-columns: repeat(3, 30rem);
    grid-auto-rows: 30rem;
    grid-column-gap: 4rem;
    grid-row-gap: 4rem;

  }

</style>
