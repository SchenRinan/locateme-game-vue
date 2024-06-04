<template>
  <div>test</div>
  <!-- src/components/CustomLocationComponent.vue -->
<!-- <template>
  <div id="map-container">
    <div id="map"></div>
    <div class="custom-location-form">
      <h3>Add Custom Location</h3>
      <form @submit.prevent="addCustomLocation">
        <div class="form-group">
          <label for="title">Title</label>
          <input type="text" v-model="customLocation.title" required />
        </div>
        <div class="form-group">
          <label for="description">Description</label>
          <textarea v-model="customLocation.description" required></textarea>
        </div>
        <div class="form-group">
          <label for="latitude">Latitude</label>
          <input type="number" v-model="customLocation.latitude" step="0.000001" required />
        </div>
        <div class="form-group">
          <label for="longitude">Longitude</label>
          <input type="number" v-model="customLocation.longitude" step="0.000001" required />
        </div>
        <button type="submit" class="btn btn-primary">Add Location</button>
      </form>
    </div>
    <div v-if="shareableUrl">
      <h3>Shareable URL:</h3>
      <p><a :href="shareableUrl">{{ shareableUrl }}</a></p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import L from "leaflet";

interface CustomLocation {
  title: string;
  description: string;
  latitude: number | null;
  longitude: number | null;
}

export default defineComponent({
  name: "CustomLocationComponent",
  setup() {
    const customLocation = ref<CustomLocation>({
      title: "",
      description: "",
      latitude: null,
      longitude: null,
    });
    const shareableUrl = ref<string | null>(null);
    const map = ref<L.Map | null>(null);

    const addCustomLocation = () => {
      if (customLocation.value.latitude && customLocation.value.longitude) {
        updateMap();
        generateShareableUrl();
      }
    };

    const generateShareableUrl = () => {
      const { title, description, latitude, longitude } = customLocation.value;
      shareableUrl.value = `${window.location.origin}${window.location.pathname}?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}&latitude=${latitude}&longitude=${longitude}`;
    };

    const updateMap = () => {
      if (customLocation.value.latitude && customLocation.value.longitude) {
        const initialCoordinates: L.LatLngExpression = [
          customLocation.value.latitude,
          customLocation.value.longitude,
        ];

        if (map.value) {
          map.value.remove();
        }

        map.value = L.map("map").setView(initialCoordinates, 3);

        L.tileLayer(
          "https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}",
          {
            attribution: "Tiles &copy; Esri",
          }
        ).addTo(map.value);

        const circle = L.circle(initialCoordinates, {
          color: "white",
          fillColor: "blue",
          fillOpacity: 0,
          radius: 250,
          weight: 2,
          stroke: true,
        }).addTo(map.value);

        map.value.on("zoomend", () => {
          const zoomLevel = map.value!.getZoom();

          if (zoomLevel < 10) {
            circle.setStyle({ fillOpacity: 0 });
          } else {
            circle.setStyle({ fillOpacity: 0.5 });
          }
        });
      }
    };

    return {
      customLocation,
      addCustomLocation,
      shareableUrl,
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

.custom-location-form {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 300px;
  z-index: 1000; /* Ensure the form is above the map */
  background: white;
  padding: 10px;
  border-radius: 5px;
}
</style> -->

</template>

<script>
export default {



}
</script>

<style>

</style>

