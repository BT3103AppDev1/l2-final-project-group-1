<template>
  <Sidebar />
  <main id="calendar-page">
    <h1>Calendar</h1>
    <p>This is the calendar page</p>
  </main>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
export default {
  name: "Calendar",
  components: {
    Sidebar,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
