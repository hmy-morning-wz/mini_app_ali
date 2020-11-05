import store from './store';

const createPage = function(options) {
  return Page(store.register(options));
};
createPage({
  // connectGlobal: true,
  data: {
  },
  onShow() {
    // this.dispatch('getUseHelpInfo');
  },
  btnItem(e) {
    let { index, opened } = e.target.dataset;
    opened = !opened;
    this.commit('UPDATE_HELP_DATA', { index, opened });
  }
});
