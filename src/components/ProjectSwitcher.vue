<template>    
    <div class="switcher"> 
      <router-link :to="{ path: '/login/projects' }" class="projStatusButton" exact-active-class="router-link-active">
        <div class="text"> Ongoing </div>
      </router-link>
      <router-link :to="{ path: '/login/projects/completed' }" class="projStatusButton" exact-active-class="router-link-active">
        <div class="text"> Completed </div>
      </router-link>
    </div>
</template>

<script>
export default {
  name: 'ProjectSwitcher',
}
</script>

<style>

.switcher {
  margin-left: 50px; 
  width: 400px; 
  display: flex; 
  flex-direction: row; 
}

.projStatusButton {
  display: flex; 
  align-items: center;
  justify-content: center;
  width: 150px; 
  height: 45px; 
  background-color: none; 
  text-decoration: none;
  border-radius: 25px;
} 

.text {
  text-align: center;  
  font-size: 18px; 
  color: var(--dark-purple);
}


.router-link-active {
  font-weight: bold;
  background-color: var(--alt-purple); 
}

</style>
  