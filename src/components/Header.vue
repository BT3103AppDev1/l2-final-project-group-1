<template>
    <header>
        <h1>{{ title }}</h1>
        <div id = "profile">
        <div id="profile-image">
            <img src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg" alt="Profile Picture">
        </div>
        <div id = "profile-text">
            <p id = "accountTitle">Developer</p>
            <p id = "accountName"><b>John Doe</b></p>
        </div>
    </div>
    </header>

    <div class="btn_search">
        <Button @btn-click="$emit('toggle-add-project')" text="+" color="white" />
        <input type="text" v-model="text" name="text" placeholder="Search..." />
    </div>
</template>

<script> 
import Button from './Button.vue';  

export default {
    name: 'Header',
    props: {
        title: String,
        showAddProject: Boolean,
    },
    components: {
        Button
    },
    emit: ['toggle-add-project']
}
</script>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
}
#profile-image {
        position: absolute;
        top: 20px;
        right: 30px;
        border-radius: 50%;
        overflow: hidden;
        width: 70px;
        height: 70px;
    }
    #profile-text {
        position: absolute;
        top: 38px;
        right: 120px;
        border-radius: 50%;
        width: 70px;
        height: 70px;
    }
    #profile-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
    #projectTitle {
        font-size: 32pt;
    }
    #accountTitle {
        margin: 0px;
    }
    #accountName {
        margin: 0px;   
    }
</style>