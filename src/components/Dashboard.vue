<template>
<header>
    <p id="projectTitle">{{ projectTitle }}</p>
    <hr>
    <p id="header">Dashboard</p>
</header>
<hr>
<div id="pageContainer" class="container">
    <div id="Priority Distribution">
        <h2>Priority Distribution</h2>
        <pie-chart class = 'user' width =500px :data = "chartdata" ></pie-chart>
    </div>

    <div id="Issue_raised" class="container">
        <h2> Number of Issues raised </h2>
        <bar-chart class ="user" width=500px :data="chartdata2" ></bar-chart>
    </div>

    <div id="Unresolved_issues" class="container">
        <h2> Unresolved Issues </h2>
        <br>
        <hr>
        <h1>3</h1>
    </div>
    <br>
    <div id="Incompleted_features" class="container">
        <h2> Incompleted features </h2>
        <br>
        <hr>
        <h1>4/6</h1>
    </div>
    <br>
    <div id="Total_cost" class="container">
        <h2> Total Cost </h2>
    
    </div>

</div>

</template>

<script scoped>
import { onMounted, reactive } from "vue";
import { auth, db } from "../database/firebase";
import { collection, getDocs, doc, deleteDoc, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default {
    name:'Dashboard',
    data() {
        return {
            nextTaskId: 4,
            userAccount: "",
            chartdata: {'Item 1': 20, 'Item 2': 20, 'Item 3': 20, 'Item 4': 20, 'Item 5':20},
            chartdata2: {'Item 1': 15, 'Item 2': 20, 'Item 3': 25, 'Item 4': 40},
            selected:""
        };
    },
    methods: {
        updateMe: function (){
            this.chartdata = {'Monday': Math.random()*5,'Tuesday': 5, 'Wednesday': Math.random()* 5, 'Thursday': 5,'Friday':6}
        },
        updateMe2: function (){
            this.chartdata2 = {'Blueberry':Math.random()*30,'Strawberry':23,'Balckberry':23}
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
    },
    props: {
        projectTitle: String,
    },
};

</script>

<style scoped>
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
</style>
