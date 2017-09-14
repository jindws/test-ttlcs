<template>
    <section class='OperateLogController'>
        <!--操作界面-->
        <el-form :inline="true" :model="OperateLogControllerForm">
            <el-form-item>
                <el-input v-model="OperateLogControllerForm.user" placeholder="操作人"></el-input>
            </el-form-item>
            <el-form-item>
                <el-date-picker v-model="" type="datetime" placeholder="开始时间"></el-date-picker>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="queryOperateLogController">查询</el-button>
            </el-form-item>
        </el-form>
        <!---->
    </section>
</template>

<script>
    export default {
        data() {
            return {
                OperateLogControllerForm: {

                }
            }
        },
        methods: {
            /*TODO 查询操作*/
            queryOperateLogController(){

            }
        },
        mounted() {

        }
    }
</script>

<style lang="css">
</style>
