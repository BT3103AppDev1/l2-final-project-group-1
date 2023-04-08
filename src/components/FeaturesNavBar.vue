<template>
<div class="nav_bar">
      <div class="tab">
        <button v-for="(tab, index) in tabs" :key="index" :class="{ active: activeTab === index }" @click="activeTab = index">{{ tab }}</button>
      </div>
</div>

<div class="content">
    <div v-show="activeTab === 0">
        <div :key="feature.id" v-for="feature in to_do">
            <div class= "container">
                      {{feature.text}}
            </div>
        </div>
    </div>

    <div v-show="activeTab === 1">Launched Features</div>
</div>
</template>

<script>
export default {
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
.nav_bar {
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-top: 20px;
}

.tab {
  display: flex;
  width: 100%;
  max-width: 700px;
  margin-bottom: 20px;
}
.tab button {
  background-color: #f2f2f2;
  color: #444;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  transition: 0.3s;
}
.tab button.active {
  background-color: #ddd;
  color: #444;
}

button {
  text-align:left;
  vertical-align: top;
}

.project_name {
  position: absolute;
  bottom: 0;
  left: 0;
}

.container {
color: black    ;
max-width: 300px;
margin: 30px auto;
overflow: auto;
min-height: 60px;
border: 1px solid steelblue;
border-radius: 5px;
}


</style>