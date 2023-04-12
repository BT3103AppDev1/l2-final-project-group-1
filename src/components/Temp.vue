<template>
    <p id = "projectTitle">{{ projectTitle }}</p>
    <hr>
    <p id = "header">Workload Tracker</p>
    <hr>
    <div id = "tasktable">
        <div v-if =" this.userAccount === 'Employer'">
            <div class ="tab">
                <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }" @click="activeTab = index">{{ tab }}</button>
            </div>
            <div v-show="activeTab === 1">
                <button class="button-27" @click="showPopup = true"> New Task +</button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Scope</th>
                            <th>End Date</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(task, index) in this.completedTasks" :key="index">
                        <td>{{ task.id }}</td>
                        <td>{{ task.employee }}</td>
                        <td>{{ task.title }}</td>
                        <td>{{ task.scope }}</td>
                        <td>{{ task.endDate }}</td>
                        <td><input type="checkbox" v-model="task.completed" disabled /></td>
                        <td><button @click="deleteTask(index)">Delete</button></td>
                    </tr>
                    </tbody>
                </table>
                <popup :title="popupTitle" v-if="showPopup" @close="showPopup = false">
                    <h2 id = "windowTitle">Assign New Task</h2>
                    <form @submit.prevent="addTask" class="add-form">
                        <div class = "form-control">
                            <label for="employee">Employee:</label>
                            <input type="text" id="employee" v-model="newTask.employee" />
                            <br />
                            <label for="title">Title:</label>
                            <input type="text" id="title" v-model="newTask.title" />
                            <br />
                            <label for="scope">Scope:</label>
                            <input type="text" id="scope" v-model="newTask.scope" />
                            <br />
                            <label for="endDate">End Date:</label>
                            <input type="date" id="endDate" v-model="newTask.endDate" />
                            <br />     
                        </div> 
                    <button type="submit" id = "assign">Assign Task</button>
                    </form>
                </popup>
            </div>
            <div v-show="activeTab === 0">
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Title</th>
                            <th>Scope</th>
                            <th>End Date</th>
                            <th>Completed</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(task, index) in this.incompletedTasks" :key="index">
                            <td>{{ task.id }}</td>
                            <td>{{ task.employee }}</td>
                            <td>{{ task.title }}</td>
                            <td>{{ task.scope }}</td>
                            <td>{{ task.endDate }}</td>
                            <td><input type="checkbox" v-model="task.completed" /></td>
                        </tr>
                    </tbody>
                </table>
                <button @click="confirmChanges">Confirm Changes</button>
            </div>
        </div>        
    </div>
</template>

