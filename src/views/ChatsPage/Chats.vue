<template>
  <Sidebar />
  <div style="height:100vh;width:100%;">
    <PrettyChatWindow 
      :project="projectId"
      :name="name"
      :secret="secret"
     />  
  </div>
</template>

<script>
import Sidebar from "/src/components/Sidebar.vue";
import { PrettyChatWindow } from "react-chat-engine-pretty";
import { applyReactInVue } from "veaury";

export default {
  name: "Chat",
  components: {
    Sidebar,
    PrettyChatWindow: applyReactInVue(PrettyChatWindow),
  },
  data() {
    return {
      projectId: import.meta.env.VITE_CHAT_ENGINE_PROJECT_ID,
    };
  },
  methods: {},
  props: {
    name: {
      type: String,
      required: true,
    },
    secret: {
      type: String,
      required: true,
    },
  },
};
</script>
