<template>
  <Sidebar /> 
  <div class="chat">
    <div class="messages">
      <div v-for="message in messages" :key="message.id" class="message">
        <div class="avatar">
          <img :src="message.avatar" alt="Avatar" />
        </div>
        <div class="content">
          <div class="name">{{ message.name }}</div>
          <div class="text">{{ message.text }}</div>
        </div>
      </div>
    </div>
    <form class="input" @submit.prevent="sendMessage">
      <input type="text" v-model="newMessage" placeholder="Type a message..." />
      <button type="submit">Send</button>
    </form>
  </div>
</template>

<script>
import Sidebar from "../components/Sidebar.vue"; 
export default {
  name: "Chats",
  components: {
    Sidebar
  }, 
  data() {
    return {
      messages: [
        { id: 1, name: "John", text: "Hello!", avatar: "https://i.pravatar.cc/50?img=1" },
        { id: 2, name: "Jane", text: "Hi there!", avatar: "https://i.pravatar.cc/50?img=2" },
        { id: 3, name: "John", text: "How are you?", avatar: "https://i.pravatar.cc/50?img=1" },
        { id: 4, name: "Jane", text: "I'm good, thanks!", avatar: "https://i.pravatar.cc/50?img=2" }
      ],
      newMessage: ""
    };
  },
  methods: {
    sendMessage() {
      if (!this.newMessage) return;
      const message = {
        id: this.messages.length + 1,
        name: "You",
        text: this.newMessage,
        avatar: "https://i.pravatar.cc/50?img=3"
      };
      this.messages.push(message);
      this.newMessage = "";
    }
  }
};
</script>

<style>
.chat {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%; 
}
.messages {
  flex: 1;
  overflow: auto;
}
.message {
  display: flex;
  margin-bottom: 10px;
}
.avatar {
  margin-right: 10px;
}
.avatar img {
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.content {
  display: flex;
  flex-direction: column;
}
.name {
  font-weight: bold;
  margin-bottom: 5px;
}
.input {
  display: flex;
  padding: 10px;
  background-color: #f2f2f2;
}
input[type="text"] {
  flex: 1;
  margin-right: 10px;
  padding: 10px;
  border: none;
  border-radius: 5px;
}
button[type="submit"] {
  padding: 10px;
}

</style>