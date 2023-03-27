<template>
  <Sidebar />
  <main id="settings-page">
    <h1>Settings</h1>
    <p>This is the settings page</p>
  </main>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
export default {
  name: "Settings",
  components: {
    Sidebar,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
