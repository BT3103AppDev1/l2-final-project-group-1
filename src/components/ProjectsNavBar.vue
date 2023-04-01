<template>
    <div class="nav_bar">
      <div class="tab">
        <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }" @click="activeTab = index">{{ tab }}</button>
      </div>
      <div class="content">
        <div v-show="activeTab === 0">
            <ul>
                <li v-for="project in this.projects" :key="project.id">
                    {{ project.text }}
                </li>
            </ul>


        </div>
        <div v-show="activeTab === 1">Completed projects</div>
      </div>
    </div>
</template>

<script>
import ProjectsLists from "./ProjectsLists.vue"

export default {
  name: "ProjectsNavBar",
  components: {
    ProjectsLists
  },
  data() {
    return {
      tasks: [],
      activeTab: 0,
      tabs: ['Ongoing', 'Completed']
    };
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

</style>