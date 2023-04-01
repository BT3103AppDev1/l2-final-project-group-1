<template>
  <ul>
    <li v-for="project in this.projects" :key="project.id">
      {{ project.text }}
    </li>
  </ul>
</template>

<script>
import Project from "./Project.vue"

export default {
 name:"ProjectsLists",
 props: {
  projects: Array,
 },
 components: {
  Project
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
}
</script>

<style scoped>
.container {
max-width: 500px;
margin: 30px auto;
overflow: auto;
min-height: 300px;
border: 1px solid steelblue;
padding: 30px;
border-radius: 5px;
}
</style>