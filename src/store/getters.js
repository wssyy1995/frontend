import { asyncRoutes, constantRoutes } from '@/router'
const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  roles: () => ['admin'],
  permission_routes: () => constantRoutes.concat(asyncRoutes),

  // 项目类型 - 全部:0 ,接口自动化：1 ,ui自动化：2
  projectId: () => 0,

  // 下面的暂时用不到
  token: () => 'fixedtoken',
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  errorLogs: state => state.errorLog.logs
}
export default getters
