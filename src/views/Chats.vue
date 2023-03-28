<template>
  <Sidebar />
  <ProfileDisplay />
  <main id="chat-page">
    <h1>Chats</h1>
    <p>This is the chat page</p>
  </main>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import ProfileDisplay from "../components/ProfileDisplay.vue";
export default {
  name: "Chat",
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
