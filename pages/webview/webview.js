import store from './store'

const app = getApp()

const createPage = function(options) {
  return Page(store.register(options))
};
createPage({
  data: {
    url: '' // h5链接
  },
  onLoad(options) {
    //app.Tracker.Page.init()
    this.webViewContext = my.createWebViewContext('web-view-1');
    let url =options.url//'http://sit-operation.allcitygo.com/TeStabc/test.html'//
    if(url.indexOf('{userId}')>-1){
      url =   url.replace('{userId}',app.userId)
    }
    if(url.indexOf('{appId}')>-1){
      url =   url.replace('{appId}',app.appId)
    }
    this.setData({
      url: url
    })
  },
  // 接收来自H5的消息
  onMessage(e) {
    console.log(e); //{'sendToMiniProgram': '0'}
    let msg= e.detail
    let ret
    if (msg && msg.method)
      switch (msg.method) {
        case 'openCardDetail':
          my.openCardDetail(msg.param)
          ret = true
          break;
        case 'openCardList':
          my.openCardList(msg.param)
          ret = true
          break;
        case 'openKBVoucherDetail':
          my.openKBVoucherDetail(msg.param)
          ret = true
          break;
        case 'openMerchantCardList':
          my.openMerchantCardList(msg.param)
          ret = true
          break;
        case 'openMerchantVoucherList':
          my.openMerchantVoucherList(msg.param)
          ret = true
          break;
        case 'openTicketDetail':
          my.openTicketDetail(msg.param)
          ret = true
          break;
        case 'openTicketList':
          my.openTicketList(msg.param)
          ret = true
          break;
        case 'openMerchantTicketList':
          my.openMerchantTicketList(msg.param)
          ret = true
          break;
        case 'openVoucherDetail':
          my.openVoucherDetail(msg.param)
          ret = true
          break;
        case 'openVoucherList':
          my.openVoucherList(msg.param)
          ret = true
          break;
        default:
          ret = false
          break

      }
    // 向H5发送消息
    this.webViewContext.postMessage({'success': ret});
  },
  onShow() {
  },
  onReady() {
  }
});
