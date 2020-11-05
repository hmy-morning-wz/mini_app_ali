Page({
  data: {
    info: {},
  },
  onLoad() {
    this.setData({
      info: {
        code: '500',
        message: '启动失败，请重试',
        btnMethod: 'onRetry',
        btnName: '重试',
      },
    });
  },

  onRetry() {
    my.redirectTo({
      url: '/pages/card/pages/launch/launch', // 需要跳转的应用内非 tabBar 的页面的路径，路径后可以带参数。参数与路径之间使用
    });
  },
});
