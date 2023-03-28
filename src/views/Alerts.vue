<template>
  <Sidebar />
  <ProfileDisplay />
  <main id="alerts-page">
    <h1>Alerts</h1>
    <p>This is the alerts page</p>
  </main>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import ProfileDisplay from "../components/ProfileDisplay.vue";
export default {
  name: "Alerts",
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
