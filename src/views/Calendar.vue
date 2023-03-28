<template>
  <ProfileDisplay />
  <Sidebar />
  <main id="calendar-page">
    <h1>Calendar</h1>
    <p>This is the calendar page</p>
  </main>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import ProfileDisplay from "../components/ProfileDisplay.vue";
export default {
  name: "Calendar",
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
