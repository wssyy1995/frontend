<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <el-select v-model="queryForm.testPlanId" filterable clearable placeholder="测试计划">
        <el-option v-for="testPlan in testPlanList" :key="testPlan.id" :label="testPlan.name" :value="testPlan.id" />
      </el-select>
      <el-select v-model="queryForm.status" clearable placeholder="状态">
        <el-option label="未完成" :value="0" />
        <el-option label="已完成" :value="1" />
      </el-select>
      <el-button type="primary" class="el-icon-search" @click="onQueryBtnClick" />
    </div>
    <div>
      <el-table :data="testTaskList" border fit>
        <el-table-column label="提交时间" align="center" width="200" show-overflow-tooltip>
          <template scope="{ row }">
            {{ `${row.creatorNickName} ${row.commitTime}` }}
          </template>
        </el-table-column>
        <el-table-column label="完成时间" prop="finishTime" align="center" width="150" show-overflow-tooltip />
        <el-table-column label="测试计划" align="center" min-width="150" show-overflow-tooltip>
          <template scope="{ row }">
            {{ row.testPlan.name }}
          </template>
        </el-table-column>
        <el-table-column label="通过" align="center" width="100">
          <template scope="scope">
            {{ scope.row.status === 0 ? '-' : scope.row.passCaseCount }}
          </template>
        </el-table-column>
        <el-table-column label="失败" align="center" width="100">
          <template scope="scope">
            {{ scope.row.status === 0 ? '-' : scope.row.failCaseCount }}
          </template>
        </el-table-column>
        <el-table-column label="跳过" align="center" width="100">
          <template scope="scope">
            {{ scope.row.status === 0 ? '-' : scope.row.skipCaseCount }}
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" width="100">
          <template scope="scope">
            {{ scope.row.status === 0 ? '未完成' : '已完成' }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="260" align="center" />
      </el-table>
    </div>
    <!--分页-->
    <div>
      <pagination v-show="total>0" :total="total" :page.sync="queryForm.pageNum" :limit.sync="queryForm.pageSize" @pagination="fetchTestTaskList" />
    </div>
    <!--执行进度-->
    <el-drawer
      :with-header="false"
      :visible.sync="showDrawer"
      direction="rtl"
      size="95%"
    >
      <el-drawer
        size="60%"
        :with-header="false"
        :append-to-body="true"
        :visible.sync="innerDrawer"
      >
        <codemirror v-model="codemirrorContent" :options="cmOptions" />
      </el-drawer>
    </el-drawer>
  </div>
</template>

<script>
import { getTestPlanList } from '@/api/testPlan'
import Pagination from '@/components/Pagination'
import 'codemirror/mode/clike/clike.js'
import 'codemirror/theme/base16-dark.css'
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'
export default {
  components: {
    Pagination
  },
  data() {
    return {
      showDrawer: false,
      innerDrawer: false,
      testTaskList: [],
      queryForm: {
        pageNum: 1,
        pageSize: 10,
        projectId: 0,
        status: undefined,
        testPlanId: undefined
      },
      total: 0,
      testTaskIdInDrawer: undefined,
      testPlanList: [],
      codemirrorContent: '',
      cmOptions: {
        mode: 'text/x-java',
        theme: 'base16-dark',
        lineNumbers: true,
        readOnly: true,
        foldGutter: true,
        gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers']
      }
    }
  },
  computed: {
    deviceExecutePercent() {
      return function(row) {
        const testcaseCount = row.testcases.length
        const finishedTestcaseCount = row.testcases.filter(testcase => testcase.status !== undefined && testcase.status !== null).length // 有status == 执行完成
        return parseInt(finishedTestcaseCount / testcaseCount * 100)
      }
    }
  },
  created() {
    this.fetchTestPlanList()
    this.fetchTestTaskList()
  },
  methods: {
    onQueryBtnClick() {
      this.queryForm.pageNum = 1
      this.fetchTestTaskList()
    },
    showCodemirror(content) {
      this.codemirrorContent = content
      this.innerDrawer = true
    },
    goToReportPage(testTask) {
      this.$router.push({ name: 'TestTaskReport', params: { testTaskId: testTask.id }})
    },
    fetchTestPlanList() {
      getTestPlanList({ projectId: this.queryForm.projectId }).then(response => {
        this.testPlanList = response.data
      })
    }
  }
}
</script>

<style>
  .CodeMirror {
    height: auto;
  }
</style>
