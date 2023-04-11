<template>
  <header>
    <p id="projectTitle">&#91;Metaverse Project&#93; Competitor Analysis</p>
    <hr />
    <p id="header">Issues</p>
    <IssuesNavBar />
  </header>
  <button @click="showPopup = true">
    <img
      src="../assets/Issues_new_btn_crop-removebg-preview.png"
      alt="Add Issue"
      class="add-button"
    />
  </button>
  <div>
    <popup :title="popupTitle" v-if="showPopup" @close="showPopup = false">
      <form @submit="onSubmit" class="add-form">
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
      internal_issues: [
        {
          id: 649,
          date_raised: "2023-01-29",
          type: "UI/UX Design",
          content: "Chart's legend are not clearly defined",
          priority: "H",
        },
        {
          id: 32,
          date_raised: "2023-02-18",
          type: "Report Analysis",
          content: "References for market share analysis are missing",
          priority: "L",
        },
      ],
      external_issues: [
        {
          id: 648,
          date_raised: "2023-02-02",
          type: "Chart Analysis",
          content:
            "Charts do not provide clear information on competitor's strengths",
          priority: "H",
        },
      ],
    };
  },
  methods: {
    deleteCompletedTasks() {
      this.tasks = this.tasks.filter(function (task) {
        return !task.completed;
      });
    },
    // addTask: function () {
    //   //   if (!this.newTask.title || !this.newTask.scope || !this.newTask.endDate) {
    //   //     alert("Please fill in all fields.");
    //   //     return;
    //   //   }
    //   //   this.tasks.push({
    //   //     id: this.nextTaskId++,
    //   //     title: this.newTask.title,
    //   //     scope: this.newTask.scope,
    //   //     endDate: this.newTask.endDate,
    //   //     completed: false,
    //   //   });
    //   //   this.newTask.title = "";
    //   //   this.newTask.scope = "";
    //   //   this.newTask.endDate = "";
    //   console.log("hi");
    // },
    onSubmit(e, formData) {
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
        getDoc(doc(db, "issues", doc_id)).then((docSnap) => {
          if (docSnap.exists()) {
            console.log("exist");
            const docRef = setDoc(
              doc(db, "issues", Math.floor(Math.random() * 101).toString()),
              {
                issue_id: doc_id,
                raised_date: this.formData.date,
                content: this.formData.content,
                issue_type: this.formData.type,
                issue_priority: this.formData.priority,
              }
            );
          } else {
            const docRef = setDoc(doc(db, "internal_issues", doc_id), {
              issue_id: doc_id,
              raised_date: this.formData.date,
              content: this.formData.content,
              issue_type: this.formData.type,
              issue_priority: this.formData.priority,
              resolved: false,
            });
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
