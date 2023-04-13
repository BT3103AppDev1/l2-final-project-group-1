<template>
<ProfileDisplay/>
  <div id = "back-button-container">
      <button @click="goBack"> 
        <span class="button-text-one"> &#8810;</span>
        <span class="button-text"> &nbsp; Back to Projects</span>
      </button>
  </div>
  <div class="tab-container">
    <div class="tab">
      <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }" @click="activeTab = index">{{ tab }}</button>
    </div>
    <div class="content">
      <div v-show="activeTab === 0">Dashboard Content</div>
      <div v-show="activeTab === 1"><Issues/></div>
      <div v-show="activeTab === 2"><Workload/></div>
      <div v-show="activeTab === 3"><Features/></div>
      <div v-show="activeTab === 4">Feedback Content</div>
      <div v-show="activeTab === 5">OKR Content</div>
      <div v-show="activeTab === 6">About Content</div>
    </div>
  </div>
</template>

<script>
import Workload from './Workload.vue';
import ProfileDisplay from "./ProfileDisplay.vue";
import Issues from './Issues.vue';
import Features from './Features.vue';


export default {
  data() {
    return {
      activeTab: 0,
      tabs: ['Dashboard', 'Issues', 'Workload', 'Features', 'Feedback', 'OKR', 'About'],
    };
  },
  components: {
    Workload,
    ProfileDisplay,
    Issues,
    Features,
  },
  methods: {
    goBack() {
      this.$router.push("/login/projects")
  },
  }
}
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
#back-button-container {
  position: absolute;
  top: 20px;
  left: 30px;
}
#back-button-container:hover {
  background-color: #242424;
}
.button-text-one:hover{
  color: #FFFFFF;
}
.button-text:hover{
  color: #FFFFFF;
}
#back-button-container button {
    font-size: 15px;

}
.button-text-one {
  font-size: 25px;
}

.button-text {
  font-size: 20px; /* adjust font size as needed */
}
</style>
