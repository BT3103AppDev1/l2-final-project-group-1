<template>
    <header>
        <p id = "projectTitle" >  &#91;Metaverse Project&#93; Competitor Analysis</p>
        <hr>
        <p id = "header">Features</p>
        <FeaturesNavBar />
    </header>
</template>


<script>
import { auth, db } from "../database/firebase";
import { collection, getDocs, doc, deleteDoc, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import FeaturesNavBar from './FeaturesNavBar.vue';
 

export default {
    components: {
        FeaturesNavBar,
     },
    data() {
        return {
            activeTab: 0,
            tabs: ['To do', 'Launched'],
            to_do: [
                { id: 1, text: "feature 1", image: "image"},
                { id: 2, text: "feature 2", image: "image"},
                { id: 3, text: "feature 3", image: "image"},
                { id: 4, text: "feature 4", image: "image"},
            ],
            launched: [
                { id: 5, text: "feature 5", image: "image"},
                { id: 6, text: "feature 6", image: "image"},
                { id: 7, text: "feature 7", image: "image"},
                { id: 8, text: "feature 8", image: "image"},
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