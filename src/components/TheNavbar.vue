<template>
  <div class="nav">
    <div class="nav__logo">FXNotebook</div>
    <div class="nav__buttons" v-if="isUploadOn">
      <router-link to="/upload">
        <div class="nav__iconBox nav__iconBox--1" @click="switchPopup">
          <img class="nav__icon" src="../assets/img/upload.svg" alt />
        </div>
      </router-link>

      <div class="nav__logout" @click="logout">LOG OUT</div>
    </div>
  </div>
</template>
<script>
import firebase from "../myFireBase";

export default {
  data() {
    return {
      isUploadOn: this.$route.meta.navigation
    };
  },
  methods: {
    switchPopup() {
      this.$emit("switchPopup");
    },
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$emit("logout");
          this.$router.push("/login");
        })
        .catch(function(error) {
          console.log(error);
          alert("Somthing wents wrong ");
        });
    }
  }
};
</script>

<style lang="scss">
.nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  height: 100px;
  width: 100%;
  // background: #54a534;
  border-bottom: 0px solid rgb(245, 234, 234);
  padding: 0 3rem;

  &__logo {
    letter-spacing: 5px;
    font-size: 30px;
    // font-style:italic;

    text-transform: uppercase;
    color: rgb(0, 0, 0);
  }

  &__menulink {
    padding: 1.3rem 2.3rem;
    font-size: 16px;
    border: 1px solid #e9f2e5;
    background: #6c6c6c;
    color: antiquewhite;
    transition: 0.5s ease;
    cursor: pointer;

    &:hover {
      background: #aaa5a5;
    }
  }

  &__iconBox {
    margin: 0 1rem;
    cursor: pointer;

    &--1 {
      padding-bottom: 0.2rem;
    }
  }

  &__icon {
    width: 4rem;
    height: 4rem;
  }

  &__buttons {
    display: flex;
    align-items: center;
  }

  &__logout {
    color: white;
    font-size: 20px;
    margin-left: 3rem;
    padding: 1.5rem 2rem;
    border: 1px solid #f0f0f0;
    cursor: pointer;
  }
}
</style>
