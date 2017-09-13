<template>
  <section>
    <ScheduleController v-if='this.temp==="ScheduleController"'></ScheduleController>
    <AdminGroupController v-else-if='this.temp==="AdminGroupController"'></AdminGroupController>
    <AdminController v-else-if='this.temp==="AdminController"'></AdminController>
    <PermissionController v-else-if='this.temp==="PermissionController"'></PermissionController>
    <IpWhiteListController v-else-if='this.temp==="IpWhiteListController"'></IpWhiteListController>
    <OperateLogController v-else-if='this.temp==="OperateLogController"'></OperateLogController>
    <div v-else>{{this.temp}}</div>
  </section>
</template>

<script>
import ScheduleController from './ScheduleController'
import AdminGroupController from './AdminGroupController'
import AdminController from './AdminController'
import PermissionController from './PermissionController'
import IpWhiteListController from './IpWhiteListController'
import OperateLogController from './OperateLogController'

export default {
  components:{
      ScheduleController,
      AdminGroupController,
      AdminController,
      PermissionController,
      IpWhiteListController,
      OperateLogController
  },
  props:['temp'],
  mounted(){
    console.log(this.temp)
  },
}
</script>
