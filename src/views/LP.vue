<template>
  <div class="sections">
    <div class="header">
      <img class="top-logo" src="../assets/icon-no-slogan.png" alt="" />
      <div
        id="email"
        class="text"
        style="float: right; margin-right: 50px; margin-top: 18px"
      >
        support@thrive.com
      </div>
    </div> 
    <div class="section" id="section1" :style="{ top: scrollTop + 'px' }">    
        <div class="left-container">  
            <div class="slogan">
                <h1> Achieve Better, Thrive Together </h1>
            </div>
            <div class="thrive-text">
                <span class="text"> <i> THRIVE </i> </span>
            </div>
            <div class="caption">
                <span class="text"> Introducing Thrive - a revolutionary omni-platform for project management. <br> 
                    With effective communication channels, risk management features and <br>
                    efficient resource allocation, Thrive will increase the chances of project success, <br>
                    benefiting organisations as a whole. </span>
            </div>
            <div class="button-menu"> 
                <button class="start-button" v-on:click="getStarted()">
                    <span class="material-icons-round" id="join"> touch_app </span> 
                    <span class="button-text"> Get Started </span>
                </button>
                <button class="benefits-button" v-on:click="scrollToSection('section2')"> 
                    <span class="material-icons-round" id="benefits"> open_in_full </span> 
                    <span class="button-text"> See Benefits </span>
                </button>
            </div>
        </div> 
        <div class="right-container">  
            <!-- some cool motion thing-->   
            
        </div> 
    </div>  
    <div class="section" id="section2">
        <div class="title-2"> <span style="color: var(--primary)"> Thrive </span> on our features </div>
        <div class="features">
            <div class="feature" id="feature1">
                <div class="feature-text">
                    <div class="feature-title">  
                        <span class="text"> Collaborate and Conquer </span>
                    </div>
                    <div class="feature-desc">
                        <span class="text"> Thrive brings all your chats and project management tools into one place, creating a single source of truth for your team. <br>
                            No more confusion, no more missed messages, everyone is on the same page. </span>
                    </div>
                </div>
                <div class="feature-pic">
                    <img id="feature-pic" src="../assets/features-collab.png" style="width:45%;"/>
                </div>
            </div>
            <div class="feature" id="feature2">
                <div class="feature-text">
                    <div class="feature-title">  
                        <span class="text"> Task Master </span>
                    </div>
                    <div class="feature-desc">
                        <span class="text"> Thrive's task management system allows you to create, assign, and manage tasks all in one place. <br>
                            Stay organized and on top of your to-do list, no matter how many projects you're working on. </span>
                    </div>
                </div>
                <div class="feature-pic">
                    <img id="feature-pic" src="../assets/features-task.png" style="width:45%;"/>
                </div>
            </div>
            <div class="feature" id="feature3">
                <div class="feature-text">
                    <div class="feature-title">  
                        <span class="text"> Stakeholder Collaboration </span>
                    </div>
                    <div class="feature-desc">
                        <span class="text"> Thrive's stakeholder collaboration feature makes it easy to engage with your project's stakeholders. <br>
                             Keep everyone in the loop, gather feedback, and ensure your project is on track to meet its goals. </span>
                    </div>
                </div>
                <div class="feature-pic">
                    <img id="feature-pic" src="../assets/features-stakeholders.png" style="width:45%;"/>
                </div>
            </div>
            <div class="feature" id="feature4">
                <div class="feature-text">
                    <div class="feature-title">  
                        <span class="text"> Deadline Watchdog </span>
                    </div>
                    <div class="feature-desc">
                        <span class="text"> Thrive's deadline reminder system ensures you never miss a deadline again. <br>
                            Set up reminders for yourself or your team, and keep your projects on track. </span>
                    </div>
                </div>
                <div class="feature-pic">
                    <img id="feature-pic" src="../assets/features-deadline.png" style="width:45%;"/>
                </div>
            </div>
            <div class="feature" id="feature5">
                <div class="feature-text">
                    <div class="feature-title">  
                        <span class="text"> Risk Radar </span>
                    </div>
                    <div class="feature-desc">
                        <span class="text"> With Thrive's Risk Radar, you can identify potential risks before they become issues. <br>
                            Stay on top of project risks with real-time monitoring, analysis, and reporting, and ensure your projects stay on track. </span>
                    </div>
                </div>
                <div class="feature-pic">
                    <img id="feature-pic" src="../assets/features-risk.png" style="width:45%;"/>
                </div>
            </div> 
            <div class="feature" id="feature6">
                <div class="feature-text">
                    <div class="feature-title">  
                        <span class="text"> Clear Project Scope </span>
                    </div>
                    <div class="feature-desc">
                        <span class="text"> With Thrive's Clear Project Scope feature, you can define your project's scope and prevent scope creep. <br>
                            Set clear expectations, avoid misunderstandings, and ensure your team stays focused on delivering what was promised. </span>
                    </div>
                </div>
                <div class="feature-pic">
                    <img id="feature-pic" src="../assets/features-scope.png" style="width:45%;"/>
                </div>
            </div> 
        </div>
    </div> 
    <div class="section" id="section3">
        <div class="left-container-3">
            <div class="title-3"> See what our <span style="color: var(--primary)"> thriving </span> <br> community* has to say </div>
            <div class="caption-3"> *2,825,000+ users in 121 countries from companies including </div>
            <div class="slider">
                <div class="slide-track">
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-daikin.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-amazon.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-bytedance.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-DBS.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-apple.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-dettol.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-google.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-macdonalds.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-micron.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-microsoft.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-netflix.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-salesforce.png'/>
                    </div> 
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-daikin.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-amazon.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-bytedance.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-DBS.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-apple.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-dettol.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-google.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-macdonalds.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-micron.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-microsoft.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-netflix.png'/>
                    </div>
                    <div class="slide"> 
                        <img id="company" src='../assets/slide-salesforce.png'/>
                    </div>
                </div>
            </div>
            <button class="start-button" v-on:click="getStarted()" style="background-color:var(--primary-alt);">
                    <span class="material-icons-round" id="join"> touch_app </span> 
                    <span class="button-text"> Get Started </span>
            </button>
        </div> 
        <div class="right-container-3">
            <div class="story-slider">
                <div class="story-slide-track">
                    <img id="stories" src='../assets/user-stories.png'/>
                    <img id="stories" src='../assets/user-stories.png'/>
                    <img id="stories" src='../assets/user-stories.png'/>
                    <img id="stories" src='../assets/user-stories.png'/>
                    <img id="stories" src='../assets/user-stories.png'/>
                </div>
            </div>
        </div>
    </div> 
    <div class="section" id="section4">
        <div class="title-4"> Join the millions of users who are <br> already <span style="color: var(--primary)"> thriving </span>  with <span style="color: var(--primary)"> Thrive </span> </div>
        <div class="email-container">
            <div class="left-container4">
                <img id="collab" src="../assets/collab.png">
            </div>
            <div class="right-container4">
                <div class="caption-4"> From exclusive promotions to early access to new features, <br>
                    our newsletter subscribers are always the first to know. <br> <br>
                    Don't miss out on exciting updates and join our thriving community now! 
                </div>
                <form class="infoForm"> 
                    <div class="nameForm"> 
                        <input type="text" id="fname" name="fname" required placeholder="First name" style="width:250px;height:50px;outline:none;border-radius:15px;">   
                        <div class="filler" style="width: 10px;"> </div>
                        <input type="text" id="lname" name="lname" required placeholder="Last name" style="width:250px;height:50px;outline:none;border-radius:15px;"> 
                    </div>
                    <input type="text" id="lp-email" name="lp-email" required placeholder="Email address" style="width:510px;height:50px;outline:none;border-radius:15px;">
                    <button class="subscribeNow">
                        <span class="text"> Subscribe Now </span>
                    </button>
                </form>  
                <div class="copyright">
                    <span class="text"> © 2023 Thrive. All rights reserved. Various trademarks held by their respective owners. </span> 
                </div>
            </div>
        </div>
    </div>   
  </div>
  <scroll-progress-bar @scroll="setBoxShadowOpacityOnScroll()" />
