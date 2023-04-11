<template>
    <div class="nav_bar">
      <div class="tab">
        <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }" @click="activeTab = index">{{ tab }}</button>
      </div>
      <div class="content">
        <div v-show="activeTab === 0">
            <div :key="project.id" v-for="project in this.projects.filter(project => project.ongoing)">
                <button class= "container" @click="redirectToOtherComponent">
                      <div class="project_name">{{project.project_name}} </div>
                </button>
            </div>
        </div>
        <div v-show="activeTab === 1">
          <div :key="project.id" v-for="project in this.projects.filter(project => !project.ongoing)">
                <button class= "container" @click="redirectToOtherComponent(project.project_name)">
                      <h3>{{project.project_name}} </h3>
                </button>
            </div>
        </div>
      </div>
    </div>
</template>

<script>
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import firebaseApp from "/src/database/firebase.js";
import { auth, db } from "/src/database/firebase.js";

export default {
  name: "ProjectsNavBar",
  methods: {
      redirectToOtherComponent(projectName) {
        this.$router.push({path:'/login/projects/tabnavigation', query: {projectTitle : projectName}
        }); 
      },
  },
  data() {
    return {
      tasks: [],
      activeTab: 0,
      tabs: ['Ongoing', 'Completed'],
      projects: []
    };
  },
  async created() {
    try {
      const querySnapshot = await getDocs(collection(db, "projects"));
      querySnapshot.forEach((doc) => {
        this.projects.push(doc.data());
      });
    } catch (error) {
      console.error(error);
    }
  },
}
</script>

<style scoped>
.nav_bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
}

.tab {
  display: flex;
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

button {
  text-align:left;
  vertical-align: top;
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
}


</style>