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
              <tr v-for="issue in internal_issues_current" :key="issue.id">
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
              <tr v-for="issue in external_issues_current" :key="issue.id">
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
      <div v-show="activeTab === 1">
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
              <tr v-for="issue in internal_issues_resolved" :key="issue.id">
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
              <tr v-for="issue in external_issues_resolved" :key="issue.id">
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
              <tr v-for="issue in internal_issues_current" :key="issue.id">
                <td>{{ issue.id }}</td>
                <td>{{ issue.date_raised }}</td>
                <td>{{ issue.type }}</td>
                <td>{{ issue.content }}</td>
                <td>{{ issue.priority }}</td>
                <!-- <td><input type="checkbox" v-model="issue.resolved" /></td> -->
                <td>
                  <button
                    id="internalbutton"
                    type="button"
                    v-on:click="internalchange(issue.id)"
                  >
                    Resolve
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <button id="internalbutton" type="button" v-on:click="internalchange">
            Confirm changes
          </button> -->
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
              <tr v-for="issue in external_issues_current" :key="issue.id">
                <td>{{ issue.id }}</td>
                <td>{{ issue.date_raised }}</td>
                <td>{{ issue.type }}</td>
                <td>{{ issue.content }}</td>
                <td>{{ issue.priority }}</td>
                <!-- <td><input type="checkbox" v-model="issue.resolved" /></td> -->
                <td>
                  <button
                    id="externalbutton"
                    type="button"
                    v-on:click="externalchange(issue.id)"
                  >
                    Resolve
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
          <!-- <button id="externalbutton" type="button" v-on:click="internalchange">
            Confirm changes
          </button> -->
        </div>
      </div>
      <div v-show="activeTab === 1">
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
              <tr v-for="issue in internal_issues_resolved" :key="issue.id">
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
              <tr v-for="issue in external_issues_resolved" :key="issue.id">
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
    </div>
  </div>
  <div v-if="this.userAccount === 'External stakeholder'">
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
              <tr v-for="issue in external_issues_current" :key="issue.id">
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
      <div v-show="activeTab === 1">
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
            <tr v-for="issue in external_issues_resolved" :key="issue.id">
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
      tabs: ["Current", "Resolved"],
      internal_issues_current: [],
      external_issues_current: [],
      internal_issues_resolved: [],
      external_issues_resolved: [],
      userAccount: "",
      userName: "",
      userPic: "",
    };
  },
  props: {
    projectTitle: String,
  },
  async mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.displaydetails(user.email);
        this.displayaccount(user.email);
      }
    });
    this.display_internal();
    this.display_external();
  },
  methods: {
    async display_internal() {
      let allDocuments = await getDocs(
        collection(db, "projects", this.projectTitle, "Internal_Issue")
      );
      allDocuments.forEach((docs) => {
        let documentData = docs.data();
        let issue_id = documentData.issue_id;
        let raised_date = documentData.raised_date;
        let content = documentData.content;
        let issue_type = documentData.issue_type;
        let issue_priority = documentData.issue_priority;
        let resolve_status = documentData.resolved;

        if (!resolve_status) {
          this.internal_issues_current.push({
            id: issue_id,
            date_raised: raised_date,
            type: issue_type,
            content: content,
            priority: issue_priority,
            resolved: resolve_status,
          });
        } else {
          this.internal_issues_resolved.push({
            id: issue_id,
            date_raised: raised_date,
            type: issue_type,
            content: content,
            priority: issue_priority,
            resolved: resolve_status,
          });
        }
      });
    },
    async externalchange(issue_id) {
      //   console.log(issue_id);
      const selectedRef = doc(
        db,
        "projects",
        this.projectTitle,
        "External_Issue",
        issue_id
      );
      await updateDoc(selectedRef, {
        resolved: true,
      });
    },
    async internalchange(issue_id) {
      //   console.log(issue_id);
      const selectedRef = doc(
        db,
        "projects",
        this.projectTitle,
        "Internal_Issue",
        issue_id
      );
      await updateDoc(selectedRef, {
        resolved: true,
      });
    },
    async display_external() {
      let allDocuments = await getDocs(
        collection(db, "projects", this.projectTitle, "External_Issue")
      );
      allDocuments.forEach((docs) => {
        let documentData = docs.data();
        let issue_id = documentData.issue_id;
        let raised_date = documentData.raised_date;
        let content = documentData.content;
        let issue_type = documentData.issue_type;
        let issue_priority = documentData.issue_priority;
        let resolve_status = documentData.resolved;

        if (!resolve_status) {
          this.external_issues_current.push({
            id: issue_id,
            date_raised: raised_date,
            type: issue_type,
            content: content,
            priority: issue_priority,
            resolved: resolve_status,
          });
        } else {
          this.external_issues_resolved.push({
            id: issue_id,
            date_raised: raised_date,
            type: issue_type,
            content: content,
            priority: issue_priority,
            resolved: resolve_status,
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
    deleteCompletedTasks() {
      this.tasks = this.tasks.filter(function (task) {
        return !task.completed;
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
.add-button {
  position: fixed;
  top: 20%;
  right: 190px;
}
/* #internalbutton {
  padding-top: 0.5%;
  padding-bottom: 0.5%;
  width: 10%;
  font-size: 1.15vw;
  border-radius: 4px;
  float: right;
  margin-top: 1%;
  background-color: #4a4e69;
  color: #ffffff;
  text-align: center;
} */
#externalbutton {
  background-color: #4a4e69;
  color: #ffffff;
  text-align: center;
  padding-top: 3%;
  padding-bottom: 3%;
  width: 100%;
  font-size: 1.15vw;
  border-radius: 4px;
}
#internalbutton {
  background-color: #4a4e69;
  color: #ffffff;
  text-align: center;
  padding-top: 3%;
  padding-bottom: 3%;
  width: 105%;
  font-size: 1.15vw;
  border-radius: 4px;
}
</style>
