// Chat FN  
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth'; 
import { getFirestore } from 'firebase/firestore';
import { realtimeDb } from '/src/database';

const firebaseConfig = {
  apiKey: "AIzaSyAE6kTKvywwI-ssQsqPMPy35vUsACNbgY4",
  authDomain: "bt3103-thrive.firebaseapp.com",
  projectId: "bt3103-thrive",
  storageBucket: "bt3103-thrive.appspot.com",
  messagingSenderId: "638873242319",
  appId: "1:638873242319:web:9433007c4aa83ed58585ba",
};

import {
	onDisconnect,
	onValue,
	ref,
	serverTimestamp,
	set
} from 'firebase/database'

export const firebaseListener = onValue

export const userStatusRef = userId => {
	return ref(realtimeDb, '/status/' + userId)
}

export const updateUserOnlineStatus = currentUserId => {
	const isOfflineData = {
		state: 'offline',
		lastChanged: serverTimestamp()
	}

	const isOnlineData = {
		state: 'online',
		lastChanged: serverTimestamp()
	}

	const connectedRef = ref(realtimeDb, '.info/connected')

	onValue(connectedRef, snap => {
		if (snap.val() === true) {
			onDisconnect(userStatusRef(currentUserId))
				.set(isOfflineData)
				.then(() => {
					set(userStatusRef(currentUserId), isOnlineData)
				})
		}
	})
}

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const db = getFirestore(firebaseApp);

export default firebaseApp; 

 
 