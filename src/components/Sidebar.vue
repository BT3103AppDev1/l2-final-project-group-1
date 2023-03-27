<template>
  <aside :class="`${is_expanded ? 'is-expanded' : ''}`">
    <div class="logo">
      <img src="../assets/logo.png" alt="Vue" />
    </div>

    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-icons-round"> keyboard_double_arrow_right </span>
      </button>
    </div>

    <div class="menu">
      <h4>Menu</h4>
      <router-link to="/login/calendar" class="button" @click="ToggleMenu">
        <span class="material-icons-round"> calendar_today </span>
        <span class="text"> Calendar </span>
      </router-link>
      <router-link to="/login/chats" class="button" @click="ToggleMenu">
        <span class="material-icons-round"> question_answer </span>
        <span class="text"> Chats </span>
      </router-link>
      <router-link to="/login/home" class="button" @click="ToggleMenu">
        <span class="material-icons-round"> home </span>
        <span class="text"> Home </span>
      </router-link>
      <router-link to="/login/projects" class="button" @click="ToggleMenu">
        <span class="material-icons-round"> groups </span>
        <span class="text"> Projects </span>
      </router-link>
      <router-link to="/login/alerts" class="button" @click="ToggleMenu">
        <span class="material-icons-round"> notifications </span>
        <span class="text"> Alerts </span>
      </router-link>
      <router-link to="/login/settings" class="button" @click="ToggleMenu">
        <span class="material-icons-round"> settings </span>
        <span class="text"> Settings </span>
      </router-link>
      <button class="button" @click="Logout">
        <span class="material-icons-round"> logout </span>
        <span class="text"> Log out </span>
      </button>
    </div>

    <div class="flex"></div>

    <button class="button" @click="Refresh">
      <span class="material-icons-round"> refresh </span>
    </button>
  </aside>
</template>

<script setup>
import { ref } from "vue";
import { auth } from "../firebase.js";
import { signOut } from "firebase/auth";
import router from "../router";

const is_expanded = ref(localStorage.getItem("is_expanded") == "true");

const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;
  localStorage.setItem("is_expanded", is_expanded.value);
};

const Logout = () => {
  signOut(auth, auth.currentUser);
  router.push({ name: "Landing Page" });
};
</script>

<style lang="scss" scoped>
// Refresh button only
.button {
  color: var(--primary);
}

aside {
  display: flex;
  flex-direction: column;

  background-color: var(--dark);
  color: var(--light);

  width: calc(2rem + 32px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;

  transition: 0.2s ease-in-out;

  .flex {
    flex: 1 1 0%;
  }

  .logo {
    margin-bottom: 3rem;

    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-in-out;

    .menu-toggle {
      transition: 0.2s ease-in-out;
      .material-icons-round {
        font-size: 2rem;
        color: var(--light);
        transition: 0.2s ease-out;
      }

      &:hover {
        .material-icons-round {
          color: var(--primary);
          transform: translateX(0.5rem);
        }
      }
    }
  }

  .button {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
  }

  .text {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    padding-left: 0.8em;
    color: var(--light);
    font-size: 13px;
  }

  h4 {
    opacity: 0;
    transition: opacity 0.3s ease-in-out;
    color: var(--grey);
    text-transform: uppercase;
    margin-left: 1rem;
    margin-bottom: 1rem;
  }

  .menu {
    margin: 0 -1rem;
    position: left;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;

      transition: 0.2s ease-in-out;
      padding: 0.5rem 1rem;

      .material-icons-round {
        font-size: 1.7rem;
        color: var(--light);
        transition: 0.2s ease-in-out;
      }

      &:hover {
        background-color: var(--dark-alt);

        .material-icons-round,
        .text {
          color: var(--primary);
        }
      }

      &.router-link-exact-active {
        background-color: var(--dark-alt);
        border-right: 5px solid var(--primary);

        .material-icons-round,
        .text {
          color: var(--primary);
        }
      }
    }
  }

  /*.footer {
        opacity: 0; 
        transition: opacity 0.3s ease-in-out; 

        p { 
            font-size: 0.875rem; 
            color: var(--grey); 
        }
    }*/

  &.is-expanded {
    width: 125px;

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h4,
    .button,
    .text {
      opacity: 1;
    }

    .button {
      .material-icons {
        margin-right: 1rem;
      }
    }
  }

  .refresh-button {
    color: var(--grey);
  }
}
</style>
