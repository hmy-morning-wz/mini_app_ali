import store from './store';

const createPage = function(options) {
  return Page(store.register(options));
};
createPage({
  data: {
  },
  onLoad() {
  },
  onShow() {
  },
  onReady() {
  },
  onBtnRightsItem(e) {
    my.navigateTo({
      url: '/pages/richText/richText'
    });
  }
});
