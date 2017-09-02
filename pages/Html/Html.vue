<template>
  <section>
    <ScheduleController v-if='this.temp==="ScheduleController"'></ScheduleController>
    <AdminGroupController v-else-if='this.temp==="AdminGroupController"'></AdminGroupController>
    <div v-else>{{this.temp}}</div>
  </section>

</template>

<script>
import ScheduleController from './ScheduleController'
import AdminGroupController from './AdminGroupController'

export default {
  components:{
      ScheduleController,
      AdminGroupController
  },
  props:['temp'],
  mounted(){
    console.log(this.temp)
  }
}
</script>
