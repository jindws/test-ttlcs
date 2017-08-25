<template>
    <A1 v-if='this.temp==="A1"'></A1>
    <A2 v-else-if='this.temp==="A2"'></A2>
</template>

<script>
import A1 from '../A/A1'
import A2 from '../A/A2'
export default {
  components:{
      A1,
      A2
  },
  props:['temp'],
  mounted(){
    console.log(this.temp)
  }
}
</script>
