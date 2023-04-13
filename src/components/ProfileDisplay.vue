<template>
  <div id="profile">
    <div id="profile-image">
      <!-- <img
          src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg"
          alt="Profile Picture"
        /> -->
      <img v-bind:src="userPic" alt="Profile Picture" />
    </div>
    <div id="profile-text">
      <p id="accountTitle">{{ userAccount }}</p>
      <p id="accountName">
        <b>{{ userName }}</b>
      </p>
    </div>
  </div>
</template>

<script>
import { auth, db } from "../database/firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import {
  getStorage,
  ref,
  getDownloadURL,
  deleteObject,
  uploadBytes,
} from "firebase/storage";
export default {
  data() {
    return {
      userAccount: "",
      userName: "",
      userPic: "",
    };
  },
  async mounted() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.displaydetails(user.email);
      }
    });
  },
  methods: {
    async displaydetails(useremail) {
      const Snapshot = await getDocs(collection(db, "userinfo"));
      Snapshot.forEach((doc) => {
        if (doc.data().email === useremail) {
          this.userAccount = doc.data().account_type;
          this.userName = doc.data().name;
          this.userPic = doc.data().profilepic;
        }
      });
      const filename = this.userPic;
      const storage = getStorage();
      const reference = ref(storage, "profilepics/" + filename);
      await getDownloadURL(reference).then((x) => {
        this.userPic = x;
      });
    },
  },
};
</script>

<style scoped>
#profile-image {
  position: absolute;
  top: 3%;
  left: 93%;
  border-radius: 50%;
  overflow: hidden;
  width: 6%;
  height: 10%;
  border: 1px solid grey;
}
#profile-text {
  position: absolute;
  top: 5%;
  left: 81%;
  width: 11%;
  text-align: right;
}
#profile-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}
</style>
