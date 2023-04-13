<template>
  <div class="big-con">
    <Sidebar />
    <div
      class="app-container"
      style="width: 100%"
      :class="{ 'app-mobile': isDevice, 'app-mobile-dark': theme === 'dark' }"
    >
      <div class="DLcont">
        <span v-if="showOptions" class="button-theme">
          <button class="button-light" @click="theme = 'light'">Light</button>
          <button class="button-dark" @click="theme = 'dark'">Dark</button>
        </span>
      </div>
      <!--<span
				v-if="showOptions"
				class="user-logged"
				:class="{ 'user-logged-dark': theme === 'dark' }"
			>
				Logged as
			</span>
			<select v-if="showOptions" v-model="currentUserId">
				<option v-for="user in users" :key="user._id" :value="user._id">
					{{ user.username }}
				</option>
			</select>-->

      <chat-container
        v-if="showChat"
        :current-user-id="currentUserId"
        :theme="theme"
        :is-device="isDevice"
        @show-demo-options="showDemoOptions = $event"
      />
    </div>
  </div>
</template>

<script>
import Sidebar from "/src/components/Sidebar.vue";
import ChatContainer from "/src/components/ChatContainer.vue";
import { auth, db } from "/src/database/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
export default {
  components: {
    Sidebar,
    ChatContainer,
  },
  data() {
    return {
      theme: "light",
      showChat: true,
      currentUserId: onAuthStateChanged(auth, (user) => {
        if (user) {
          this.getCurrentUserId(user.email);
        }
      }),
      isDevice: false,
      showDemoOptions: true,
    };
  },
  methods: {
    async getCurrentUserId(useremail) {
      this.currentUserId = useremail;
    },
  },
  computed: {
    showOptions() {
      return !this.isDevice || this.showDemoOptions;
    },
  },
  watch: {
    currentUserId() {
      this.showChat = false;
      setTimeout(() => (this.showChat = true), 150);
    },
  },
  mounted() {
    this.isDevice = window.innerWidth < 500;
    window.addEventListener("resize", (ev) => {
      if (ev.isTrusted) this.isDevice = window.innerWidth < 500;
    });
  },
};
</script>

<style lang="scss">
body {
  background: #fafafa;
}
input {
  appearance: none;
}
.big-con {
  display: flex;
  flex-direction: row;
  width: 100vw;
}
.app-container {
  padding-top: 10px;
  font-family: "Quicksand", sans-serif;
  display: flex;
  flex-direction: column;
}
.app-mobile {
  padding: 0;
  &.app-mobile-dark {
    background: #131415;
  }
  .user-logged {
    margin: 10px 5px 0 10px;
  }
  select {
    margin: 10px 0;
  }
  .button-theme {
    margin: 10px 10px 0 0;
    .button-github {
      height: 23px;
      img {
        height: 23px;
      }
    }
  }
}
.user-logged {
  font-size: 12px;
  margin-right: 5px;
  margin-top: 10px;
  &.user-logged-dark {
    color: #fff;
  }
}
select {
  height: 20px;
  outline: none;
  border: 1px solid #e0e2e4;
  border-radius: 4px;
  background: #fff;
  margin-bottom: 20px;
}
.button-theme {
  float: right;
  display: flex;
  align-items: center;
  .button-light {
    background: #fff;
    border: 1px solid #46484e;
    color: #46484e;
  }
  .button-dark {
    background: #1c1d21;
    border: 1px solid #1c1d21;
  }
  button {
    color: #fff;
    outline: none;
    cursor: pointer;
    border-radius: 4px;
    padding: 6px 12px;
    margin-left: 10px;
    border: none;
    font-size: 14px;
    transition: 0.3s;
    vertical-align: middle;
    &.button-github {
      height: 30px;
      background: none;
      padding: 0;
      margin-left: 20px;
      img {
        height: 30px;
      }
    }
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 0.6;
    }
    @media only screen and (max-width: 768px) {
      padding: 3px 6px;
      font-size: 13px;
    }
  }
}
.version-container {
  padding-top: 20px;
  text-align: right;
  font-size: 14px;
  color: grey;
}
</style>
