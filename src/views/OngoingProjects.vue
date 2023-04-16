<template>
    <div class="big-con"> 
        <Sidebar /> 
        <div class="pageContainer">
            <ProfileDisplay />  
            <div class ="switchContainer">
                <h1 text-align="center"> My projects </h1> 
                <ProjectSwitcher /> 
            </div>
            <input class="searchbar" type="text" v-model="searchQuery" name="search_bar" placeholder="Search..." />
            <div v-if =" this.userAccount === 'Employer'">
                <button @click="this.showPopup = !this.showPopup" class="popBtn">+ Add Project</button>
            </div>
            <div class="projContainer">
                <div :key="project.id" v-for="project in filteredProjects">
                    <button class= "container" @click="redirectToOtherComponent(project.project_name)">
                        <div class="project_name" style="background-color: var(--light);color:var(--dark);">{{project.project_name}} </div>
                    </button>
                </div>
            </div>
        </div>
    </div>


    <div class="popup" v-if="showPopup">
      <label class="labels">Project Name:</label>
      <input type="text" v-model="projName">
      <label class="labels">Start Date:</label>
      <input type="date" :min="today" v-model="projStartDate">
      <label class="labels">End Date:</label>
      <input type="date" :min="today" v-model="projEndDate">
      <label class="labels">Goal:</label>
      <input type="text" id="goal" v-model="projGoal">
      <label class="labels">Scope:</label>
      <input type="text" id="scope" v-model="projScope">
      <label class="labels">Team Members: <button class="smallAdd" @click="addMember">Add</button></label>
      <input type="text" id="memberEmail" v-model="memberEmail">
      <button v-for="item in memberInvites" :key="item.id" class="buttonName" @click="removeMember(item.id)">{{ item.name + " X" }}</button>
      <label class="labels">Add Clients: <button class="smallAdd" @click="addClient">Add</button></label>
      <input type="text" id="clientEmail" v-model="clientEmail">
      <button v-for="item in clientInvites" :key="item.id" class="buttonName" @click="removeClient(item.id)">{{ item.name + " X" }}</button>
      <button class="popBtn" @click="this.showPopup = false">Cancel</button>
      <button class="popBtn" @click="addProject">Add Project</button>
    </div>
</template> 

<script>
// Front-end
import Sidebar from '/src/components/Sidebar.vue';
import ProfileDisplay from '/src/components/ProfileDisplay.vue'; 
import ProjectSwitcher from '/src/components/ProjectSwitcher.vue';

