<template>
  <Sidebar />
  <Header
    @toggle-add-project="toggleAddProject"
    title="My Projects"
    :showAddProject="showAddProject"
  />
  <div v-show="showAddProject">
    <AddProject @add-project="addProject" />
  </div>
  <br />
  <div class="projects">
    <Projects
      @toggle-reminder="toggleReminder"
      @delete-project="deleteProject"
      :projects="projects"
    />
  </div>
  <div id="nav">
    <router-link to="/projects/ongoing">Ongoing</router-link>
    <router-link to="/projects/completed">Completed</router-link>
  </div>
  <router-view />
</template>

<script>
import Header from "../components/Header.vue";
import Projects from "../components/Projects.vue";
import AddProject from "../components/AddProject.vue";
import Sidebar from "../components/Sidebar.vue";

export default {
  name: "App",
  components: {
    Header,
    Projects,
    AddProject,
    Sidebar,
  },
  data() {
    return {
      tasks: [],
      showAddProject: false,
    };
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
  },
  created() {
    this.projects = [
      {
        id: 1,
        text: "[Metaverse Project] Competitor Analysis",
        reminder: true,
      },
      {
        id: 2,
        text: "[Crypto Project] Product Management",
        reminder: true,
      },
      {
        id: 3,
        text: "[Operational Project] Customer Relations",
        reminder: false,
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
</style>
