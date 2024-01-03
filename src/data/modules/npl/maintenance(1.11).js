// Thông tin quản lý
const dataManagement = [
  {
    ID: 'BTBD/001',
    date: '01/10/2022',
    typeOfVehicle: 'HW1000',
    isFileAttach: "Có",
    note: '',
    statusName: 'Đã khóa',
    statusColor: 'green',
  },
  {
    ID: 'BTBD/002',
    date: '10/09/2022',
    typeOfVehicle: 'HW1001',
    isFileAttach: "Không",
    note: '',
    statusName: 'Chưa khóa',
    statusColor: 'gray',
  },
]

const fieldsManagement = [
  { key: 'ID', label: 'Mã chứng từ' },
  { key: 'date', label: 'Ngày áp dụng' },
  { key: 'typeOfVehicle', label: 'Loại xe' },
  { key: 'isFileAttach', label: 'Có file đính kèm' },
{ key: 'note', label: 'Ghi chú' },
  { key: 'statusName', label: 'Trạng thái' },
]

//Thông tin chi tiết bảo dưỡng
const dataMaintenance = [
  {
    period: 'Kỳ 1',
    name: 'Đầu kéo HD1000 - 7.000km',
    km: '7000km',
    tolerance: '1500km',
  },
  {
    period: 'Kỳ 2',
    name: 'Đầu kéo HD7000 - 14.000km',
    km: '14000km',
    tolerance: '1500km',
  },
  {
    period: 'Kỳ 3',
    name: 'Đầu kéo HD14000 - 21.000km',
    km: '21000km',
    tolerance: '1500km',
  }
] 

const periodOptions = dataMaintenance.map(item => (
  {value: item.period, text: item.period}
))

//Công việc trong kỳ
const dataWorkPeriod = [
  {
    period: 'Kỳ 1',
    work: 'Kiểm tra nhớt hộp số ',
    supplies: 'Phuộc giảm sóc sau cabin T5G',
    amountOfSupplies: '2',
  },
  {
    period: 'Kỳ 1',
    work: 'Kiểm tra nhớt hộp số ',
    supplies: 'Phuộc giảm sóc sau cabin T5G',
    amountOfSupplies: '2',
  },
  {
    period: 'Kỳ 1',
    work: 'Kiểm tra nhớt hộp số ',
    supplies: 'Phuộc giảm sóc sau cabin T5G',
    amountOfSupplies: '2',
  },
]

const typeOfVehicleOptions = [
  {value: 'HW1000', text: 'HW1000'},
  {value: 'HW1001', text: 'HW1001'},
]

const workOptions = [
  {value: 'Kiểm tra hộp số', text: 'Kiểm tra hộp số'},
  {value: 'Thay nhớt', text: 'Thay nhớt'}
]

const suppliesOptions = [
  {value: 'Kiểm tra hộp số', text: 'Hộp số'},
  {value: 'Thay nhớt', text: 'Chai nhớt'},
]

const amountOfSuppliesOptions = [
  {value: 'Kiểm tra hộp số', text: '1'},
  {value: 'Thay nhớt', text: '2'},
]

const dataWordInfo = [
  {
    work: 'Kiểm tra hộp số',
    supplies: 'Hộp số',
    amountOfSupplies: '2'
  },
  {
    work: 'Thay nhớt',
    supplies: 'Chai nhớt',
    amountOfSupplies: '1'
  }
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
  dataMaintenance,
  dataWorkPeriod,
  typeOfVehicleOptions,
  workOptions,
  suppliesOptions,
  amountOfSuppliesOptions,
  periodOptions,
  dataWordInfo,
}