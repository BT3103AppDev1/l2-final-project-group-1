<template>
    <p id = "projectTitle">  &#91;Metaverse Project&#93; Competitor Analysis</p>
    <hr>
    <p id = "header">Workload Tracker</p>
    <p id = "mywork"> &nbsp; My Work</p>
    <hr>
    <div id="tasktable">
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Scope</th>
                    <th>End date</th>
                    <th>Completed</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="task in tasks" :key="task.id">
                    <td>{{ task.id }}</td>
                    <td>{{ task.title }}</td>
                    <td>{{ task.scope }}</td>
                    <td>{{ task.endDate }}</td>
                    <td><input type="checkbox" v-model="task.completed"></td>
                </tr>
            </tbody>
        </table>
        <br>
        <div id = "confirm-changes">
        <button @click="deleteCompletedTasks">Confirm changes</button>
        </div>
    </div>
    <div v-if =" this.userAccount == 'Employer'">
        <br>
        <br>
        <div>
            <h2>Add New Task</h2>
            <form @submit.prevent="addTask">
                <label for="title">Title:</label>
                <input type="text" id="title" v-model="newTask.title">
                <label for="scope">Scope:</label>
                <input type="text" id="scope" v-model="newTask.scope">
                <label for="endDate">End Date:</label>
                <input type="date" id="endDate" v-model="newTask.endDate">
                <button type="submit">Assign Task</button>
            </form>
        </div>
    </div>
</template>

<script>
import { auth, db } from "../firebase";
import { collection, getDocs, doc, deleteDoc, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default {
 
    data() {
        return {
            tasks: [
                { id: 1, title: 'Task 1', scope: 'Project A', endDate: '2023-03-30', completed: false },
                { id: 2, title: 'Task 2', scope: 'Project B', endDate: '2023-04-15', completed: false },
                { id: 3, title: 'Task 3', scope: 'Project C', endDate: '2023-04-30', completed: false },
            ],
            newTask: { title: '', scope: '', endDate: '' },
            nextTaskId: 4,
            userAccount:""
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



