<template>
    <section class='header'>
        <!--logo区域-->
        <div class="logo">
            <span>通通理财</span>
        </div>
        <!--主菜单区域-->
        <el-tabs :value="headerName" @tab-click="selectMenu">
            <el-tab-pane v-for='(itm,index) in meuns.modules' :label="itm.module" :name="itm.module"
                         :key='itm.statusLen'></el-tab-pane>
        </el-tabs>
        <!--头部右侧导航-->
        <div class="header-right">
            <el-dropdown>
              <span class="el-dropdown-link">
                  您好：<span id="name"></span><i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown" class="dropdown">
                    <el-dropdown-item>修改手机</el-dropdown-item>
                    <el-dropdown-item>修改密码</el-dropdown-item>
                    <el-dropdown-item>注销</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>

        </div>
    </section>
</template>

<script>
    import {Dropdown,DropdownMenu,DropdownItem} from 'element-ui'
    import {mapGetters, mapMutations} from 'vuex'
    /*Vue.use(Dropdown);
    Vue.use(DropdownMenu);
    Vue.use(DropdownItem);*/
    export default {
        data() {
            return {};
        },
        components: {
            'el-dropdown': Dropdown,
            'el-dropdown-menu': DropdownMenu,
            'el-dropdown-item': DropdownItem
        },
        methods: {
            selectMenu(tab) {
                this.select(tab.index)//菜单流水号
            },
            ...mapMutations([
                'select' // 映射 this.select() 为 this.$store.commit('select')
            ]),
        },
        computed: {
            ...mapGetters([
                'meuns',
                'headerName'
            ])
        },
        mounted() {

        },
    }
</script>

<style lang="css">
</style>
