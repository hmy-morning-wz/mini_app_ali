
import APIService from './APIService';
import { doGet } from '/pages/card/util/request';

const OATH_UID_PATH = '/miniapp_login.do';

class ECardService extends APIService {
  init(host, cityCode, appid, ver, systemInfo) {
    super.init(host);

    this.config = { cityCode };
    this.appid = appid;

    this.ver = ver;

    this.systemInfo = systemInfo;
  }

  getConfig(api) {
    return this.apiGet(api, this.config, this.options);
  }

  getCard() {
    return this.apiGet('ioc.ebuscard.card.my', {...this.config, ...this.systemInfo}, this.options);
  }

  getRechargeConfig() {
    return this.apiGet('ioc.ebuscard.recharge.template', this.config, this.options);
  }

  getRechargeLog(month, page, pageSize) {
    const param = {
      ...this.config,
      month,
      page,
      pageSize,
    };
    return this.apiGet('ioc.ebuscard.recharge.records', param, this.options);
  }

  doLogin(authCode) {
    console.log('authCode', authCode)
    return doGet(this.host + OATH_UID_PATH, { auth_code: authCode, cityCode: this.config.cityCode, appid: this.appid });
  }


  getTravelLog(month, page, pageSize) {
    const monthStr = month;
    return this.apiGet('ioc.ebuscard.travel.records', {
      ...this.config, month: monthStr, page, pageSize,
    }, this.options);
  }

  register(param) {
    return this.apiGet('ioc.ebuscard.card.register', { ...this.config, ...param });
  }

  registerMiniapp(authCode) {
    return this.apiGet('ioc.ebuscard.card.register_miniapp', { ...this.config, authCode });
  }

  getCertUrl(appSource) {
    return this.apiGet('ioc.ebuscard.certification.url', { ...this.config, appSource });
  }

  unregister() {
    return this.apiGet('ioc.ebuscard.card.unregister', this.config);
  }

  rollbackUnregister() {
    return this.apiGet('ioc.ebuscard.card.rollback_unregister', this.config);
  }

  queryPay(orderId) {
    return this.apiGet('ioc.ebuscard.recharge.query', { ...this.config, outTradeNo: orderId });
  }

  recharge(accountType, amount) {
    return this.apiPost('ioc.ebuscard.card.recharge', { ...this.config, accountType, amount, payChannel: 'alipay_applet' });
  }

  appRecharge(accountType, amount) {
    return this.apiPost('ioc.ebuscard.card.recharge', { ...this.config, accountType, amount, payChannel: 'alipay_applet', terminalType: 'app' });
  }

  getAutoRechargeStatus() {
    return this.apiGet('ioc.ebuscard.auto_recharge.query', this.config);
  }

  signAndOpenAutoRecharge(type, balance, ammount) {
    return this.apiPost('ioc.ebuscard.auto_charge.open', {
      ...this.config, type, balance, ammount,
    });
  }

  cancelAutoRecharge(type) {
    return this.apiPost('ioc.ebuscard.auto_recharge.cancel', { ...this.config, type });
  }
}

export default new ECardService();
