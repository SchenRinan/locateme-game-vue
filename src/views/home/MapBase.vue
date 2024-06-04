<template>
  <div id="map-container">
    <div id="map"></div>
    <div v-if="currentLocation">
      <button class="btn btn-primary circular-btn" @click="handleCheatClick">?</button>
      <div v-if="showInfo" class="info-card">
        <div class="card card-body">
          <h2>You are looking for the place where:</h2>
          <p>{{ currentLocation.description }}</p>
        </div>
      </div>
    </div>
    <div v-if="previousLocation" class="previous-location">
      <h3>Yesterday's location:</h3>
      <p>{{ previousLocation.name }}</p>
      <p>{{ previousLocation.description }}</p>
    </div>
    <button @click="goToCustomLocation" class="btn btn-secondary">Add Custom Location</button>
    <div v-if="cheatActivated && showCoordinates" class="mouse-coordinates">
      <p>Latitude: {{ mouseCoordinates.lat.toFixed(6) }}, Longitude: {{ mouseCoordinates.lng.toFixed(6) }}</p>
    </div>
    <button v-if="cheatActivated" @click="toggleCoordinates" class="btn btn-secondary coordinates-toggle-btn">
      {{ showCoordinates ? 'Hide' : 'Show' }} Coordinates
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import { useRouter } from 'vue-router';
import L from "leaflet";
import locations from "@/assets/locations.json"; // Import your locations JSON data

interface Location {
  name: string;
  id: number;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export default defineComponent({
  name: "HomeComponent",
  setup() {
    const currentLocation = ref<Location | null>(null);
    const previousLocation = ref<Location | null>(null);
    const showInfo = ref<boolean>(false);
    const clickCount = ref<number>(0);
    const cheatActivated = ref<boolean>(false);
    const showCoordinates = ref<boolean>(true);
    const router = useRouter();
    const mouseCoordinates = ref<L.LatLng | null>(null);

    const handleCheatClick = () => {
      clickCount.value++;
      if (clickCount.value >= 5) {
        cheatActivated.value = true;
      }
      showInfo.value = !showInfo.value; // Toggle showInfo to show/hide the description card
    };

    const toggleCoordinates = () => {
      showCoordinates.value = !showCoordinates.value;
    };

    const goToCustomLocation = () => {
      router.push('/custom');
    };

    onMounted(() => {
      const currentDate = new Date();
      const dayOfYear = getDayOfYear(currentDate);

      // Calculate the index based on the current date
      const index = dayOfYear % locations.length;
      const previousIndex =
        (dayOfYear - 1 + locations.length) % locations.length;

      currentLocation.value = locations[index] as Location;
      previousLocation.value = locations[previousIndex] as Location;

      const initialCoordinates: L.LatLngExpression = [
        locations[index].coordinates.latitude,
        locations[index].coordinates.longitude,
      ];

      const map = L.map("map").setView(initialCoordinates, 3);

      L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
        {
          attribution: "Tiles &copy; Esri",
        }
      ).addTo(map);

      const circle = L.circle(initialCoordinates, {
        color: "white",
        fillColor: "blue",
        fillOpacity: 0,
        radius: 250,
        weight: 2,
        stroke: true,
      }).addTo(map);

      map.on("zoomend", () => {
        const zoomLevel = map.getZoom();

        if (zoomLevel < 10) {
          circle.setStyle({ fillOpacity: 0 });
        } else {
          circle.setStyle({ fillOpacity: 0.5 });
        }
      });

      map.on("mousemove", (e: L.LeafletMouseEvent) => {
        mouseCoordinates.value = e.latlng;
      });
    });

    // Function to get the day of the year
    function getDayOfYear(date: Date): number {
      const start = new Date(date.getFullYear(), 0, 0);
      const diff = date.getTime() - start.getTime();
      const oneDay = 1000 * 60 * 60 * 24;
      return Math.floor(diff / oneDay);
    }

    return {
      currentLocation,
      previousLocation,
      showInfo,
      handleCheatClick,
      cheatActivated,
      toggleCoordinates,
      showCoordinates,
      goToCustomLocation,
      mouseCoordinates,
    };
  },
});
</script>

<style scoped>
#map-container {
  position: relative;
  height: 90vh;
}

#map {
  height: 100%;
}

.circular-btn {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000; /* Ensure the button is above the map */
}

.info-card {
  position: absolute;
  bottom: 80px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  z-index: 1000; /* Ensure the info card is above the map */
}

.previous-location {
  margin-top: 20px;
}

.mouse-coordinates {
  position: absolute;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background: rgba(255, 255, 255, 0.8);
  padding: 5px;
  border-radius: 5px;
  z-index: 1000; /* Ensure the coordinates are above the map */
}

.coordinates-toggle-btn {
  position: absolute;
  top: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000; /* Ensure the toggle button is above the map */
}
</style>
