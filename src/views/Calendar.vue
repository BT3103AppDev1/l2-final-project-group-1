<template>
  <ProfileDisplay />
  <Sidebar />
  <main id="calendar-page">
    <div class="calendar">
      <h1>{{ currentMonth }}</h1>
      <table>
        <thead>
          <tr>
            <th v-for="day in daysOfWeek" :key="day">{{ day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(week, weekIndex) in weeks" :key="weekIndex">
            <td v-for="(day, dayIndex) in week" :key="dayIndex">
              <div class="day">{{ day }}</div>
              <div class="events">
                <div v-for="event in eventsForDay(day)" :key="event.id">{{ event.title }}</div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="addEvents">
      <h3 class="formHeader">Add an Event</h3>
      <label>Event Name:</label>
      <br>
      <input v-model="eventName">
      <br>
      <label>Event Day:</label>
      <br>
      <input type="date" id="date-picker" :min="today" v-model="selectedDate">
      <br>
      <label>Event Time:</label>
      <br>
      <input type="time" id="time-picker" v-model="selectedTime">
      <br>
      <label>Event Venue:</label>
      <br>
      <input v-model="selectedVenue">
      <br>
      <label>Event Details:</label>
      <br>
      <input v-model="details">
      <br>
      <label>Invite people:</label>
      <br>
      <input v-model="member">
      <button class="names" @click="addMember">Add</button>
      <br>
      <button v-for="item in invites" :key="item.id" class="buttonName" @click="removeName(item.id)">{{ item.name + " X" }}</button>
      <div class="details">
        <h4>Confirm details:</h4>
        <p>{{ "Event Name: " + eventName }}</p>
        <p>{{ "Event Date: " + selectedDate }}</p>
        <p>{{ "Event Time: " + selectedTime }}</p>
        <p>{{ "Event Venue: " + selectedVenue }}</p>
        <p>{{ "Event Details: " + details }}</p>
      </div>
      <button class="addEvent" @click="addEvent">+ Add Event</button>
    </div>
  </main>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import ProfileDisplay from "../components/ProfileDisplay.vue";

import { auth, db } from "/src/database/firebase.js";
import { collection, query, where, getDocs, doc, addDoc, setDoc, deleteDoc, getDoc, updateDoc } from "firebase/firestore";

import { onAuthStateChanged } from "firebase/auth";

export default {
  name: "Calendar",
  components: {
    Sidebar,
    ProfileDisplay,
  },
  data() {
      return {
        userName: '',
        invites: [],
        member: '',
        email: '',
        eventName: '',
        selectedVenue: '',
        details: '',
        selectedTime: '',
        selectedDate: '',
        today: new Date().toISOString().substr(0, 10),
        currentDate: new Date(),
        events: [],
      };
    },

    async mounted() {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          this.email = user.email;
          this.userName = user.name;
          this.getEvents();
        }
      });
    },

    computed: {
      currentMonth() {
        return this.currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });
      },
      daysOfWeek() {
        return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      },
      weeks() {
        const month = this.currentDate.getMonth();
        const year = this.currentDate.getFullYear();
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
  
        let weeks = [[]];
        let currentWeek = 0;
  
        for (let i = 0; i < firstDay; i++) {
          weeks[currentWeek].push('');
        }
  
        for (let i = 1; i <= daysInMonth; i++) {
          if (weeks[currentWeek].length === 7) {
            currentWeek++;
            weeks.push([]);
          }
          weeks[currentWeek].push(i);
        }
  
        return weeks;
      },
    },
    methods: {
      eventsForDay(day) {
        const date = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), day);
        return this.events.filter(event => event.date === date.toISOString().substr(0, 10));
      },

      async getEvents() {
        console.log("getting events")
        const docRef = doc(db, "Invites", this.email);
        const docSnapshot = await getDoc(docRef)
        const eventsColRef = collection(db, 'Events')
        if (docSnapshot.exists()) {
          const inviteData = docSnapshot.data()
          const inviteArray = inviteData.events
          inviteArray.forEach(async eventId => {
            const eventRef = doc(eventsColRef, eventId)
            const eventSnap = await getDoc(eventRef)
            const eventData = eventSnap.data()
            this.events.push({
              id: this.events.length + 1,
              date: eventData.date,
              title: eventData.name,
              time: eventData.time,
              venue: eventData.venue,
            })
          })
        } else {
          console.log("no events")
        }
      },

      async addMember() {
        const colRef = collection(db, 'userinfo')
        const docRef = doc(colRef, this.member)
        const docSnap = await getDoc(docRef)
        if (!docSnap.exists()) {
          alert('User does not exist')
        } else {
          const docData = docSnap.data();
          const invite = {
            id: this.invites.length + 1,
            name: docData.name,
            email: this.member,
          }
          this.invites.push(invite);
        }
        this.member = ''
      },

      removeName(idNum) {
        this.invites = this.invites.filter((item) => item.id !== idNum);
      },

      async loadInvites(eventId) {
        this.invites.push({
          id: this.invites.length + 1,
          name: this.userName,
          email: this.email,
        })
        this.invites.forEach(async person => {
          const docRef = doc(db, "Invites", person.email);
          const docSnapshot = await getDoc(docRef);
          if (!docSnapshot.exists()) {
            const eventsArr = []
            eventsArr.push(eventId.toString())
            await setDoc(docRef, {
              events: eventsArr,
            }).catch((error) => console.log(error))
          } else {
            const documentData = docSnapshot.data();
            const currentArray = documentData.events;
            currentArray.push(eventId.toString());
            await updateDoc(docRef, { events: currentArray });
          }
        })
      },

      async addEvent() {
        //makeAlerts()
        const colRef = collection(db, 'Events')
        const data = {
          date: this.selectedDate,
          details: this.details,
          name: this.eventName,
          time: this.selectedTime,
          venue: this.selectedVenue,
        }
        await addDoc(colRef, data).catch((error) => console.log("error: ", error)).then((docRef) => {
          const eventId = docRef.id
          this.loadInvites(eventId);
        })
        this.events.push({
          id: this.events.length + 1,
          date: this.selectedDate,
          title: this.eventName,
          time: this.selectedTime,
          venue: this.selectedVenue,
        })
        this.selectedDate = ''
        this.selectedTime = ''
        this.selectedVenue = ''
        this.eventName = ''
        this.details = ''
        this.invites = []
      }
    },
  };
