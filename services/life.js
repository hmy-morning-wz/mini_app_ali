import {
  request
} from '../util/service'
import { mockData } from './mock/life.mock'


// import minxins from '../util/mixins'
const OATH_UID_PATH = '/miniapp_login.do';
export default {
  // 优惠券信息
  queryHzUserVoucherInfo: async (alipayId = {}) => {
    const originData = await request(`/voucher/mappvoucher/queryHzUserVoucherInfo`, {
      aliUserId: alipayId
    }, {
      on: false,
      data: mockData
    }, 'post', {
      urlType: 'default',
      headers: {
        'content-type': 'application/json'
      }
    })
    // 数据处理
    console.log('获取优惠券返回数据：', originData);
    if (!originData.API_ERROR && originData.msg === 'Success' && originData.data) {
      return {
        success: true,
        data: originData.data
      }
    }
    my.hideLoading()
    // minxins.showModal('showToast', {
    //   type: 'fail',
    //   title: '温馨提示',
    //   content: originData.errorMsg ? originData.errorMsg : '接口请求错误!'
    // })
    return {
      success: false
    }
  },
  doLogin : async (authCode) => {
    console.log("authcode22===",authCode)
    const app = getApp()
    const originData = await request(`${OATH_UID_PATH}?auth_code=${authCode}&citycode=${app.cityInfo.cityCode}&appid=${app.cityInfo.appid}`, '',{
      on: false,
      data: {}
    }, 'get', {
      urlType: 'cardManageDomain'
    })
    if (!originData.API_ERROR && originData.msg === 'SUCCESS' && originData.data) {
      return {
        success: true,
        data: originData.data
      }
    }
    my.hideLoading()
    // minxins.showModal('showToast', {
    //   type: 'fail',
    //   title: '温馨提示',
    //   content: originData.errorMsg ? originData.errorMsg : '接口请求错误!'
    // })
    return {
      success: false
    }
  }
}

