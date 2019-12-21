<template>
  <div>
    <div class="login-site">
      <div class="card-wrapper">
        <transition name="fade" mode="out-in">
          <div class="login" v-if="loginOption" key="login">
            <img src="..\assets\img\candlesticks.png" class="login__candlesticks" alt />
            <div class="login__bar">Sign in</div>
            <form class="form-group">
              <div class="input-field">
                <label for="login">Login</label>
                <input type="email" v-model="login" name="login" />
              </div>
              <div class="input-field">
                <label for="password">Pasword</label>
                <input type="password" name="password" v-model="password" />
              </div>
              <div class="login__noaccount" @click="loginOption =false">
                <p>If You dont already have accounts, please register &#10147;</p>
              </div>
              <button class="login__button" @click.prevent="loginMe">Login</button>
            </form>
          </div>
          <div class="register login" v-else key="register">
           <img src="..\assets\img\candlesticks.png" class="login__candlesticks" alt />
                <div class="login__bar">Register</div>
            <form class="form-group">
              <div class="input-field">
                <label for="login">Login</label>
                <input type="email" v-model="registerLogin" name="login" />
              </div>
              <div class="input-field">
                <label for="password">Pasword</label>
                <input type="password" name="password" v-model="registerPassword" />
              </div>
              <div class="login__noaccount" @click="loginOption = true ">
                <p>Or if You have, please login &#10147;</p>
              </div>
              <button  class="login__button" @click.prevent="register">Register</button>
            </form>
          </div>
        </transition>
      </div>
    </div>
  </div>
</template>


<script>
import firebase from "../myFireBase";

export default {
  data() {
    return {
      registerLogin: "",
      registerPassword: "",
      login: "",
      password: "",
      loginOption: true
    };
  },
  methods: {
    register() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.registerLogin,
          this.registerPassword
        )
        .then(
          user => {
            console.log(user);
          },
          error => {
            console.log(error);
          }
        );
    },
    loginMe() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.login, this.password)
        .then(
          user => {
            this.$router.push("/");
          },
          error => {
            console.log(error);
          }
        );
    }
  }
};
</script>


<style lang="scss">
.login-site {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: calc(100vh - 100px);
  width: 80%;
  margin: 0 auto;
}
.card-wrapper {
  top: -5rem;
  position: relative;
  border-top: 2px solid rgb(255, 255, 255);
  padding: 5rem 20rem;
  transition: 0.5s all ease-in;
  width: 70rem;
  height: 50rem;

  &:hover {
    box-shadow: 0 2.8px 2.2px rgba(0, 0, 0, 0.034),
      0 6.7px 5.3px rgba(0, 0, 0, 0.048), 0 12.5px 10px rgba(0, 0, 0, 0.06),
      0 22.3px 17.9px rgba(0, 0, 0, 0.072), 0 41.8px 33.4px rgba(0, 0, 0, 0.086),
      0 100px 80px rgba(0, 0, 0, 0.12);
    border-top: 2px solid rgb(243, 235, 235);
  }
}

.login {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;

  &__candlesticks {
    width: 7rem;
    position: relative;
    top: -3rem;
  }

  &__bar {
    text-transform: uppercase;
    // margin: 0 0 2rem;
    padding: 1rem 1rem;
    font-size: 3rem;
    font-style: italic;
    letter-spacing: 3px;
  }

  &__button {
    border: none;
    outline: none;
    cursor: pointer;
    padding: 0.5rem 3rem;
    border: 1px solid rgb(128, 125, 125);
    align-self: flex-end;
    margin-top: 3rem;
    font-size: 2rem;
    letter-spacing: 1px;
    background: #fff;
    font-family: "Open Sans Condensed", sans-serif;
    transition: 0.2s all ease-in;

    &:hover {
      border: 1px solid rgb(26, 25, 25);
    }
  }

  .form-group {
    display: flex;
    flex-direction: column;
  }

  &__noaccount {
    cursor: pointer;
    p {
      margin: 0.5rem 0;
      text-align: right;
      font-size: 1.5rem;
      color: rgb(19, 107, 223);
    }
  }
}

.input-field {
  display: flex;
  flex-direction: column;
  margin: 1rem 0;

  label {
    margin-bottom: 0.3rem;
    font-size: 1.8rem;
    letter-spacing: 2px;
  }

  input {
    border: none;
    border-bottom: 1px solid rgb(128, 125, 125);
    outline: none;
    font-size: 1.5rem;
    line-height: 2;
    width: 30rem;
    transition: 0.5s all ease-in;
    font-family: "Open Sans Condensed", sans-serif;

    &:focus {
      border-bottom: 1px solid rgb(26, 25, 25);
    }
  }
}
</style>
