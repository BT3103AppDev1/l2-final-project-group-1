<template>
  <header>
    <p id="projectTitle">{{ projectTitle }}</p>
    <hr />
    <br />
    <img src="/src/assets/office_image.jpg" class="image" />
    <br />
    <div class="container2">
      <p>Project Name: {{ project_name }}</p>
      <p>Started: {{ project_start }}</p>
      <p>Due: {{ project_due }}</p>
      <p>Goal(s): {{ project_goals }}</p>
      <p>Scope: {{ project_scope }}</p>
      <p>Status: {{ project_status }}</p>
    </div>
    <button
      v-if="this.userAccount === 'Employer'"
      class="button"
      @click="showPopup = true"
    >
      Edit
    </button>
    <div>
      <popup :title="popupTitle" v-if="showPopup" @close="showPopup = false">
        <form @submit="onSubmit" class="add-form">
          <div class="form-control">
            <label>Project Name </label>
            <input type="text" v-model="formData.name" name="name" />
            <label>Project Start Date </label>
            <input type="text" v-model="formData.start" name="start" />
            <label>Project End Date</label>
            <input type="text" v-model="formData.end" name="due" />
            <label>Project Goal(s)</label>
            <input type="text" v-model="formData.goal" name="goal" />
            <label>Project Scope</label>
            <input type="text" v-model="formData.scope" name="scope" />
            <label>Project Status</label>
            <input type="text" v-model="formData.status" name="status" />
          </div>
          <input type="submit" value="Confirm changes" class="btn btn-block" />
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
import Popup from "./Popup.vue";

export default {
  components: { Popup },
  props: {
    projectTitle: String,
  },
  data() {
    return {
      showPopup: false,
      popupTitle: "Edit details",
      userAccount: "",
      userName: "",
      userPic: "",
      project_name: "",
      project_start: "",
      project_due: "",
      project_goals: "",
      project_scope: "",
      project_status: "",
      formData: {
        name: "",
        start: "",
        end: "",
        scope: "",
        goal: "",
        status: "",
      },
    };
  },
  methods: {
    onSubmit(e, formData) {
      const selectedRef = doc(db, "projects", this.projectTitle);
      updateDoc(selectedRef, {
        name: this.formData.name,
        status: this.formData.status,
        startdate: this.formData.start,
        enddate: this.formData.end,
        scope: this.formData.scope,
        goal: this.formData.goal,
      }).then(() => {
        window.location.reload();
      });
      this.showPopup = !this.showPopup;
    },
    async displayProject() {
      const docRef = doc(db, "projects", this.projectTitle);
      const docSnap = await getDoc(docRef);
      this.project_start = docSnap.data().startdate;
      this.project_due = docSnap.data().enddate;
      this.project_scope = docSnap.data().scope;
      this.project_goals = docSnap.data().goal;
      this.project_name = docSnap.data().project_name;
      if (docSnap.data().ongoing) {
        this.project_status = "Ongoing";
      } else {
        this.project_status = "Completed";
      }
      this.formData.name = this.project_name;
      this.formData.start = this.project_start;
      this.formData.end = this.project_due;
      this.formData.goal = this.project_goals;
      this.formData.scope = this.project_scope;
      this.formData.status = this.project_status;
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
      this.displayProject();
    });
  },
};
</script>

<style scoped>
header {
  position: absolute;
  margin-top: 0px;
  margin-left: -500px;
}

button {
  text-align: left;
  vertical-align: top;
}
#projectTitle {
  font-size: 32pt;
}
#header {
  font-size: 20pt;
  font-weight: bold;
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
.button-27:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}
.button-27:active {
  box-shadow: none;
  transform: translateY(0);
}
.popup {
  width: 50%;
  height: 90%;
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
}
.form-control label {
  display: block;
}
.form-control input {
  width: 100%;
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
.container2 {
  position: relative;
  color: black;
  margin-left: 2%;
  overflow: auto;
  font-size: 1.3vw;
  padding: 2%;
}
.image {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 70%;
}
.button {
  padding-top: 1%;
  padding-bottom: 1%;
  width: 10%;
  font-size: 1.15vw;
  border-radius: 4px;
  float: right;
  margin-bottom: 10%;
  margin-bottom: 10%;
  background-color: #4a4e69;
  color: #ffffff;
  text-align: center;
}

.button:hover {
  box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
  transform: translateY(-2px);
}
</style>