</template> 

<script>  
import ScrollProgressBar from '../components/ScrollProgressBar.vue';  

export default {   
    mounted() {
      window.addEventListener('scroll', this.setBoxShadowOpacityOnScroll); 
      window.addEventListener("scroll", this.handleScroll); 
    },
    beforeDestroy() {
      window.removeEventListener('scroll', this.setBoxShadowOpacityOnScroll);
      window.removeEventListener("scroll", this.handleScroll); 
    },
    components: {
        'scroll-progress-bar': ScrollProgressBar,
    }, 
    methods: {
        scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        section.scrollIntoView({ behavior: 'smooth' });
        },
        handleScroll() {
            const section = document.getElementsByClassName('section');
            const sectionOffsetTop = section.offsetTop;
            const windowScrollY = window.scrollY;
            if (windowScrollY > sectionOffsetTop) {
                this.showShadow = true;
            } else {
                this.showShadow = false;
            }
        }, 
        getStarted() {
            this.$router.push("/login");
        },
        setBoxShadowOpacityOnScroll() {
            console.log('Scroll event detected!')
            const header = document.querySelector(".header");
            const section1 = document.getElementById('section1'); 
            section1.style.position = 'sticky';
            section1.style.top = '0';
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;  
            const opacity = scrollTop > 0 ? 1 : 0;   
            header.style.boxShadow = `0 0 10px rgba(0, 0, 0, ${opacity})`;
        }, 
    }, 
} 
</script>

