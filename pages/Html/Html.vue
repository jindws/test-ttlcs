<template>
  <section>
    <!-- {{this.temp}} -->
    <ScheduleController v-if='this.temp==="ScheduleController"'></ScheduleController>
  </section>

</template>

<script>
import ScheduleController from './ScheduleController'

export default {
  components:{
      ScheduleController
  },
  props:['temp'],
  mounted(){
    console.log(this.temp)
  }
}
</script>
