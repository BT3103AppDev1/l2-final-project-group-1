<template>
  <div class="popup">
    <div class="popup-container">
      <div class="popup-header">
        <h2 style="margin-left:90px;">{{ title }}</h2>
        <button @click="closePopup" class="popupBtn">X</button>
      </div>
      <div class="popup-content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
  },
  methods: {
    closePopup() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.popup {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup-container {
  background-color: white;
  padding: 10px;
  border-radius: 10px;
}

.popup-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.popup-header h2 {
  margin: 0;
  color: var(--dark-purple);
}

.popup-header button {
  border: none;
  background-color: transparent;
  font-size: 20px;
  cursor: pointer;
}

.popup-content {
  max-height: 80vh;
  overflow-y: auto;
}

.popupBtn {
  color: var(--primary-alt);
  font-weight: 900;
}
</style>

