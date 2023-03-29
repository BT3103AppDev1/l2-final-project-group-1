<template>
  <div class="image">
    <img id="bg" src="/src/assets/icon.png" alt="" />
  </div>
  <router-view>
    <div class="container">
      <form id="myform">
        <h1 id="welcome">Welcome Back</h1>
        <br /><br />
        <h4 id="signup1">Don't have an account?</h4>
        <router-link id="signup2" to="/register"> Sign up </router-link>
        <router-view />
        <br /><br />
        <div class="formli">
          <input type="text" id="email" required="" placeholder="Email" />
          <br /><br />
          <input type="text" id="password" required="" placeholder="Password" />
          <br /><br />
          <h4 id="forgotpassword">Forgot Password?</h4>
          <br /><br />
          <div class="login">
            <input type="checkbox" id="checkbox" />
            <h4 id="keeploggedin">Keep me logged in</h4>
            <button id="loginbutton" type="button" v-on:click="login">
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  </router-view>
</template>

<script> 
import firebaseApp from "/src/firebase.js";
import { auth, db } from "/src/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth";
import { loginRest } from "./api"; 
export default {
  name: "Login",
  methods: { 
    async login() {
      loginRest(this.email, this.password) 
      .then((response) => 
        this.$emit("onAuth", { ...response.data, secret: this.password})
      )
      .catch((error) => console.log("Login error", error));  
  
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;
      const inputs = [email, password];
      if (inputs.includes("") || inputs.includes(undefined)) {
        alert("Please fill in all fields");
      } else {
        signInWithEmailAndPassword(auth, email, password)
          .then((re) => {
            this.$router.push("/login/home");
          })
          .catch((re) => {
            alert(re.message.slice(22, -2));
          });
      }
    },
  },
};
</script>

<style scoped>
#bg {
  width: 80%;
  margin-top: 20%;
  margin-right: 80%;
}
.image {
  float: left;
  margin-left: 12%;
  margin-top: 8%;
  width: 35%;
}
#welcome {
  font-size: 2.5vw;
}
#signup1 {
  float: left;
  margin-left: 23.5%;
  font-size: 1.1vw;
  margin-bottom: 5%;
}
#signup2 {
  float: left;
  margin-left: 2%;
  color: black;
  font-size: 1.1vw;
}
.container {
  width: 35%;
  margin-top: 10%;
  float: left;
  border: 1px solid black;
  padding-top: 5%;
  padding-bottom: 3%;
  border-radius: 15px;
  line-height: 10pt;
  text-align: center;
  margin-left: 4%;
}
#email,
#password {
  font-size: 1.3vw;
  width: 90%;
  padding-top: 2%;
  padding-bottom: 2%;
  border: 1px solid black;
  border-radius: 3px;
  color: #6b6969;
  background-color: #eef1f4;
  padding-left: 2%;
}
.login {
  width: 90%;
}
#forgotpassword {
  text-align: left;
  margin-left: 5%;
  text-decoration: underline;
  font-size: 1.1vw;
}
#keeploggedin {
  float: left;
  margin-left: 1%;
  font-size: 1.1vw;
  margin-top: 5%;
}
#checkbox {
  float: left;
  margin-left: 10%;
  margin-top: 5%;
}
#loginbutton {
  padding-top: 1%;
  padding-bottom: 1%;
  width: 25%;
  font-size: 1.15vw;
  border-radius: 4px;
  float: right;
  margin-top: 3%;
  background-color: #4a4e69;
  color: #ffffff;
}
</style>
