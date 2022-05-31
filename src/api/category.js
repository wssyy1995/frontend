import request from '@/utils/request'

export function addCategory(data) {
  return request({
    method: 'post',
    url: '/category/add',
    data
  })
}

export function getCategoryList(params) {
  return request({
    method: 'post',
    url: '/category/list',
    params
  })
}

export function getCategoryTree(type) {
  return request({
    method: 'get',
    url: '/category/tree',
    params: {
      type
    }
  })
}

