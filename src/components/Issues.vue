<template>
    <header>
        <p id = "projectTitle" >  &#91;Metaverse Project&#93; Competitor Analysis</p>
        <hr>
        <p id = "header">Issues</p>
        <IssuesNavBar />
    </header>
    <button>
      <img src="../assets/Issues_new_btn_crop-removebg-preview.png" alt="Add Issue" class="add-button">
    </button>
</template>


<script>
import { auth, db } from "../database/firebase";
import { collection, getDocs, doc, deleteDoc, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import IssuesNavBar from './IssuesNavBar.vue';
 

export default {
    components: {
        IssuesNavBar,
     },
    data() {
        return {
            activeTab: 0,
            tabs: ['Current', 'Resolved'],
            internal_issues: [
                { id: 649, date_raised: '2023-01-29', type: 'UI/UX Design', content: "Chart's legend are not clearly defined", priority: "H" },
                { id: 32, date_raised: '2023-02-18', type: 'Report Analysis', content: "References for market share analysis are missing", priority: "L" },
            ],
            external_issues: [
                { id: 648, date_raised: '2023-02-02', type: 'Chart Analysis', content: "Charts do not provide clear information on competitor's strengths", priority: "H" },
            ],
        }
    },
    methods: {
        deleteCompletedTasks() {
            this.tasks = this.tasks.filter(function(task) {
                return !task.completed;
            });
        },
        addTask: function() {
            if (!this.newTask.title || !this.newTask.scope || !this.newTask.endDate) {
                alert('Please fill in all fields.');
                return;
            }
            this.tasks.push({
                id: this.nextTaskId++,
                title: this.newTask.title,
                scope: this.newTask.scope,
                endDate: this.newTask.endDate,
                completed: false
            });
            this.newTask.title = '';
            this.newTask.scope = '';
            this.newTask.endDate = '';
        },
        async displayaccount(useremail) {
            const Snapshot = await getDocs(collection(db, "userinfo"));
            Snapshot.forEach((doc) => {
                if (doc.data().email === useremail) {
                this.userAccount = doc.data().account_type;
                }
            });
        }
    },
        async mounted() {
            onAuthStateChanged(auth, (user) => {
                if (user) {
                    this.displayaccount(user.email)
                }
            })
        },
}
</script>

<style scoped>
header {
    position: absolute;
    margin-top: 0px;
    margin-left: -500px ;
}

button {
  text-align:left;
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
        color: #FFFFFF;
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
</style>