<template>
  <div class="app-container">
    <div>
      <el-button style="margin-bottom: 10px" @click="$router.push({ name: 'AddGlobalVar' })">添加全局变量</el-button>
    </div>

    <el-row>
      <el-col :span="4" style="overflow: auto">
        <category-tree :type="3" @categoryClick="onCategoryClick" />
      </el-col>
      <el-col :span="20">
        <el-table :data="globalVarList" highlight-current-row border>
          <el-table-column label="变量类型" align="center" prop="type" show-overflow-tooltip />
          <el-table-column label="变量名" align="center" prop="name" show-overflow-tooltip />
          <el-table-column label="变量值" align="center" min-width="300">
            <template scope="{ row }">
              <el-table :data="row.environmentValues" border fit>
                <el-table-column label="环境" align="center" width="120" show-overflow-tooltip>
                  <p>占位</p>
                </el-table-column>
                <el-table-column label="值" align="center" prop="value" show-overflow-tooltip />
              </el-table>
            </template>
          </el-table-column>
          <el-table-column label="描述" align="center" prop="description" show-overflow-tooltip />
          <el-table-column label="创建时间" align="center" width="200" show-overflow-tooltip>
            <p>占位</p>
          </el-table-column>
          <el-table-column label="操作" width="120" align="center">
            <p>占位</p>
          </el-table-column>
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryForm.pageNum" :limit.sync="queryForm.pageSize" @pagination="fetchGlobalVarList" />
      </el-col>
    </el-row>

  </div>
</template>

<script>
import { getGlobalVarList, deleteGlobalVar } from '@/api/globalvar'
import { getEnvironmentList } from '@/api/environment'
import Pagination from '@/components/Pagination'
import CategoryTree from '@/pages/category/components/CategoryTree'

export default {
  components: {
    Pagination,
    CategoryTree
  },
  data() {
    return {
      globalVarList: [],
      total: 0,
      queryForm: {
        projectId: 0,
        pageNum: 1,
        pageSize: 10,
        categoryId: undefined
      },
      environmentList: []
    }
  },
  computed: {
    projectId() {
      return 0
    }
  },
  created() {
    this.fetchEnvironmentList()
    this.fetchGlobalVarList()
  },
  methods: {
    updateGlobalVar(globalVar) {
      this.$router.push({ name: 'UpdateGlobalVar', params: { globalVarId: globalVar.id }})
    },
    deleteGlobalVar(globalVar) {
      this.$confirm(`删除${globalVar.name}`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        deleteGlobalVar(globalVar.id).then(resp => {
          this.$notify.success(resp.msg)
          this.fetchGlobalVarList()
        })
      })
    },
    fetchGlobalVarList() {
      getGlobalVarList(this.queryForm).then(resp => {
        this.globalVarList = resp.data.data
        this.total = resp.data.total
      })
    },
    fetchEnvironmentList() {
      getEnvironmentList({ projectId: this.$store.getters.projectId }).then(response => {
        this.environmentList = [{
          id: -1,
          name: '默认'
        }].concat(response.data)
      })
    },
    onCategoryClick(categoryId) {
      this.queryForm.categoryId = categoryId
      this.queryForm.pageNum = 1
      this.fetchGlobalVarList()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
