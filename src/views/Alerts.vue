<template>
  <Sidebar />
  <main id="alerts-page" class="page" style="background-image:url(/src/assets/aura.png);background-size:cover">
    <ProfileDisplay />
    <h2>Notifications</h2>
    <br>
    <h3 style="margin-top:20px;">Today</h3>
    <hr>

    <div class="wrapper">
        <img src="\src\assets\defaultdp.png">
        <p class="text" style="color:var(--dark-purple);margin-top:10px;font-weight:600;">Sally mentioned you in an issue in [Metaverse Project] Competitor Analysis</p>
        <p class="time" style="color:var(--dark-purple);margin-top:10px;font-weight:600;">2h ago</p> 
    </div>

    <div class="wrapper">
        <img src="\src\assets\defaultdp.png">
        <p class="text">Nicole Leow added you into [Operational Project] Customer Relations</p>
        <p class="time">6h ago</p> 
    </div>
    <br>
    <h3>This Week</h3>
    <hr>

    <div class="wrapper">
        <img src="\src\assets\defaultdp.png">
        <p class="text">James resolved an issue raised by you in [Crypto Project] Product Management</p>
        <p class="time">1d ago</p> 
    </div>

    <div class="wrapper">
        <img src="\src\assets\defaultdp.png">
        <p class="text">Jack Lim sent you a message </p>
        <p class="time">2d ago</p> 
    </div>

    <div class="wrapper">
        <img src="\src\assets\defaultdp.png">
        <p class="text">Ming edited the features for [Metaverse Project] Competitor Analysis</p>
        <p class="time">3d ago</p> 
    </div>

    <br>
    <h3>Earlier</h3>
    <hr>
    <p style="margin-top:20px;">You have no notifications</p>
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

<style scoped>
#alerts-page {
  width: 100vw;
  height: 100vh;
}
.wrapper {
  display: flex;
  align-items: center;
  padding: 5px;
}

.wrapper img {
  margin-right: 10px;
  float: left;
  width: 30px;
  height: 30px;
}

.wrapper .text {
  margin: 0;
  width: 80%;
}

.time {
    width: 20%;
    text-align: right;
}

hr {
  background-color: #B8B7B0;
  border-color: transparent;
  border-width: 1px;
  height: 1px;
}

.corner-text {
  position: absolute;
  top: 1;
  right: 0;
  display: flex;
  align-items: center;
  margin-right: 10px;
}

.corner-text img {
  width: 25px;
  height: 25px; /* adjust as needed */
  margin-right: 10px; /* adjust as needed */
}

.corner-text .text-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
}
</style>
