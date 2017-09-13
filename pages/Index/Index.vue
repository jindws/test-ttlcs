<template>
    <section class='index'>
        <XHeader/>
        <section class='container'>
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
            this.$DB.HidePermission.mainpage({}).then(async re => {
                await this.setMenus(re)
                this.select(0);
            }, async data => {
                if (data.code == 3304) {
                    window.location.href = '#/login';
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
