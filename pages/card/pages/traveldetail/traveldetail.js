import TravelStatus from '/pages/card/util/TravelStatus';

const app = getApp();
Page({
  data: {
    info: null,
    iconUrl: null,
  },
  onLoad() {

  },

  onShow() {
    console.log(app.config);
    const info = app.item;    
    info.status = TravelStatus.toName(info.status);
    this.setData({ info, iconUrl: app.config.city.iconUrl });
  },

});
