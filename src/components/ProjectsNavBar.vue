<template>
    <div class="nav_bar">
      <div class="tab">
        <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }" @click="activeTab = index">{{ tab }}</button>
      </div>
      <div class="content">
        <div v-show="activeTab === 0">
            <div :key="project.id" v-for="project in this.projects">
                <div class= "container">
                    <div @click="redirectToOtherComponent">
                        <h3>{{project.project_name}} </h3>
                    </div>
                </div>
            </div>
        </div>
        <div v-show="activeTab === 1">Completed projects</div>
      </div>
    </div>
</template>

<script>
import ProjectsLists from "./ProjectsLists.vue"
import { doc, setDoc, getDocs, collection } from "firebase/firestore";
import firebaseApp from "/src/database/firebase.js";
import { auth, db } from "/src/database/firebase.js";

export default {
  name: "ProjectsNavBar",
  components: {
    ProjectsLists
  },
  methods: {
      redirectToOtherComponent() {
        this.$router.push('/login/projects/tabnavigation') // Replace '/other-component' with the path to your desired component
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

.container {
max-width: 500px;
margin: 30px auto;
overflow: auto;
min-height: 300px;
border: 1px solid steelblue;
padding: 30px 150px 30px 150px;
border-radius: 5px;
}


</style>