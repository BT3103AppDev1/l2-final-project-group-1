<template>
  <Sidebar />
  <main id="alerts-page">
    <h1>Alerts</h1>
    <p>This is the alerts page</p>
  </main>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
export default {
  name: "Alerts",
  components: {
    Sidebar,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
