<template>
<header>
    <p id="projectTitle">{{ projectTitle }}</p>
    <hr>
    <p id="header">Dashboard</p>
</header>
<hr>
<div>
    <canvas id="myChart" height="400" width="400"></canvas>
</div>
</template>

<script scoped>
import Chart, { ChartConfiguration } from '../../node_modules/chart.js/auto';
import { onMounted, reactive } from "vue";
import { auth, db } from "../database/firebase";
import { collection, getDocs, doc, deleteDoc, query, where } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

export default {
    data() {
        return {
            nextTaskId: 4,
            userAccount: "",
            labels: [
                'January',
                'February',
                'March',
                'April',
                'May',
                'June',
            ],
            data: {
                labels: this.labels,
                datasets: [
                    {
                        label: 'My First dataset',
                        backgroundColor: 'rgb(255, 99, 132)',
                        borderColor: 'rgb(255, 99, 132)',
                        data: [0, 10, 5, 2, 20, 30, 45],
                    },
                    {
                        label: 'My Second dataset',
                        backgroundColor: 'rgb(120, 150, 190)',
                        borderColor: 'rgb(10, 40, 80)',
                        data: [10, 35, 15, 20, 40, 30, 45],
                    },
                    {
                        label: 'My Third dataset',
                        backgroundColor: 'rgb(100, 200, 150)',
                        borderColor: 'rgb(90, 190, 140)',
                        data: [5, 12, 10, 18, 15, 22, 33],
                    },
                ],
            },
            config: {
                type: 'line',
                data: this.data,
                options: {},
            },
        };
    },
    setup() {
        onMounted(() => {
            const canvasTag = <ChartItem>document.getElementById('myChart');
            new Chart(document.getElementById('myChart'), this.config);
        });
    },
    methods: {
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
