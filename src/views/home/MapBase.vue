<template>
  <div id="map"></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import L from "leaflet";

export default defineComponent({
  name: "MapComponent",
  setup() {
    onMounted(() => {
      const isMobile = window.innerWidth < 768; // Check if the screen width is less than 768px (common threshold for mobile devices)

      // Determine the initial zoom level based on the device
      const initialZoom = isMobile ? 1 : 3;

      // Center the map at the center of the Earth
      const initialCoordinates: L.LatLngExpression = [30, 0]; // Prime meridian (0 degrees longitude) and equator (0 degrees latitude)

      const map = L.map("map").setView(initialCoordinates, initialZoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      // Add a circle with initial style
      const circle = L.circle([48.858093, 2.294694], { // Center the circle at the center of the Earth
        color: "red",
        fillColor: "blue",
        fillOpacity: 0,
        radius: 100,
        stroke: false, // Initially no stroke
      }).addTo(map);

      // Adjust circle style on zoom change
      map.on('zoomend', () => {
        const zoomLevel = map.getZoom();

        // Adjust circle visibility based on zoom level
        if (zoomLevel < 13) {
          circle.setStyle({ fillOpacity: 0 }); // Hide circle when zoomed out
        } else {
          circle.setStyle({ fillOpacity: 0.5 }); // Show circle with original opacity when zoomed in
        }
      });
    });
  },
});
</script>

<style scoped>
#map {
  height: 400px; /* Adjust the height as needed */
}
</style>
