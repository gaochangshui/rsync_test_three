import request from '@/http'

export const getOrdersReceived = (params:Object) =>
  request({
    url: '/qcdapi/sum_mandays/OrdersReceived',
    method: 'get',
    params
  })

export const getSumMandays = (params:Object) =>
  request({
    url: '/qcdapi/sum_mandays/',
    method: 'get',
    params
  })

export const getEmployeeMandays = (EmployeeCode: string, yearmonth: string) =>
  request({
    url: '/qcdapi/employee_mandays/' + EmployeeCode + '/',
    method: 'get',
    params: {
      yearmonth: yearmonth
    }
  })

  export const getEmployeeMandaysDate = (EmployeeCode: string, yearMonthBeginAt: string, yearMonthEndAt: string) =>
  request({
    url: '/qcdapi/employee_mandays/' + EmployeeCode + '/',
    method: 'get',
    params: {
      yearMonthBeginAt: yearMonthBeginAt,
      yearMonthEndAt: yearMonthEndAt
    }
  })

export const getProjectMandays = (ProjectCode: string) =>
  request({
    url: '/qcdapi/project_mandays/' + ProjectCode + '/',
    method: 'get',
  })
export const getEmployeelist = () =>
  request({
    url: '/apiv1/employeelist',
    method: 'get',
  })

export const getTakenHours = (params:Object) =>
  request({
    url: '/qcdapi/taken_hours/',
    method: 'get',
    params
  })
export const getProjectlist = (filter:string) =>
  request({
    url: '/qcdapi/projects',
    method: 'get',
    params: {
      filter
    }
  })