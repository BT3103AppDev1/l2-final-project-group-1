<script>
import { ref } from "vue";
import { Collapse } from "vue-collapsed";
import Sidebar from "../components/Sidebar.vue";
import ProfileDisplay from "../components/ProfileDisplay.vue";

export default {
  data() {
    return {
      ToDos: " To Dos",
      FollowUps: " Follow Ups",
      Projects: " Projects",
      isOpenToDo: false,
      isOpenFollowUp: false,
      isOpenProjects: false,
      items: [
        { id: 1, name: "Send meeting attachments" },
        { id: 2, name: "Send report details" },
        { id: 3, name: "Meeting with proj1 team @2pm" },
        { id: 4, name: "Item 4" },
        { id: 5, name: "Item 5" },
      ],
    };
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
  <ProfileDisplay />
  <main id="home-page">
    <div class="container">
      <img src="src\assets\todo.png" alt="Image description" />

      <h1 class="header" id="currDate">{{ today }}</h1>
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
              <label :for="'item-' + item.id">{{ item.name }}</label>
            </div>
          </form>
        </div>
        <p v-else>You have no to-dos.</p>
        <button>new</button>
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

img {
  float: left;
  width: 100px;
  height: 100px;
}

.header {
  display: inline-block;
  vertical-align: middle;
  margin-left: 20px; /* adjust as needed */
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
