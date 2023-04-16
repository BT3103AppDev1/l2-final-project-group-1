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
                <button @click="showPopup = true" >
                    <img src="../assets/plus-sign.png" alt="Add Project" class="project-button">
                </button>
            </div>
            <div class="projContainer">
                <div :key="project.id" v-for="project in filteredProjects">
                    <button class= "container" @click="redirectToOtherComponent(projectName)">
                        <div class="project_name">{{project.project_name}} </div>
                    </button>
                </div>
            </div>
        </div>
    </div>

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
  async mounted() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.email = user.email;
          //this.getAcc(this.email);
          this.getMyProjects(this.email);
        }
      });
    },
  methods: {
    redirectToOtherComponent(projectName) {
    this.$router.push({
      path: '/login/projects/tabnavigation',
      query: { projectTitle: projectName }
    });
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
  },
  data() {
    return { 
      projects: [],
      searchQuery: "",
      email: '',
    };
  },
  computed: {
    filteredProjects() {
      if (!this.searchQuery) {
        return this.projects.filter(project => !project.ongoing);
      }
      return this.projects.filter( project => {
        return !project.ongoing && project.project_name.toLowerCase().includes(this.searchQuery.toLowerCase());
      });
    }
  },
} 
</script>

<style> 
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