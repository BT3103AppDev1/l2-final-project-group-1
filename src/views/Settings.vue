<template>
  <Sidebar />
  <ProfileDisplay />
  <main id="settings-page">
    <h1>Settings</h1>
    <br>
    <h3 class="header">{{ "Hello, " + this.userName }}</h3>
    <div class="changeDetailsContainer">
      <label>Name: </label>
      <br>
      <input type="text" v-model="userName">
      <br>
      <label>Number: </label>
      <br>
      <input type="text" v-model="number">
      <br>
      <label for="gender">Gender: </label>
      <br>
      <select id="gender" v-model="this.gender" class="oneSelect">
        <option disabled value="">Please select one</option>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <br>
      <label for="salutation">Salutation: </label>
      <br>
      <select id="salutation" v-model="this.salutation" class="oneSelect">
        <option disabled value="">Please select one</option>
        <option value="mr">Mr</option>
        <option value="ms">Ms</option>
        <option value="mrs">Mrs</option>
        <option value="miss">Miss</option>
        <option value="mdm">Mdm</option>
      </select>
      <br>
      <label>Date of Birth:</label>
      <br>
      <div class="select-container">
        <select id="dayDropdown" v-model="day"></select>
        <select id="monthDropdown" v-model="month"></select>
        <select id="yearDropdown" v-model="year"></select>
      </div>
      <button @click="update"><u>Update DOB</u></button>
    </div>

    <div id="confirmDetails">
      <h4 class="header" id="confirmHeader">Confirm your details below:</h4>
      <p class="details">{{ "Name: " + this.userName }}</p>
      <p class="details">{{ "Number: " + this.number }}</p> 
      <p class="details">{{ "Gender: " + this.gender }}</p>
      <p class="details">{{ "Salutation: " + this.salutation }}</p>
      <p class="details">{{ "Date of Birth: " + this.dob }}</p>
      <button @click="updateFirebase" class="confirmBtn">Confirm changes</button>    
    </div>
  </main>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import ProfileDisplay from "../components/ProfileDisplay.vue";

import { auth, db } from "/src/database/firebase.js";
import { collection, query, where, getDocs, doc, addDoc, setDoc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

export default {
  name: "Settings",
  components: {
    Sidebar,
    ProfileDisplay,
  },
  async mounted() {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          this.email = user.email;
          const colRef = collection(db, 'userinfo')
          const docRef = doc(colRef, this.email)
          const docSnapshot = await getDoc(docRef)
          const userData = docSnapshot.data()
          this.userName = userData.name;
          this.dob = userData.dob;
          this.salutation = userData.salutation;
          this.gender = userData.gender;
          this.number = userData.number
        }
      });
      const daysDropdown = document.getElementById("dayDropdown");
      // populate days dropdown
      for (let i = 1; i <= 31; i++) {
        const option = document.createElement("option");
        option.text = i;
        option.value = i;
        daysDropdown.add(option);
      }
      const monthsDropdown = document.getElementById("monthDropdown");
      const months = ["January","February","March","April","May","June","July","August","September","October","November","December",];
      // populate months dropdown
      for (let i = 0; i < months.length; i++) {
        const option = document.createElement("option");
        option.text = months[i];
        option.value = i + 1;
        monthsDropdown.add(option);
      }

      const yearsDropdown = document.getElementById("yearDropdown");
      const currentYear = new Date().getFullYear();
      // populate years dropdown from 1900 to current year
      for (let i = currentYear; i >= 1900; i--) {
        const option = document.createElement("option");
        option.text = i;
        option.value = i;
        yearsDropdown.add(option);
      }
    },
  data() {
    return {
      email: '',
      userName: '',
      dob: '',
      salutation: '',
      gender: '',
      number: '',
      day: '',
      month: '',
      year: '',
      months: ["January","February","March","April","May","June","July","August","September","October","November","December",]
    };
  },
  methods: {
    update() {
      this.dob = this.day + '/' + this.months[this.month] + '/' + this.year
    },

    async updateFirebase() {
      const colRef = collection(db, 'userinfo')
      const docRef = doc(colRef, this.email)
      await updateDoc(docRef, {
        name: this.userName,
        dob: this.dob,
        salutation: this.salutation,
        gender: this.gender,
        number: this.number,
      })
    }
  },
};
</script>

<style scoped>
main {
  background-image: url(../assets/cal-aura.png); 
  background-size: 100%;
}
input {
  border-radius: 5px;
  padding: 5px;
  width: 500px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid black;
}

.oneSelect {
  border-radius: 5px;
  padding: 5px;
  width: 500px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid black;
}

#dayDropdown {
  border-radius: 5px;
  padding: 5px;
  width: 96px;
  margin-right: 4px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid black;
}

#monthDropdown {
  border-radius: 5px;
  padding: 5px;
  width: 296px;
  margin-right: 4px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid black;
}

#yearDropdown {
  border-radius: 5px;
  padding: 5px;
  width: 100px;
  margin-top: 10px;
  margin-bottom: 10px;
  border: 1px solid black;
}

.changeDetailsContainer {
  margin-top: 10px;
}
#confirmDetails {
  margin-top: 20px;
}
.details {
  margin-top: 3px;
}

.confirmBtn {
  margin-left: 350px;
  background-color: var(--primary);
  color: white;
  padding: 10px;
  border-radius: 20px;
  width: 150px;
}

.header {
  color: var(--dark-purple);
}

#confirmHeader {
  color: black;
}
</style>