<template> 
  <header>
    <p id="projectTitle">{{ projectTitle }}</p>
    <hr />
    <p v-if="this.risk === 0" class="riskStatus" id="low"><strong style="font-weight: 500;">Your Project is On Track</strong></p>
    <p v-if="this.risk === 1" class="riskStatus" id="slight"><strong style="font-weight: 500;">Your Project is Slightly at Risk</strong></p>
    <p v-if="this.risk === 2" class="riskStatus" id="high"><strong style="font-weight: 500;">Your Project is at Risk</strong></p>
  </header>
  <div class="chart-container">
    <div id="chart1">
      <h3>Number of Issues raised</h3>
      <pie-chart class="user" width="500px" :data="chartdata"></pie-chart>
    </div>
    <div id="chart2">
      <h3>Unresolved issues</h3>
      <h1>{{ unresolved }}</h1>
    </div>
    <div id="chart3">
      <h3>Incompleted features</h3>
      <bar-chart class="user" width="500px" :data="chartdata3" :options="chartOptions"></bar-chart>
    </div>
    <div id="chart4">
      <h3>Issues Priority</h3>
      <pie-chart class="user" width="500px" :data="chartdata4"></pie-chart>
    </div>

    <div id="chart5">
      <h3>Workload Status</h3>
      <bar-chart class="user" width="500px" :data="chartdata5" :options="chartOptions"></bar-chart>
    </div>
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
      resolved: 0,
      userAccount: "",
      chartdata: {},
      //   chartdata2: { "Item 1": 15, "Item 2": 20, "Item 3": 25, "Item 4": 40 },
      chartdata3: {},
      chartdata4: {},
      selected: "",
      chartdata5: {},
      chartOptions: {
        scales: {
          yAxes: [{
            ticks: {
                beginAtZero: true,
                min: 0,
                max: 10,
                stepSize: 1,
            }
          }]
        }
      },
      completedWordload: 0,
      uncompletedWordload: 0,
      risk: 0,
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
            let resolvedIssues = 0;
            let allDocuments = await getDocs(
                collection(db, "projects", this.projectTitle, "Internal_Issue")
            );
            allDocuments.forEach((docs) => {
                let documentData = docs.data();
                if (documentData.resolved == false) {
                unresolved_internal = unresolved_internal + 1;
                }
                else {
                    resolvedIssues = resolvedIssues + 1;
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
                else {
                    resolvedIssues = resolvedIssues + 1;
                }
            });
            this.unresolved = unresolved_internal;
            this.resolved = resolvedIssues;
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
        async display_chart4() {
            let high = 0;
            let medium = 0;
            let low = 0;
            let allDocuments = await getDocs(
                collection(db, "projects", this.projectTitle, "Internal_Issue")
            );
            allDocuments.forEach((docs) => {
                let documentData = docs.data();
                if (documentData.issue_priority == "H") {
                high = high + 1;
                } else if (documentData.issue_priority == "H") {
                medium = medium + 1;
                } else {
                low = low + 1;
                }
            });
            let allDocuments_2 = await getDocs(
                collection(db, "projects", this.projectTitle, "External_Issue")
            );
            allDocuments_2.forEach((docs) => {
                let documentData = docs.data();
                if (documentData.issue_priority == "H") {
                high = high + 1;
                } else if (documentData.issue_priority == "H") {
                medium = medium + 1;
                } else {
                low = low + 1;
                }
            });
            this.chartdata4 = { High: high, Medium: medium, Low: low };
        },
        async displayaccount(useremail) {
            const Snapshot = await getDocs(collection(db, "userinfo"));
            Snapshot.forEach((doc) => {
                if (doc.data().email === useremail) {
                this.userAccount = doc.data().account_type;
                }
            });
        },
        async outstandingWorkLoad() {
            let completedWork = 0;
            let uncompletedWork = 0;
            const collectionRef = collection(db, "projects", this.projectTitle, "workload")
            const querySnapshot = await getDocs(collectionRef)
            for (const docu of querySnapshot.docs) {
                const oldTasks = docu.data().task;
                for (const taskId in oldTasks) {
                    const tempTask = oldTasks[taskId];
                    if (tempTask.completed === false) {
                        uncompletedWork += 1 
                    } else {
                        completedWork += 1
                    }
                }
            }
            this.chartdata5 = { "Completed Work": completedWork, "Uncompleted Work" : uncompletedWork }
            this.completedWordload = completedWork;
            this.uncompletedWordload = uncompletedWork;
        },

        getStatus() {
            const issueResolutionRate = 1
            const outstandingWorkloadPercentage = 0
            if (this.resolved > 0 || this.unresolved > 0) {
                issueResolutionRate = this.resolved / (this.resolved + this.unresolved)
            }
            if (this.completedWordload > 0 || this.uncompletedWordload > 0) {
                outstandingWorkloadPercentage = this.uncompletedWordload / (this.completedWordload + this.uncompletedWordload)
            }
            if (issueResolutionRate <= 0.5 || outstandingWorkloadPercentage >= 0.2) {
                this.risk = 2;
            }
            if (issueResolutionRate >= 0.7 && outstandingWorkloadPercentage < 0.1) {
                this.risk = 1;
            }
            if (this.resolved === 0 && this.unresolved === 0 && this.completedWordload === 0 && this.uncompletedWordload === 0) {
                this.risk = 0;
            }
            else {
                this.risk = 0;
            }
        }
    },
    
    async mounted() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.displayaccount(user.email);
            }
        });
        await this.outstandingWorkLoad();
        console.log(this.chartdata5);
        this.display_chart1();
        this.display_chart2();
        this.display_chart3();
        this.display_chart4();
        console.log(this.chartdata5);
        this.getStatus();
    },
    props: {
        projectTitle: String,
    },
};
</script>

    <style scoped>

    .dashCon {
        background-image: url('/src/assets/aura.png');
        background-size: cover;
    }
    #projectTitle {
    font-size: 25px;
    font-weight: 600;
    text-align: center;
    margin-top: 10px;
    } 

    #app {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Set the height to fill the entire viewport */
    }

    .chart-container {
    margin: 2em 0em 2em 2em;
    display: grid;
    grid-template-columns: 45% 45%;
    grid-row-gap: 2em;
    }

    .container2 {
    margin:0px 10px 10px 0px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    }
    
    #chart1,
    #chart2,
    #chart3,
    #chart4,
    #chart5 {
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

    .riskStatus {
        text-align: center;
        margin-top: 20px;
    }

    #slight {
        color: #d8bc2e;
    }
    
    #low {
        color: green;
    }

    #high {
        color: rgb(193, 36, 36);
    }
    </style>
