<template>
  <el-container style="height: 100%">
    <el-header height="50px">
      <el-select v-model="selectedCategoryId" clearable filterable placeholder="选择分类" @visible-change="categorySelectChange">
        <el-option v-for="category in categories" :key="category.id" :label="category.name" :value="category.id" />
      </el-select>
      <el-button type="primary" @click="addGlobalVars">保 存</el-button>
    </el-header>
    <el-main>
      <el-table :data="globalVars" border>
        <el-table-column align="center" width="150">
          <template slot="header">
            <span class="required">变量类型</span>
          </template>
          <template scope="{ row }">
            <el-input v-model.trim="row.type" clearable />
          </template>
        </el-table-column>
        <el-table-column align="center" width="200">
          <template slot="header">
            <span class="required">变量名</span>
          </template>
          <template scope="{ row }">
            <el-input v-model.trim="row.name" clearable />
          </template>
        </el-table-column>
        <el-table-column align="center">
          <template slot="header">
            <span class="required">变量值</span>
          </template>
          <template scope="{ row }">
            <el-table :data="row.environmentValues" border>
              <el-table-column align="center" label="环境" width="150">
                <template scope="scope">
                  <el-select v-model="scope.row.environmentId" placeholder="选择环境" style="width: 100%" @visible-change="envSelectChange">
                    <el-option v-for="environment in environmentList" :key="environment.id" :value="environment.id" :label="environment.name" />
                  </el-select>
                </template>
              </el-table-column>
              <el-table-column align="center" label="值">
                <template scope="scope">
                  <image-input v-model.trim="scope.row.value" />
                </template>
              </el-table-column>
              <el-table-column align="center" label="操作" width="100">
                <template scope="scope">
                  <el-button-group>
                    <el-button @click="addEnvironmentValue(row, scope.$index)">+</el-button>
                    <el-button :disabled="scope.$index === 0" @click="delEnvironmentValue(row, scope.$index)">-</el-button>
                  </el-button-group>
                </template>
              </el-table-column>
            </el-table>
          </template>
        </el-table-column>
        <el-table-column align="center" label="描述" width="200">
          <template scope="{ row }">
            <el-input v-model.trim="row.description" type="textarea" />
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="100">
          <template scope="scope">
            <el-button-group>
              <el-button @click="addGlobalVar(scope.$index)">+</el-button>
              <el-button :disabled="scope.$index === 0" @click="delGlobalVar(scope.$index)">-</el-button>
            </el-button-group>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>
<script>

import { addGlobalVars } from '@/api/globalvar'
import { getCategoryList } from '@/api/category'
import { getEnvironmentList } from '@/api/environment'
import ImageInput from '@/components/ImageInput'

export default {
  components: {
    ImageInput
  },
  data() {
    return {
      selectedCategoryId: undefined,
      globalVars: [{
        type: 'String',
        name: '',
        environmentValues: [
          {
            environmentId: -1,
            value: ''
          }
        ],
        description: '',
        categoryId: undefined,
        projectId: undefined
      }],
      environmentList: [],
      categories: []
    }
  },
  computed: {
    projectId() {
      return this.$store.getters.projectId
    }
  },
  created() {
    this.fetchEnvironmentList()
    this.fetchCategoryList()
  },
  methods: {
    fetchCategoryList() {
      getCategoryList({ projectId: this.projectId, type: 3 }).then(response => {
        this.categories = response.data
      })
    },
    categorySelectChange(type) {
      if (type) {
        this.fetchCategoryList()
      }
    },
    envSelectChange(type) {
      if (type) {
        this.fetchEnvironmentList()
      }
    },
    addGlobalVar(index) {
      this.globalVars.splice(index + 1, 0, {
        type: 'String',
        name: '',
        environmentValues: [
          {
            environmentId: -1,
            value: ''
          }
        ],
        description: '',
        categoryId: undefined,
        projectId: undefined
      })
    },
    delGlobalVar(index) {
      this.globalVars.splice(index, 1)
    },
    addGlobalVars() {
      this.globalVars.forEach(globalVar => {
        globalVar.categoryId = this.selectedCategoryId
        globalVar.projectId = this.projectId
      })

      addGlobalVars(this.globalVars).then(response => {
        this.$notify.success(response.msg)
        // 关闭当前tagview
        this.$store.dispatch('tagsView/delView', this.$store.state.tagsView.visitedViews.filter(item => item.path === this.$route.path)[0])
        this.$router.back()
      })
    },
    fetchEnvironmentList() {
      getEnvironmentList({ projectId: this.projectId }).then(response => {
        this.environmentList = [
          {
            id: -1,
            name: '默认'
          }
        ].concat(response.data)
      })
    },
    addEnvironmentValue(row, index) {
      row.environmentValues.splice(index + 1, 0, {
        environmentId: undefined,
        value: ''
      })
    },
    delEnvironmentValue(row, index) {
      row.environmentValues.splice(index, 1)
    }
  }
}
</script>
