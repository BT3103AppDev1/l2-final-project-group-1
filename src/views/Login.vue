<template>
  <div class="big-con"> 
  <div class="left-con"> 
    <div class="image">
      <img id="bg" src="/src/assets/login-pic.png" alt="" />
    </div>
  </div>
  <div class="right-con"> 
    <router-view>
      <div class="container">
        <form id="myform">
          <img id="icon" src="/src/assets/icon-no-slogan.png" alt="" /> 
          <br /><br />
          <h4 id="signup1">Don't have an account?</h4>
          <router-link id="signup2" to="/register"> Sign up </router-link>
          <router-view />
          <br /><br />
          <div class="formli"> 
              <input type="text" id="email" required="" placeholder="Email" v-model="email"/> 
              <br /><br /> 
              <div class="shPassword">
                <input type="password" id="password" required="" placeholder="Password" v-model="password" /> 
                <span> <i class="fa fa-eye" aria-hidden="true" id="eye" v-on:click="toggle()"> </i> </span> 
              </div> 
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
    </div>
</div>
</template>

<script> 
import firebaseApp from "/src/database/firebase.js";
import { auth, db } from "/src/database/firebase.js";
import { signInWithEmailAndPassword } from "firebase/auth"; 

export default {
  name: "Login",
  data() {
    return {
      email: "", 
      password: "", 
      state: false,
    };
  },  
  methods: {  
    toggle() { 
        this.state = !this.state;
        if (this.state) {
          document.getElementById("password").setAttribute("type", "password");
          document.getElementById("eye").style.color='#7a797e'; 
        }
        else {
          document.getElementById("password").setAttribute("type", "text");
          document.getElementById("eye").style.color='#5887ef'; 
        }
    },
    async login() { 
  
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
.big-con { 
  width: 100vw; 
  height: 100vh;
  background-image: url("../assets/aura.png");
  background-size: cover;
}

.left-con {
  width: 100%; 
}

#bg {
  width: 100%;  
  margin-left: -30px;
  margin-top: 40px;
}

#icon {
  margin-top: 60px;
  width: 55%;
  margin-bottom: 20px;
}
.image {
  float: left;
  margin-left: 10%;
  margin-top: 8%;
  width: 35%;
} 

#signup1 {
  float: left;
  margin-left: 23.5%;
  font-size: 1.1vw;
  margin-bottom: 40px;
  font-weight: 400;
}

#signup2 {
  float: left;
  margin-left: 2%;
  color: var(--dark);
  font-size: 1.1vw;
  font-weight: 600;
  margin-bottom: 40px;
}
.container {
  width: 40%; 
  float: left; 
  padding-top: 5%;
  padding-bottom: 3%;
  border-radius: 15px;
  line-height: 10pt;
  text-align: center;
  margin-left: 4%; 
}

#email, #password {
  font-size: 1.3vw;
  width: 90%;
  padding-top: 2%;
  padding-bottom: 2%;
  border: 1px solid black;
  border-radius: 3px;
  color: #6b6969;
  background-color: #ffffff;
  padding-left: 2%;
}
.shPassword i {
  position: absolute; 
}

input[type=text i]:focus { 
    font: var(--font-family);
    background-color: #ffffff;;
    transition: 0.4s;
}
.shPassword {
  width: 100%; 
  margin-bottom: 10px; 
}

.fa {
  margin-left: -30px;
  margin-top: 15px;  
}
.login {
  width: 90%;
  margin-left: 5px;
}

#forgotpassword {
  text-align: left;
  margin-left: 5%;
  text-decoration: underline;
  font-size: 15px;
  color: var(--dark); 
  font-weight: 600; 
}

#keeploggedin {
  float: left;
  margin-left: 1%;
  font-size: 15px;
  margin-top: 5%;
  font-weight: 300;
}

#checkbox {
  float: left;
  margin-left: 25px;
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

.input {
  box-sizing: border-box;
  border-radius: 5px;
  font-family: var(--font-family);
  background-color: var(--light);
} 
</style>
