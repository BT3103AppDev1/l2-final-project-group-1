<template>
  <form @submit="onSubmit" class="add-form">
    <div class="form-control">
      <label>Project</label>
      <input
        type="text"
        v-model="text"
        id="name"
        name="text"
        placeholder="Add Project"
      />
    </div>

    <div class="form-control form-control-check">
      <label>Set Reminder</label>
      <input type="checkbox" v-model="reminder" name="reminder" />
    </div>

    <input type="submit" value="Save Project" class="btn btn-block" />
  </form>
</template>

<script>
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase.js";

export default {
  name: "AddProject",
  data() {
    return {
      text: "",
      reminder: false,
    };
  },
  methods: {
    onSubmit(e) {
      e.preventDefault();
      if (!this.text) {
        alert("Please add a project");
        return;
      }
      let text = document.getElementById("name").value;
      const newProject = {
        // id: Math.floor(Math.random() * 100000),
        // text: this.text,
        // let text = document.getElementById("text").value;
        // reminder: this.reminder,
      };
      try {
        const docRef = setDoc(doc(db, "projects", text), {
          project_name: text,
        });
      } catch (error) {
        console.error("Error adding document: ", error);
      }
      // this.$emit("add-project", newProject);
      // this.text = "";
      // this.reminder = false;
    },
  },
};
</script>

<style scoped>
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
  width: 100%;
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
</style>
