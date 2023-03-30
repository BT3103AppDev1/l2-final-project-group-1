<template>
  <div class="image">
    <img id="bg" src="../assets/icon.png" alt="" />
  </div>
  <div class="container">
    <form id="myform">
      <h1 id="createaccount">Create your account</h1>
      <br /><br />
      <div class="formli">
        <img v-bind:src="imagePreview" id="upload" v-on:click="openUpload" />
        <br /><br />
        <h3 id="uploadphoto" v-on:click="openUpload">Upload Photo</h3>
        <br /><br />
        <input
          name="image"
          type="file"
          id="file-field"
          accept="image/*"
          v-on:change="updatePreview"
          style="display: none"
        />
        <input
          type="text"
          id="name"
          required=""
          placeholder="Name"
        /><br /><br />
        <select id="type">
          <option value="">Account Type</option>
          <option value="Employee">Employee</option>
          <option value="Employer">Employer</option>
          <option value="External stakeholder">External stakeholder</option>
        </select>
        <br /><br />
        <label for="DOB" id="dobremarks">
          Date of Birth: This will not be shown publicly. Confirm your own age,
          even if this account is for business
        </label>
        <br /><br />
        <input type="number" id="year" required="" placeholder="Year" />
        <select id="month">
          <option value="">Month</option>
          <option value="january">January</option>
          <option value="february">February</option>
          <option value="march">March</option>
          <option value="april">April</option>
          <option value="may">May</option>
          <option value="june">June</option>
          <option value="july">July</option>
          <option value="august">August</option>
          <option value="september">September</option>
          <option value="october">Ocotber</option>
          <option value="november">November</option>
          <option value="december">December</option>
        </select>
        <select id="day">
          <option value="">Day</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          <option value="11">11</option>
          <option value="12">12</option>
          <option value="13">13</option>
          <option value="14">14</option>
          <option value="15">15</option>
          <option value="16">16</option>
          <option value="17">17</option>
          <option value="18">18</option>
          <option value="19">19</option>
          <option value="20">20</option>
          <option value="21">21</option>
          <option value="22">22</option>
          <option value="23">23</option>
          <option value="24">24</option>
          <option value="25">25</option>
          <option value="26">26</option>
          <option value="27">27</option>
          <option value="28">28</option>
          <option value="29">29</option>
          <option value="30">30</option>
          <option value="31">31</option></select
        ><br /><br />
        <input
          type="text"
          id="email"
          required=""
          placeholder="Email"
        /><br /><br />
        <input
          type="text"
          id="number"
          required=""
          placeholder="Phone number"
        /><br /><br />
        <select id="gender">
          <option value="">Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
        </select>
        <br /><br />
        <select id="salutation">
          <option value="">Salutation</option>
          <option value="mr">Mr</option>
          <option value="ms">Ms</option>
          <option value="mrs">Mrs</option>
          <option value="miss">Miss</option>
          <option value="mdm">Mdm</option>
        </select>
        <br /><br />
        <input
          type="text"
          id="password"
          required=""
          placeholder="Password"
        /><br /><br />
        <input
          type="text"
          id="cfmpassword"
          required=""
          placeholder="Confirm Password"
        />
        <br /><br />
        <label id="check"
          ><input type="checkbox" required /> I declare that all information
          provided is correct</label
        >
        <br /><br />
        <label id="check"
          ><input type="checkbox" required /> I agree to THRIVE's terms and
          conditions</label
        >
        <br /><br />
        <div class="signup">
          <button id="signupbutton" type="button" v-on:click="signup">
            Sign Up
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { doc, setDoc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
import firebaseApp from "/src/firebase.js";
import { auth, db } from "/src/firebase.js";
import uploadImage from "/src/assets/upload.png";
import { getStorage, ref, uploadBytes } from "firebase/storage";
import { signupRest } from "/src/views/RegisterPage/api.js";

export default {
  name: "Register",
  data() {
    return {
      imagePreview: uploadImage,
      imageName: "default_profile.png",
    };
  },
  methods: {
    signup() {
      let name = document.getElementById("name").value;
      let account_type = document.getElementById("type").value;
      let dob_year = document.getElementById("year").value;
      let dob_month = document.getElementById("month").value;
      let dob_day = document.getElementById("day").value;
      let email = document.getElementById("email").value;
      let number = document.getElementById("number").value;
      let gender = document.getElementById("gender").value;
      let salutation = document.getElementById("salutation").value;
      let password = document.getElementById("password").value;
      let confirmation_password = document.getElementById("cfmpassword").value;
      const inputs = [
        name,
        account_type,
        dob_year,
        dob_month,
        dob_day,
        email,
        number,
        gender,
        salutation,
        password,
        confirmation_password,
      ];
      if (inputs.includes("") || inputs.includes(undefined)) {
        alert("Please fill in all fields");
      } else if (password.length < 6) {
        alert("Password should be at least 6 characters!");
      } else if (password !== confirmation_password) {
        alert("Passwords do not match!");
      } else {
        try {
          const docRef = setDoc(doc(db, "userinfo", email), {
            name: name,
            account_type: account_type,
            dob: dob_day + "/" + dob_month + "/" + dob_year,
            email: email,
            number: number,
            gender: gender,
            salutation: salutation,
            projects: [], //input project name
            to_do: [],
            follow_up: [],
            profilepic: this.imageName,
          });
        } catch (error) {
          console.error("Error adding document: ", error);
        }
        createUserWithEmailAndPassword(auth, email, password)
          .then((re) => {
            this.$router.push("/login/home");
          })
          .catch((re) => {
            alert(re);
          });
      }
    },
    openUpload() {
      document.getElementById("file-field").click();
      console.log("pressed");
    },
    updatePreview(e) {
      var reader,
        files = e.target.files;
      if (files.length === 0) {
        console.log("empty");
      }
      reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target.result;
        this.imageName = files[0].name;
      };
      reader.readAsDataURL(files[0]);
      const file = e.target.files[0];
      const storage = getStorage();
      const storageRef = ref(storage, "profilepics/" + file.name);
      uploadBytes(storageRef, file).then((snapshot) => {
        console.log("Uploaded!");
      });
    },
  },
};
</script>

