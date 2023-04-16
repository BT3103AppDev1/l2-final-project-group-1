<template>
<button @click="addTask">Confirm changes</button>
</template>

<script>
import { auth, db } from "../database/firebase";
import { collection, getDocs, doc, deleteDoc, query, where, getDoc, setDoc, updateDoc} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
 


export default {
 
    data() {
        return {
            tasks: [
                { id: 1, title: 'Task 1', scope: 'Project A', endDate: '2023-03-30', completed: false },
                { id: 2, title: 'Task 2', scope: 'Project B', endDate: '2023-04-15', completed: false },
                { id: 3, title: 'Task 3', scope: 'Project C', endDate: '2023-04-30', completed: false },
            ],
            newTask: { title: '', scope: '', endDate: '', member: '' },
            nextTaskId: 4,
            userAccount:"",
            userName: "",
            tabs: ["My Work", "My Team"],
            activeTab: 0,
        }
    },
    methods: {
        deleteCompletedTasks() {
            this.tasks = this.tasks.filter(function(task) {
                return !task.completed;
            });
        },
        async addTask() {
            const docRef = doc(db, "projects", "KIM");
            const querySnapshot = await getDocs(collection(docRef, "workload"));
            const memberDocRef = doc(db, "projects", "KIM", "workload", "Jenny");
            for (const docum of querySnapshot.docs) {
                if (docum.data().member === "Jenny") {
                const taskArray = docum.data().task;
                taskArray[Object.keys(taskArray).length + 1] = ["hehe", "haha"]
                const workloadRef = collection(docRef, "workload")
                const memberDocRef = doc(workloadRef, docum.data().member)
                await setDoc(memberDocRef, { task: taskArray });
                }
            }
        },

        
        
        
        async displayaccount(useremail) {
            const Snapshot = await getDocs(collection(db, "userinfo"));
            Snapshot.forEach((doc) => {
                if (doc.data().email === useremail) {
                this.userAccount = doc.data().account_type;
                this.userName = doc.data().name;
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
    props: {
        projectTitle: String,
    },       
}
</script>

<style scoped>
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
    th, td {
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
        margin: 0px;
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
</style>



