<template>
  <div :key="project.id" v-for= "project in projects">
      <div class= "container">
      <Project @toggle-reminder="$emit('toggle-reminder', project.id)" @delete-project="$emit('delete-project', project.id)" :project="project" />
      </div>
  </div>
</template>

<script>
import Project from "./Project.vue"

export default {
 name:"Projects",
 props: {
  projects: Array,
 },
 components: {
  Project
 },
 emits: ['delete-project', 'toggle-reminder']
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