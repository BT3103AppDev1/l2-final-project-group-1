<template>
  <Sidebar />
  <ProfileDisplay />
  <main id="settings-page">
    <h1>Settings</h1>
    <p>This is the settings page</p>
  </main>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import ProfileDisplay from "../components/ProfileDisplay.vue";

export default {
  name: "Settings",
  components: {
    Sidebar,
    ProfileDisplay,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
