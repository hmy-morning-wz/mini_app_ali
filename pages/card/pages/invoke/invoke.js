import busService from '/pages/card/service/busService';
import { autoErrorPage, autoMiniErrorPage } from '/pages/card/util/ErrorHandler';
import state from '/pages/card/util/CardStatus';
const app = getApp()
Page({
  data: {
    unregisterMessage: null,
    successTips: null,
    rollbackDisable: false,
    showRollback: false,
    loading: true
  },

  onLoad(options) {

    //app.Tracker.Page.init()
    my.showLoading({
      content: '查询中...',
    });
    const successTips = (options && 'successTips' in options) ? options.successTips : '退卡申请';
    const info = app.config && app.config.city;
    const unregisterMessage = info && info.unRegisterMemo ? info.unRegisterMemo : '我们将尽快审核您的申请，申请成功后卡内余额将退回您支付宝账户';
    this.setData({
      unregisterMessage,
      successTips,
    });

  },

  getCard() {
    busService.getCard().then(autoErrorPage(({ data }) => {
      console.log('>>> 卡信息查询: ', data);
      this.setData({
        rollbackDisable: data.status == state.REFUNDING  || data.status == state.FROZEN,
        showRollback:  data.status != state.UNREGISTED
      });

      if (data.status == state.REFUNDING) {
        my.alert({
          title: '退卡成功', // alert 框的标题
          content: this.data.successTips,
          buttonText: '确定',
        });
      } else if (data.status == state.UNREGISTED) {
        let unregisterMessage = "你可以再次申领电子交通卡"
        let successTips = "已经退卡成功"
        this.setData({
          unregisterMessage,
          successTips,
          showRollback: false
        });
      }
    }))
  },

  onShow() {

    busService.getCard().then(autoErrorPage(({ data }) => {
      console.log('>>> 卡信息查询: ', data);
      my.hideLoading()

      if (data.status === state.ACTIVE) {
        my.confirm({
          title: '提示',
          content: '确定退卡？',
          success: (res) => {
            if (res.confirm) {
              busService.unregister().then(autoErrorPage(({ data }) => {
                console.log('unregister====>', data);
                this.setData({ loading: false, successTips: data }, () => {
                  this.getCard()
                })
              }), autoMiniErrorPage());
            } else {
              my.navigateBack({

              });
            }
          },

        });
      } else {
        let { successTips, unregisterMessage } = this.data
        if (data.status == state.UNREGISTED) {
          unregisterMessage = "你可以再次申领电子交通卡"
          successTips = "已经退卡成功"
        }
        this.setData({
          unregisterMessage,
          successTips,
          loading: false,
          rollbackDisable: data.status == state.REFUNDING || data.status == state.FROZEN ,
          showRollback: data.status != state.UNREGISTED
        });
      }

    })).catch(error => {
      autoMiniErrorPage('', '/pages/index/index');
    })
  },

  doRollback() {
    my.showLoading({
      content: '撤回中...',
    });
    busService.rollbackUnregister().then(autoErrorPage(({ code, msg, data }) => {
      my.hideLoading();
      console.log('rollbackUnregister====>', code, msg, data);
      if (code === 200) {
        my.alert({
          title: '撤回成功', // alert 框的标题
          content: '你可以继续使用公交付款服务',
          buttonText: '立即查看',
          success: () => {
            my.navigateBack({
              delta: 1
            });
          },
        });
      } else {
        my.alert({
          title: '撤回失败', // alert 框的标题
          content: msg
        });
      }
    }), autoMiniErrorPage());
  },
});
