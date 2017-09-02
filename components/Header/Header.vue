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
            <el-dropdown @command="handleCommand">
              <span class="el-dropdown-link">
                  您好：<span id="name"></span><i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown" class="dropdown">
                    <el-dropdown-item command="userChangePhone">修改手机</el-dropdown-item>
                    <el-dropdown-item command="userInfo">修改密码</el-dropdown-item>
                    <el-dropdown-item command="cancel">注销</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button type="success" @click="refresh" style="opacity: 0.8" size="small">刷新</el-button>
        </div>
    </section>
</template>

<script>
    import {Dropdown,DropdownMenu,DropdownItem,Button} from 'element-ui'
    import {mapGetters, mapMutations} from 'vuex'
    import Store from '../../src/store.js'
    export default {
        data() {
            return {};
        },
        components: {
            'el-dropdown': Dropdown,
            'el-dropdown-menu': DropdownMenu,
            'el-dropdown-item': DropdownItem,
            'el-button': Button
        },
        methods: {
            addAdminGroup(){

            },
            selectMenu(tab) {
                this.select(tab.index)//菜单流水号
            },
            ...mapMutations([
                'select' // 映射 this.select() 为 this.$store.commit('select')
            ]),
            refresh(){

            },
            handleCommand(command) {
                if(command == 'cancel'){
                    this.$DB.HidePermission.signOut({
                    }).then(result=>{
                        console.log(result)
                        window.location.href = '#/login';
                    },data=>{
                        console.log(data);
                    })
                }else if(command == 'userInfo'){

                }else{

                }
            }
        },
        computed: {
            ...mapGetters([
                'meuns',
                'headerName'
            ])
        },
        mounted() {
            $('#name').text(Store.fetch().name);
        },
    }
</script>

<style lang="css">
</style>
