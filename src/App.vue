<template>
  <div class="app"> 
    <!-- <Sidebar />
    <router-view /> --> 
    <router-view /> 
  </div>
</template>

<script>    

export default {
  name: "App", 
  data () {
    return {
      user: undefined,
    };
  }, 
  methods: { 
  }
};
</script>

<style lang="scss">
:root {
  --primary: #dd9595;
  --primary-alt: #c57575;
  --dark: #242038;
  --light: #faf9f6;
  --light-grey: #e3e2eb;
  --grey: #77798c;
  --dark-alt: #334155;
  --purple: #8c96ca;
  --dark-purple: #6d79b4; 
  --light-green: #d8e2dc;
  --lighter-purple: #afa7c6; 
  --primary-light: #f2baba; 
  --sidebar-width: 300px; 
  --font-family: "ColfaxAI",-apple-system,BlinkMacSystemFont,Helvetica,sans-serif;
}
* {
  margin: 0px;
  padding: 0px;
  box-sizing: border-box;
  font-family: "Open sans", sans-serif;
}
body {
  background: var(--light);
}
/*#app {
    padding: 0px;
    margin: 0px;
}*/
button {
  cursor: pointer;
  appearance: none;
  border: none;
  outline: none;
  background: none;
}
.app {
  display: flex;
  main {
    flex: 1 1 0;
    padding: 2rem;
    @media (max-width: 1024px) {
      padding-left: 6rem;
    }
  }
}

::-webkit-scrollbar {
  display: none;
}

</style>