// Back-end
import { auth, db } from "/src/database/firebase.js";
import { collection, query, where, getDocs, doc, addDoc, setDoc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

export default {
  name: "OngoingProjects",
  components: { Sidebar, ProfileDisplay, ProjectSwitcher },
  data() {
    return { 
      projects: [],
      searchQuery: "",
      userAccount: '',
      email: '',
      showPopup: false,
      projName: '',
      projStartDate: '',
      projEndDate: '',
      projGoal: '',
      projScope: '',
      memberEmail: '',
      clientEmail: '',
      memberInvites: [],
      clientInvites: [],
      allMembers: [],
      today: new Date().toISOString().substr(0, 10),
    };
  },

  async mounted() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.email = user.email;
          this.getAcc(this.email);
          this.getMyProjects(this.email);
        }
      });
    },
  
  computed: {
    filteredProjects() {
      if (!this.searchQuery) {
        return this.projects.filter(project => project.ongoing);
      }
      return this.projects.filter( project => {
        return project.ongoing && project.project_name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
  
  methods: {
    async getAcc(email) {
      const colRef = collection(db, 'userinfo')
      const docRef = doc(colRef, email)
      const docSnapshot = await getDoc(docRef)
      this.userAccount = docSnapshot.data().account_type
    },

    async getMyProjects(email) {
      const userinfoRef = collection(db, 'userinfo')
      const userDocRef = doc(userinfoRef, email)
      const docSnapshot = await getDoc(userDocRef)
      const myProjects = docSnapshot.data().projects

      const projColRef = collection(db, 'projects')
      myProjects.forEach(async projId => {
        const currDocRef = doc(projColRef, projId)
        const currSnapshot = await getDoc(currDocRef)
        const currData = currSnapshot.data()
        currData.id = projId
        this.projects.push(currData)
      })
    },

    async addMember() {
      this.allMembers.push(this.memberEmail)
      const userinfo = collection(db, 'userinfo')
      const userDocRef = doc(userinfo, this.memberEmail)
      const docSnapshot = await getDoc(userDocRef)
      if (!docSnapshot.exists()) {
        alert("User does not exist.")
      } else {
        this.memberInvites.push({
          email: this.memberEmail,
          name: docSnapshot.data().name,
          id: this.memberInvites.length + 1,
        })
      }
      this.memberEmail = ''
    },

    async addClient() {
      const userinfo = collection(db, 'userinfo')
      const userDocRef = doc(userinfo, this.clientEmail)
      const docSnapshot = await getDoc(userDocRef)
      if (!docSnapshot.exists()) {
        alert("User does not exist.")
      } else {
        this.clientInvites.push({
          email: this.clientEmail,
          name: docSnapshot.data().name,
          id: this.clientInvites.length + 1,
        })
      }
      this.clientEmail = ''
    },

    removeMember(idNum) {
        this.memberInvites = this.memberInvites.filter((item) => item.id !== idNum);
    },

    removeClient(idNum) {
        this.clientInvites = this.clientInvites.filter((item) => item.id !== idNum);
    },

    async addProject() {
      const projData = {
        project_name: this.projName,
        scope: this.projScope,
        goal: this.projGoal,
        startdate: this.projStartDate,
        enddate: this.projEndDate,
        ongoing: true,
        workload_count: 0,
        feedback_count: 0,
      }
      //add to projects collection
      const colRef = collection(db, "projects")
      const docRef = doc(colRef, this.projName)
      await setDoc(docRef, projData).then((docRef) => {
        projData.id = this.projName;
      })
       //initialise workload subcollection
      const projectDocRef = await doc(db, "projects", this.projName)
      for (let i = 0; i < this.allMembers.length; i++) {
        const projectSubRef = await doc(projectDocRef, "workload", this.allMembers[i])
        await setDoc(projectSubRef, {memberEmail: this.allMembers[i], task: {}})
      }
      const projectSubRef = await doc(projectDocRef, "workload", this.email)
      await setDoc(projectSubRef,  {memberEmail: this.email, task: {}});
      //initialise feedback subcollection
      const projectDocRefFeed = await doc(db, "projects", this.projName)
      for (let i = 0; i < this.allMembers.length; i++) {
        const projectSubRefFeed = await doc(projectDocRefFeed, "feedback", this.allMembers[i])
        await setDoc(projectSubRefFeed, {memberEmail: this.allMembers[i], memberFeedback: {}})
      }
      const projectSubRefFeed = await doc(projectDocRefFeed, "feedback", this.email)
      await setDoc(projectSubRefFeed,  {memberEmail: this.email, memberFeedback: {}});
      this.projects.push(projData) 
      //clear all input box
      this.projName = ''
      this.projScope = ''
      this.projGoal = ''
      this.projStartDate = ''
      this.projEndDate = ''
      const allusers = this.memberInvites.concat(this.clientInvites);
      allusers.push({
        email: this.email,
        name: '',
      })
      this.memberInvites = []
      this.clientInvites = []
      //add to all involved users project array
      this.addToAll(allusers, projData.id);
      //close pop up
      this.showPopup = false
    },

    async addToAll(allusers, projId) {
      const colRef = collection(db, 'userinfo')
      allusers.forEach(async person => {
        const userDocRef = doc(colRef, person.email)
        const userSnapshot = await getDoc(userDocRef)
        const documentData = userSnapshot.data()
        const currentArray = documentData.projects;
        currentArray.push(projId.toString());
        await updateDoc(userDocRef, { projects: currentArray });
      });
    },
  redirectToOtherComponent(projectName) {
    this.$router.push({
      path: '/login/projects/tabnavigation',
      query: { projectTitle: projectName }
    });
  }
  } 
}
</script>

<style scoped>
.buttonName {
    color: white;
    margin-right: 2px;
    padding: 5px;
    width: max-content;
}
button {
    border: 1px solid black;
    padding: 5px;
    margin-top: 10px;
    border-radius: 4px;
    background-color: #444;
}
.smallAdd {
  width: 50px;
  margin-left: 3px;
  background-color: transparent;
  padding: 0%;
}
.popBtn {
  color: white;
}
label {
  font-size: 14px;
  margin-top: 7px;
}
input[type="date"]::-webkit-calendar-picker-indicator {
  background-size: contain;
  cursor: pointer;
}

input{
  margin-top: 5px;
  margin-bottom: 5px;
  background-color: #f7f7f7;
  border-radius: 4px;
  font-size: 16px;
  padding: 3px;
  width: 500px;
  border: 1px solid;
}
.popup {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  border: 1px solid black;
  padding: 20px;
  display: flex;
  flex-direction: column;
}
.big-con {
  display: flex;
  flex-direction: row;
  width: 100vw;
}

.searchbar {
    margin-top: 20px; 
    width: 500px;
    height: 30px;
}

.pageContainer {
    margin-left: 70px;
    margin-top: 50px;
    display: flex; 
    flex-direction: column; 
}

.switchContainer {
    display: flex; 
    flex-direction: row; 
}

.projContainer {
    margin-top: 50px; 
    max-width: 1200px;
    display: flex; 
    flex-direction: row;
    flex-wrap: wrap;
}

.project_name {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%; 
    padding-bottom: 2px;
    padding-top: 2px;
  }
  
  .container {
    position: relative;
    color: white;
    max-width: 500px;
    margin: 30px auto;
    overflow: auto;
    min-height: 300px;
    border: 1px solid steelblue;
    padding: 30px 150px 30px 150px;
    border-radius: 5px;
    background-image: url("/src/assets/office_image.jpg");
    margin-left: 50px;
}
</style>