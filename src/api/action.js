import request from '@/utils/request'

export function getActionList(params) {
  return request({
    method: 'post',
    url: '/action/list',
    params
  })
}

export function getActionCascader(type) {
  return request({
    method: 'get',
    url: '/action/cascader',
    params: {
      type: type
    }
  })
}

