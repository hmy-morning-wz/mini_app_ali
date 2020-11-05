import Tracker from '@tklc/miniapp-tracker-sdk'
import Store from './store'
import getDomain from '/util/env'
import busService from '/pages/card/service/busService'
const extJson = my.getExtConfigSync()
App(
  Store({
    isNewUser: true,
    redirectPage: null,
    config: {},
    cityInfo: null, // 城市配置
    cardType: '',
    async onLaunch(options) {
      const { query, scene, referrerInfo } = options
      Tracker.App.init({
        appId: '',// 区别不同小程序，可用小程序自己的appId
        server: ['https://webtrack.allcitygo.com:8088/event/upload'],
        version: '1.0.0',
        lauchOpts: options,
        stat_auto_click: true,
        appName: extJson.cityInfo.title,
        appId: extJson.cityInfo.appid,
        //bizScenario: (query && query.bizScenario) || scene || (referrerInfo && referrerInfo.appId) || "",
        mtrDebug: false
      }, this)
      this.busServiceInit(options)
    },

    async busServiceInit(options) {    
      console.log('小程序配置信息', extJson)
      this.cityInfo = extJson.cityInfo    
      this.cardType = this.cityInfo.cardType
      console.log('城市的配置信息', this.cityInfo)

      this.systemInfo = my.getSystemInfoSync()
      // console.log('Launch options: ', options, ' || system info: ', this.systemInfo)

      const { query } = options
      this.cityCode = (query && query.city) || this.cityInfo.cityCode

      const host = getDomain()

      this.host = (query && query.host) || host
      const si = {
        app: 'alipay_mini',
        model: this.systemInfo.model,
        platform: this.systemInfo.platform
      }
      busService.init(host, this.cityInfo.cityCode, this.cityInfo.appid, '', si)
  
      this.appId = this.cityInfo.appid
    },
    getUserInfo(scopes) {
      return new Promise((resolve, reject) => {
        my.getAuthCode({
          scopes,
          success: (info) => {
            console.log('用户信息', scopes, info)
            resolve(info)
          },
          fail: (error) => {
            reject(error)
          }
        })
      })
    }
  })
)
