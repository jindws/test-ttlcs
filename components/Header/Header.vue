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
                  您好：<span>{{name}}</span><i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" class="dropdown">
                    <el-dropdown-item command="userChangePhone"><i class="fa fa-user-o" style="margin-right: 6px;"></i>修改手机
                    </el-dropdown-item>
                    <el-dropdown-item command="userInfo"><i class="fa fa-unlock-alt" style="margin-right: 6px;"></i>修改密码
                    </el-dropdown-item>
                    <el-dropdown-item command="cancel"><i class="fa fa-sign-out" style="margin-right: 6px;"></i>注销
                    </el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-button v-if='!refreshing' type="success" @click="refresh"
                       style="opacity: 0.8;margin-left: 30px;">
                <i class="fa fa-refresh"></i>
            </el-button>
            <el-button v-else type="success" icon="loading" disabled
                       style="opacity: 0.8;margin-left: 30px;">
            </el-button>
        </div>
    </section>
</template>

<script>
    import {mapGetters, mapMutations} from 'vuex'
    import Store from '../../src/store.js'

    export default {
        data() {
            return {
                name: '',
                refreshing: false,
            };
        },
        methods: {
            addAdminGroup() {

            },
            selectMenu(tab) {
                this.select(tab.index)//菜单流水号
            },
            ...mapMutations([
                'select', // 映射 this.select() 为 this.$store.commit('select')
                'mainTabAdd',
                'refeshNow'
            ]),
            refresh() {
                this.refeshNow()
                this.refreshing = true;
                setTimeout(() => this.refreshing = false, 1000)
            },
            handleCommand(command) {
                if (command == 'cancel') {
                    this.$DB.HidePermission.signOut({}).then(result => {
                        window.location.href = '#/login';
                    }, data => {
                        console.log(data);
                        if(data.code == 3304){
                            window.location.href = '#/login';
                        }
                    })
                } else if (command === 'userChangePhone') {
                    this.mainTabAdd({
                        ctrlName: command,
                        name: '修改手机',
                        htmlName: "Ext_Schedule"
                    })
                } else if (command === 'userInfo') {
                    this.mainTabAdd({
                        ctrlName: command,
                        name: '修改密码',
                        htmlName: "Ext_Schedule"
                    })
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
            const {name = '未登录'} = Store.fetch() || {};
            this.name = name;
        },
    }
</script>

<style lang="css">
</style>
