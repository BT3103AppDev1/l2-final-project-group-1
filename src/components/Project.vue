<template>
    <div @click="redirectToOtherComponent">
        <h3>{{project.text}}
            <button @click="$event=>$emit('delete-project',project.id)" type="button" class="delBtn">delete</button>
        </h3>
    </div>    
</template>

<script>
export default {
    name:"Project",
    props: {
        project: Object,
    },
    methods: {
      redirectToOtherComponent() {
        this.$router.push('/login/projects/tabnavigation') // Replace '/other-component' with the path to your desired component
      },
    },
}
</script>

<style scoped>
.delBtn {
  color: red;
}
.task {
  background: #f4f4f4;
  margin: 5px;
  padding: 10px 20px;
  cursor: pointer;
}
.task.reminder {
  border-left: 5px solid green;
}
.task h3 {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>