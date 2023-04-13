<template>
  <Sidebar />
  <header>
    <h1> My projects </h1>
    <br>
    <input type="text" v-model="text" name="text" placeholder="Search..." />
    <div v-if =" this.userAccount === 'Employer'">
      <button @click="showPopup = true" >
        <img src="../assets/plus-sign.png" alt="Add Project" class="project-button">
      </button>
    </div>
    <ProjectsNavBar />
    <ProfileDisplay />
  </header>

<div>
  <popup :title="popupTitle" v-if="showPopup" @close="showPopup = false">
      <form @submit="onSubmit" class="add-form">
        <div class="form-control">
          <label>Project Name</label>
          <input type="text" v-model="formData.name" name="project-name"/>
          <label>Start Date</label>
          <input type="date" v-model="formData.startDate" name="start-date">
          <label>End Date</label>
          <input type="date" v-model="formData.endDate" name="end-date">
          <label>Goal</label>
          <input id="goal" v-model="formData.goal" name="goal">
          <label>Scope</label>
          <input id="scope" v-model="formData.scope" name="scope">
          <label>Team Members</label>
          <input type="text" v-model="formData.teamMembers" name="team-members" placeholder="Enter members with a ',' in between" class="memberInput">
          <label>Add Clients</label>
          <input type="text" v-model="formData.clients" name="add-clients"> 

        </div>
        <input type="submit" value="Save Project" class="btn btn-block" />
      </form>
    </popup>
</div>
</template>

<script>
import ProjectsNavBar from "../components/ProjectsNavBar.vue";
import ProfileDisplay from "../components/ProfileDisplay.vue";
import Sidebar from "../components/Sidebar.vue";
import { doc, setDoc } from "firebase/firestore";
import firebaseApp from "/src/database/firebase.js";
import { auth, db } from "/src/database/firebase.js";
import Popup from "../components/Popup.vue"


export default {
  name: "Projects",
  components: {
    Sidebar,
    ProfileDisplay,
    ProjectsNavBar,
    Popup,
  },
  data() {
    return {
      tasks: [],
      activeTab: 0,
      tabs: ['Ongoing', 'Completed'],
      formData: {name: "", startDate: "", endDate: "", goal: "", scope: "", teamMembers:"", clients:"", ongoing: false}, 
      showPopup: false,
      popupTitle: "Add Project",
      userAccount: "",
      userName: "",
      userPic: "",
    }
  },
  async mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.displaydetails(user.email);
      }
    });
  },
  methods: {
    async displaydetails(useremail) {
      const Snapshot = await getDocs(collection(db, "userinfo"));
      Snapshot.forEach((doc) => {
          if (doc.data().email === useremail) {
              this.userAccount = doc.data().account_type;
              this.userName = doc.data().name;
              this.userPic = doc.data().profilepic;
          }
      });
      const filename = this.userPic;
      const storage = getStorage();
      const reference = ref(storage, "profilepics/" + filename);
      await getDownloadURL(reference).then((x) => {
          this.userPic = x;
      });
    },
    onSubmit(e, formData) {
      e.preventDefault();
      if (!this.formData.name) {
        alert("Please add a project name");
        return;
      }
      try {
        const names = this.formData.teamMembers
        const namesArr = names.split(",")
        const docRef = setDoc(doc(db, "projects", this.formData.name), {
          project_name: this.formData.name,
          startdate: this.formData.startDate,
          enddate: this.formData.endDate,
          goal: this.formData.goal,
          scope: this.formData.scope,
          team_members: namesArr,
          clients: this.formData.clients,
          ongoing: this.formData.ongoing,
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
      this.showPopup = !this.showPopup;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300;400&display=swap");
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

header {
  margin-top: 50px;
  margin-left: 100px;
}

.nav_bar {
  display: block;
  flex-direction: column;
  margin-top: 20px;
}

.tab {
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 700px;
  margin-bottom: 20px;
}
.tab button {
  background-color: #f2f2f2;
  color: #444;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}
.tab button.active {
  background-color: #ddd;
  color: #444;
}

#addProBut {
  background-color:grey; /* Green */
  border: none;
  color: white;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}

body {
  font-family: "Poppins", sans-serif;
}
.container {
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px;
  border-radius: 5px;
}
.btn {
  display: inline-block;
  background: #000;
  color: #fff;
  border: none;
  padding: 10px 20px;
  margin: 5px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
  font-size: 15px;
  font-family: inherit;
}
.btn:focus {
  outline: none;
}
.btn:active {
  transform: scale(0.98);
}
.btn-block {
  display: block;
  width: 100%;
}
.project-button {
  height: 20px; 
  margin: 0px 10px -2px 10px; 
}
.popup {
  width: 600px;
  height: 750px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid black;
  z-index: 9999;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.add-form {
  margin-bottom: 40px;
}
.form-control {
  margin: 20px 0;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
}

.memberInput::placeholder{
  font-size: 12px;
}
</style>