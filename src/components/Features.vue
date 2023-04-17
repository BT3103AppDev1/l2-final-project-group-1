<template>
  <header>
    <p id="projectTitle">{{ projectTitle }}</p>  
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
    <div>
      <div
        v-if="
          this.userAccount === 'Employee' ||
          this.userAccount === 'External stakeholder'
        "
      >
        <div class="content">
          <div v-show="activeTab === 0" class="featureContainer">
            <div :key="feature.id" v-for="feature in to_do">
              <div class="container">
                <u> {{ feature.name }} </u>
                <br />
                Feature description: {{ feature.description }}
              </div>
            </div>
          </div>

          <div v-show="activeTab === 1">
            <div v-show="activeTab === 1" class="featureContainer">
              <div :key="feature.id" v-for="feature in launched">
                <div class="container">
                  <u> {{ feature.name }} </u>
                  <br />
                  Feature description: {{ feature.description }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="this.userAccount === 'Employer'">
        <div class="content">
          <div v-show="activeTab === 0" class="featureContainer">
            <button class="button-27" role="button" @click="showPopup = true">
              New Feature +
            </button>
            <div :key="feature.id" v-for="feature in to_do">
              <div class="container">
                <u> {{ feature.name }} </u>
                <br />
                Feature description: {{ feature.description }}
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

          <div v-show="activeTab === 1" class="featureContainer">
            <div :key="feature.id" v-for="feature in launched">
              <div class="container">
                <u> {{ feature.name }} </u>
                <br />
                Feature description: {{ feature.description }}
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

        <div v-show="activeTab === 2">
          <div :key="feature.id" v-for="feature in terminated">
            <div class="container">
              Feature name: {{ feature.name }}
              <br />
              Feature description:{{ feature.description }}
            </div>
          </div>
        </div>

        </div>
      </div>
      <popup :title="popupTitle" v-if="showPopup" @close="showPopup = false">
        <form @submit="onSubmit" class="add-form">
          <div class="form-control">
            <label>Feature name</label>
            <input type="text" v-model="formData.name" name="name" />
            <label>Feature Description</label>
            <input
              type="text"
              v-model="formData.description"
              name="description"
            />
          </div>
          <input type="submit" value="Add Feature" class="btnBlock" />
        </form>
      </popup>
    </div>
  </header>
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

button {
  text-align: left;
  vertical-align: top;
}

#projectTitle {
  font-size: 25px;
  text-align: center;
  font-weight: 600;
  margin-bottom: 20px;
} 

#mywork {
  font-size: 15pt;
  font-weight: bold;
}
#confirm-changes {
  align-self: flex-end;
  background-color: #4a4e69;
  color: #ffffff;
  border-radius: 12px;
  text-align: center;
  margin: 4px 2px;
  cursor: pointer;
  padding: 5px 10px 5px 10px;
  border-style: solid;
  border-color: #4a4e69;
  float: right;
}

.add-button {
  position: fixed;
  top: 200px;
  right: 250px;
}
.button-27 {
  position: fixed;
  top: 200px;
  right: 250px;
  appearance: none;
  background-color: #6d79b4;
  border: 2px solid #ffffff;
  border-radius: 15px;
  box-sizing: border-box;
  color: #ffffff;
  cursor: pointer;
  display: inline-block;
  font-family: Roobert, -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  font-size: 16px;
  font-weight: 600;
  line-height: normal;
  margin: 0;
  min-height: 50px;
  min-width: 0;
  outline: none;
  padding: 13px 24px;
  text-align: center;
  text-decoration: none;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  will-change: transform;
}
.button-27:disabled {
  pointer-events: none;
}

.btnBlock {
  background-color:var(--primary);
  color:var(--dark);
  border: none;
  width: 150px;
  height: 30px;
  border-radius: 10px;
  font-weight: 600;
}
.button-27:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}
.button-27:active {
  box-shadow: none;
  transform: translateY(0);
}
.popup { 
  width: 600px;
  height: 400px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border: 1px solid black;
  z-index: 9999;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
.form-control {
  margin: 20px 0;
  width: 500px;
}
.form-control label {
  display: block;
}
.form-control input {
  width: 450px;
  height: 40px;
  margin: 5px;
  padding: 3px 7px;
  font-size: 17px;
}
.form-control-check {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form-control-check label {
  flex: 1;
}
.form-control-check input {
  flex: 2;
  height: 20px;
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
.container {
  position: relative;
  color: black;
  max-width: 420px;
  min-width: 420px;
  min-height: 200px;
  max-height: 200px;
  margin-bottom: 5%;
  margin-left: 40px;
  overflow: auto;
  border: 1px solid steelblue;
  font-size: 1.2vw;
  padding: 3%;
  border-radius: 5px;
  /* margin-left: 50px; */
}
.featureContainer {
  margin-top: 2%;
  max-width: 95%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
</style>