</script>

<style scoped>
.names {
  color: white;
  padding: 5px;
  margin: 5px;
}
input {
  margin-bottom: 10px;
}
.formHeader {
  margin-bottom: 20px;
}
  button {
    border: 1px solid black;
    padding: 5px;
    margin-top: 10px;
    border-radius: 4px;
    background-color: #444;
  }

  .buttonName {
    color: white;
  }
  .addEvent {
    color: white;
    padding: 5px;
    margin-left: 1000px;
  }
  .addEvents {
    margin-top: 50px;
    text-align: left;
  }
  .calendar {
    font-family: Arial, sans-serif;
    text-align:left;
    margin: 0 auto;
    max-width: 600px;
    margin-top: 50px;
    float: left;
    margin-right: 100px;
  }
  .calendar table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
  }
  
  .calendar th {
    background-color: #f5f5f5;
    padding: 10px;
    text-align: center;
    vertical-align: top;
  }
  .calendar td {
    padding: 10px;
    border: 1px solid #ddd;
    cursor: pointer;
    text-align: right;
    vertical-align: top;
    height: 80px;
    width: 80px;
  }
  .calendar td:hover {
    background-color: #f5f5f5;
  }
  .calendar td.today {
    background-color: #ffe0b2;
    font-weight: bold;
  }
  .calendar td.selected {
    background-color: #2196f3;
    color: #fff;
  }

  .day {
    font-size: 12px;
  }

  input[type="date"]::-webkit-calendar-picker-indicator {
  background-size: contain;
  cursor: pointer;
}

input{
  margin-top: 3px;
  background-color: #f7f7f7;
  border-radius: 4px;
  font-size: 16px;
  padding: 3px;
  width: 200px;
  border: 1px solid;
}

p {
  font-size: 14px;
}

label {
  font-size: 14px;
}
  </style>