// Chat FN  
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, collection, orderBy, limit, addDoc, serverTimestamp, query, onSnapshot } from 'firebase/firestore';
import { ref, onUnmounted, computed } from 'vue'; 

const firebaseConfig = {
  apiKey: "AIzaSyAE6kTKvywwI-ssQsqPMPy35vUsACNbgY4",
  authDomain: "bt3103-thrive.firebaseapp.com",
  projectId: "bt3103-thrive",
  storageBucket: "bt3103-thrive.appspot.com",
  messagingSenderId: "638873242319",
  appId: "1:638873242319:web:9433007c4aa83ed58585ba",
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export default firebaseApp;

export function useAuth() {
  const user = ref(null);
  const unsubscribe = auth.onAuthStateChanged(_user => (user.value = _user));
  onUnmounted(unsubscribe);
  const isLogin = computed(() => user.value !== null);

  const signIn = async () => {
    const googleProvider = new firebase.auth.GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider);
  };
  const signOut = () => signOut(auth);

  return { user, isLogin, signIn, signOut };
}

const firestore = getFirestore(firebaseApp);
const messagesCollection = collection(firestore, 'messages');
const messagesQuery = query(messagesCollection, orderBy('createdAt', 'desc'), limit(100));

export function useChat() {
  const messages = ref([]);
  const unsubscribe = onSnapshot(messagesQuery, snapshot => {
    messages.value = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .reverse();
  });
  onUnmounted(unsubscribe);

  const { user, isLogin } = useAuth();
  const sendMessage = text => {
    if (!isLogin.value) return;
    const { photoURL, uid, displayName } = user.value;
    addDoc(messagesCollection, {
      userName: displayName,
      userId: uid,
      userPhotoURL: photoURL,
      text: text,
      createdAt: serverTimestamp()
    });
  };

  return { messages, sendMessage };
} 
 
 