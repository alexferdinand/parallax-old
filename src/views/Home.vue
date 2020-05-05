<template>
  <div class="container"  @wheel.prevent="wheelHandler">
    <div 
      class="relax"
      v-rellax="{
      speed: 2,
      vertical: false,
      horizontal: true
    }"
    >
      <scale 
      :startDate="2010"
      :endDate="2028"
      :step="1"
      :ratio="0.95"
    />
      
    </div>
    <div 
      class="relax"
      v-rellax="{
      speed: 3,
      vertical: false,
      horizontal: true
    }"
    >
      <scale 
      :startDate="2010"
      :endDate="2028"
      :step="1"
      :ratio="1"
    />
    </div>

    <!-- <scale 
      :startDate="2010"
      :endDate="2028"
      :step="1"
    /> -->
    
  </div>
</template>

<script>
import axios from 'axios'
import Scale from '@/components/Scale'

export default {
  name: "Home",
  components: {
    Scale
  },

  data() {
    return {
      scale: {}
    }
  },

  created() {
    this.getData()
  },

  methods: {
    wheelHandler(event) {
      // console.log(event)
      event.view.scrollBy({left:event.deltaY, top:0, behavior: 'smooth'})
    },

    async getData() {
      try {
        const result = (await axios.get('/')).data
        if (result) { 
          this.scale = result
        }
      }
      catch (e) { console.error(e) }
    }
  }
}

</script>

<style scoped lang="scss">

.container {
  height: 95vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

}

.relax {
  display: flex;
align-items: flex-end;

  // width: 3000px;
  height: 300px;
  // border: 2px solid black;
}
</style>
