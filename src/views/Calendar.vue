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
  </main>
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import ProfileDisplay from "../components/ProfileDisplay.vue";
export default {
  name: "Calendar",
  components: {
    Sidebar,
    ProfileDisplay,
  },
  data() {
      return {
        currentDate: new Date(),
        events: [
          { id: 1, date: '2023-04-01', title: 'Event 1' },
          { id: 2, date: '2023-04-05', title: 'Event 2' },
          { id: 3, date: '2023-04-06', title: 'Event 3' },
          { id: 4, date: '2023-04-13', title: 'Event 4' },
        ],
      };
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
    },
  };
</script>

<style scoped>
  .calendar {
    font-family: Arial, sans-serif;
    text-align:left;
    margin: 0 auto;
    max-width: 600px;
    margin-top: 50px;
    float: left;
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
  </style>