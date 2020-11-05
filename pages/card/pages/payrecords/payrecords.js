import busService from '/pages/card/service/busService';
import { autoErrorPage, autoMiniErrorPage } from '/pages/card/util/ErrorHandler';
import { makeUrl } from '/pages/card/util/request';
import dayjs from 'dayjs';
import Utils from '/pages/card/util/Utils';
import PayStatus from '/pages/card/util/PayStatus';

const MONTH_FORMAT = 'YYYY-MM';
const app = getApp();

Page({
  data: {
    loading: true,
    list: [],
    month: dayjs().format(MONTH_FORMAT),
    page: 1,
    pageSize: 10,
    hasNextPage: true,
    itemNum: 0,
    innerLoading: false,
    hasArrow: true
  },
  onLoad() {

  },

  onShow() {
    this.requestList(this.data.page, 0);
  },

  onReachBottom() {
    console.log('hashNextPage====>', this.data.hasNextPage);
    // 页面被拉到底部
    if (this.data.hasNextPage) {
      this.requestList(++this.data.page, 1);
    }
  },

  /** 下拉刷新 重新加载数据 */
  onPullDownRefresh() {
    this.initData(dayjs().format(MONTH_FORMAT));
    this.requestList(this.data.page);
    my.stopPullDownRefresh();
  },

  onRechargeDetail(e) {
    const index = e.index;
    const item = this.data.list[index];
    app.item = item;
    console.log('choose item===>', item);
    if (item.status === 0 && item.payUrl !== null) {
      my.tradePay({
        tradeNO: item.payUrl,  // 即上述服务端已经加签的orderSr参数
        success: (res) => {
          console.log('>>>>>---- ', res.resultCode, res);
          if (res.resultCode === '9000' || res.resultCode === '8000') {
            my.redirectTo({ url: makeUrl('/pages/card/pages/payresult/payresult', { outTradeId: item.orderId }) });
          } else {
            const msg = res.memo || PayStatus.getDesc(res.resultCode);
            my.redirectTo({ url: makeUrl('/pages/card/pages/error/error', { message: msg, code: res.resultCode }) });
          }
        },
      });
    } else {
      my.navigateTo({ url: '/pages/card/pages/paydetail/paydetail' });
    }
  },


  chooseMonth() {
    const startDate = dayjs().subtract(1, 'years').format(MONTH_FORMAT);
    const endDate = dayjs().format(MONTH_FORMAT);
    const currentDate = dayjs().format(MONTH_FORMAT);

    my.datePicker({
      format: 'yyyy-MM',
      startDate,
      endDate,
      currentDate,
      success: (res) => {
        const month = dayjs(res.date).format(MONTH_FORMAT);
        if (this.data.month !== month) {
          this.initData(month);
          this.setData({ month, page: 1 });
          this.requestList(this.data.page);
        }
      },
    });
  },


  initData(month) {
    this.setData({
      list: [], month, page: 1, hasNextPage: true, innerLoading: false,
    });
  },

  /** flag 0 create 1 reachbottom */
  requestList(page, flag) {
    if (flag !== 0) {
      //  my.showLoading({content: '查询中...'});
      this.setData({ innerLoading: true });
    } else {
      this.setData({ loading: false });
    }
    const month = dayjs(this.data.month).format(MONTH_FORMAT);
    console.log('>>> 当前日期: ', month);
    busService.getRechargeLog(month, this.data.page, this.data.pageSize).then(autoErrorPage(({ data }) => {
      // my.hideLoading();
      this.setData({ innerLoading: false });
      console.log('getRechargeLog====>', data);
      if (page === 1 && data.length === 0) {
        this.setData({ hasNextPage: false, itemNum: 0 });
        return;
      }
      if (flag === 1 && (data === undefined || data.length === 0)) {
        --this.data.page;
        this.setData({ hasNextPage: false });
        my.showToast({
          content: '已经到底了', // 文字内容
        });
        return;
      }
      let { list } = this.data;
      // 转换列表中金额分为元
      for (let i = 0; i < data.length; i += 1) {
        data[i].rechargeAmmount = Utils.formatRMBYuanDecimal(data[i].rechargeAmmount);
      }

      if (page === undefined || page === 1) {
        list = data;
      } else {
        list.push(...data);
      }

      this.setData({ list, loading: false, itemNum: this.data.itemNum + list.length });
    }),autoMiniErrorPage());
  },
});
