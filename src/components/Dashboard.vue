<template>
  <header>
    <p id="projectTitle">{{ projectTitle }}</p>
    <hr />
    <p id="header">Dashboard</p>
  </header>
  <div id="pageContainer" class="container">
    <div id="chart1">
      <h3>Number of Issues raised</h3>
      <pie-chart class="user" width="500px" :data="chartdata"></pie-chart>
    </div>
    <div id="chart2">
      <h3>Unresolved issues</h3>
      <h1>{{ unresolved }}</h1>
    </div>
    <br />
    <div id="chart3">
      <h3>Incompleted features</h3>
      <bar-chart class="user" width="500px" :data="chartdata3"></bar-chart>
    </div>
    <br />
  </div>
</template>

<script scoped>
import { onMounted, reactive } from "vue";
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
  name: "Dashboard",
  data() {
    return {
      unresolved: 0,
      nextTaskId: 4,
      userAccount: "",
      chartdata: {},
      chartdata2: { "Item 1": 15, "Item 2": 20, "Item 3": 25, "Item 4": 40 },
      chartdata3: {},
      selected: "",
    };
  },
  props: {
    projectTitle: String,
  },
  methods: {
    async display_chart1() {
      let internal = 0;
      let external = 0;
      let allDocuments = await getDocs(
        collection(db, "projects", this.projectTitle, "Internal_Issue")
      );
      allDocuments.forEach((docs) => {
        internal = internal + 1;
      });
      let allDocuments_2 = await getDocs(
        collection(db, "projects", this.projectTitle, "External_Issue")
      );
      allDocuments_2.forEach((docs) => {
        external = external + 1;
      });
      this.chartdata = {
        "Internal Issues": internal,
        "External Issues": external,
      };
    },
    async display_chart2() {
      let unresolved_internal = 0;
      let allDocuments = await getDocs(
        collection(db, "projects", this.projectTitle, "Internal_Issue")
      );
      allDocuments.forEach((docs) => {
        let documentData = docs.data();
        if (documentData.resolved == false) {
          unresolved_internal = unresolved_internal + 1;
        }
      });
      let allDocuments_2 = await getDocs(
        collection(db, "projects", this.projectTitle, "External_Issue")
      );
      allDocuments_2.forEach((docs) => {
        let documentData = docs.data();
        if (documentData.resolved == false) {
          unresolved_internal = unresolved_internal + 1;
        }
      });
      this.unresolved = unresolved_internal;
    },
    async display_chart3() {
      let to_do = 0;
      let launched = 0;
      let allDocuments = await getDocs(
        collection(db, "projects", this.projectTitle, "Feature")
      );
      allDocuments.forEach((docs) => {
        let documentData = docs.data();
        if (documentData.launched == false) {
          to_do = to_do + 1;
        } else {
          launched = launched + 1;
        }
      });
      this.chartdata3 = { "to do": to_do, launched: launched };
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
  mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.displayaccount(user.email);
      }
    });
    this.display_chart1();
    this.display_chart2();
    this.display_chart3();
  },
  props: {
    projectTitle: String,
  },
};
</script>

<style scoped>
#projectTitle {
  font-size: 32pt;
}
#header {
  font-size: 20pt;
  font-weight: bold;
}
#app {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh; /* Set the height to fill the entire viewport */
}

.pageContainer {
  margin-left: 70px;
  margin-top: 50px;
  display: flex;
  flex-direction: column;
}

.container {
  margin-top: 50px;
  max-width: 1000px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
#chart1,
#chart2,
#chart3 {
  position: relative;
  color: black;
  width: 100%;
  margin-left: 40px;
  margin-bottom: 5%;
  overflow: auto;
  border: 1px solid steelblue;
  font-size: 1.2vw;
  padding: 3%;
  border-radius: 2%;
}
</style>
