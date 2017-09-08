<template>
  <section class='ScheduleController'>
      ScheduleController
      <el-tree
        :data="list"
        show-checkbox
        default-expand-all
        node-key="id"
        highlight-current
        ref="tree"
        >
      </el-tree>
  </section>
</template>

<script>
export default {
  data(){
    return{
        list:[],
        checkedLists:[],
    }
  },
  methods:{
      submodules(sub){
        const result = []
        const children = sub.map((itm,index)=>{
          const dt = {
            label:itm.name,
            children:this.operate(itm.operate)
          }
          result.push(dt)
        })

        return result;
      },
      operate(ope){
        return ope.map(itm=>{
          if(itm.status){
              this.checkedLists.push(itm.id)
          }
          return {
            label: itm.name,
            id:+itm.id
          }
        })
      }
  },
  mounted(){
    var re = JSON.parse(JSON.stringify({"code":0,"msg":"操作成功","data":[{"module":"扩展管理","submodules":[{"ctrlName":"ScheduleController","htmlName":"Ext_Schedule","operate":[{"ctrlMethod":"list","name":"列表","id":27,"status":0}],"name":"定时任务","statusLen":0}],"statusLen":0},{"module":"系统管理","submodules":[{"ctrlName":"AdminGroupController","htmlName":"Sys_adminGroup","operate":[{"ctrlMethod":"update","name":"修改","id":4,"status":0},{"ctrlMethod":"list","name":"列表","id":1,"status":0},{"ctrlMethod":"remove","name":"删除","id":3,"status":1},{"ctrlMethod":"updatePermission","name":"权限修改","id":5,"status":0},{"ctrlMethod":"manage","name":"权限管理","id":6,"status":0},{"ctrlMethod":"save","name":"添加","id":2,"status":0}],"name":"管理组管理","statusLen":0},{"ctrlName":"AdminController","htmlName":"Sys_admin","operate":[{"ctrlMethod":"update","name":"修改","id":9,"status":0},{"ctrlMethod":"list","name":"列表","id":7,"status":0},{"ctrlMethod":"save","name":"添加","id":8,"status":0}],"name":"管理员管理","statusLen":0},{"ctrlName":"IpWhiteListController","htmlName":"Sys_ipWhiteList","operate":[{"ctrlMethod":"update","name":"修改","id":25,"status":0},{"ctrlMethod":"list","name":"列表","id":21,"status":0},{"ctrlMethod":"remove","name":"删除","id":24,"status":0},{"ctrlMethod":"auditing","name":"审批","id":26,"status":0},{"ctrlMethod":"save","name":"添加","id":23,"status":0}],"name":"Ip白名单","statusLen":0},{"ctrlName":"PermissionController","htmlName":"Sys_power","operate":[{"ctrlMethod":"update","name":"修改","id":13,"status":0},{"ctrlMethod":"list","name":"列表","id":10,"status":0},{"ctrlMethod":"remove","name":"删除","id":12,"status":0},{"ctrlMethod":"save","name":"添加","id":11,"status":0}],"name":"权限管理","statusLen":0},{"ctrlName":"OperateLogController","htmlName":"Sys_log","operate":[{"ctrlMethod":"list","name":"列表","id":14,"status":0}],"name":"管理员操作日志","statusLen":0}],"statusLen":0}]}))
    re.data.map(async (itm,index)=>{
      let it = {
        label:itm.module,
        children:this.submodules(itm.submodules)
      };
      await this.list.push(it)
      this.$refs.tree.setCheckedKeys(this.checkedLists)
    })
      console.log(this.list)
  }
}
</script>
