<template>
  <div id="map"></div>
  <div></div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import L from "leaflet";
import locations from "@/assets/locations.json"; // Import your locations JSON data

export default defineComponent({
  name: "MapComponent",
  setup() {
    onMounted(() => {
      const isMobile = window.innerWidth < 768;
      const initialZoom = isMobile ? 1 : 3;

      const currentDate = new Date();
      const dayOfYear = getDayOfYear(currentDate);

      // Calculate the index based on the current date
      const index = dayOfYear % locations.length;
      const initialCoordinates: L.LatLngExpression = [
        locations[index].coordinates.latitude,
        locations[index].coordinates.longitude
      ];
      console.log(dayOfYear)

      const map = L.map("map").setView(initialCoordinates, initialZoom);

      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
        attribution:
          'Tiles &copy; Esri',
      }).addTo(map);

      const circle = L.circle(initialCoordinates, {
        color: "red",
        fillColor: "blue",
        fillOpacity: 0,
        radius: 250,
        stroke: false,
      }).addTo(map);

      map.on("zoomend", () => {
        const zoomLevel = map.getZoom();

        if (zoomLevel < 10) {
          circle.setStyle({ fillOpacity: 0 });
        } else {
          circle.setStyle({ fillOpacity: 0.5 });
        }
      });
    });
  },
});

// Function to get the day of the year
function getDayOfYear(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  return Math.floor(diff / oneDay);
}
</script>

<style scoped>
#map {
  height: 400px;
}
</style>
