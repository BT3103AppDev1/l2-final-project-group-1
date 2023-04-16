<template>
  <header>
    <p id="projectTitle">&#91;Metaverse Project&#93; Competitor Analysis</p>
    <hr />
    <br />
    <p>Project ID: {{ project_id }}</p>
    <p>Started: {{ project_start }}</p>
    <p>Due: {{ project_due }}</p>
    <p>Clients involved: {{ project_clients }}</p>
    <p>Goals: {{ project_goals }}</p>
    <p>Scope: {{ project_scope }}</p>
    <p>Status: {{ project_status }}</p>
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

export default {
  components: {},
  data() {
    return {
      userAccount: "",
      userName: "",
      userPic: "",
      project_id: "",
      project_start: "",
      project_due: "",
      project_clients: "",
      project_goals: "",
      project_scope: "",
      project_status: "",
    };
  },
  methods: {
    async displayProject() {
      const docRef = doc(db, "projects", "zkWKwHep410V9CNXcJEo");
      const docSnap = await getDoc(docRef);
      this.project_start = docSnap.data().startdate;
      this.project_due = docSnap.data().enddate;
      this.project_scope = docSnap.data().scope;
      this.project_goals = docSnap.data().goal;
      if (docSnap.data().ongoing) {
        this.project_status = "Ongoing";
      } else {
        this.project_status = "Completed";
      }
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
