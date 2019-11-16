<template>
  <div>
    <div class="click" style="cursor:pointer" @click="getPostsList">
      <h1>CLICK ME</h1>
    </div>
    <div class="viewerGrid">

      <TheViewerPost v-for="(single, index) in allPosts" :key="single.name" :url="single.url"
        @click.native="currentIndex = index; showPopup = !showPopup" />
    </div>

    <transition name="fade">
      <template v-if="showPopup">
        <TheViewerPopup :currentPost="allPosts[currentIndex]" :currentIndex="currentIndexValidation"
          @closePopup="showPopup  = !showPopup" @changeSlide="currentIndex += $event"
          @delateCurentPost="delateCurentPost" />
      </template>
    </transition>

  </div>
</template>
<script>
  import firebase from '../../myFireBase.js'
  import TheViewerPost from './TheViewerPost'
  import TheViewerPopup from './TheViewerPopup'
  import {
    error
  } from 'util'

  export default {
    data() {
      return {
        storageRef: Function,
        showPopup: false,
        incomingPosts: [],
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

        // if(this.allPosts.length == 1){
        //   this.showPopup = false;
        //   this.allPosts.splice(this.currentIndex, 1)
        // }
        // else{
        //   if(this.currentIndex == 0){
       
        //       this.showPopup = false;
        //       this.allPosts.splice((this.currentIndex), 1)
        //       this.showPopup = true;
 
        //   }
        //   else{
        //     this.currentIndex = this.currentIndex - 1;
        //     this.allPosts.splice((this.currentIndex+1), 1)
        //   }
        // }
        
        //3.1 Close popup if last in array
        //4. checkForUpdates() and refresh grid 


      },
      getImage(newPosts) {
        newPosts.forEach(singlePost => {
          this.allPostsNameList.push(singlePost);

          const listRef = this.storageRef.child('slide_viewer_imgs/' + singlePost);
          listRef.getDownloadURL().then(url => this.allPosts.push({
              name: singlePost,
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
     
        let newPosts = this.incomingPosts.filter(incomingPost => !this.allPostsNameList.includes(incomingPost))
        this.getImage(newPosts)

        // Check for delated posts 
        let delatedPosts = this.allPosts.filter(delatedPost => !this.incomingPosts.includes(delatedPost))
        //to do    

        this.incomingPosts = []

      },
      getPostsList() {

        firebase.database().ref('/posts/').once('value').then((snapshot) => {
          const postsListFromDB = Object.keys(snapshot.val())
          postsListFromDB.forEach(single => this.incomingPosts.push(single))
          this.checkForUpdates();
        }, (error) => console.log(error))

      },

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
      TheViewerPost,
      TheViewerPopup,
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
