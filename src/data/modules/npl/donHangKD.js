export const data = [

  {
    ID: "DH/22/09/00002",
    createDate: "1/10/2022",
    company: "Công ty B",
    loaiDonHang: 'Hàng rời',
    brand: "Thép",
    quantityText: '5cuộn (30tấn)',
    route: 'SG-LA (Sài gòn - Long an)',
    turnover: 17000000,
    tiepNhanDon: 'Đã tiếp nhận',
    tiepNhanDonColor: 'green',
    tienDo: '1/2 (50%)',
    timeSuccess: '15:10 15/11/2022',
    trangThaiVanDon: 'Đang giao hàng',
    trangThaiVanDonColor: 'orange',
    chungTuGoc: 'Chưa nhận',
    chungTuGocColor: 'red',
    banGiaoCT: 'Chưa bàn giao',
    banGiaoCTColor: 'red',
    type: 'HR',
    note: '',
    fullName: 'Trần văn B',
    email: "b@gmail.com",
    typeBrand: "Phủ",
    quantity: 3,
    weight: 15,
    phone: "07854122215855",
    donGia: '200,000',
    duKienHoanThanh: '17:30 12/11/2022',
    dkSoLuongXe: 30,
    tienVC: '500,000',
    giamGia: '100,000',
    lyDoGiamGia: 'Khách quen chiết khấu',
    CPPS: '300,000',
    DTPS: '700,000',
    TongCong: '1,000,000',
    unit: 'Chuyến'
  },
  {
    ID: "DH/22/09/00001",
    createDate: "1/10/2022",
    company: "Công ty A",
    loaiDonHang: 'Cont xuất',
    brand: "Sắt",
    quantityText: '2cont (80tấn)',
    route: 'SG-LA (Sài gòn - Long an)',
    turnover: 15000000,
    tiepNhanDon: 'Chờ tiếp nhận',
    tiepNhanDonColor: 'gray',
    tienDo: '0/3 (0%)',
    timeSuccess: '13:10 15/11/2022',
    trangThaiVanDon: 'Đang giao hàng',
    trangThaiVanDonColor: 'orange',
    chungTuGoc: 'Chưa nhận',
    chungTuGocColor: 'red',
    banGiaoCT: 'Chưa bàn giao',
    banGiaoCTColor: 'red',
    type: 'CX',
    note: '',
    fullName: 'Trần Thanh Tú',
    email: "a@gmail.com",
    typeBrand: "Cảo",
    quantity: 4,
    weight: 10,
    phone: "07854122215855",
    donGia: '100,000',
    duKienHoanThanh: '17:30 12/11/2022',
    dkSoLuongXe: 50,
    tienVC: '500,000',
    giamGia: '100,000',
    lyDoGiamGia: 'Khách quen chiết khấu',
    CPPS: '300,000',
    DTPS: '700,000',
    TongCong: '1,000,000',
    unit: 'Chuyến'
  },
  {
    ID: "DH/22/09/00003",
    createDate: "1/10/2022",
    company: "Công ty C",
    loaiDonHang: 'Cont nhập',
    brand: "Thép",
    quantityText: '2cont (50tấn)',
    route: 'SG-LA (Sài gòn - Long an)',
    turnover: 10000000,
    tiepNhanDon: 'Đã tiếp nhận',
    tiepNhanDonColor: 'green',
    tienDo: '2/2 (100%)',
    timeSuccess: '17:10 15/11/2022',
    trangThaiVanDon: 'Hoàn thành',
    trangThaiVanDonColor: 'green',
    chungTuGoc: 'Đã nhận',
    chungTuGocColor: 'green',
    banGiaoCT: 'Đã bàn giao',
    banGiaoCTColor: 'green',
    type: 'CN',
    note: '',
    fullName: 'Trần văn C',
    email: "c@gmail.com",
    typeBrand: "Cảo",
    quantity: 6,
    weight: 21,
    phone: "07854122215855",
    donGia: '300,000',
    duKienHoanThanh: '17:30 12/11/2022',
    dkSoLuongXe: 40,
    tienVC: '500,000',
    giamGia: '100,000',
    lyDoGiamGia: 'Khách quen chiết khấu',
    CPPS: '300,000',
    DTPS: '700,000',
    TongCong: '1,000,000',
    unit: 'Chuyến'
  },
];
export const fields = [
  {
    key: 'ID',
    label: "Mã CT",
  },
  {
    key: 'loaiDonHang',
    label: "Đơn hàng",
  },
  {
    key: 'company',
    label: "Khách hàng",
  },
  {
    key: 'brand',
    label: "Hàng hóa",
  },
  {
    key: 'quantityText',
    label: "Số lượng",
  },
  {
    key: 'route',
    label: "Tuyến đường",
  },
  {
    key: 'CPPS',
    label: "Chi phí (PS)",
    tdClass: 'text-right'
  },
  {
    key: 'DTPS',
    label: "Doanh thu (PS)",
    tdClass: 'text-right'
  },
  {
    key: 'turnover',
    label: "Doanh thu",
    tdClass: 'text-right'
  },
  {
    key: 'tiepNhanDon',
    label: "Tiếp nhận đơn",
  },
  {
    key: 'tienDo',
    label: "Tiến độ",
  },
  // {
  //   key: 'timeSuccess',
  //   label: "Thời gian hoàn thành",
  // },
  {
    key: 'trangThaiVanDon',
    label: "Trạng thái vận đơn",
  },
  {
    key: 'chungTuGoc',
    label: "Chứng từ gốc",
  },
  {
    key: 'banGiaoCT',
    label: "Bàn giao chứng từ",
  },
  {
    key: 'DSCT',
    label: "File chứng từ",
  },
]
export const fieldsFormHeader = [
  {
    key: 'ID',
    label: "Mã HD",
    col: 6,
    type: "key"
  },
  {
    key: 'createDate',
    label: "Ngày ĐH",
    col: 6,
    type: "date"
  },
  {
    key: 'company',
    label: "Khách hàng",
    col: 12
  },
  {
    key: 'fullName',
    label: "Người liên hệ",
    col: 4
  },
  {
    key: 'phone',
    label: "Điện thoại",
    col: 4
  },
  {
    key: 'email',
    label: "Email",
    col: 4
  },
  {
    key: 'brand',
    label: "Mặt hàng",
    col: 3,
    type: 'select'
  },

  {
    key: 'typeBrand',
    label: "Yêu cầu đặc biệt",
    col: 3,
    type: 'multiselect'
  },
  {
    key: 'quantity',
    label: "Số lượng",
    col: 3,
    type: 'custom',
    class: "text-right"
  },
  {
    key: 'weight',
    label: "Trọng lượng",
    col: 3,
    type: 'number'
  },
  {
    key: 'route',
    label: "Tuyến đường",
    col: 5,
    type: 'select'
  },
  {
    key: 'unit',
    label: "Đơn vị tính",
    col: 3,
    type: 'select'
  },
  {
    key: 'donGia',
    label: "Đơn giá",
    col: 4,
    type: 'disabled',
    class: "text-right"
  },
  {
    key: 'note',
    label: "Ghi chú",
    col: 12,
    type: 'note',
    height: '114px',
  },
]
export const fieldsFormHeaderRight = [
  {
    key: 'tiepNhanDon',
    label: 'Tiếp nhận đơn',
    col: 12,
    type: 'status',
    class: 'text-right'
  },
  {
    key: 'tienDo',
    label: 'Tiến độ',
    col: 12,
    class: 'text-right'
  },
  {
    key: 'duKienHoanThanh',
    label: 'Dự kiến hoàn thành',
    col: 12,
    class: 'text-right'
  },
  {
    key: 'trangThaiVanDon',
    label: 'Trạng thái vận đơn',
    col: 12,
    type: 'status',
    class: 'text-right'
  },
  {
    key: 'chungTuGoc',
    label: 'Chứng từ gốc',
    col: 12,
    type: 'status',
    class: 'text-right'
  },
  {
    key: 'banGiaoCT',
    label: 'Bàn giao chứng từ',
    col: 12,
    type: 'status',
    class: 'text-right'
  }
]
export const fieldsFormBottomRight = [
  {
    key: 'dkSoLuongXe',
    label: 'Dự kiến (xe)',
    col: 12,
    class: 'text-right'
  },
  {
    key: 'tienVC',
    label: 'Tiền Vận Chuyển',
    col: 12,
    class: 'text-right'
  },


  {
    key: 'CPPS',
    label: 'Chi phí phát sinh',
    col: 12,
    class: 'text-right'
  },
  {
    key: 'DTPS',
    label: 'Doanh thu phát sinh',
    col: 12,
    class: 'text-right'
  },
  {
    key: 'giamGia',
    label: 'Giảm giá',
    col: 12,
    class: 'text-right'
  },
  {
    key: 'TongCong',
    label: 'Tổng cộng',
    col: 12,
    class: 'text-right font-weight-bold'
  },
  {
    key: 'lyDoGiamGia',
    label: 'Lý do giảm giá',
    col: 12,
    class: 'text-right',
    style: 'height:57px'
  },
]
export default { data, fields, fieldsFormHeader, fieldsFormHeaderRight, fieldsFormBottomRight }