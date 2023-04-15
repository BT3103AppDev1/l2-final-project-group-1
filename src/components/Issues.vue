<template>
  <header>
    <p id="projectTitle">{{ projectTitle }}</p>
    <hr />
    <p id="header">Issues</p>
    <IssuesNavBar :projectTitle="this.projectTitle" />
  </header>
  <div
    v-if="
      this.userAccount === 'Employee' ||
      this.userAccount === 'External stakeholder'
    "
  >
    <button class="button-27" role="button" @click="showPopup = true">
      New Issue +
    </button>
  </div>
  <div v-if="this.userAccount === 'Employee'">
    <popup :title="popupTitle" v-if="showPopup" @close="showPopup = false">
      <form @submit="onSubmit_internal" class="add-form">
        <div class="form-control">
          <label>Date raised</label>
          <input type="date" v-model="formData.date" name="start-date" />
          <label>Issue Type</label>
          <input type="text" v-model="formData.type" name="add-type" />
          <label>Issue Content</label>
          <input type="text" v-model="formData.content" name="add-content" />
          <label>Issue Priority</label>
          <input type="text" v-model="formData.priority" name="add-priority" />
        </div>
        <input type="submit" value="Add Issue" class="btn btn-block" />
      </form>
    </popup>
  </div>
  <div v-if="this.userAccount === 'External stakeholder'">
    <popup :title="popupTitle" v-if="showPopup" @close="showPopup = false">
      <form @submit="onSubmit_external" class="add-form">
        <div class="form-control">
          <label>Date raised</label>
          <input type="date" v-model="formData.date" name="start-date" />
          <label>Issue Type</label>
          <input type="text" v-model="formData.type" name="add-type" />
          <label>Issue Content</label>
          <input type="text" v-model="formData.content" name="add-content" />
          <label>Issue Priority</label>
          <input type="text" v-model="formData.priority" name="add-priority" />
        </div>
        <input type="submit" value="Add Issue" class="btn btn-block" />
      </form>
    </popup>
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
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import IssuesNavBar from "./IssuesNavBar.vue";
import Popup from "../components/Popup.vue";
export default {
  components: {
    IssuesNavBar,
    Popup,
  },
  props: {
    projectTitle: String,
  },
  data() {
    return {
      activeTab: 0,
      showPopup: false,
      popupTitle: "Add Issue",
      formData: {
        content: "",
        date: "",
        priority: "",
        type: "",
      },
      tabs: ["Current", "Resolved"],
      // internal_issues: [
      //   {
      //     id: 649,
      //     date_raised: "2023-01-29",
      //     type: "UI/UX Design",
      //     content: "Chart's legend are not clearly defined",
      //     priority: "H",
      //   },
      //   {
      //     id: 32,
      //     date_raised: "2023-02-18",
      //     type: "Report Analysis",
      //     content: "References for market share analysis are missing",
      //     priority: "L",
      //   },
      // ],
      // external_issues: [
      //   {
      //     id: 648,
      //     date_raised: "2023-02-02",
      //     type: "Chart Analysis",
      //     content:
      //       "Charts do not provide clear information on competitor's strengths",
      //     priority: "H",
      //   },
      // ],
      userAccount: "",
      userName: "",
      userPic: "",
    };
  },
  async mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.displaydetails(user.email);
      }
    });
  },
  methods: {
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
    onSubmit_internal(e, formData) {
      e.preventDefault();
      if (!this.formData.content) {
        alert("Please add issue content");
        return;
      } else if (!this.formData.type) {
        alert("Please add issue type");
        return;
      } else if (!this.formData.priority) {
        alert("Please add issue priority");
        return;
      } else if (!this.formData.date) {
        alert("Please add issue date");
        return;
      }
      try {
        const doc_id = Math.floor(Math.random() * 101).toString();
        getDoc(
          doc(db, "projects", this.projectTitle, "Internal_Issue", doc_id)
        ).then((docSnap) => {
          if (docSnap.exists()) {
            console.log("exist");
            const docRef = setDoc(
              doc(
                db,
                "projects",
                this.projectTitle,
                "Internal_Issue",
                Math.floor(Math.random() * 101).toString()
              ),
              {
                issue_id: doc_id,
                raised_date: this.formData.date,
                content: this.formData.content,
                issue_type: this.formData.type,
                issue_priority: this.formData.priority,
              }
            );
          } else {
            const docRef = setDoc(
              doc(db, "projects", this.projectTitle, "Internal_Issue", doc_id),
              {
                issue_id: doc_id,
                raised_date: this.formData.date,
                content: this.formData.content,
                issue_type: this.formData.type,
                issue_priority: this.formData.priority,
                resolved: false,
              }
            );
          }
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
      this.showPopup = !this.showPopup;
    },
    onSubmit_external(e, formData) {
      e.preventDefault();
      if (!this.formData.content) {
        alert("Please add issue content");
        return;
      } else if (!this.formData.type) {
        alert("Please add issue type");
        return;
      } else if (!this.formData.priority) {
        alert("Please add issue priority");
        return;
      } else if (!this.formData.date) {
        alert("Please add issue date");
        return;
      }
      try {
        const doc_id = Math.floor(Math.random() * 101).toString();
        getDoc(
          doc(db, "projects", this.projectTitle, "External_Issue", doc_id)
        ).then((docSnap) => {
          if (docSnap.exists()) {
            console.log("exist");
            const docRef = setDoc(
              doc(
                db,
                "projects",
                this.projectTitle,
                "External_Issue",
                Math.floor(Math.random() * 101).toString()
              ),
              {
                issue_id: doc_id,
                raised_date: this.formData.date,
                content: this.formData.content,
                issue_type: this.formData.type,
                issue_priority: this.formData.priority,
              }
            );
          } else {
            const docRef = setDoc(
              doc(db, "projects", this.projectTitle, "External_Issue", doc_id),
              {
                issue_id: doc_id,
                raised_date: this.formData.date,
                content: this.formData.content,
                issue_type: this.formData.type,
                issue_priority: this.formData.priority,
                resolved: false,
              }
            );
          }
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
      this.showPopup = !this.showPopup;
    },
    async displayaccount(useremail) {
      const Snapshot = await getDocs(collection(db, "userinfo"));
      Snapshot.forEach((doc) => {
        if (doc.data().email === useremail) {
          this.userAccount = doc.data().account_type;
        }
      });
    },
    deleteCompletedTasks() {
      this.tasks = this.tasks.filter(function (task) {
        return !task.completed;
      });
    },
    addTask: function () {
      if (!this.newTask.title || !this.newTask.scope || !this.newTask.endDate) {
        alert("Please fill in all fields.");
        return;
      }
      this.tasks.push({
        id: this.nextTaskId++,
        title: this.newTask.title,
        scope: this.newTask.scope,
        endDate: this.newTask.endDate,
        completed: false,
      });
      this.newTask.title = "";
      this.newTask.scope = "";
      this.newTask.endDate = "";
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
      }
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
.container {
  color: white;
  max-width: 500px;
  margin: 30px auto;
  overflow: auto;
  min-height: 300px;
  border: 1px solid steelblue;
  padding: 30px 150px 30px 150px;
  border-radius: 5px;
  background-image: url("/src/assets/office_image.jpg");
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
.add-form {
  margin-bottom: 40px;
}
.add-button {
  position: fixed;
  top: 200px;
  right: 250px;
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
</style>
