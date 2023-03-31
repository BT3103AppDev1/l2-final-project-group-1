import { initializeApp } from 'firebase/app'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const config = {
	apiKey: 'AIzaSyAE6kTKvywwI-ssQsqPMPy35vUsACNbgY4',
	authDomain: 'bt3103-thrive.firebaseapp.com',
	projectId: 'bt3103-thrive',
	storageBucket: 'bt3103-thrive.appspot.com',
	messagingSenderId: '638873242319',
	appId: '1:638873242319:web:9433007c4aa83ed58585ba'
}

initializeApp(config)

export const firestoreDb = getFirestore()
export const realtimeDb = getDatabase()
export const storage = getStorage()
