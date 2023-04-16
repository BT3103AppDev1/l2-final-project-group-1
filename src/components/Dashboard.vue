<template>
<header>
    <p id="projectTitle">{{ projectTitle }}</p>
    <hr>
    <p id="header">Dashboard</p>
</header>
<hr>
<select v-model ="selected ">
<option value="">Please select one </option >
<option >Line</option >
<option >Pie</option >
<option >Both</option >
</select >,<br><br>

<span>Selected: {{ selected }}</span>

<div v-if="selected =='Line' || selected =='Both' ">
<h1>Line Chart </h1>
<button @click="updateMe ()">Click to update the Line chart </button >
<line-chart class = 'user' width =500px :data = "chartdata" ></line-chart >
</div>

<div v-if="selected =='Pie' || selected =='Both' ">
<h1>Pie Chart </h1>
<button @click="updateMe2 ()"> Click to update the Pie Chart</button ><br><br>
<pie-chart class ="user" width=500px :data="chartdata2" ></pie-chart >
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
            chartdata: {'Monday': 2, 'Tuesday': 5, 'Wednesday': 2, 'Thursday': 5, 'Friday':6},
            chartdata2: {'Blueberry':44, 'Strawberry':23},
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
    table {
        border-collapse: collapse;
        width: 100%;
    }
    th,
    td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
    }
</style>