<style>
#bg {
  width: 80%;
  margin-top: 20%;
  margin-right: 60%;
}
.image {
  float: left;
  margin-left: 12%;
  margin-top: 8%;
  width: 35%;
}
#createaccount {
  font-size: 2vw;
}
#dobremarks {
  font-size: 1.1vw;
  text-align: left;
  margin-left: 4%;
  float: left;
  margin-bottom: 1%;
  letter-spacing: 1px;
}
.container {
  width: 35%;
  margin-top: 10%;
  float: left;
  border: 1px solid black;
  padding-top: 3%;
  padding-bottom: 4%;
  padding-left: 2%;
  padding-right: 2%;
  border-radius: 15px;
  font-family: sans-serif;
  line-height: 10pt;
  height: 480px;
  overflow-y: auto;
  text-align: center;
  margin-left: 4%;
}
#upload {
  width: 30%;
}
#uploadphoto {
  font-size: 1.2vw;
}
#name,
#DOB,
#email,
#number,
#password,
#cfmpassword {
  font-size: 1.2vw;
  width: 91%;
  padding-top: 2%;
  padding-bottom: 2%;
  border: 1px solid black;
  border-radius: 3px;
  color: #6b6969;
  background-color: #eef1f4;
  padding-left: 2%;
}
#signupbutton {
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
#type,
#gender,
#salutation {
  font-size: 1.2vw;
  width: 91%;
  padding-top: 2%;
  padding-bottom: 2%;
  border: 1px solid black;
  border-radius: 3px;
  color: #6b6969;
  background-color: #eef1f4;
  padding-left: 2%;
}
#year,
#month,
#day {
  font-size: 1.2vw;
  padding-top: 2%;
  padding-bottom: 2%;
  width: 30%;
  border: 1px solid black;
  border-radius: 3px;
  color: #6b6969;
  background-color: #eef1f4;
  margin-left: 1%;
  padding-left: 1%;
}
#type:focus,
#month:focus,
#year:focus,
#day:focus,
#gender:focus,
#salutation:focus {
  outline: none;
  border-radius: 2px;
}
#check {
  margin-left: 5%;
  float: left;
  font-size: 1.1vw;
  margin-top: 2%;
}
</style>
