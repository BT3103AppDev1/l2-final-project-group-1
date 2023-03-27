<template>
  <Sidebar />
  <main id="chat-page">
    <h1>Chats</h1>
    <p>This is the chat page</p>
  </main>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
export default {
  name: "Chat",
  components: {
    Sidebar,
  },
  data() {
    return {};
  },
  methods: {},
};
</script>
