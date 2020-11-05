import store from './store'
import life from '../../services/life'
import { autoErrorPage, autoMiniErrorPage } from '../card/util/ErrorHandler'
const app = getApp()

const createPage = function (options) {
  return Page(store.register(options))
};
createPage({
  data: {
    bannerSize: {},
    tradeNO: null,   
    showVoucher: true,
    voucher: {
      // "notifyStatus": true,
      // "totalMoney": 0.65,
      // windowType: 'overtime',
      // voucherInfoList: [{
      //   "voucherName": "苏泊尔电郑国500元代金券",
      //   "brandName": "苏泊尔电郑国500元代金券",
      //   "gmtExpiredStr": "2019-05-21",
      //   "voucherTypeStr": "乘车券",
      //   "voucherMoney": 1000.1,
      //   "voucherTemplateId": "20190429000730012281002OXPIC",
      //   "voucherId": "36452",
      //   "displayType": "supor_share"
      // },{
      //   "voucherName": "0.10元代金券",
      //   "brandName": "苏泊尔乘车",
      //   "gmtExpiredStr": "2019-05-21",
      //   "voucherTypeStr": "乘车券",
      //   "voucherMoney": 0.1,
      //   "voucherTemplateId": "20190429000730012281002OXPIC",
      //   "voucherId": "36452",
      //   "displayType": "supor_share"
      // },{
      //   "voucherName": "0.10元代金券",
      //   "brandName": "苏泊尔乘车",
      //   "gmtExpiredStr": "2019-05-21",
      //   "voucherTypeStr": "乘车券",
      //   "voucherMoney": 0.1,
      //   "voucherTemplateId": "20190429000730012281002OXPIC",
      //   "voucherId": "36452",
      //   "displayType": "supor_share"
      // }] // 是否存在优惠券
    }
  },
  async onLoad() {
    //app.Tracker.Page.init()
    this.dispatch('$global:getCardInfo',app.cityInfo.cardType)
    // console.log('gridData:', this.data.gridData)
    await this.dispatch('$global:updateSystemInfo')
    await this.dispatch('getIconList') // 获取首页配置列表
    console.log(this.iconList)
    this.setInitConfig()

    app.getUserInfo(['auth_base']).then(({ authCode }) => {
      console.log('app配置==', authCode)
      this.doLogin(authCode)

    }).catch(error => {
      console.error(error)
     // autoMiniErrorPage()
    })
  },
  async setInitConfig() {
    //console.log('当前城市', CONFIG)
    my.setNavigationBar({
      title: app.cityInfo.title
    })
    this.setData({
      unit_id: app.cityInfo.unit_id,
      bannerSize: {
        w: this.data.$global.systemInfo.windowWidth * 0.9,
        h: this.data.$global.systemInfo.windowWidth * 0.9 / 3.43
      }
    })
  },
  onShow() {
    this.dispatch('$global:getCardInfo')
    // console.log('$global:getCardInfo')
  },
  onReady() { },
  onItemClick(e) {
    const {
      index
    } = e.detail
    // const iconList = Object.assign(this.data.gridData, this.data.iconList)
    // console.log(iconList, this.data.gridData[index].url)
    console.log(this.data.iconList[index])
    this.handleNavigate(this.data.iconList[index])
    // 跳转到支付宝
    // my.ap.navigateToAlipayPage({path: this.data.iconList[index].url})
  },
  handleNavigate(options) {
    try {
      app.Tracker.click(options.text, options)
    } catch (err) {
      console.log('埋点出错')
    }
    switch (options.type) {
      case 'self':
        my.navigateTo({
          url: options.url
          // url: '/pages/card/pages/launch/launch?redirectPage=/pages/card/pages/balance/balance'
        })
        break
      case 'startApp':
        my.call('startApp', {
          appId: (options.appId || '20000042'),
          param: {
            publicBizType: options.publicBizType,
            publicId: options.publicId,
            chInfo: options.chInfo
          }
        })
        break
      case 'alipay':
        // my.alert({
        //   content: options.url
        // })
        console.log(options.url)
        my.ap.navigateToAlipayPage({
          path: options.url,
          fail: (err) => {
            my.alert({
              content: JSON.stringify(err)
            })
          }
        })
        break
      case 'miniapp':
        my.navigateToMiniProgram({
          appId: options.remarks,
          path: options.url,
          extraData: options.extraData || {}
        })
        break
      case 'none':
      case '':
        break
      default:
        break
    }
  },

  async doLogin(authCode) {

    let res = await life.doLogin(authCode)
    // console.log('优惠券', res)
    // console.log("res==", res)
    // app.isNewUser = res.data.newUser
    // app.userId = "2088802638441613"
    app.userId = res.data && res.data.userId
    app.Tracker.setUserId(app.userId)
    app.userId && this.queryHzUserVoucherInfo()
  },

  // 弹框显示
  async queryHzUserVoucherInfo() {
    console.log("userId==", app.userId)
    let res = await life.queryHzUserVoucherInfo(app.userId)
    // console.log('优惠券', res)
    this.setData({
      voucher: res.data
    })
  },
  // 监听
  handleClick(e) {
    console.log('点击绿色生活', e.currentTarget.dataset)
    this.handleNavigate(e.currentTarget.dataset.obj)
  }
});