<script>
import { auth, db } from "../database/firebase";
import { collection, getDocs, doc, deleteDoc, query, where, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Popup from "../components/Popup.vue";
 

export default {
    data() {
        return {
            tasks: [],
            newTask: {
                employee: "",
                title: "",
                scope: "",
                endDate: "",
                completed: false,
                id: "",
            },
            userName: "",
            userAccount: "",
            completedTasks: [],
            incompletedTasks: [],
            tabs: ["My Work", "My Team"],
            activeTab: 0,
            showPopup: false,
        };
  },
  async mounted() {
    await onAuthStateChanged(auth, (user) => {
        if (user) {
            this.displayaccount(user.email)
        }
    })
    
  },
    methods: {
        async fetchTasks() {
            const querySnapshot = await getDocs(collection(db, "projects", this.projectTitle, "workload"));
            querySnapshot.forEach((doc) => { 
                console.log(doc.data())
                    if (doc.data().member === this.userName) {
                        console.log("OK")
                    const employee = doc.data().member;
                    const oldTasks = doc.data().task;
                    console.log(oldTasks)
                    Object.keys(oldTasks).forEach((taskId) => {
                        const tempTask = oldTasks[taskId];
                        this.tasks.push({
                            employee: employee,
                            title: tempTask.title,
                            scope: tempTask.scope,
                            endDate: tempTask.endDate,
                            completed: tempTask.completed,
                            id: taskId,
                        });
                    });
                    }
                })
                console.log(this.tasks[0])
            },
    
        async addTask() {
            try {
            const taskId = new Date().getTime().toString();
            this.tasks.push({
                employee: this.newTask.employee,
                title: this.newTask.title,
                scope: this.newTask.scope,
                endDate: this.newTask.endDate,
                completed: false,
                id: taskId,
            });
            const employeeRef = doc(db, "projects", this.projectTitle, "workload", this.newTask.employee)
            const querySnapshot = await getDoc(employeeRef)
                const tempTasks = querySnapshot.data().task;
                tempTasks[taskId] = {
                    title: this.newTask.title,
                    scope: this.newTask.scope,
                    endDate: this.newTask.endDate,
                    completed: false,
                };
            await updateDoc(employeeRef, { task: tempTasks });

            } catch (error) {
                console.error("Error adding document: ", error);
            };
            this.newTask.employee = "";
            this.newTask.title = "";
            this.newTask.endDate = "";
            this.newTask.scope = "";
        },
        async deleteTask(index) {
            console.log("OK")
            try {
            const task = this.completedTasks[index];
            this.tasks.splice(index, 1);
            const employeeRef = doc(db, "projects", this.projectTitle, "workload", task.employee)
            const querySnapshot = await getDoc(employeeRef)
            const tempTasks = querySnapshot.data().task;
            delete tempTasks[task.id];
            await updateDoc(employeeRef, { task: tempTasks });
            }
            catch(error) {
                console.error("Error deleting document: ", error);
            };
        },
        async confirmChanges() {
            const docRef = doc(db, "projects", this.projectTitle, "workload", this.userName)
            const querySnapshot = await getDoc(docRef)
            let newDict = querySnapshot.data().task
            this.tasks.forEach((task) => {
            
            const taskId = task.id
            newDict[taskId] = { 
                title: task.title,
                scope: task.scope,
                endDate: task.endDate,
                completed: task.completed,}
            
            });
            await updateDoc(docRef, {task: newDict})

        },
        async completeTasks() {
            const querySnapshot = await getDocs(collection(db, "projects", this.projectTitle, "workload"))
            querySnapshot.forEach((doc) => { 
                const employee = doc.data().member;
                const oldTasks = doc.data().task;
                console.log(oldTasks)
                Object.keys(oldTasks).forEach((taskId) => {
                    const tempTask = oldTasks[taskId];
                    this.completedTasks .push({
                        employee: employee,
                        title: tempTask.title,
                        scope: tempTask.scope,
                        endDate: tempTask.endDate,
                        completed: tempTask.completed,
                        id: taskId,
                    });
                })
            })
            console.log(this.completedTasks)
        },
        incompleteTasks() {
            let tempTask = this.tasks;
            this.incompletedTasks = tempTask.filter((task) => task.completed === false)
            console.log(this.incompletedTasks)
        },
        async displayaccount(useremail) {
            const Snapshot = await getDocs(collection(db, "userinfo"));
            Snapshot.forEach((doc) => {
                if (doc.data().email === useremail) {
                this.userAccount = doc.data().account_type;
                this.userName = doc.data().name;
                }
            });
             await this.fetchTasks();
             await this.completeTasks();
             this.incompleteTasks();
        },
    },
    props: {
        projectTitle: String
    },
    components: {
        Popup
    }

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
        background-color: #6d79b4;
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
    .changeBtn {
        color: #FFFFFF;
    }
    .popup {
        width: 400px;
        height: 600px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border: 1px solid black;
        z-index: 9999;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        }
    .add-form {
        margin-bottom: 40px;
    }
    .form-control {
        margin: 20px 0;
    }
    .form-control label {
        display: block;
    }
    .form-control input {
        width: 95%;
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
    .button-27 {
        float: right;
        appearance: none;
        background-color: #6d79b4;
        border: 2px solid #1A1A1A;
        border-radius: 15px;
        box-sizing: border-box;
        color: #FFFFFF;
        cursor: pointer;
        font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
        font-size: 16px;
        font-weight: 600;
        line-height: normal;
        margin: -50px -10px 10px -10px;
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
        transform:  translateY(0);

    }
    #assign {
        display: inline-block;
        background: #000;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        text-decoration: none;
        font-size: 15px;
        font-family: inherit;
        margin: auto;
    }
</style>
