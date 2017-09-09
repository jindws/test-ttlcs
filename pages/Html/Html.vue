<template>
  <section>
    <ScheduleController v-if='this.temp==="ScheduleController"'></ScheduleController>
    <AdminGroupController v-else-if='this.temp==="AdminGroupController"'></AdminGroupController>
    <AdminController v-else-if='this.temp==="AdminController"'></AdminController>
    <div v-else>{{this.temp}}</div>
  </section>
</template>

<script>
import ScheduleController from './ScheduleController'
import AdminGroupController from './AdminGroupController'
import AdminController from './AdminController'

export default {
  components:{
      ScheduleController,
      AdminGroupController,
      AdminController
  },
  props:['temp'],
  mounted(){
    console.log(this.temp)
  },
}
</script>
