<template>
  <el-form :data="environment" label-width="60px">
    <el-form-item label="名称" :rules="[{required: true}]">
      <el-input v-model.trim="environment.name" clearable style="width: 300px" />
    </el-form-item>
    <el-form-item label="描述">
      <el-input v-model.trim="environment.description" type="textarea" style="width: 300px" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="saveEnvironment">保 存</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { addEnvironment, updateEnvironment, getEnvironmentList } from '@/api/environment'

export default {
  props: {
    isAdd: Boolean
  },
  data() {
    return {
      environment: {
        id: undefined,
        name: '',
        description: '',
        projectId: this.$store.getters.projectId
      }
    }
  },
  created() {
    if (!this.isAdd) {
      const environmentId = this.$route.params.environmentId
      getEnvironmentList({ id: environmentId }).then(response => {
        this.environment = response.data[0]
      })
    }
  },
  methods: {
    saveEnvironmentSuccess(msg) {
      this.$notify.success(msg)
      // 关闭当前tagview
      this.$store.dispatch('tagsView/delView', this.$store.state.tagsView.visitedViews.filter(item => item.path === this.$route.path)[0])
      this.$router.back()
    },
    saveEnvironment() {
      if (this.isAdd) {
        addEnvironment(this.environment).then(response => {
          this.saveEnvironmentSuccess(response.msg)
        })
      } else {
        updateEnvironment(this.environment).then(response => {
          this.saveEnvironmentSuccess(response.msg)
        })
      }
    }
  }
}
</script>
