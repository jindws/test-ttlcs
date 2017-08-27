<template>
  <section>
    <A1 v-if='this.temp==="A1"'></A1>
    <A2 v-if='this.temp==="A2"'></A2>
    <B1 v-if='this.temp==="B1"'></B1>
    <B2 v-if='this.temp==="B2"'></B2>
  </section>

</template>

<script>
import A1 from '../A/A1'
import A2 from '../A/A2'
import B1 from '../B/B1'
import B2 from '../B/B2'

export default {
  components:{
      A1,
      A2,
      B1,
      B2
  },
  props:['temp'],
  mounted(){
    console.log(this.temp)
  }
}
</script>
