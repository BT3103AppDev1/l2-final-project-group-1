<template>
  <ProfileDisplay />
  <div id="back-button-container">
    <button id="back" @click="goBack">
      <span class="button-text-one"> &#8810;</span>
      <span class="button-text"> &nbsp; Back to Projects</span>
    </button>
  </div>
  <div class="tab-container">
    <div class="tab">
      <button 
        v-for="(tab, index) in tabs"
        :key="index"
        :class="{ active: activeTab === index }"
        @click="activeTab = index"
      >
        {{ tab }}
      </button>
    </div>
    <div class="content">
      <div v-show="activeTab === 0">
        <Dashboard :projectTitle="this.$route.query.projectTitle" />
      </div>
      <div v-show="activeTab === 1">
        <Issues :projectTitle="this.$route.query.projectTitle" />
      </div>
      <div v-show="activeTab === 2">
        <Workload :projectTitle="this.$route.query.projectTitle" />
      </div>
      <div v-show="activeTab === 3">
        <Features :projectTitle="this.$route.query.projectTitle" />
      </div>
      <div v-show="activeTab === 4">
        <Feedback :projectTitle="this.$route.query.projectTitle" />
      </div>
      <div v-show="activeTab === 5">
        <About :projectTitle="this.$route.query.projectTitle" />
      </div>
    </div>
  </div>
</template>

<script>
import Workload from "./Workload.vue";
import ProfileDisplay from "./ProfileDisplay.vue";
import Issues from "./Issues.vue";
import Features from "./Features.vue";
import About from "./About.vue";
import Dashboard from "./Dashboard.vue";
import Feedback from "./Feedback.vue";

export default {
  data() {
    return {
      activeTab: 0,
      tabs: [
        "Dashboard",
        "Issues",
        "Workload",
        "Features",
        "Feedback", 
        "About",
      ],
    };
  },
  components: {
    Workload,
    ProfileDisplay,
    Issues,
    Features,
    About,
    Dashboard,
    Feedback,
  },
  methods: {
    goBack() {
      this.$router.push("/login/projects");
    },
  },
  created() {
    console.log(this.$route.query.projectTitle);
  },
};
</script>

<style>
.tab-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
  width: 100%;
}

.tab {
  display: flex;
  margin-bottom: 20px;
}

.tab button { 
  color: #444;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  border-bottom: 1px solid var(--light-grey);
}

.tab button.active { 
  color: var(--dark);
  font-weight: 600;
  border-bottom: 3px solid var(--dark-purple);
}
#back-button-container {
  position: absolute;
  top: 20px;
  left: 30px;
  height: 30px;
  margin-top: 10px;
}
#back-button-container:hover { 
  border-radius: 20px; 
}

#back-button-container button {
  font-size: 15px;
}
.button-text-one {
  font-size: 20px;
}

.button-text {
  font-size: 18px; /* adjust font size as needed */
}
#back:hover {
  color: var(--dark);
  font-weight: 600;
  transition: background-color 0.1s ease-in-out, color 0.6s ease-in-out;
}
</style>