<style scoped>
.header { 
    margin-top: 5px;
    width: 100%; 
    position: fixed; 
    top: 0; left: 0; right: 0; 
    z-index: 1000;
    background-color: var(--light);   
}  

.sections {
    display: flex; 
    flex-direction: column; 
    height: 100%;  
    width: 100%;
} 

.section {  
    min-height: 100vh;
    display: flex; 
    justify-content: center;
    align-items: center;  
    flex-flow: column wrap; 
    position: relative; 
    flex-direction: row;     
    background-color: var(--light);
}    

#section1 {
  position: -webkit-sticky !important;  
  position: sticky !important;
  top: 20px;
  z-index: 1;
  height: 100vh; 
}

#section2 {   
    min-height: 250vh;
    display: flex;  
    align-items: center;  
    flex-flow: column wrap; 
    position: relative; 
    flex-direction: column;    
    z-index: 2;  
}   

.section#section3 {  
    min-height: 100vh;
    display: flex; 
    justify-content: center;
    align-items: center;  
    flex-flow: column wrap; 
    position: relative; 
    flex-direction: row;    
    z-index: 4;
}   

.section#section4 {  
    min-height: 100vh;
    display: flex; 
    justify-content: center;
    align-items: center;  
    flex-flow: column wrap; 
    position: relative; 
    flex-direction: row;    
    z-index: 2;
}   


.left-container { 
    width: 50%; 
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    display: flex; 
    flex-direction: column; 
    justify-content: center;  
}

.right-container {
  width: 50%;
  height: 100%;
  padding: 20px; 
  background-color: blue;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.top-logo {
  margin-left: 30px;
  width: 10%;
}

.slogan {
  text-align: center;
  margin-top: 80px;
}

.thrive-text {
  text-transform: uppercase;
  background-image: linear-gradient(
    45deg,
    var(--dark),
    var(--purple),
    var(--primary),
    var(--purple),
    var(--dark)
  );
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  background-size: 300%;
  background-position: -100%;
  font-weight: 900;
  font-size: 6rem;
  text-align: center;
  animation: animatedText 10s infinite;
}

@keyframes animatedText {
  from {
    background-position: 0%;
  }
  to {
    background-position: 150%;
  }
}

.caption {
  margin-top: 30px;
  font-family: var(--font-family);
  font-size: 14px;
  text-align: center;
}
.button-menu {
  margin-top: 50px;
  padding-left: 7vw;
  flex-direction: row;
  display: inline-flex;
}

.start-button {
  border: none;
  padding: 15px;
  width: 170px;
  min-width: 170px;
  font-size: 15px;
  text-decoration: none;
  font-weight: 400;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 50px;
  background-color: var(--dark-alt);
  color: var(--light);
  margin: 20px;
  border-radius: 10px;
  text-align: center;
  transition: 0.2s ease-out;
}
.start-button:hover {
  background-color: var(--dark);
}

.benefits-button {
  border: 2px solid var(--purple);
  padding: 15px;
  width: 170px;
  min-width: 170px;
  font-size: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 50px;
  background-color: var(--light);
  color: var(--purple);
  margin: 20px;
  border-radius: 10px;
  text-align: center;
  transition: all 0.3s ease;
}

.benefits-button:hover {
  background-color: var(--light-grey);
}

.material-icons-round#join {
  font-size: 30px;
  color: var(--light);
}

.material-icons-round#benefits {
  font-size: 30px;
  color: var(--purple);
}

.button-text {
  padding-left: 10px;
  font-weight: 500;
} 

.features {
    display: flex;
    flex-direction: flex column; 
    flex-flow: column wrap; 
    align-items: left;
    width: 100%; 
    height: 100%;
}

.feature {
    margin-top: 50px;
    padding-left: 100px;
    display: flex;
    flex-direction: row; 
    flex-flow: row wrap; 
    width: 100%;
}

.feature-text {
    width: 70%; 
}

