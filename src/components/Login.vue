<template>
  <div>
    <div class="login-site">
      <div class="login">
        <div class="login__bar">Sign in</div>
        <form class="form-group">
          <div class="input-field">
            <label for="login">Login</label>
            <input type="email" v-model="login" name="login">
          </div>
          <div class="input-field">
            <label for="password"> Pasword</label>
            <input type="password" name="password" v-model="password">
          </div>

          <button @click.prevent="loginMe"> Login</button>
        </form>
      </div>

      <div class="register">
        <div class="register__bar">Register </div>
        <form class="form-group">
          <div class="input-field">
            <label for="login">Login</label>
            <input type="email" v-model="registerLogin" name="login">
          </div>
          <div class="input-field">
            <label for="password"> Pasword</label>
            <input type="password" name="password" v-model="registerPassword">
          </div>

          <button @click.prevent="register">Register</button>
        </form>

      </div>

    </div>


  </div>
</template>


<script>
  import firebase from '../myFireBase';

  export default {
    data() {
      return {
        registerLogin: '',
        registerPassword: '',
        login: '',
        password: ''
      }
    },
    methods: {
      register() {
        firebase.auth().createUserWithEmailAndPassword(this.registerLogin, this.registerPassword)
          .then(user => {
            console.log(user)

          }, error => {
            console.log(error)
          })

      },
      loginMe(){
      firebase.auth().signInWithEmailAndPassword(this.login, this.password)
          .then(user => {
            console.log(user)

          }, error => {
            console.log(error)
          })
      }
    }
  }

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

  .login,
  .register {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 50%;
    font-size: 1.6rem;
  }

  .login {
    background: rgba(228, 228, 228, 0.828);
    padding: 3rem;

    &__bar {
      background: #54a534;
      border: 2px solid #54a534;
      color: #fff;
      text-transform: uppercase;
      margin: 0 0 2rem;
      padding: 2rem 1rem;
      font-size: 2rem;
      letter-spacing: 3px;
    }
  }

  .register {

    padding: 3rem;

    &__bar {
      background: #fff;
      border: 2px solid #54a534;
      color: #54a534;
      text-transform: uppercase;
      margin: 0 0 2rem;
      padding: 2rem 1rem;
      font-size: 2rem;
      letter-spacing: 3px;
    }
  }

  .input-field {
    display: flex;
    flex-direction: column;
    margin: 1rem 0;

    label {
      margin-bottom: 1rem;
    }

    input {
      border: 1px solid green;
      font-size: 1.5rem;
      line-height: 2;
    }
  }

</style>
