// Thông tin quản lý
const dataManagement = [
  {
    ID: 'BGPT/001',
    date: '11/11/2022',
    major: 'Thu hồi',
    handover: 'Đầu kéo',
    licensePlate: '51C 1234',
    type: 'HW1000',
    driver: 'Trần Văn A',
    CMND: '00124574556',
    phone: '123456789',
    address: '43R Hồ Văn Huê, Phường 9, Quận Phú Nhuận, TPHCM',
    GPLX: 'G1321',
    GPLXExpiredDate: '21/12/2025',
    expectedHandover: '21:00 21/11/2022',
    note: '',
    statusName: 'Chờ thu hồi',
    statusColor: 'gray',
  },
  {
    ID: 'BGPT/002',
    date: '11/11/2022',
    major: 'Thu hồi',
    handover: 'Rơ moóc',
    licensePlate: '51C 3142',
    type: 'RM1000',
    driver: 'Trần Văn A',
    CMND: '00124574556',
    phone: '123456789',
    address: '1 Đồng Khởi, Phường Bến Nghé, Quận 1, TPHCM',
    GPLX: 'G1321',
    GPLXExpiredDate: '21/12/2025',
    expectedHandover: '22:00 21/11/2022',
    note: '',
    statusName: 'Đã thu hồi',
    statusColor: 'green',
  },
  {
    ID: 'BGPT/003',
    date: '11/11/2022',
    major: 'Thu hồi phương tiện cho mượn',
    handover: 'Đầu kéo',
    licensePlate: '51C 3153',
    type: 'HW1000',
    driver: 'Trần Văn A',
    CMND: '00124574556',
    phone: '123456789',
    address: '43R Hồ Văn Huê, Phường 9, Quận Phú Nhuận, TPHCM',
    GPLX: 'G1321',
    GPLXExpiredDate: '21/12/2025',
    expectedHandover: '21:00 21/11/2022',
    note: '',
    statusName: 'Chờ thu hồi',
    statusColor: 'gray',
  },
  {
    ID: 'BGPT/004',
    date: '11/11/2022',
    major: 'Thu hồi phương tiện cho mượn',
    handover: 'Đầu kéo',
    licensePlate: '51C 5421',
    type: 'HW1000',
    driver: 'Trần Văn A',
    CMND: '00124574556',
    phone: '123456789',
    address: '43R Hồ Văn Huê, Phường 9, Quận Phú Nhuận, TPHCM',
    GPLX: 'G1321',
    GPLXExpiredDate: '21/12/2025',
    expectedHandover: '21:00 21/11/2022',
    note: '',
    statusName: 'Chờ thu hồi',
    statusColor: 'gray',
  }
]

const fieldsManagement = [
  { key: 'ID', label: 'Mã chứng từ' },
  { key: 'date', label: 'Ngày áp dụng' },
  { key: 'major', label: 'Nghiệp vụ' },
  { key: 'handover', label: 'Thu hồi' },
  { key: 'licensePlate', label: 'Biển số xe' },
  { key: 'type', label: 'Loại' },
  { key: 'driver', label: 'Tài xế' },
  { key: 'CMND', label: 'CMND' },
  { key: 'phone', label: 'Điện thoại' },
  { key: 'address', label: 'Địa chỉ' },
  { key: 'GPLX', label: 'GPLX' },
  { key: 'GPLXExpiredDate', label: 'Ngày hết hạn GPLX' },
  { key: 'expectedHandover', label: 'Dự kiến thu hồi' },
  { key: 'isFileAttach', label: 'Có file đính kèm' },
{ key: 'note', label: 'Ghi chú' },
  { key: 'statusName', label: 'Trạng thái' },
]

const titleOptions = [
  {
    id: 0,
    label: 'Yêu cầu thu hồi phương tiện'
  },
  {
    id: 1,
    label: 'Yêu cầu thu hồi phương tiện cho mượn'
  },
]

const driverOptions = [
  { value: 'Trần Văn A', text: 'Trần Văn A' },
  { value: 'Nguyễn Văn A', text: 'Nguyễn Văn A' },
]

const driverInfo = [
  {
    driver: 'Trần Văn A',
    CMND: '00124574556',
    phone: '123456789',
    address: '43R Hồ Văn Huê, Phường 9, Quận Phú Nhuận, TPHCM',
    GPLX: 'G1321',
    GPLXExpiredDate: '21/12/2025',
  },
  {
    driver: 'Nguyễn Văn A',
    CMND: '99912287412',
    phone: '647521976448',
    address: '1 Đồng Khởi, Phường Bến Nghé, Quận 1, TPHCM',
    GPLX: 'G9789',
    GPLXExpiredDate: '01/01/2024',
  }
]

const handoverOptions = [
  { value: 'Đầu kéo', text: 'Đầu kéo' },
  { value: 'Rơ moóc', text: 'Rơ moóc' },
]

const licensePlatesOptions = [
  { value: '51C 1234', text: '51C 1234' },
  { value: '51C 3142', text: '51C 3142' },
  { value: '51C 3153', text: '51C 3153' },
  { value: '51C 5421', text: '51C 5421' },
]

const licensePlatesInfo = [
  {
    licensePlate: '51C 1234',
    type: 'HW1000'
  },
  {
    licensePlate: '51C 3142',
    type: 'HW2000'
  },
  {
    licensePlate: '51C 3153',
    type: 'HW3000'
  },
  {
    licensePlate: '51C 5421',
    type: 'HW4000'
  },
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
  { value: 'Hàng cont', text: 'Hàng cont' },
  { value: 'Hàng rời', text: 'Hàng rời' },
]

const goodsOptions = [
  { value: 'Ure', text: 'Ure' },
  { value: 'Thạch cao', text: 'Thạch cao' },
  { value: 'Ván', text: 'Ván' },
  { value: 'Thép', text: 'Thép' },
]

const specialRequestOptions = [
  { value: 'Phủ bạt', text: 'Phủ bạt' },
  { value: 'Cảo', text: 'Cảo' },
  { value: 'Xích', text: 'Xích' },
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
  titleOptions,
  driverOptions,
  driverInfo,
  handoverOptions,
  licensePlatesOptions,
  licensePlatesInfo
}