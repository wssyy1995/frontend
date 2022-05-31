<template>
  <div class="app-container">
    <div style="margin-bottom: 10px">
      <el-button @click="$router.push({ name: 'AddTestcaseAction' })">添加测试用例</el-button>

      <el-input v-model="queryForm.name" style="width: 200px" placeholder="测试用例名" clearable />
      <el-select v-model="queryForm.state" clearable placeholder="状态" style="width: 100px">
        <el-option v-for="state in stateList" :key="state.state" :label="state.name" :value="state.state" />
      </el-select>
      <el-button type="primary" class="el-icon-search" @click="onQueryBtnClick" />
    </div>

    <el-row>
      <el-col :span="4" style="overflow: auto">
        <category-tree :type="4" @categoryClick="onCategoryClick" />
      </el-col>
      <el-col :span="20">
        <el-table :data="actionList" highlight-current-row border>
          <el-table-column label="测试用例" align="center" prop="name" show-overflow-tooltip />
          <el-table-column label="描述" align="center" prop="description" show-overflow-tooltip />
          <el-table-column label="创建时间" align="center" width="200" show-overflow-tooltip>
            <template scope="{ row }">
              {{ `${row.creatorNickName} ${row.createTime}` }}
            </template>
          </el-table-column>
          <el-table-column label="更新时间" align="center" width="200" show-overflow-tooltip>
            <template scope="{ row }">
              {{ `${row.updatorNickName || ''} ${row.updateTime || ''}` }}
            </template>
          </el-table-column>
          <el-table-column label="状态" align="center" width="100">
            <template scope="{ row }">
              <el-select v-model="row.state" @change="stateChange(row)">
                <el-option v-for="state in stateList" :key="state.state" :label="state.name" :value="state.state" />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="180" align="center" />
        </el-table>
        <pagination v-show="total>0" :total="total" :page.sync="queryForm.pageNum" :limit.sync="queryForm.pageSize" @pagination="fetchActionList" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { getActionList } from '@/api/action'
import Pagination from '@/components/Pagination'
import CategoryTree from '@/pages/category/components/CategoryTree'
import { stateList } from '@/utils/common'

export default {
  components: {
    Pagination,
    CategoryTree
  },
  data() {
    return {
      actionList: [],
      total: 0,
      queryForm: {
        pageNum: 1,
        pageSize: 10,
        type: 3,
        projectId: 0,
        name: '',
        state: undefined,
        categoryId: undefined
      },
      stateList: stateList
    }
  },
  created() {
    this.fetchActionList()
  },
  methods: {
    onQueryBtnClick() {
      this.queryForm.pageNum = 1
      this.fetchActionList()
    },
    async fetchActionList() {
      const { data } = await getActionList(this.queryForm)
      this.actionList = data.data
      this.total = data.total
    },
    onCategoryClick(categoryId) {
      this.queryForm.categoryId = categoryId
      this.queryForm.pageNum = 1
      this.fetchActionList()
    }
  }
}
</script>
