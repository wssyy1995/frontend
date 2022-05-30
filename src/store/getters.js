import { asyncRoutes, constantRoutes } from '@/router'
const getters = {
  sidebar: state => state.app.sidebar,
  size: state => state.app.size,
  device: state => state.app.device,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  // roles: state => state.user.roles,
  roles: () => ['admin'],
  permission_routes: () => constantRoutes.concat(asyncRoutes),
  errorLogs: state => state.errorLog.logs,
  projectId: state => state.project.id,
  userProjects: state => state.user.projects
}
export default getters
