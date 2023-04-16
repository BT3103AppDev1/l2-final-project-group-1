<script>
import { ref } from "vue";
import { Collapse } from "vue-collapsed";
import Sidebar from "/src/components/Sidebar.vue";
import ProfileDisplay from "/src/components/ProfileDisplay.vue";
import { auth, db } from "/src/database/firebase.js";
import { collection, query, where, getDocs, doc, addDoc, setDoc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      id: '',
      email: "",
      newData: '',
      ToDos: " To Dos",
      FollowUps: " Follow Ups",
      Projects: " Projects",
      isOpenToDo: false,
      isOpenFollowUp: false,
      isOpenProjects: false,
      items: [],
      followUps: [],
      newFollowUp: '',
      followUpId: '',
      myProjects: [],
    };
  },

  async mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.email = user.email;
        this.getList(user.email);
        this.getFollowUp(user.email)
        this.getProjects(user.email)
      }
    });
  },

  computed: {
    today() {
      const date = new Date();
      const options = {
        timeZone: "Asia/Singapore",
        day: "numeric",
        month: "long",
        year: "numeric",
      };
      const formattedDate = date.toLocaleDateString("en-SG", options);
      const options1 = { weekday: "long", timeZone: "Asia/Singapore" };
      const dayName = date.toLocaleString("en-US", options1);

      return " Today is " + dayName + ", " + formattedDate;
    },
  },

  methods: {
    getProjects: async function() {
      const userinfoColRef = collection(db, 'userinfo')
      const userDocRef = doc(userinfoColRef, this.email)
      const userDocSnapshot = await getDoc(userDocRef)
      const userData = userDocSnapshot.data()
      const projArr = userData.projects
      projArr.forEach((projName) =>{
        this.myProjects.push({
          id: this.myProjects.length + 1,
          name: projName,
        })
      })
    },
    getList: async function(email) {
    try {
      const parentDocRef = doc(db, "ToDos", email);
      const subcollectionRef = collection(parentDocRef, "Tasks");
      const querySnapshot = await getDocs(subcollectionRef);
      querySnapshot.forEach((doc) => {
        if (!doc.data().done) {
          const task = {
            id: doc.id,
            task: doc.data().task,
          }
          this.items.push(task)
        }
      })
    }
    catch (error) {
      console.log(error);
      console.log(email);
    }
  },

  getFollowUp: async function(email) {
    try {
      const parentDocRef = doc(db, "FollowUp", email);
      const subcollectionRef = collection(parentDocRef, "Stuff");
      const querySnapshot = await getDocs(subcollectionRef);
      querySnapshot.forEach((doc) => {
        if (!doc.data().done) {
          const task = {
            id: doc.id,
            task: doc.data().task,
          }
          this.followUps.push(task)
        }
      })
    }
    catch (error) {
      console.log(error);
      console.log(email);
    }
  },

  addFollowUp: async function() {
    try {
        const docRef = doc(db, "FollowUp", this.email);
        const docSnapshot = await getDoc(docRef);
        if (!docSnapshot .exists) {
          await docRef.set({});
          await addDoc(collection(doc(collection(db, "FollowUp"), this.email), "Stuff"), {
          task: this.newFollowUp,
          done: false,
        }).then((docRef) => {
          this.followUpId = docRef.id;
        });
      } else {
        await addDoc(collection(doc(collection(db, "FollowUp"), this.email), "Stuff"), {
          task: this.newFollowUp,
          done: false,
        }).then((docRef) => {
          this.followUpId = docRef.id;
        });
      }
      const stuff = {
        id: this.followUpId,
        task: this.newFollowUp
      }
      this.followUps.push(stuff);
      this.newFollowUp = '';
      this.followUpId = '';
      console.log("added");
      } catch (error) {
        console.log(error);
        console.log(this.email);
      }
  },
    addData: async function() {
      try {
        const docRef = doc(db, "ToDos", this.email);
        const docSnapshot = await getDoc(docRef);
        if (!docSnapshot .exists) {
          await docRef.set({});
          await addDoc(collection(doc(collection(db, "ToDos"), this.email), "Tasks"), {
          task: this.newData,
          done: false,
        }).then((docRef) => {
          this.id = docRef.id;
        });
      } else {
        await addDoc(collection(doc(collection(db, "ToDos"), this.email), "Tasks"), {
          task: this.newData,
          done: false,
        }).then((docRef) => {
          this.id = docRef.id;
        });
      }
      const task = {
        id: this.id,
        task: this.newData
      }
      this.items.push(task);
      this.newData = '';
      this.id = '';
      console.log("added");
      } catch (error) {
        console.log(error);
        console.log(this.email);
      }
    },
    tickBox: function(idNum) {
      this.items = this.items.filter((item) => item.id !== idNum);
      const parentDocRef = doc(db, "ToDos", this.email);
      const subcollectionRef = collection(parentDocRef, "Tasks");
      const docRef = doc(subcollectionRef, idNum);
      updateDoc(docRef, {
        done: true
      })
    },

    tickBoxFollowUp: function(idNum) {
      this.followUps = this.followUps.filter((item) => item.id !== idNum);
      const parentDocRef = doc(db, "FollowUp", this.email);
      const subcollectionRef = collection(parentDocRef, "Stuff");
      const docRef = doc(subcollectionRef, idNum);
      updateDoc(docRef, {
        done: true
      })
    },
    handleCollapseToDo: function () {
      this.isOpenToDo = !this.isOpenToDo;
    },
    handleCollapseFollowUp: function () {
      this.isOpenFollowUp = !this.isOpenFollowUp;
    },
    handleCollapseProjects: function () {
      this.isOpenProjects = !this.isOpenProjects;
    },
  },
  components: {
    Collapse,
    Sidebar,
    ProfileDisplay,
  },
};
</script>

