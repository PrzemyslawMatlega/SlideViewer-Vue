<template>
  <div>
    <div class="click" style="cursor:pointer" @click="$emit('getPostsList')">
      <h1>CLICK ME</h1>
    </div>
    <div class="viewerGrid">

     
      <TheViewerGridPost 
      v-for="(single, index) in allPosts" 
      :key="single.name"
      :id="single.name" 
      :url="single.url"
      @click.native="$emit('hasPicked', index)"
       />

    </div>

  </div>
</template>


<script>
 import TheViewerGridPost from './TheViewerGridPost'

  export default {
      props : {
          allPosts : Array,
      },
      components: {
        TheViewerGridPost,
      },
      methods: {
        
      },
  }

</script>
