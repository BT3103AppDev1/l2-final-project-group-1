<template>
<p id = "projectTitle">{{ projectTitle }}</p> 
    <div id = "tasktable">
        <button class="button-27" @click="showPopup = true"> New+</button>
                <table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Author</th>
                            <th>Content</th>
                        </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(response, index) in this.allResponses" :key="index">
                        <td>{{ response.id }}</td>
                        <td>{{ response.employee }}</td>
                        <td>{{ response.content }}</td>
                    </tr>
                    </tbody>
                </table>
                <popup :title="popupTitle" v-if="showPopup" @close="showPopup = false">
                    <h2 id = "windowTitle">Provide Feedback</h2>
                    <form @submit.prevent="addFeedback" class="add-form">
                        <div class = "form-control">
                            <label for="content">Content:</label>
                            <input type="text" id="title" v-model="newResponse.content" />
                            <br />     
                        </div> 
                    <button type="submit" id = "assign">Add Feedback</button>
                    </form>
                </popup>
    </div>
</template> 

<script>
import { auth, db } from "../database/firebase";
import { collection, getDocs, doc, deleteDoc, query, where, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import Popup from "../components/Popup.vue";

export default {
    data() {
        return {
            allResponses: [],
            newResponse: {
                content: "",
            },
            userName: "",
            userEmail: "",
            userAccount: "",
            showPopup: false,
        };
  },
  async mounted() {
    await onAuthStateChanged(auth, (user) => {
        if (user) {
            this.displayaccount(user.email)
        }
    })
    
  },

    methods: {
        async fetchFeedback() {
            const querySnapshot = await getDocs(collection(db, "projects", this.projectTitle, "feedback"))
            for (const docu of querySnapshot.docs) {
                const tempEmail = docu.data().memberEmail;
                const userRef = doc(db, "userinfo", tempEmail);
                const userSnapshot = await getDoc(userRef)
                const employee = userSnapshot.data().name;
                const oldResponses = docu.data().memberFeedback;
                Object.keys(oldResponses).forEach((responseId) => {
                    const tempResponse = oldResponses[responseId];
                    this.allResponses.push({
                        employee: employee,
                        content: tempResponse.content,
                        id: responseId,
                    });
                })
            }
        },

    
        async addFeedback() {
            try {
            const docRef = doc(db,'projects', this.projectTitle)
            const snapshot = await getDoc(docRef)
            const tempCount = snapshot.data().feedback_count
            const responseId = tempCount + 1
            await updateDoc(docRef, { feedback_count: tempCount });
            this.allResponses.push({
                employee: this.userName,
                id: responseId,
                content: this.newResponse.content,
            });
            const employeeRef = doc(db, "projects", this.projectTitle, "feedback", this.userEmail)
            const querySnapshot = await getDoc(employeeRef)
                const tempResponses = querySnapshot.data().memberFeedback;
                tempResponses[responseId] = {
                    content: this.newResponse.content,
                };
            await updateDoc(employeeRef, { memberFeedback: tempResponses });

            } catch (error) {
                console.error("Error adding document: ", error);
            };
            this.newResponse.content = "";
            window.location.reload();
        },
        async displayaccount(useremail) {
            const Snapshot = await getDocs(collection(db, "userinfo"));
            Snapshot.forEach((doc) => {
                if (doc.data().email === useremail) {
                this.userAccount = doc.data().account_type;
                this.userName = doc.data().name;
                this.userEmail = useremail;
                }
            });
             await this.fetchFeedback();
        },
      
    },
    props: {
        projectTitle: String
    },
    components: {
        Popup
    }
}


</script>
    
<style scoped>
  #app {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 100vh; /* Set the height to fill the entire viewport */
    }
    table {
        border-collapse: collapse;
        width: 100%;
    }
    th, td {
        border: 1px solid black;
        padding: 8px;
        text-align: left;
    }
    th {
        background-color: #f2f2f2;
    }
    #projectTitle {
        font-size: 25px;
        font-weight: 600;
        text-align: center;
        margin-top: 10px;
    } 
    #header {
        font-size: 20pt;
        font-weight: bold;
    }
    #mywork {
        font-size: 15pt;
        font-weight: bold;
        margin: 0px;
    }
    #confirm-changes {
        align-self: flex-end;
        background-color: #6d79b4;
        color: #FFFFFF;
        border-radius: 12px; 
        text-align: center;
        margin: 4px 2px;
        cursor: pointer;
        padding: 5px 10px 5px 10px;
        border-style: solid;
        border-color: #4a4e69;
        float: right;
    } 
    .changeBtn {
        color: #FFFFFF;
    }
    .popup {
        width: 400px;
        height: 600px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: white;
        padding: 20px;
        border: 1px solid black;
        z-index: 9999;
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        }
    .add-form {
        margin-bottom: 40px;
    }
    .form-control {
        margin: 20px 0;
    }
    .form-control label {
        display: block;
    }
    .form-control input {
        width: 95%;
        height: 40px;
        margin: 5px;
        padding: 3px 7px;
        font-size: 17px;
    }
    .form-control-check {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
    .form-control-check label {
        flex: 1;
    }
    .form-control-check input {
        flex: 2;
        height: 20px;
    }
    .button-27 {
        float: right;
        appearance: none;
        background-color: #6d79b4;
        border: 2px solid #1A1A1A;
        border-radius: 15px;
        box-sizing: border-box;
        color: #FFFFFF;
        cursor: pointer;
        font-family: Roobert,-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
        font-size: 16px;
        font-weight: 600;
        line-height: normal;
        margin: -30px -20px 10px 40px;
        min-height: 50px;
        min-width: 0;
        outline: none;
        padding: 13px 24px;
        text-align: center;
        text-decoration: none;
        transition: all 300ms cubic-bezier(.23, 1, 0.32, 1);
        user-select: none;
        -webkit-user-select: none;
        touch-action: manipulation;
        will-change: transform; 
    }
    .button-27:disabled {
        pointer-events: none;
    }

    .button-27:hover {
        box-shadow: rgba(0, 0, 0, 0.25) 0 8px 15px;
        transform: translateY(-2px);
    }
    .button-27:active {
        box-shadow: none;
        transform:  translateY(0);

    }
    #assign {
        display: inline-block;
        background: #000;
        color: #fff;
        border: none;
        padding: 10px 20px;
        border-radius: 5px;
        cursor: pointer;
        text-decoration: none;
        font-size: 15px;
        font-family: inherit;
        margin: auto;
    }
</style>