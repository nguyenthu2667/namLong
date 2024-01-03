//Thông tin quản lý				
const dataManagement = [
  {
    ID: 'ĐXPCD/001',
    date: '10/10/2022',
    applyVehicle: '51C 31214, 51C 3106, 51C 2210, 51C 5410',
    groupVehicle: 'Tân Tạo',
    isFileAttach: "Có",
    note: '',
    statusName: 'Đã khóa',
    statusColor: 'green',
  },
  {
    ID: 'ĐXPCD/002',
    date: '10/10/2023',
    applyVehicle: '51C 4561, 51C 2210, 51C 4821, 51C 4821',
    groupVehicle: 'Cát Lái',
    isFileAttach: "Không",
    note: '',
    statusName: 'Chưa khóa',
    statusColor: 'gray',
  },
]
const fieldsManagement = [
  { key: 'ID', label: 'Mã chứng từ' },
  { key: 'date', label: 'Ngày áp dụng' },
  { key: 'applyVehicle', label: 'Áp dụng cho xe' },
  { key: 'groupVehicle', label: 'Đội xe' },
  { key: 'isFileAttach', label: 'Có file đính kèm' },
  { key: 'note', label: 'Ghi chú' },
  { key: 'statusName', label: 'Trạng thái'},

]

// Thông tin định mức tiêu hao theo xe
const dataConsumptionRate = [
  {
    licensePlates: '51C 31214',
    type: 'HW1000',
    oldLimit: '10',
    newLimit: '12',
    deviant: '2',
  },
  {
    licensePlates: '51C 31451',
    type: 'HW1000',
    oldLimit: '11',
    newLimit: '12',
    deviant: '1',
  },
  {
    licensePlates: '51C 31214',
    type: 'HW900',
    oldLimit: '10',
    newLimit: '12',
    deviant: '2',
  },
  {
    licensePlates: '51C 31214',
    type: 'HW800',
    oldLimit: '10',
    newLimit: '13',
    deviant: '3',
  }
]
const fieldsConsumptionRate = [
  { key: 'licensePlates', label: 'Biển số xe' },
  { key: 'type', label: 'Loại xe' },
  { key: 'oldLimit', label: 'Định mức cũ' },
  { key: 'newLimit', label: 'Định mức mới' },
  { key: 'deviant', label: 'Chênh lệch' },
]
const dataLicensePlatesInfo = [
  {
    licensePlates: '51C 31214',
    type: 'HW1000',
    oldLimit: '10',
    newLimit: '12',
    deviant: '',
  },
  {
    licensePlates: '51C 31451',
    type: 'HW2000',
    oldLimit: '11',
    newLimit: '12',
    deviant: '',
  },
  {
    licensePlates: '51C 31215',
    type: 'HW900',
    oldLimit: '10',
    newLimit: '12',
    deviant: '',
  },
  {
    licensePlates: '51C 31216',
    type: 'HW800',
    oldLimit: '15',
    newLimit: '16',
    deviant: '',
  }
]
const licensePlatesOptions = [
  { value: '51C 31214', text: '51C 31214' },
  { value: '51C 31451', text: '51C 31451' },
  { value: '51C 31215', text: '51C 31215' },
  { value: '51C 31216', text: '51C 31216' },
]

//Thông tin phụ cấp tuyến đường và cẩu
const dataRouteAndCraneAllowance = [
  {
    carWithCrandeAllowance: '3',
    allowanceByRoute: 'Bảng phụ cấp tháng 10 / 2022'
  },
  {
    carWithCrandeAllowance: '3',
    allowanceByRoute: 'Bảng phụ cấp tháng 10 / 2022'
  },
  {
    carWithCrandeAllowance: '3',
    allowanceByRoute: 'Bảng phụ cấp tháng 10 / 2022'
  },
]
const fieldsRouteAndCraneAllowance = [
  { key: 'carWithCraneAllowance', label: 'Phụ cấp xe có cẩu' },
  { key: 'allowanceByRoute', label: 'Bảng phụ cấp theo tuyến' },
]

// Thông tin theo dõi trình ký, xét duyệt chứng từ
const dataSigningAndApprovalProcess = [
  {
    dateTime: '05 / 09 / 2022 15: 00',
    performer: 'Bành Thị Thúy Hằng',
    action: 'Trình ký đề xuất',
    content: '"Đề xuất phụ cấp dầu theo xe',
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

//Theo tuyến đường
const dataRoute = [
  {
    ID: 'Long An-Sài Gòn',
    oldLimit: '10',
    newLimit: '15',
    deviant: '5',
    note: '...',
  },
  {
    ID: 'Sài Gòn-Bình Dương',
    oldLimit: '20',
    newLimit: '25',
    deviant: '5',
    note: '...',
  },
]
const fieldsRoute = [
  { key: 'ID', label: 'Tuyến đường' },
  { key: 'oldLimit', label: 'Định mức cũ' },
  { key: 'newLimit', label: 'Định mức mới' },
  { key: 'deviant', label: 'Chênh lệch' },
]

const routeOptions = [
  {value: 'Long An-Sài Gòn', text: 'Long An-Sài Gòn'},
  {value: 'Sài Gòn-Bình Dương', text: 'Sài Gòn-Bình Dương'},
]

//Thông tin loại hàng
const dataType = [
  {
    type: 'Hàng cont',
    allowance: '3'
  },
  {
    type: 'Hàng rời',
    allowance: '6'
  }
]
const dataType2 = [
  {
    type: 'Hàng cont',
    allowance: '3'
  },
  {
    type: 'Hàng rời',
    allowance: '6'
  }
]
const fieldsType = [
  { key: 'type', label: 'Loại hàng' },
  { key: 'allowance', label: 'Mức phụ cấp' },
]

export default {
  dataManagement,
  fieldsManagement,
  dataConsumptionRate,
  fieldsConsumptionRate,
  dataRouteAndCraneAllowance,
  fieldsRouteAndCraneAllowance,
  dataSigningAndApprovalProcess,
  fieldsSigningAndApprovalProcess,
  dataRoute,
  fieldsRoute,
  dataType,
  fieldsType,
  dataType2,
  dataLicensePlatesInfo,
  licensePlatesOptions,
  routeOptions,
}