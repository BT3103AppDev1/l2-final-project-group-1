<template>
  <div class="nav_bar">
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
  </div>
  <div
    v-if="
      this.userAccount === 'Employee' ||
      this.userAccount === 'External stakeholder'
    "
  >
    <div class="content">
      <div v-show="activeTab === 0">
        <div :key="feature.id" v-for="feature in to_do">
          <div class="container">
            Feature name: {{ feature.name }}
            <br />
            Feature description:{{ feature.description }}
          </div>
        </div>
      </div>

      <div v-show="activeTab === 1">
        <div v-show="activeTab === 1">
          <div :key="feature.id" v-for="feature in launched">
            <div class="container">
              Feature name: {{ feature.name }}
              <br />
              Feature description:{{ feature.description }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div v-if="this.userAccount === 'Employer'">
    <div class="content">
      <div v-show="activeTab === 0">
        <div :key="feature.id" v-for="feature in to_do">
          <div class="container">
            Feature name: {{ feature.name }}
            <br />
            Feature description:{{ feature.description }}
            <br />
            <button
              id="launched_button"
              type="button"
              v-on:click="updateLaunched(feature.id)"
            >
              Lauched
            </button>
          </div>
        </div>
      </div>

      <div v-show="activeTab === 1">
        <div :key="feature.id" v-for="feature in launched">
          <div class="container">
            Feature name: {{ feature.name }}
            <br />
            Feature description:{{ feature.description }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../database/firebase";
import {
  collection,
  getDocs,
  doc,
  deleteDoc,
  query,
  where,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
export default {
  data() {
    return {
      activeTab: 0,
      userAccount: "",
      userName: "",
      userPic: "",
      tabs: ["To do", "Launched"],
      to_do: [
        // { id: 1, name: "feature 1", description: "image" },
        // { id: 2, name: "feature 2", description: "image" },
        // { id: 3, name: "feature 3", description: "image" },
        // { id: 4, name: "feature 4", description: "image" },
      ],
      launched: [
        // { id: 5, name: "feature 5", description: "image" },
        // { id: 6, name: "feature 6", description: "image" },
        // { id: 7, name: "feature 7", description: "image" },
        // { id: 8, name: "feature 8", description: "image" },
      ],
    };
  },
  async mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.displayaccount(user.email);
        this.displaydetails(user.email);
      }
    });
    this.display_features();
  },
  methods: {
    async updateLaunched(feature_id) {
      //   console.log(feature_id);
      const selectedRef = doc(
        db,
        "projects",
        "zkWKwHep410V9CNXcJEo",
        "Feature",
        feature_id
      );
      await updateDoc(selectedRef, {
        launched: true,
      });
    },
    async display_features() {
      let allDocuments = await getDocs(
        collection(db, "projects", "zkWKwHep410V9CNXcJEo", "Feature")
      );
      allDocuments.forEach((docs) => {
        let documentData = docs.data();
        let feature_id = documentData.feature_id;
        let feature_name = documentData.name;
        let feature_description = documentData.description;
        let status = documentData.launched;

        if (!status) {
          this.to_do.push({
            id: feature_id,
            name: feature_name,
            description: feature_description,
          });
        } else {
          this.launched.push({
            id: feature_id,
            name: feature_name,
            description: feature_description,
          });
        }
      });
    },
    async displaydetails(useremail) {
      const Snapshot = await getDocs(collection(db, "userinfo"));
      Snapshot.forEach((doc) => {
        if (doc.data().email === useremail) {
          this.userAccount = doc.data().account_type;
          this.userName = doc.data().name;
          this.userPic = doc.data().profilepic;
        }
      });
      const filename = this.userPic;
      const storage = getStorage();
      const reference = ref(storage, "profilepics/" + filename);
      await getDownloadURL(reference).then((x) => {
        this.userPic = x;
      });
    },
    async displayaccount(useremail) {
      const Snapshot = await getDocs(collection(db, "userinfo"));
      Snapshot.forEach((doc) => {
        if (doc.data().email === useremail) {
          this.userAccount = doc.data().account_type;
        }
      });
    },
  },
};
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
  text-align: left;
  vertical-align: top;
}

.project_name {
  position: absolute;
  bottom: 0;
  left: 0;
}
.container {
  color: black;
  width: 50%;
  margin: 5% auto;
  border: 1px solid black;
  border-radius: 20px;
  padding: 3%;
  font-size: 1.3vw;
}
#launched_button {
  background-color: #4a4e69;
  color: #ffffff;
  text-align: center;
  padding-top: 1%;
  padding-bottom: 1%;
  width: 20%;
  font-size: 1.15vw;
  margin-top: 3%;
  border-radius: 4px;
}
</style>
