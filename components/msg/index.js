Component({
  data: {
    showVoucher: false,
    close: false
  },
  props: {
    voucher: {},
    onshowVoucher: (e) => {
      console.log(e)
    }
  },
  didMount() {
    let voucher = this.props.voucher
    this.setData({
      voucher: voucher
    })
    console.log('弹框 didMount', voucher)
  },
  didUpdate() {
    let voucher = this.props.voucher
    this.setData({
      voucher: voucher,
      showVoucher: !this.data.close && voucher.notifyStatus
    })
    // console.log('弹框 update', voucher)
  },
  methods: {
    onBtnMsg() {
      this.setData({
        showVoucher: false,
        close: true
      })
    }
  }
});
