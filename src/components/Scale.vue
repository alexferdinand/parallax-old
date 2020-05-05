<template>
  <div>

    <div class="container">
      <svg
        :width="xEnd"
        height="50%"
      >

        <line 
          :x1="x0" 
          y1="80" 
          :x2="scaleLength" 
          y2="80" 
          style="stroke:rgb(0,0,0);stroke-width:2"/>

        <line 
          v-for="line in marksArr"
          :key="line.x"
          :x1="line.x" 
          y1="80" 
          :x2="line.x" 
          :y2="line.y" 
          style="stroke:rgb(0,0,0);stroke-width:1" />

        <text 
          v-for="(mark, index) in signsArr"
          :key="index"
          :x="mark.x" 
          y="95" 
          fill="black"
        >
          {{ mark.value }}
        </text>

      </svg>
    </div>
  </div>
</template>


<script>
export default {
  name: "Scale",
  props: {
    startDate: Number,
    endDate: Number,
    step: Number,
    ratio: Number
  },
  data() {
    return {
      wpx: window.screen.availWidth,
      x0: 50,
      xEnd: 0,
      marksArr: [],
      signsArr: [],
      scaleLength: 0,
    }
  },

  created() {
    this.calculateScale()
  },

   methods: {
      calculateScale() {

        this.xEnd = Math.ceil(this.wpx * 1.3) - 50;
        this.scaleLength = Math.ceil((this.xEnd - this.x0) * this.ratio)
        


        const minMarkStep = Math.ceil(this.wpx / 10);
        
        let markQnt = Math.ceil((this.endDate - this.startDate) / this.step );
        let markStep = Math.floor(this.scaleLength / markQnt);

        if (markStep < minMarkStep) {
          this.xEnd = minMarkStep * markQnt;
          this.scaleLength = Math.ceil((this.xEnd - this.x0) * this.ratio)
          markStep = minMarkStep;
        }

        let sign = this.startDate;
        let bigMark = 12;
        if (this.step !== 1) {
          bigMark = this.step
        }

        let smallMarkQnt = 12 * markQnt;
        if (this.step !== 1) {
          smallMarkQnt = this.step * markQnt
        }

        const shift = Math.ceil((this.xEnd - this.x0) * (1 - this.ratio) / 2)
        this.x0 += shift

        const smallMArkStep = Math.floor(this.scaleLength / smallMarkQnt)
        let counter = 0;
        for (let x = this.x0; x <= this.scaleLength; x += smallMArkStep) {
          if (counter % bigMark === 0) {
            this.marksArr.push({x, y: 30})
            this.signsArr.push({
              x: x-17,
              value: String(sign)})
            sign += this.step
          }
          else {

            this.marksArr.push({x, y: 60})
          }
          counter++
        }
      }
   }

};


</script>

<style scoped>
.container {
  /* margin: 50px 100px; */
}

</style>
