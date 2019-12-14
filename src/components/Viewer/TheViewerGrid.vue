<template>
  <div>
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
import TheViewerGridPost from "./TheViewerGridPost";

export default {
  props: {
    allPosts: Array
  },
  components: {
    TheViewerGridPost
  },
  methods: {},
  created() {
    this.allPosts.sort((a, b) =>  parseFloat(b.createdAt) - parseFloat(a.createdAt));
  }
};
</script>