<template> 
  <Sidebar />
  <main id="home-page"> 
  <div class="headerCon"> 
    <ProfileDisplay />   
    <div class="container1">
      <img src="../assets/home-icon.png" alt="Image description" class="image"/>
      <h1 class="header" id="currDate">{{ today }}</h1>
    </div>
  </div>
      <br />
      <br />
      <br />
      <br />
      <button class="triButton" @click="handleCollapseToDo">
        <div
          :class="{
            'triangle-right': !isOpenToDo,
            'triangle-down': isOpenToDo,
          }"
        ></div>
        {{ ToDos }}
      </button>
      <Collapse :when="isOpenToDo" class="collapse">
        <div v-if="items.length" class="contents">
          <form>
            <div v-for="item in items" :key="item.id">
              <input type="checkbox" :id="'item-' + item.id" @change="tickBox(item.id)"/>
              <label :for="'item-' + item.id">{{ item.task }}</label>
            </div>
          </form>
        </div>
        <p v-else class="contents">You have no to-dos.</p>
        <input id="newData" type="text" v-model="newData" class="inbox" placeholder="New Task">
        <button @click="addData" class="addTaskBtn"> + Add Task </button>
      </Collapse>
      <br />
      <br />

      <button class="triButton" @click="handleCollapseFollowUp">
        <div
          :class="{
            'triangle-right': !isOpenFollowUp,
            'triangle-down': isOpenFollowUp,
          }"
        ></div>
        {{ FollowUps }}
      </button>
      <Collapse :when="isOpenFollowUp" class="collapse">
        <div v-if="followUps.length" class="contents">
          <form>
            <div v-for="item in followUps" :key="item.id">
              <input type="checkbox" :id="'item-' + item.id" @change="tickBoxFollowUp(item.id)"/>
              <label :for="'item-' + item.id">{{ item.task }}</label>
            </div>
          </form>
        </div>
        <p v-else class="contents">You have no follow ups.</p>
        <input id="newData" type="text" v-model="newFollowUp" class="inbox" placeholder="New Follow Up">
        <button @click="addFollowUp" class="addTaskBtn"> + Add Follow Up </button>
      </Collapse>
      <br />
      <br />

      <button class="triButton" @click="handleCollapseProjects">
        <div
          :class="{
            'triangle-right': !isOpenProjects,
            'triangle-down': isOpenProjects,
          }"
        ></div>
        {{ Projects }}
      </button>
      <Collapse :when="isOpenProjects" class="collapse">
        <div class="contents">
          <div>
            <ul v-if="myProjects.length">
              <li v-for="proj in myProjects" :key="proj.id">{{ proj.name }}</li>
            </ul>
            <p v-else>You have no projects.</p>
          </div>
        </div>
      </Collapse> 
  </main>
</template>

<style scoped>
.collapse {
  transition: height var(--vc-auto-duration) cubic-bezier(0.3, 0, 0.6, 1);
}

.container1 {
  display: flex;
  align-items: center;
  margin-top: -35px;
}

.container1 img { 
  height: 150px;
  width: 230px;
}

.headerCon {
  display: flex; 
  flex-direction: row;
}


.header {
  color: var(--dark-purple);
  margin-left: 20px;
} 

button {
  height: 45px; /* Increase the height of the button */
  padding: 10px 16px; /* Add some padding to the button */
  background-color: transparent;
  margin-left: 30px;
  margin-right: 30px;
  font-size: 20px;
  font-weight: 550;
  color: var(--dark);
}

.triangle-right {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-left: 7px solid #555;
  border-bottom: 5px solid transparent;
  margin-right: 10px;
}

.triangle-down {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 7px solid #555;
  margin-top: 2px; /* Add some margin to align the triangle with the button caption */
  margin-right: 10px;
}

#newData {
  width: 800px;
  height: 30px;
  margin-left: 70px;
  margin-top: 10px;
}

#newData::placeholder {
  font-size: 16px;
}


.addTaskBtn {
  text-decoration: none;
  background-color: var(--primary);
  color: var(--dark);
  border-radius: 10px;
  height: 38px;
  font-size: 16px;
  margin-top: 15px;
}
.contents {
  margin-top: 10px;
  margin-left: 70px;
}
 .inbox {
  margin-left: 60px;
 }
</style>
