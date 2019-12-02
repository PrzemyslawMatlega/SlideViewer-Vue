<template>
    <div class="nav">
        <div class="nav__logo">SlideViewer</div>

        <router-link to="/upload" v-if="isUploadOn">
            <div class="nav__iconBox nav__iconBox--1" @click="switchPopup">
                <img class="nav__icon" src="../assets/img/upload.svg" alt="">
            </div>

        </router-link>
        <!-- <div class="nav__iconBox">
            <img class="nav__icon" src="../assets/img/settings.svg" alt="">
        </div> -->
    </div>
</template>
<script>
export default {
    data() {
        return {
            isUploadOn: this.$route.meta.navigation
        }
    },
    methods:{
        switchPopup(){
            this.$emit('switchPopup')
        },
    }
    
}
</script>

<style lang="scss">
    .nav{
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
        height: 100px;
        width: 100%;
        background: #54a534;
        padding: 0 3rem;
        
        &__logo{
        
            letter-spacing: 3px;
            font-size: 30px;
            text-transform: uppercase;
            color: rgb(255, 255, 255);
        }
        
        &__menulink{
            padding: 1.3rem 2.3rem;
            font-size: 16px;
            border: 1px solid 	#e9f2e5;
            background: 	#6c6c6c;
            color: antiquewhite;
            transition: 0.5s ease;
            cursor: pointer;
            
            &:hover{
                background: 	#aaa5a5;
            }
            
        }
        &__iconBox{
            margin: 0 1rem;
            cursor: pointer;

            &--1{
                padding-bottom: .2rem;
            }
        }

        &__icon{
            width: 4rem;
            height: 4rem;

        }
    }
</style>