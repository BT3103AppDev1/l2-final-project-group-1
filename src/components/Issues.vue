<template>
  <header>
    <p id="projectTitle">{{ projectTitle }}</p>

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
      <br /><br />

      <div class="content">
        <div v-show="activeTab === 0">
          <div id="Current">
            <button class="button-27" role="button" @click="showPopup = true">
              + New Issue
            </button>
            <h3 style="margin-bottom: 1em">Internal Issues</h3>
            <table id="internal_table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Raised by</th>
                  <th>Date raised</th>
                  <th>Type</th>
                  <th>Content</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="issue in internal_issues_current" :key="issue.id">
                  <td>{{ issue.id }}</td>
                  <td>{{ issue.raised }}</td>
                  <td>{{ issue.date_raised }}</td>
                  <td>{{ issue.type }}</td>
                  <td>{{ issue.content }}</td>
                  <td>{{ issue.priority }}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <h3 style="margin-bottom: 1em; margin-top: 3em">External Issues</h3>
            <table id="external_table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Raised by</th>
                  <th>Date raised</th>
                  <th>Type</th>
                  <th>Content</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="issue in external_issues_current" :key="issue.id">
                  <td>{{ issue.id }}</td>
                  <td>{{ issue.raised }}</td>
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
            <h3 style="margin-bottom: 1em">Internal Issues</h3>
            <table id="internal_table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Resolved by</th>
                  <th>Date raised</th>
                  <th>Type</th>
                  <th>Content</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="issue in internal_issues_resolved" :key="issue.id">
                  <td>{{ issue.id }}</td>
                  <td>{{ issue.resolved_by }}</td>
                  <td>{{ issue.date_raised }}</td>
                  <td>{{ issue.type }}</td>
                  <td>{{ issue.content }}</td>
                  <td>{{ issue.priority }}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <h3 style="margin-bottom: 1em; margin-top: 3em">External Issues</h3>
            <table id="external_table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Resolved by</th>
                  <th>Date raised</th>
                  <th>Type</th>
                  <th>Content</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="issue in external_issues_resolved" :key="issue.id">
                  <td>{{ issue.id }}</td>
                  <td>{{ issue.resolved_by }}</td>
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
                  <th>Raised by</th>
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
                  <td>{{ issue.raised }}</td>
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
                  <th>Raised by</th>
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
                  <td>{{ issue.raised }}</td>
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
                  <th>Resolved by</th>
                  <th>Date raised</th>
                  <th>Type</th>
                  <th>Content</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="issue in internal_issues_resolved" :key="issue.id">
                  <td>{{ issue.id }}</td>
                  <td>{{ issue.resolved_by }}</td>
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
                  <th>Resolved by</th>
                  <th>Date raised</th>
                  <th>Type</th>
                  <th>Content</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="issue in external_issues_resolved" :key="issue.id">
                  <td>{{ issue.id }}</td>
                  <td>{{ issue.resolved_by }}</td>
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
          <button class="button-27" role="button" @click="showPopup = true">
            New Issue +
          </button>
          <div id="Current">
            <h3>External Issues</h3>
            <table id="external_table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Raised by</th>
                  <th>Date raised</th>
                  <th>Type</th>
                  <th>Content</th>
                  <th>Priority</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="issue in external_issues_current" :key="issue.id">
                  <td>{{ issue.id }}</td>
                  <td>{{ issue.raised }}</td>
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
                <th>Resolved by</th>
                <th>Date raised</th>
                <th>Type</th>
                <th>Content</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="issue in external_issues_resolved" :key="issue.id">
                <td>{{ issue.id }}</td>
                <td>{{ issue.resolved_by }}</td>
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
            <input
              type="text"
              v-model="formData.priority"
              name="add-priority"
              placeholder="H/M/L"
            />
          </div>
          <input type="submit" value="Add Issue" class="btnBlock" />
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
            <input
              type="text"
              v-model="formData.priority"
              name="add-priority"
            />
          </div>
          <input type="submit" value="Add Issue" class="btnBlock" />
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
  components: {
    Popup,
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
                raised_by: this.userName,
                resolved: false,
                resolved_by: "",
              }
            ).then(() => {
              window.location.reload();
            });
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
                raised_by: this.userName,
                resolved_by: "",
              }
            ).then(() => {
              window.location.reload();
            });
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
                resolved: false,
                raised_by: this.userName,
                resolved_by: "",
              }
            ).then(() => {
              window.location.reload();
            });
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
                raised_by: this.userName,
                resolved_by: "",
              }
            ).then(() => {
              window.location.reload();
            });
          }
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
      this.showPopup = !this.showPopup;
    },
    async display_internal() {
      let allDocuments = await getDocs(
        collection(db, "projects", this.projectTitle, "Internal_Issue")
      );
      allDocuments.forEach((docs) => {
        let documentData = docs.data();
        let issue_raised = documentData.raised_by;
        let issue_resolved = documentData.resolved_by;
        let issue_id = documentData.issue_id;
        let raised_date = documentData.raised_date;
        let content = documentData.content;
        let issue_type = documentData.issue_type;
        let issue_priority = documentData.issue_priority;
        let resolve_status = documentData.resolved;

        if (!resolve_status) {
          this.internal_issues_current.push({
            id: issue_id,
            raised: issue_raised,
            resolved_by: issue_resolved,
            date_raised: raised_date,
            type: issue_type,
            content: content,
            priority: issue_priority,
            resolved: resolve_status,
          });
        } else {
          this.internal_issues_resolved.push({
            id: issue_id,
            raised: issue_raised,
            resolved_by: issue_resolved,
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
        resolved_by: this.userName,
      });
      window.location.reload();
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
        resolved_by: this.userName,
      });
      window.location.reload();
    },
    async display_external() {
      let allDocuments = await getDocs(
        collection(db, "projects", this.projectTitle, "External_Issue")
      );
      allDocuments.forEach((docs) => {
        let documentData = docs.data();
        let issue_raised = documentData.raised_by;
        let issue_resolved = documentData.resolved_by;
        let issue_id = documentData.issue_id;
        let raised_date = documentData.raised_date;
        let content = documentData.content;
        let issue_type = documentData.issue_type;
        let issue_priority = documentData.issue_priority;
        let resolve_status = documentData.resolved;

        if (!resolve_status) {
          this.external_issues_current.push({
            id: issue_id,
            raised: issue_raised,
            resolved_by: issue_resolved,
            date_raised: raised_date,
            type: issue_type,
            content: content,
            priority: issue_priority,
            resolved: resolve_status,
          });
        } else {
          this.external_issues_resolved.push({
            id: issue_id,
            raised: issue_raised,
            resolved_by: issue_resolved,
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
header {
  position: absolute;
  margin-top: 0px;
  margin-left: -500px;
}
button {
  text-align: left;
  vertical-align: top;
}

#Current {
  display: flex;
  flex-direction: column;
}

#projectTitle {
  font-size: 25px;
  font-weight: 600;
  text-align: center;
  margin-top: 10px;
  margin-left: -150px;
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
  color: #444;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}
.tab button.active {
  color: var(--dark);
  border-bottom: 3px solid var(--primary-alt);
}
button {
  text-align: left;
  vertical-align: top;
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
  color: #444;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
  border-bottom: 1px solid var(--light-grey);
}
.tab button.active {
  color: #444;
  background-color: none;
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
  width: 1100px;
}
th,
td {
  border: 1px solid black;
  padding: 8px;
  text-align: left;
}
th {
  background-color: var(--light-grey);
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
.button-27 {
  position: relative;
  width: 150px;
  height: 40px;
  margin-bottom: 20px;
  background-color: var(--dark-purple);
  border-radius: 15px;
  box-sizing: border-box;
  color: var(--light);
  cursor: pointer;
  display: inline-block;
  font-size: 16px;
  font-weight: 500;
  line-height: normal;
  min-height: 30px;
  padding: 10px 15px;
  text-align: center;
  transition: all 300ms cubic-bezier(0.23, 1, 0.32, 1);
  touch-action: manipulation;
  will-change: transform;
}
.button-27:disabled {
  pointer-events: none;
}
.button-27:hover {
  background-color: var(--dark);
}

.btnBlock {
  color: var(--dark);
  background-color: var(--primary-light);
  width: 100px;
  height: 30px;
  border-radius: 10px;
  font-weight: 600;
  border: none;
}
.button-27:active {
  box-shadow: none;
  transform: translateY(0);
}
.popup {
  width: 750px;
  height: 500px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 15px;
  border: 1px solid black;
  z-index: 9999;
  flex-direction: column;
  align-items: center;
}
.add-form {
  margin-left: 90px;
  margin-bottom: 20px;
  width: 600px;
}
.add-button {
  position: fixed;
  top: 200px;
  right: 250px;
}
.form-control {
  margin: 20px 0;
  width: 500px;
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
