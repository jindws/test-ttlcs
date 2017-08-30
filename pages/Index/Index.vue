<template>
    <section class='index'>
        <XHeader/>
        <section>
            <LeftMenu/>
            <div class="mainBox">
                <XMain/>
                <Footer/>
            </div>
        </section>
    </section>
</template>

<script>
    import XHeader from '@/Header'
    import LeftMenu from '@/LeftMenu'
    import Footer from '@/Footer'
    import XMain from '../Main'

    import { mapGetters } from 'vuex'

    export default {
        /*mounted(){
            this.$DB.HidePermission.mainpage({
                begin: '',
                end: ''
            }).then(re=>{
                console.log('成功',re)
            },data=>{
                console.log('失败',data)
            })
        },*/
        components:{
            XHeader,
            LeftMenu,
            Footer,
            XMain
        }
    }
</script>
