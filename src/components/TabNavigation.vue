<template>
<ProfileDisplay/>
  <div class="tab-container">
    <div class="tab">
      <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }" @click="activeTab = index">{{ tab }}</button>
    </div>
    <div class="content">
      <div v-show="activeTab === 0">Dashboard Content</div>
      <div v-show="activeTab === 1">Issues Content</div>
      <div v-show="activeTab === 2"><Workload/></div>
      <div v-show="activeTab === 3">Features Content</div>
      <div v-show="activeTab === 4">Feedback Content</div>
      <div v-show="activeTab === 5">OKR Content</div>
      <div v-show="activeTab === 6">About Content</div>
    </div>
  </div>
</template>

<script>
import Workload from './Workload.vue';
import ProfileDisplay from "./ProfileDisplay.vue";
import { auth, db } from "../firebase";
import { collection, getDocs, doc, deleteDoc, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      activeTab: 0,
      tabs: ['Dashboard', 'Issues', 'Workload', 'Features', 'Feedback', 'OKR', 'About'],
      userAccount: ""
    };
  },
  components: {
    Workload,
    ProfileDisplay
  },
  async mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.displayaccount(user.email)
      }
    })
  },
  methods: {
    async displayaccount(useremail) {
      const Snapshot = await getDocs(collection(db, "userinfo"));
      Snapshot.forEach((doc) => {
        if (doc.data().email === useremail) {
          this.userAccount = doc.data().account_type;
        }
      });
    }
  }
}
</script>

<style>
.tab-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
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

/*. content {
  width: 100%;
  max-width: 700px;
  padding: 20px;
  border: 1px solid #ddd;
} */
</style>