.feature-pic {
    width: 30%;
}
.feature-title {
    font-weight: 800;
    font-size: 25px;
    margin-bottom: 20px;
} 

.feature-desc {
    line-height: 2;
}
.left-container-3 {
    width: 42%; 
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    display: flex; 
    flex-direction: column; 
    justify-content: center;  
}

.slider {
    height: 80px; 
    margin-top: 40px; 
    margin-left: 30px; 
    position: left; 
    width: 90%; 
    display: grid; 
    place-items: center;
    overflow: hidden;
}

.story-slider { 
    height: 100vh;  
    width: 70vw;
    position: top;
    display: grid; 
    place-items: center;
    overflow: hidden;
}

.slide-track {
    display: flex; 
    width: calc(80px * 26);
    animation: scroll 40s linear infinite;
}

.story-slide-track { 
    display: flex;
    flex-direction: column;
    height: calc(800px * 4);
    animation: scrollstory 40s linear infinite;
}

@keyframes scrollstory {
    0% {
        transform: translateY(0);
    }
    100% {
        transform: translateY(calc(-800px * 2))
    }
}
#stories {
    width: 80%; 
}

.slide-track:hover {
    animation-play-state: paused;
}

.slide {
    height: 60px; 
    width: 80px; 
    display: flex; 
    align-items: center; 
    padding: 2px; 
}

#company{
    width: 80%; 
}

@keyframes scroll {
    0% {
        transform: translateX(0); 
    }
    100% {
        transform: translateX(calc(-80px * 13));
    }
}

.right-container-3 {
    width: 58%;  
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    display: flex; 
    flex-direction: column; 
    justify-content: center;   
}

.title-3 {
    font-size: 38px;
    font-weight: 900;
    padding-left: 30px;
}
 
.caption-3 {
    padding-left: 30px;
    margin-top: 10px;
}

.title-4 {
    font-size: 38px;
    font-weight: 900; 
    text-align: center;
    padding-top: 100px;
}

.title-2 {
    font-size: 38px;
    font-weight: 900; 
    text-align: center; 
    margin-bottom: 50px;
}

.email-container {
    width: 80vw; 
    height: 60vh;
    border-radius: 25px;
    background-color: var(--primary);
    display: flex; 
    flex-direction: row;
    background: linear-gradient(-45deg, var(--primary-light), var(--lighter-purple), var(--purple), var(--light-green));
    background-size: 400% 400%;
    animation: gradient 20s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

.left-container4 {
    width: 30%;  
    height: 100%;
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    display: flex; 
    flex-direction: column; 
    justify-content: center;   
}

.right-container4 {
    width: 70%;  
    height: 100%; 
    padding-left: 20px;
    padding-right: 20px;
    padding-bottom: 20px;
    display: flex; 
    flex-direction: column; 
    justify-content: center;   
}

#collab {
    width: 130%;
    height: 300px;
    margin-top: 20px;
    height: calc(300px * 1.05);
    animation: bounce 2s linear infinite;
}

@keyframes bounce {
    0% {
        transform: translateY(0);
    }
    5% {
        transform: translateY(calc(-8px));  
    }
}

.caption-4 {
    font-size: 16px;
    font-weight: 500; 
    text-align: center; 
} 

.infoForm {
    display: flex; 
    flex-direction: column;
    max-height: 680px; 
    align-items: center;
}

.nameForm {
    display: flex; 
    flex-direction: row; 
    margin-top: 50px; 
    margin-bottom: 20px;
}  

input[type=text i] {
    opacity: 0.7;
    background-color: var(--light);  
    padding: 20px; 
    border: 1px var(--light);
    color: var(--dark);
    font: var(--font-family);
    font-size: 14px; 
    text-transform: uppercase;  
}

input[type=text i] span {
    position: absolute;
    left: 0; 
}

input[type=text i]:focus {
    opacity: 0.9;   
    font: var(--font-family);
    transition: 0.4s;
}

input[type=text i]:focus::placeholder { 
    transform: translateY(-18px);
    font-size: 10px;
}

input[type=text i] input {
    width: 100%;
    padding: 20px;
}

.copyright { 
    font-size: 11px;
    text-align: center; 
}

.subscribeNow {  
  text-align: center;
  display: flex; 
  justify-content: center;
  border: none;
  padding: 10px;
  width: 510px; 
  font-size: 16px; 
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;
  height: 45px;
  background-color: var(--dark);
  color: var(--purple);
  margin: 20px;
  border-radius: 10px; 
  transition: 0.2s ease-out;
}
.subscribeNow:hover {
  background-color: var(--dark-alt);
}  
</style> 
