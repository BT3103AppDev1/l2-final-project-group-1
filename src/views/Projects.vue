<template>
  <Sidebar />
  <header>
    <h1> My projects </h1>
    <br>
    <input type="text" v-model="text" name="text" placeholder="Search..." />
    <button @click="showAddProjectPopup = true; verify;" >
      <img src="../assets/plus-sign.png" alt="Add Project" class="project-button">
    </button>
    <div class="nav_bar">
      <div class="tab">
        <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }" @click="activeTab = index">{{ tab }}</button>
      </div>
      <div class="content">
        <div v-show="activeTab === 0">Ongoing projects</div>
        <div v-show="activeTab === 1">Completed projects</div>
      </div>
    </div>
    <ProfileDisplay />
  </header>

  <div v-if="showAddProjectPopup" class="popup">
  <form @submit.prevent="addNewProject">
    <label for="project_name">Project Name:</label>
    <input type="text" v-model="formData.name" name="project_name">
    <label for="start-date">Start Date</label>
    <input type="date" v-model="formData.startDate" name="start-date">
    <label for="end-date">End Date</label>
    <input type="date" v-model="formData.endDate" name="end-date">
    <label for="goal">Goal</label>
    <input id="goal" v-model="formData.goal" name="goal">
    <label for="scope">Scope</label>
    <input id="scope" v-model="formData.scope" name="scope">
    <label for="team-members">Team Members</label>
    <input type="text" v-model="formData.teamMembers" name="team-members">
    <label for="add-clients">Add Clients</label>
    <input type="text" v-model="formData.clients" name="add-clients">
    <button type="submit">Add Project</button>
  </form>
</div>


</template>

<script>
import ProfileDisplay from "../components/ProfileDisplay.vue";
import Sidebar from "../components/Sidebar.vue";
import { doc, setDoc } from "firebase/firestore";
import firebaseApp from "/src/firebase.js";
import { db } from "/src/firebase.js";

export default {
  name: "Projects",
  components: {
    Sidebar,
    ProfileDisplay
  },
  data() {
    return {
      tasks: [],
      activeTab: 0,
      tabs: ['Ongoing', 'Completed'],
      showAddProjectPopup: false,
      formData: {name: "", startDate: "", endDate: "", goal: "", scope: "", teamMembers:"", clients:""}, 
    }
  },
  methods: {
    toggleAddProject() {
      this.showAddProject = !this.showAddProject;
    },
    addProject(project) {
      this.projects = [...this.projects, project];
    },
    deleteProject(id) {
      if (confirm("are you sure?")) {
        this.projects = this.projects.filter((project) => project.id !== id);
      }
    },
    toggleReminder(id) {
      this.projects = this.projects.map((project) =>
        project.id === id
          ? { ...project, reminder: !project.reminder }
          : project
      );
    },
    async addNewProject(formData) {
      const docRef = await setDoc(doc(db, "projects", formData.name),{ 
        project_name: formData.name,
        startdate: formData.startDate,
        enddate: formData.endDate,
        goal: formData.goal,
        scope: formData.scope,
        team_members: formData.teamMembers,
        clients: formData.clients
      })
      this.showAddProjectPopup = false
    },
    verify() {
      console.log("hi")
    }
  },
  created() {
    this.projects = [
      {
        id: 1,
        text: "[Metaverse Project] Competitor Analysis",
        ongoing: true,
      },
      {
        id: 2,
        text: "[Crypto Project] Product Management",
        ongoing: true,
      },
      {
        id: 3,
        text: "[Operational Project] Customer Relations",
        ongoing: false,
      },
    ];
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
  margin: 0px 10px -4px 10px; 
}
.popup {
  width: 800px;
  height: 600px;
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

</style>