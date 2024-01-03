//Thông tin quản lý
const dataManagement = [
  {
    ID: 'ĐXCPTĐ/001',
    date: '10/10/2022',
    route: 'Phú Nhuận,Sài Gòn - Đức Hòa,Long An',
    totalCosts: '2.000.000',
    goods: 'Thạch cao',
    typeOfGoods: 'Hàng cont',
    isFileAttach: "Có",
    note: '',
    statusName: 'Đã khóa',
    statusColor: 'green',
  },
  {
    ID: 'ĐXCPTĐ/002',
    date: '12/10/2022',
    route: 'Dĩ An, Bình Dương - Quận 2, Sài Gòn',
    goods: 'Ván',
    typeOfGoods: 'Hàng cont',
    totalCosts: '1.000.000',
    isFileAttach: "Không",
    note: '',
    statusName: 'Chưa khóa',
    statusColor: 'gray',
  },
]
const fieldsManagement = [
  { key: 'ID', label: 'Mã chứng từ' },
  { key: 'date', label: 'Ngày áp dụng' },
  { key: 'route', label: 'Tuyến đường' },
  { key: 'totalCosts', label: 'Tổng chi phí tuyến đường', tdClass: 'text-right' },
  { key: 'goods', label: 'Mặt hàng ' },
  { key: 'typeOfGoods', label: 'Loại hàng' },
  { key: 'isFileAttach', label: 'Có file đính kèm' },
  { key: 'note', label: 'Ghi chú' },
  { key: 'statusName', label: 'Trạng thái' },

]

// Thông tin quản lý tuyến			
const dataFromPoint = [
  {
    city: 'Sài Gòn',
    district: 'Phú Nhuận',
    ward: 'Phường 9',
  },
  {
    city: 'Bình Dương',
    district: 'Dĩ An',
    ward: 'Đông Hoà',
  }
]
const fieldsFromPoint = [
  { key: 'city', label: 'Tỉnh/Thành phố' },
  { key: 'district', label: 'Quận/Huyện' },
  { key: 'ward', label: 'Phường/Xã' },
]
const dataToPoint = [
  {
    city: 'Long An',
    district: 'Đức Hoà',
    ward: 'Đức Hoà Thượng',
  },
  {
    city: 'Sài Gòn',
    district: 'Quận 2',
    ward: 'Cát Lái',
  }
]

const fieldsToPoint = [
  { key: 'city', label: 'Tỉnh/Thành phố' },
  { key: 'district', label: 'Quận/Huyện' },
  { key: 'ward', label: 'Phường/Xã' },
]
const dataRoute = [
  {
    ID: 'SG.PN.P9-LA.ĐH.HT',
    name: 'Phú Nhuận,Sài Gòn - Đức Hòa,Long An',
    km: '40KM',
    status: 'Đã duyệt',
    note: '...',
  },
  {
    ID: 'BD.DA.ĐH-SG.Q2.CL',
    name: 'Dĩ An, Bình Dương - Quận 2, Sài Gòn',
    km: '24KM',
    status: 'Chưa duyệt',
    note: '...',
  }
]
const fieldsRoute = [
  { key: 'ID', label: 'Mã tuyến' },
  { key: 'name', label: 'Tên tuyến' },
  { key: 'group', label: 'Nhóm tuyến' },
  { key: 'km', label: 'Số KM' },
  { key: 'status', label: 'Trạng thái' },
  { key: 'note', label: 'Ghi chú' },
]

// Thông tin chi phí cầu đường	
const dataTollCosts = [
  {
    station: 'Trạm Phú Mỹ',
    amount: '80.000'
  },
  {
    station: 'Trạm Nguyễn Văn Linh',
    amount: '35.000'
  },
]
const fieldsTollCosts = [
  { key: 'station', label: 'Trạm thu phí' },
  { key: 'amount', label: 'Số tiền' },
]

const stationOptions = [
  { text: 'Trạm Phú Mỹ', value: 'Trạm Phú Mỹ' },
  { text: 'Trạm Nguyễn Văn Linh', value: 'Trạm Nguyễn Văn Linh' },
]

