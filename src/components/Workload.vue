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
        <button @click="deleteCompletedTasks">Confirm changes</button>
    </div>
    <div id = "profile">
        <div id="profile-image">
            <img src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg" alt="Profile Picture">
        </div>
        <div id = "profile-text">
            <p id = "accountTitle">Developer</p>
            <p id = "accountName"><b>Sarah Doe</b></p>
        </div>
    </div>
</template>

<script>
export default {

    data() {
        return {
            tasks: [
                { id: 1, title: 'Task 1', scope: 'Project A', endDate: '2023-03-30', completed: false },
                { id: 2, title: 'Task 2', scope: 'Project B', endDate: '2023-04-15', completed: false },
                { id: 3, title: 'Task 3', scope: 'Project C', endDate: '2023-04-30', completed: false },
            ]
        }
    },
    methods: {
        deleteCompletedTasks() {
            this.tasks = this.tasks.filter(function(task) {
                return !task.completed;
            });
        }
    }
}
</script>

<style scoped>
    #app {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
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
    button {
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
    #profile-image {
        position: absolute;
        top: 20px;
        right: 30px;
        border-radius: 50%;
        overflow: hidden;
        width: 70px;
        height: 70px;
    }
    #profile-text {
        position: absolute;
        top: 38px;
        right: 120px;
        border-radius: 50%;
        width: 70px;
        height: 70px;
    }
    #profile-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    #projectTitle {
        font-size: 32pt;
    }
    #accountTitle {
        margin: 0px;
    }
    #accountName {
        margin: 0px;   
    }
</style>



