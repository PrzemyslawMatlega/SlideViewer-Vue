<template>
    <div class="viewerGrid__thumbnail">
        <img :src="url" alt="">
    </div>
</template>

<script>
export default {
    props:{
        url: String,

    }
    
}
</script>

<style lang="scss">
    .viewerGrid__thumbnail{
        width: 20rem;
        height: 20rem;
        border: 1px solid black;

        
        img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            object-position: center;
        }
    }
</style>