// Thông tin chi phí khoán theo loại hàng, mặt hàng		
const dataCostsByType = [
  {
    type: 'Cont/rời',
    goods: 'Thép',
    fromDate: '01/01/2022',
    toDate: '31/12/2022',
    otherCost: '1,000,000',
    descriptionOtherCost: 'Bốc vác',
    fullLoadFee: '1,000,000',
    fullSalary: '450,000',
    overloadFee: '1,500,000',
    overloadSalary: '650,000',
    otherCost2: '500,000',
  },
  {
    type: 'Cont/rời',
    goods: 'Ván',
    fromDate: '01/01/2022',
    toDate: '01/01/2022',
    otherCost: '1,200,000',
    descriptionOtherCost: 'Bốc vác, trà đá,...',
    fullLoadFee: '1,150,000',
    fullSalary: '600,000',
    overloadFee: '1,650,000',
    overloadSalary: '750',
    otherCost2: '500,000',
  }
]
const fieldsCostsByType = [
  { key: 'type', label: 'Loại hàng' },
  { key: 'goods', label: 'Mặt hàng' },
  { key: 'fromDate', label: 'Áp dụng từ ngày' },
  { key: 'toDate', label: 'Áp dụng đến ngày' },
  { key: 'otherCost', label: 'Phí khác' },
  { key: 'descriptionOtherCost', label: 'Diễn giải chi phí khác' },
  { key: 'fullLoadFee', label: 'Phí đủ tải' },
  { key: 'fullSalary', label: 'Lương đủ tải' },
  { key: 'overloadFee', label: 'Phí quá tải' },
  { key: 'overloadSalary', label: 'Lương quá tải' },
  { key: 'otherCost2', label: 'Phí khác' },
]

const goodsOptions = [
  { value: 'Thạch cao', text: 'Thạch cao' },
  { value: 'Ván', text: 'Ván' },
  { value: 'Thép', text: 'Thép' },
]

const typeOfGoodsOptions = [
  { value: 'Hàng cont', text: 'Hàng cont' },
  { value: 'Hàng rời', text: 'Hàng rời' },
]

const routeOptions = [
  { value: 'Phú Nhuận,Sài Gòn - Đức Hòa,Long An', text: 'Phú Nhuận,Sài Gòn - Đức Hòa,Long An' },
  { value: 'Dĩ An, Bình Dương - Quận 2, Sài Gòn', text: 'Dĩ An, Bình Dương - Quận 2, Sài Gòn' },
]

const routeGroupOptions = [
  { value: 'Tuyến Bis Miền Tây', text: 'Tuyến Bis Miền Tây' },
  { value: 'Tuyến Bis Miền Đông', text: 'Tuyến Bis Miền Đông' },
]

const provinceOptions = [
  { value: 'TPHCM', text: 'TPHCM' },
  { value: 'Bình Dương', text: 'Bình Dương' },
  { value: 'Bình Phước', text: 'Bình Phước' },
]

const districtOptions = [
  { value: 'Nhà Bè', text: 'Nhà Bè' },
  { value: 'Dĩ An', text: 'Dĩ An' },
  { value: 'Bình Tân', text: 'Bình Tân' },
]

const wardOptions = [
  { value: 'Hiệp Phước', text: 'Hiệp Phước' },
  { value: 'Tân Tạo A', text: 'Tân Tạo A' },
  { value: 'Hiệp Bình Chánh', text: 'Hiệp Bình Chánh' },
  { value: 'Đức Hòa', text: 'Đức Hòa' }
]

const dataRouteInfo = [
  {
    routeName: 'Phú Nhuận,Sài Gòn - Đức Hòa,Long An',
    routeCode: 'SG.PN.P9-LA.ĐH.HT',
    routeGroup: 'Tuyến Bis Miền Tây',
    km: '40km'
  },
  {
    routeName: 'Dĩ An, Bình Dương - Quận 2, Sài Gòn',
    routeCode: 'DA.BD-Q2.SG',
    routeGroup: 'Tuyến Bis Miền Đông',
    km: '50km'
  }
]

export default {
  dataManagement,
  fieldsManagement,
  dataFromPoint,
  fieldsFromPoint,
  dataToPoint,
  fieldsToPoint,
  dataRoute,
  fieldsRoute,
  dataTollCosts,
  fieldsTollCosts,
  dataCostsByType,
  fieldsCostsByType,
  goodsOptions,
  typeOfGoodsOptions,
  routeOptions,
  routeGroupOptions,
  dataRouteInfo,
  provinceOptions,
  districtOptions,
  wardOptions,
  stationOptions,
}