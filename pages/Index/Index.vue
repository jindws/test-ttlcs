<template>
    <section class='index'>
        <!--主页面-->
        <!--头部-->
        <XHeader/>
        <section class='container'>
            <!--左菜单-->
            <LeftMenu/>
            <div class="mainBox">
                <XMain/>
                <XFooter/>
            </div>
        </section>
    </section>
</template>

<script>
    import XHeader from '@/Header'
    import LeftMenu from '@/LeftMenu'
    import XFooter from '@/Footer'
    import XMain from '../Main'

    import {mapGetters, mapMutations} from 'vuex'

    export default {
        mounted() {
            this.$DB.HidePermission.mainpage({}).then(async result => {
                await this.setMenus(result);
                this.select(0);
            }, async data => {
                if (data.code === 3303) {
                    window.location.href = '#/login'
                } else {
                    this.$message({
                        type: 'error',
                        message: data.msg
                    })
                }
            })
        },
        methods: {
            ...mapMutations([
                'setMenus',
                'select'
            ]),
        },
        components: {
            XHeader,
            LeftMenu,
            XFooter,
            XMain
        }
    }
</script>
