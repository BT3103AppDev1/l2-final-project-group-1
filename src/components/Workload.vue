<template>
    <p id = "projectTitle">  &#91;Metaverse Project&#93; Competitor Analysis</p>
    <hr>
    <p id = "header">Workload Tracker</p>
    <hr>
    <div id="tasktable">
        <div v-if =" this.userAccount === 'Employee'">
            <p id = "mywork"> &nbsp; My Work</p>
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
        <div v-if =" this.userAccount === 'Employer'">
            <div class="tab">
                <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }" @click="activeTab = index">{{ tab }}</button>
            </div>
            <div v-show="activeTab === 0">
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
            <div v-show="activeTab === 1">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Scope</th>
                            <th>End date</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="task in tasksMembers" :key="task.id">
                            <td>{{ task.id }}</td>
                            <td>{{ task.member }}</td>
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
                <div>
                    <h2>Add New Task</h2>
                    <form @submit.prevent="() => addTask(this.projectTitle)">
                        <label for="employee">Employee:</label>
                        <input type="text" id="employee" v-model="newTask.member">
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
        </div>
    </div>
</template>

<script>
import { auth, db } from "../database/firebase";
import { collection, getDocs, doc, deleteDoc, query, where, getDoc, setDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
 

export default {
 
    data() {
        return {
            tasks: [],
            tasksMembers: [],
            newTask: { title: '', scope: '', endDate: '', member: '', completed: false },
            nextTaskId: 1,
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
            })
        },
        async addTask(projectTitle) {
            const docRef = doc(db, "projects", projectTitle);
            const querySnapshot = await getDocs(collection(docRef, "workload"));
            const memberDocRef = doc(db, "projects", projectTitle, "workload", this.newTask.member);
            for (const docum of querySnapshot.docs) {
                if (docum.data().member === this.newTask.member) {
                const tempSnapshot = await getDoc(docRef)
                const count = tempSnapshot.data().workload_count
                const taskDict = docum.data().task;
                taskDict[Object.keys(taskDict).length + 1] = this.newTask
                taskDict[Object.keys(taskDict).length].id = count + 1
                await setDoc(docRef, {workload_count : count + 1}, {merge: true})
                const workloadRef = collection(docRef, "workload")
                const memberDocRef = doc(workloadRef, docum.data().member)
                await setDoc(memberDocRef, { task: taskDict }, {merge: true});
                return;
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
            this.updateTask();
            this.updateMemberTask();
        },
        async updateTask() {
            try {
                const querySnapshot = await getDocs(collection(db, "projects", this.projectTitle, "workload"));
                console.log(this.userName)
                querySnapshot.forEach((doc) => { 
                    if (doc.data().member === this.userName) {
                        console.log(this.userName)
                        this.tasks = Object.values(doc.data().task)
                    }
                })
                console.log(this.tasks)
            } catch(error) {
                console.error(error)
            }
        },
        async updateMemberTask() {
           try {
                const querySnapshot = await getDocs(collection(db, "projects", this.projectTitle, "workload"));
                console.log(this.userName)
                querySnapshot.forEach((doc) => { 
                    if (doc.data().member != this.userName) {
                        this.tasksMembers = this.tasksMembers.concat(Object.values(doc.data().task))
                    }
                })
                console.log(this.tasksMembers)
            } catch(error) {
                console.error(error)
            } 
        }
    },
    async mounted() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.displayaccount(user.email)
            }
        })
    },
    async created() {   
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




