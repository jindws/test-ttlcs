<template>
    <section class='main'>
        <!--主区域的内容-->
        <el-tabs :closable='true' type="border-card" @tab-remove="removeTab" :value="activeName" @tab-click="selectNow">
            <el-tab-pane name="home">
                <span slot="label"><i class="el-icon-menu"></i>我的桌面</span>
                我的桌面
            </el-tab-pane>
            <el-tab-pane v-for='itm in getMainTabs' :name="itm.ctrlName" :key='itm.ctrlName'
                         :style="{height:paneHeight}">
                <span slot="label"><i class="el-icon-document"></i> {{itm.name}}</span>
                <XHtml :temp='itm.ctrlName' v-if='!(itm.ctrlName===activeName&&!show)'></XHtml>
            </el-tab-pane>
        </el-tabs>
    </section>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'

    import XHtml from '../Html'

    export default {
        data() {
            return {
                show: true,
                paneHeight: document.body.scrollHeight - 250 + 'px',
            }
        },
        components: {
            XHtml
        },
        methods: {
            removeTab(targetName) {
                this.mainTabRemove(targetName)
            },
            selectNow(tab, event) {
                this.setActiveName(tab.name)
            },
            ...mapMutations([
                'mainTabRemove',
                'setActiveName'
            ]),
        },
        computed: {
            ...mapGetters([
                'getMainTabs',
                'activeName',
                'refreshing',
            ])
        },
        watch: {
            refreshing(refresh) {
                if (refresh) {
                    this.show = false;
                    setTimeout(() => this.show = true, 0)
                }
            }
        }
    }
</script>
