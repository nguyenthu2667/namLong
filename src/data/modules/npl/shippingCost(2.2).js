// Thông tin quản lý
const dataManagement = [
  {
    ID: 'ĐXGVC/001',
    date: '01/10/2022',
    route: 'Phú Nhuận,Sài Gòn - Đức Hòa,Long An',
    customer: 'Công ty Nhâm Thận',
    typeOfGoods: 'Hàng rời',
    goods: 'Ure',
    specialRequest: 'Phủ bạt',
    specialRequestID: [1, 2, 3],
    costNoVAT: '5.000.000',
    vat: '10',
    costIncludeVAT: '5.500.000',
    isFileAttach: "Có",
    note: '',
    statusName: 'Đã khóa',
    statusColor: 'green',
  },
  {
    ID: 'ĐXGVC/002',
    date: '01/10/2022',
    route: 'Dĩ An, Bình Dương - Quận 2, Sài Gòn',
    customer: 'Công ty ABC',
    typeOfGoods: 'Hàng rời',
    goods: 'Ure',
    specialRequest: 'Phủ bạt',
    specialRequestID: [1, 2, 3],
    costNoVAT: '4.000.000',
    vat: '10',
    costIncludeVAT: '4.400.000',
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
  { key: 'customer', label: 'Khách hàng' },
  { key: 'typeOfGoods', label: 'Loại hàng' },
  { key: 'goods', label: 'Mặt hàng' },
  { key: 'specialRequest', label: 'Yêu cầu đặt biệt' },
  { key: 'costNoVAT', label: 'Giá chưa VAT', tdClass: 'text-right' },
  { key: 'vat', label: '% VAT', tdClass: 'text-right' },
  { key: 'costIncludeVAT', label: 'Giá có VAT', tdClass: 'text-right' },
  { key: 'isFileAttach', label: 'Có file đính kèm' },
{ key: 'note', label: 'Ghi chú' },
  { key: 'statusName', label: 'Trạng thái' },
]

const routeOptions = [
  { value: 'Phú Nhuận,Sài Gòn - Đức Hòa,Long An', text: 'Phú Nhuận,Sài Gòn - Đức Hòa,Long An' },
  { value: 'Dĩ An, Bình Dương - Quận 2, Sài Gòn', text: 'Dĩ An, Bình Dương - Quận 2, Sài Gòn' },
]

const customerOptions = [
  { value: 'Công ty Nhâm Thận', text: 'Công ty Nhâm Thận' },
  { value: 'Công ty ABC', text: 'Công ty ABC' },
]

const typeOfGoodsOptions = [
  { value: 'Hàng cont xuất', text: 'Hàng cont xuất' },
  { value: 'Hàng cont nhập', text: 'Hàng cont nhập' },
  { value: 'Hàng rời', text: 'Hàng rời' },
]

const goodsOptions = [
  { value: 'Ure', text: 'Ure' },
  { value: 'Thạch cao', text: 'Thạch cao' },
  { value: 'Ván', text: 'Ván' },
  { value: 'Thép', text: 'Thép' },
]

// const specialRequestOptions = [
//   { value: 'Phủ bạt', text: 'Phủ bạt' },
//   { value: 'Cảo', text: 'Cảo' },
//   { value: 'Xích', text: 'Xích' },
// ]
const specialRequestOptions = [
  { value: 1, label: 'Phủ bạt' },
  { value: 2, label: 'Cảo' },
  { value: 3, label: 'Xích' },
]
const unitsOptions = [
  { value: 'Cont 20', label: 'Cont 20'},
  { value: 'Cont 40', label: 'Cont 40'},
  { value: 'Tấn', label: 'Tấn'},
  { value: 'Khối', label: 'Khối'},
]

const dataCustomerInfo = [
  {
    customer: 'Công ty ABC',
    address: '43R Hồ Văn Huê, Phường 9, Quận Phú Nhuận, TPHCM',
    email: 'abc@gmail.com',
    phone: '123456789'
  },
  {
    customer: 'Công ty Nhâm Thận',
    address: '59 Đinh Tiên Hoàng, Phường Bến Nghé, Quận 1, TPHCM',
    email: 'nhamthan@gmail.com',
    phone: '123456789'
  },
]

//Thông tin theo dõi trình ký, xét duyệt chứng từ			
const dataSigningAndApprovalProcess = [
  {
    dateTime: '05 / 09 / 2022 15: 00',
    performer: 'Bành Thị Thúy Hằng',
    action: 'Trình ký đề xuất',
    content: 'Đề xuất 10/2022',
  },
  {
    dateTime: '06 / 09 / 2022 15: 00',
    performer: 'Cát Diệp Hải Lan',
    action: 'Kế toán xác nhận',
    content: '...',
  },
  {
    dateTime: '07 / 09 / 2022 15: 00',
    performer: 'Kim Ngọc Nghiên',
    action: 'BGĐ phê duyệt',
    content: 'OK',
  }
]
const fieldsSigningAndApprovalProcess = [
  {
    key: "dateTime",
    label: "Thời gian"
  },
  {
    key: "performer",
    label: "Người thực hiện"
  },
  {
    key: "action",
    label: "Tác vụ"
  },
  {
    key: "content",
    label: "Nội dung"
  }
]


export default {
  dataManagement,
  fieldsManagement,
  dataSigningAndApprovalProcess,
  fieldsSigningAndApprovalProcess,
  routeOptions,
  customerOptions,
  typeOfGoodsOptions,
  goodsOptions,
  specialRequestOptions,
  dataCustomerInfo,
  unitsOptions
}