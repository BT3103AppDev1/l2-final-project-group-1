<template>

  <header>
    <h1>{{ title }}</h1>
    <ProfileDisplay />
  </header>

  <div class="btn_search">
    <Button @btn-click="$emit('toggle-add-project')" text="+" color="white" />
    <input type="text" v-model="text" name="text" placeholder="Search..." />
  </div>
</template>

<script>
import Button from "./Button.vue";
import ProfileDisplay from "./ProfileDisplay.vue";

export default {
  name: "Header",
  props: {
    title: String,
    showAddProject: Boolean,
  },
  components: {
    Button,
    ProfileDisplay,
  },
  emit: ["toggle-add-project"],
};
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
#projectTitle {
  font-size: 32pt;
}
</style>

