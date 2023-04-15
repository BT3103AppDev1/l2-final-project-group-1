<template>
  <div v-if="this.userAccount === 'Employee'">
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

    <div class="content">
      <div v-show="activeTab === 0">
        <div id="Current">
          <h3>Internal Issues</h3>
          <table id="internal_table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date raised</th>
                <th>Type</th>
                <th>Content</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="issue in internal_issues" :key="issue.id">
                <td>{{ issue.id }}</td>
                <td>{{ issue.date_raised }}</td>
                <td>{{ issue.type }}</td>
                <td>{{ issue.content }}</td>
                <td>{{ issue.priority }}</td>
              </tr>
            </tbody>
          </table>
          <br />
          <h3>External Issues</h3>
          <table id="external_table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date raised</th>
                <th>Type</th>
                <th>Content</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="issue in external_issues" :key="issue.id">
                <td>{{ issue.id }}</td>
                <td>{{ issue.date_raised }}</td>
                <td>{{ issue.type }}</td>
                <td>{{ issue.content }}</td>
                <td>{{ issue.priority }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-show="activeTab === 1">Resolved Issues</div>
    </div>
  </div>

  <div v-if="this.userAccount === 'Employer'">
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

    <div class="content">
      <div v-show="activeTab === 0">
        <div id="Current">
          <h3>Internal Issues</h3>
          <table id="internal_table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date raised</th>
                <th>Type</th>
                <th>Content</th>
                <th>Priority</th>
                <th>Resolve</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="issue in internal_issues" :key="issue.id">
                <td>{{ issue.id }}</td>
                <td>{{ issue.date_raised }}</td>
                <td>{{ issue.type }}</td>
                <td>{{ issue.content }}</td>
                <td>{{ issue.priority }}</td>
                <td><input type="checkbox" v-model="issue.resolved" /></td>
              </tr>
            </tbody>
          </table>
          <br />
          <h3>External Issues</h3>
          <table id="external_table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date raised</th>
                <th>Type</th>
                <th>Content</th>
                <th>Priority</th>
                <th>Resolve</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="issue in external_issues" :key="issue.id">
                <td>{{ issue.id }}</td>
                <td>{{ issue.date_raised }}</td>
                <td>{{ issue.type }}</td>
                <td>{{ issue.content }}</td>
                <td>{{ issue.priority }}</td>
                <td><input type="checkbox" v-model="issue.resolved" /></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div v-show="activeTab === 1">Resolved Issues</div>
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
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
export default {
  data() {
    return {
      activeTab: 0,
      tabs: ["Current", "Resolved"],
      internal_issues: [
        {
          id: 649,
          date_raised: "2023-01-29",
          type: "UI/UX Design",
          content: "Chart's legend are not clearly defined",
          priority: "H",
          resolved: false,
        },
        {
          id: 32,
          date_raised: "2023-02-18",
          type: "Report Analysis",
          content: "References for market share analysis are missing",
          priority: "L",
          resolved: false,
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
          resolved: false,
        },
      ],
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
#aligning {
  margin-top: 0px;
  margin-left: 0px;
}
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
.tab-container {
  display: flex;
  flex-direction: row;
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
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Set the height to fill the entire viewport */
}
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
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
  top: 20%;
  right: 190px;
}
</style>
