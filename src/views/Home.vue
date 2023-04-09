<script>
import { ref } from "vue";
import { Collapse } from "vue-collapsed";
import Sidebar from "/src/components/Sidebar.vue";
import ProfileDisplay from "/src/components/ProfileDisplay.vue";
import { auth, db } from "/src/database/firebase.js";
import { collection, query, where, getDocs, doc, addDoc, setDoc, deleteDoc, getDoc } from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      newData: '',
      ToDos: " To Dos",
      FollowUps: " Follow Ups",
      Projects: " Projects",
      isOpenToDo: false,
      isOpenFollowUp: false,
      isOpenProjects: false,
      items: [],
    };
  },

  async mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.email = user.email;
        this.getList(user.email);
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
    addData: async function() {
      try {
        const docRef = doc(db, "ToDos", this.email);
        const docSnapshot = await getDoc(docRef);
        if (!docSnapshot .exists) {
          await docRef.set({});
          await addDoc(collection(doc(collection(db, "ToDos"), this.email), "Tasks"), {
          task: this.newData,
          done: false,
        });
      } else {
        await addDoc(collection(doc(collection(db, "ToDos"), this.email), "Tasks"), {
          task: this.newData,
          done: false,
        });
      }
      
      console.log("added");
      } catch (error) {
        console.log(error);
        console.log(this.email);
      }
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
  <ProfileDisplay />
  <Sidebar />
  <main id="home-page">
    <div>
      <div class="container1">
        <img src="../assets/todo.png" alt="Image description" />
        <h1 class="header" id="currDate">{{ today }}</h1>
      </div>
      <h1>{{ email }}</h1>
      <br />
      <br />
      <br />
      <br />
      <button @click="handleCollapseToDo">
        <div
          :class="{
            'triangle-right': !isOpenToDo,
            'triangle-down': isOpenToDo,
          }"
        ></div>
        {{ ToDos }}
      </button>
      <Collapse :when="isOpenToDo" class="collapse">
        <div v-if="items.length">
          <form>
            <div v-for="item in items" :key="item.id">
              <input type="checkbox" :id="'item-' + item.id" />
              <label :for="'item-' + item.id">{{ item.task }}</label>
            </div>
          </form>
        </div>
        <p v-else>You have no to-dos.</p>
        <input id="newData" type="text" v-model="newData">
        <button @click="addData">new</button>
      </Collapse>
      <br />
      <br />

      <button @click="handleCollapseFollowUp">
        <div
          :class="{
            'triangle-right': !isOpenFollowUp,
            'triangle-down': isOpenFollowUp,
          }"
        ></div>
        {{ FollowUps }}
      </button>
      <Collapse :when="isOpenFollowUp" class="collapse">
        <p>You have no follow ups.</p>
      </Collapse>
      <br />
      <br />

      <button @click="handleCollapseProjects">
        <div
          :class="{
            'triangle-right': !isOpenProjects,
            'triangle-down': isOpenProjects,
          }"
        ></div>
        {{ Projects }}
      </button>
      <Collapse :when="isOpenProjects" class="collapse">
        <p>You have no projects.</p>
      </Collapse>
    </div>
  </main>
</template>

<style scoped>
.collapse {
  transition: height var(--vc-auto-duration) cubic-bezier(0.3, 0, 0.6, 1);
}

.container1 {
  display: flex;
  align-items: center;
}

.container1 img {
  margin-right: 10px;
  height: 100px;
  width: 100px;
}

.container .header {
  margin: 0;
}

button {
  height: 40px; /* Increase the height of the button */
  padding: 10px 16px; /* Add some padding to the button */
  background-color: transparent;
  margin-left: 30px;
  margin-right: 30px;
}

.triangle-right {
  display: inline-block;
  width: 0;
  height: 0;
  border-top: 5px solid transparent;
  border-left: 7px solid #555;
  border-bottom: 5px solid transparent;
}

.triangle-down {
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 5px solid transparent;
  border-right: 5px solid transparent;
  border-top: 7px solid #555;
  margin-top: 2px; /* Add some margin to align the triangle with the button caption */
}
form {
  margin-left: 40px;
}
</style>
