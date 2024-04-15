import { request } from '@umijs/max';

/** 此处后端没有提供注释 GET /api/v1/queryUserList */
export async function queryList(
  params: {
    keyword?: string;
    /** current */
    current?: number;
    /** pageSize */
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<API.Result_List>('/api/v1/queryList', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function addItem(
  body?: API.ListItemInfoVo,
  options?: { [key: string]: any },
) {
  return request<API.Result_List>('/api/v1/addItem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}


export async function delItem(
  body?: API.ListDelInfoVo,
  options?: { [key: string]: any },
) {
  return request<API.Result_List>('/api/v1/delItem', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}



export async function updateActiveStatus(
  params: {},
  options?: { [key: string]: any },
) {
  return request<API.Result_List>('/api/v1/updateActiveStatus', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function updateClearCompletedStatus(
  params: {},
  options?: { [key: string]: any },
) {
  return request<API.Result_List>('/api/v1/updateClearCompletedStatus', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}








