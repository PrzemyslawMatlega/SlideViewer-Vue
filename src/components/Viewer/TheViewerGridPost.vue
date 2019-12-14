<template>
  <div class="viewerGrid-thumbnail">
    <div v-if="isThumbLoading" class="viewerGrid-thumbnail__loader">
      <BounceLoader />
    </div>
    <div class="viewerGrid-thumbnail__img" :class="`viewerGrid-thumbnail__img--${id}`"></div>
  </div>
</template>

<script>
import BounceLoader from "vue-spinner/src/BounceLoader";

export default {
  props: {
    url: String,
    id: String
  },
  data() {
    return {
      isThumbLoading: true,
      loaderColor: "#f6f6f6",
      loaderSize: "20px"
    };
  },
  mounted() {
    const postImage = document.querySelector(
      `.viewerGrid-thumbnail__img--${this.id}`
    );
    const objImg = new Image();
    objImg.src = this.url;
    objImg.onload = () => {
      this.isThumbLoading = false;
      postImage.append(objImg);
    };
  },
  components: {
    BounceLoader
  }
};
</script>

<style lang="scss">
.viewerGrid-thumbnail {
  position: relative;
  border: 1px solid black;
  cursor: pointer;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  &__img {
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      object-position: center;
      animation: showThumbImg;
      animation-duration: 1s;
      animation-fill-mode: forwards;
    }
  }
  &__loader {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

@keyframes showThumbImg {
  from{
    opacity: 0;
  }
  to{
    opacity: 1;
  }
}
</style>
