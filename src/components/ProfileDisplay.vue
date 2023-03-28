<template>
  <header>
    <div id="profile">
      <div id="profile-image">
        <!-- <img
          src="https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg"
          alt="Profile Picture"
        /> -->
        <img :src="userPic" alt="Profile Picture" />
      </div>
      <div id="profile-text">
        <p id="accountTitle">{{ userAccount }}</p>
        <p id="accountName">
          <b>{{ userName }}</b>
        </p>
      </div>
    </div>
  </header>
</template>

<script>
import { auth, db } from "../firebase";
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
