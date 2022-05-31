import request from '@/utils/request'

export function addEnvironment(data) {
  return request({
    method: 'post',
    url: '/environment/add',
    data
  })
}

export function deleteEnvironment(id) {
  return request({
    method: 'delete',
    url: `/environment/${id}`
  })
}

export function updateEnvironment(data) {
  return request({
    method: 'post',
    url: '/environment/update',
    data
  })
}

// 获取项目对应保存的环境
export function getEnvironmentList(params) {
  return request({
    method: 'post',
    url: '/environment/list',
    params
  })
}
