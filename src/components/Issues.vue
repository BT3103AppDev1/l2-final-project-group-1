<template>
    <header>
        <p id = "projectTitle" >  &#91;Metaverse Project&#93; Competitor Analysis</p>
        <hr>
        <p id = "header">Issues</p>
        <IssuesNavBar />
    </header>
    <div v-if =" this.userAccount === 'Employee'">
        <button class="button-27" role="button"> New Issue +</button>
    </div>

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
            userAccount: "",
            userName: "",
            userPic: "",
        }
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

    .button-27 {
        position: fixed;
        top: 200px;
        right: 250px;
        appearance: none;
        background-color: #6d79b4;
        border: 2px solid #FFFFFF;
        border-radius: 15px;
        box-sizing: border-box;
        color: #FFFFFF;
        cursor: pointer;
        display: inline-block;
        font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
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
        transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
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

</style>