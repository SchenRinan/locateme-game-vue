<template>
  <Navbar/>
  <router-view/>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Navbar from './components/NavBarView.vue'

export default defineComponent({
  components: { Navbar },

})
</script>


<style>

</style>
