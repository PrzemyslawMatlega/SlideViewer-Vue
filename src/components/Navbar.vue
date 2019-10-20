<template>
    <div class="nav">
        <div class="nav__logo">SlideViewer</div>
        <div class="nav__menulink">Settings</div>
    </div>
</template>
<script>
export default {
    
}
</script>

<style lang="scss">
    .nav{
        display: flex;
        justify-content: flex-end;
        align-items: center;
        position: relative;
        height: 100px;
        width: 100%;
        background: #54a534;
        padding: 0 3rem;
        
        &__logo{
            position: absolute;
            top:50%;
            left: 50%;
            transform: translate(-50%,-50%);
            letter-spacing: 3px;
            font-size: 30px;
            text-transform: uppercase;
            color: antiquewhite;
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
    }
</style>