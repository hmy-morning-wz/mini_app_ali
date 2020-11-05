// 配置文件
const base = {
  taixing: {
    appid: '2019032063583671',
    cardType: 'T0321283',
    cityCode: '321283',
    title: '泰兴公交'
  },
  lijiang: {
    appid: '2019032063596603',
    cardType: 'T0530700',
    cityCode: '530700',
    title: '丽江公交'
  },
  changshu: {
    appid: '2019032063599571',
    cardType: 'T0320581',
    cityCode: '320581',
    title: '常熟公交'
  },
  xinmi: {
    appid: '2019032063608511',
    cardType: 'T0410183',
    cityCode: '410183',
    title: '新密公交'
  },
  chaohu: {
    appid: '2019032063611493',
    cardType: 'T0340181',
    cityCode: '340181',
    title: '巢湖公交'
  },
  luzhou: {
    appid: '2019032063585603',
    cardType: 'T0510500',
    cityCode: '510500',
    title: '泸州公交'
  },
  fuyang: {
    appid: '2019030863480601',
    cardType: 'T0341200',
    cityCode: '341200',
    title: '阜阳公交'
  },
  yangzhou: {
    appid: '2019011963145071',
    cardType: 'T0321000',
    cityCode: '321000',
    title: '扬州市民卡'
  },
  chuxiong: {
    appid: '2019011863121060',
    cardType: 'T0532300',
    cityCode: '532301',
    title: '楚雄彝州通'
  },
  ruian: {
    appid: '2019011763009878',
    cardType: 'T0330381',
    cityCode: '330381',
    title: '瑞安公交'
  },
  yichunqiyun: {
    appid: '2019011763008944',
    cardType: 'T0360900',
    cityCode: '360900',
    title: '宜春客运'
  },
  pingtan: {
    appid: '2019011863101079',
    cardType: 'M0350128',
    cityCode: '350128',
    title: '平潭海峡通'
  },
  yichungj: {
    appid: '2019011863095090',
    cardType: 'T1360900',
    cityCode: '360902',
    title: '宜春公交'
  },
  zhangzhou: {
    appid: '2019011863077071',
    cardType: 'M0350600',
    cityCode: '350600',
    title: '漳州一卡通'
  },
  baoji: {
    appid: '2019011863024940',
    cardType: 'T0610300',
    cityCode: '610300',
    unit_id:'ad_tiny_2019011863024940_154',
    title: '宝鸡公交'
  },
  suzhou: {
    appid: '2018103161898552',
    cardType: 'T0320500',
    cityCode: '320500',
    title: '苏州公交'
  },
  sanya: {
    appid: '2019011763059104',
    cardType: 'T0460200',
    cityCode: '460200',
    title: '三亚天涯行'
  },
  taizhou: {
    appid: '2019011763004937',
    cardType: 'M0331000',
    cityCode: '331000',
    title: '台州公交'
  },
  lanzhou: {
    appid: '2018121562519951',
    cardType: 'T0620100',
    cityCode: '620100',
    title: '兰州公交'
  },
  haikou: {
    appid: '2018120662481627',
    cityCode: '460100',
    cardType: 'T0460100',
    title: '海口公交'
  },
  datong: {
    appid: '2019011863103090',
    cityCode: '140200',
    cardType: 'T0140200',
    unit_id:'ad_tiny_2019011863103090_156',
    title: '大同公交'
  },
  zhanjiang: {
    appid: '2019011863105090',
    cityCode: '440800',
    cardType: 'T0440800',
    title: '湛江公交'
  },
  linyijiaoyun: {
    appid: '2019011863110088',
    cityCode: '371300',
    cardType: 'T1371300',
    title: '临沂交运'
  },
  yulintong: {
    appid: '2019011863110089',
    cityCode: '610800',
    cardType: 'T0610800',
    title: '榆林通'
  },
  wenlingtong: {
    appid: '2019011863114053',
    cityCode: '331081',
    cardType: 'T0331081',
    title: '温岭通'
  },
  zhongshan: {
    appid: '2018090361288261',
    cityCode: '442000',
    cardType: 'T0‎442000',
    title: '中山通'
  },
  xianning: {
    appid: '2019011963114066',
    cityCode: '421200',
    cardType: 'T0421200',
    title: '咸宁一卡通'
  },
  anshan: {
    appid: '2019011863139063',
    cityCode: '210300',
    cardType: 'T0210300',
    title: '鞍山公交'
  },
  rizhao: {
    appid: '2019011863141063',
    cityCode: '371100',
    cardType: 'T0371100',
    title: '日照通'
  },
  haining: {
    appid: '2019011863143071',
    cityCode: '330481',
    cardType: 'T0330481',
    title: '海宁公交'
  }
}

const city = 'haikou'

export default base[city]

export const appKey = ''

export const alipayAppId = base[city].appid

export const rsaType = 'RSA2'

export const cardType = base[city].cardType
// localstorage
export const sessionIdName = 'tklc'
