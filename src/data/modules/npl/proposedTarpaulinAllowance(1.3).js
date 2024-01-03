// Thông tin quản lý
const dataManagement = [
  {
    ID: 'ĐXPC/001',
    date: '01/10/2022',
    groupVehicleAllowance: 'Tân Tạo, Cát Lái',
    typeOfGoodsAllowance: 'Thép, ván thạch cao',
    allowance: '6.000.000',
    isFileAttach: "Có",
    note: '',
    statusName: 'Đã khóa',
    statusColor: 'green',
  },
  {
    ID: 'ĐXPC/002',
    date: '01/10/2023',
    groupVehicleAllowance: 'Tân Tạo',
    typeOfGoodsAllowance: 'Tôn , đồng',
    allowance: '6.000.000',
    isFileAttach: "Không",
    note: '',
    statusName: 'Chưa khóa',
    statusColor: 'gray',
  },
]
const fieldsManagement = [
  { key: 'ID', label: 'Mã chứng từ' },
  { key: 'date', label: 'Ngày áp dụng' },
  { key: 'groupVehicleAllowance', label: 'Đội xe phụ cấp' },
  { key: 'typeOfGoodsAllowance', label: 'Mặt hàng phụ cấp' },
  { key: 'allowance', label: 'Tổng tất cả phụ cấp tối đa/tháng', tdClass: 'text-right' },
  { key: 'isFileAttach', label: 'Có file đính kèm' },
  { key: 'note', label: 'Ghi chú' },
  { key: 'statusName', label: 'Trạng thái' },
]

const goodsOptions = [
  {value: 'Thép', text: 'Thép'},
  {value: 'Ván', text: 'Ván'},
  {value: 'Tôn', text: 'Tôn'},
]

// Thông tin mặt hàng phụ cấp
const dataSupplementaryItems = [
  {
    items: 'Thép',
    amountOfAllowanceByTrip: '200, 000',
    amountOfAllowanceByMonth: '5, 000, 000',
  },
  {
    items: 'Ván',
    amountOfAllowanceByTrip: '200, 000',
    amountOfAllowanceByMonth: '3, 000, 000',
  },
  {
    items: 'Tôn',
    amountOfAllowanceByTrip: '300, 000',
    amountOfAllowanceByMonth: '4, 000, 000',
  }
]
const fieldsSupplementaryItems = [
  { key: 'name', label: 'Mặt hàng phụ cấp' },
  { key: 'amountOfAllowanceByTrip', label: 'Số tiền phụ cấp / chuyến' },
  { key: 'amountOfAllowanceByMonth', label: 'Số tiền phụ cấp tối đa / tháng' },
]

//Thông tin mặt hàng
const dataTypeOfGoodsAllowance = [
  {
    name: 'Thép',
    oldAllowanceByTrip: '200.000',
    newAllowanceByTrip: '300.000',
    deviantAllowanceByTrip: '100.000',
    oldAllowanceByMonth: '2.000.000',
    newAllowanceByMonth: '3.000.000',
    deviantAllowanceByMonth: '1.000.000',
  },
  {
    name: 'Ván',
    oldAllowanceByTrip: '400.000',
    newAllowanceByTrip: '500.000',
    deviantAllowanceByTrip: '100.000',
    oldAllowanceByMonth: '4.000.000',
    newAllowanceByMonth: '5.000.000',
    deviantAllowanceByMonth: '1.000.000',
  },
  {
    name: 'Tôn',
    oldAllowanceByTrip: '600.000',
    newAllowanceByTrip: '700.000',
    deviantAllowanceByTrip: '100.000',
    oldAllowanceByMonth: '6.000.000',
    newAllowanceByMonth: '7.000.000',
    deviantAllowanceByMonth: '1.000.000',
  },
  // {
  //   name: 'Ván',
  //   amountOfAllowanceByTrip: '200, 000',
  //   amountOfAllowanceByMonth: '3, 000, 000'
  // },
  // {
  //   name: 'Đồng',
  //   amountOfAllowanceByTrip: '300, 000',
  //   amountOfAllowanceByMonth: '4, 000, 000',
  // },
  // {
  //   name: 'Tôn',
  //   amountOfAllowanceByTrip: '300, 000',
  //   amountOfAllowanceByMonth: '4, 000, 000',
  // },
]

//Thông tin đội xe
const dataGroupVehicleAllowance = [
  {name: 'Tân Tạo'},
  {name: 'Cát Lái'},
  {name: 'Bình Phước'},
]


export default {
  dataManagement,
  fieldsManagement,
  dataSupplementaryItems,
  fieldsSupplementaryItems,
  dataTypeOfGoodsAllowance,
  dataGroupVehicleAllowance,
  goodsOptions,
}