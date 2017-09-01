<template>
  <section>
    <ScheduleController v-if='this.temp==="ScheduleController"'></ScheduleController>
    <div v-else>{{this.temp}}</div>
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
