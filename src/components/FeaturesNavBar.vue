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
        <div :key="feature.id" v-for="feature in launched">
          <div class="container">
            Feature name: {{ feature.name }}
            <br />
            Feature description:{{ feature.description }}
          </div>
        </div>
      </div>

      <div v-show="activeTab === 2">
        <div :key="feature.id" v-for="feature in Terminated">
          <div class="container">
            Feature name: {{ feature.name }}
            <br />
            Feature description:{{ feature.description }}
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
              Launched
            </button>
            <br />
            <button
              id="terminate_button"
              type="button"
              v-on:click="updateTerminate(feature.id)"
            >
              Terminate
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

      <div v-show="activeTab === 2">
        <div :key="feature.id" v-for="feature in Terminated">
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
  getDoc,
  setDoc,
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
import Popup from "../components/Popup.vue";

export default {
  components: {
    Popup,
  },
  props: {
    projectTitle: String,
  },
  data() {
    return {
      activeTab: 0,
      showPopup: false,
      popupTitle: "Add Feature",
      formData: {
        name: "",
        description: "",
      },
      tabs: ["To do", "Launched", "Terminated"],
      to_do: [],
      launched: [],
      terminated: [],
      userAccount: "",
      userName: "",
      userPic: "",
    };
  },
  methods: {
    async updateLaunched(feature_id) {
      const selectedRef = doc(
        db,
        "projects",
        this.projectTitle,
        "Feature",
        feature_id
      );
      await updateDoc(selectedRef, {
        launched: true,
      });
      window.location.reload();
    },
    async updateTerminate(feature_id) {
        const selectedRef = doc(
          db,
          "projects",
          this.projectTitle,
          "Feature",
          feature_id
        );
        await updateDoc(selectedRef, {
          terminate: true,
        });
    },
    async display_features() {
      let allDocuments = await getDocs(
        collection(db, "projects", this.projectTitle, "Feature")
      );
      allDocuments.forEach((docs) => {
        let documentData = docs.data();
        let feature_id = documentData.feature_id;
        let feature_name = documentData.name;
        let feature_description = documentData.description;
        let status = documentData.launched;
        let term = documentData.terminate;

        if (!status && !term) {
          this.to_do.push({
            id: feature_id,
            name: feature_name,
            description: feature_description,
          });
        } else if (status && !term) {
          this.launched.push({
            id: feature_id,
            name: feature_name,
            description: feature_description,
          });
        } else {
          this.terminated.push({
            id: feature_id,
            name: feature_name,
            description: feature_description,
          });
        }
      });
    },
    onSubmit(e, formData) {
      e.preventDefault();
      if (!this.formData.name) {
        alert("Please add Feature name");
        return;
      } else if (!this.formData.description) {
        alert("Please add Feature description");
        return;
      }
      try {
        const doc_id = Math.floor(Math.random() * 101).toString();
        getDoc(doc(db, "projects", this.projectTitle, "Feature", doc_id)).then(
          (docSnap) => {
            if (docSnap.exists()) {
              console.log("exist");
              const docRef = setDoc(
                doc(
                  db,
                  "projects",
                  this.projectTitle,
                  "Feature",
                  Math.floor(Math.random() * 101).toString()
                ),
                {
                  feature_id: doc_id,
                  name: this.formData.name,
                  description: this.formData.description,
                  launched: false,
                  terminate: false,
                }
              ).then(() => {
                window.location.reload();
              });
            } else {
              const docRef = setDoc(
                doc(db, "projects", this.projectTitle, "Feature", doc_id),
                {
                  feature_id: doc_id,
                  name: this.formData.name,
                  description: this.formData.description,
                  launched: false,
                  terminate: false,
                }
              ).then(() => {
                window.location.reload();
              });
            }
          }
        );
      } catch (error) {
        console.error("Error adding document: ", error);
      }
      this.showPopup = !this.showPopup;
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
  async mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.displayaccount(user.email);
        this.displaydetails(user.email);
      }
    });
    this.display_features();
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
#terminate_button {
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
