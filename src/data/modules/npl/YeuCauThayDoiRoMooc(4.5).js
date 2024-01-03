// Thông tin quản lý
const dataManagement = [
  {
    ID: 'BGPT/001',
    date: '11/11/2022',
    licensePlate: '51C 1234',
    licensePlateMooc: '51C 1234',
    currentMooc: 'Mooc xương',
    changeMooc: 'Mooc sàn',
    expectedChange: '21:00 21/11/2022',
    driver: 'Trần Văn A',
    CMND: '00124574556',
    phone: '123456789',
    address: '43R Hồ Văn Huê, Phường 9, Quận Phú Nhuận, TPHCM',
    GPLX: 'G1321',
    GPLXExpiredDate: '21/12/2025',
    note: '',
    statusName: 'Chờ thu hồi',
    statusColor: 'gray',
  },
  {
    ID: 'BGPT/002',
    date: '11/11/2022',
    licensePlate: '51C 3142',
    licensePlateMooc: '51C 1235',
    currentMooc: 'Mooc xương',
    changeMooc: 'Mooc sàn',
    expectedChange: '22:00 21/11/2022',
    driver: 'Trần Văn A',
    CMND: '00124574556',
    phone: '123456789',
    address: '1 Đồng Khởi, Phường Bến Nghé, Quận 1, TPHCM',
    GPLX: 'G1321',
    GPLXExpiredDate: '21/12/2025',
    note: '',
    statusName: 'Đã thu hồi',
    statusColor: 'green',
  },
  {
    ID: 'BGPT/003',
    date: '11/11/2022',
    licensePlate: '51C 3153',
    licensePlateMooc: '51C 1236',
    currentMooc: 'Mooc xương',
    changeMooc: 'Mooc sàn',
    expectedChange: '21:00 21/11/2022',
    driver: 'Trần Văn A',
    CMND: '00124574556',
    phone: '123456789',
    address: '43R Hồ Văn Huê, Phường 9, Quận Phú Nhuận, TPHCM',
    GPLX: 'G1321',
    GPLXExpiredDate: '21/12/2025',
    note: '',
    statusName: 'Chờ thu hồi',
    statusColor: 'gray',
  },
  {
    ID: 'BGPT/004',
    date: '11/11/2022',
    licensePlate: '51C 5421',
    licensePlateMooc: '51C 1237',
    currentMooc: 'Mooc xương',
    changeMooc: 'Mooc sàn',
    expectedChange: '21:00 21/11/2022',
    driver: 'Trần Văn A',
    CMND: '00124574556',
    phone: '123456789',
    address: '43R Hồ Văn Huê, Phường 9, Quận Phú Nhuận, TPHCM',
    GPLX: 'G1321',
    GPLXExpiredDate: '21/12/2025',
    note: '',
    statusName: 'Chờ thu hồi',
    statusColor: 'gray',
  }
]

const fieldsManagement = [
  { key: 'ID', label: 'Mã chứng từ' },
  { key: 'date', label: 'Ngày áp dụng' },
  { key: 'licensePlate', label: 'Biển số xe' },
  { key: 'licensePlateMooc', label: 'Biển số rờ moóc' },
  { key: 'currentMooc', label: 'Móc hiện tại' },
  { key: 'changeMooc', label: 'Móc thay đổi' },
  { key: 'expectedChange', label: 'Dự kiến bàn giao' },
  { key: 'driver', label: 'Tài xế' },
  { key: 'CMND', label: 'CMND' },
  { key: 'phone', label: 'Điện thoại' },
  { key: 'address', label: 'Địa chỉ' },
  { key: 'GPLX', label: 'GPLX' },
  { key: 'GPLXExpiredDate', label: 'Ngày hết hạn GPLX' },
  // { key: 'isFileAttach', label: 'Có file đính kèm' },
{ key: 'note', label: 'Ghi chú' },
  { key: 'statusName', label: 'Trạng thái' },
]

const titleOptions = [
  {
    id: 0,
    label: 'Yêu cầu thay đổi rơ moóc'
  },
]

const licensePlateMoocOptions = [
  { value: '51C 1234', text: '51C 1234' },
  { value: '51C 1235', text: '51C 1235' },
  { value: '51C 1236', text: '51C 1236' },
  { value: '51C 1237', text: '51C 1237' },
]

const moocInfo = [
  { licensePlateMooc: '51C 1234', licensePlateMoocType: 'Moóc xương' },
  { licensePlateMooc: '51C 1235', licensePlateMoocType: 'Moóc sàn' },
  { licensePlateMooc: '51C 1236', licensePlateMoocType: 'Moóc xương' },
  { licensePlateMooc: '51C 1237', licensePlateMoocType: 'Moóc sàn' },
]

const moocOptions = [
  { value: 'Moóc xương', text: 'Moóc xương' },
  { value: 'Moóc sàn', text: 'Moóc sàn' },
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
    type: 'HW1000',
    licensePlateMooc: '51C 1234',
    licensePlateMoocType: 'Moóc xương',
    driver: 'Trần Văn A',
    CMND: '00124574556',
    phone: '123456789',
    address: '43R Hồ Văn Huê, Phường 9, Quận Phú Nhuận, TPHCM',
    GPLX: 'G1321',
    GPLXExpiredDate: '21/12/2025',
  },
  {
    licensePlate: '51C 3142',
    type: 'HW2000',
    licensePlateMooc: '51C 1235',
    licensePlateMoocType: 'Moóc sàn' ,
    driver: 'Nguyễn Văn A',
    CMND: '99912287412',
    phone: '647521976448',
    address: '1 Đồng Khởi, Phường Bến Nghé, Quận 1, TPHCM',
    GPLX: 'G9789',
    GPLXExpiredDate: '01/01/2024',
  },
  {
    licensePlate: '51C 3153',
    type: 'HW3000',
    licensePlateMooc: '51C 1236',
    licensePlateMoocType: 'Moóc xương',
    driver: 'Trần Văn A',
    CMND: '00124574556',
    phone: '123456789',
    address: '43R Hồ Văn Huê, Phường 9, Quận Phú Nhuận, TPHCM',
    GPLX: 'G1321',
    GPLXExpiredDate: '21/12/2025',
  },
  {
    licensePlate: '51C 5421',
    type: 'HW4000',
    licensePlateMooc: '51C 1237',
    licensePlateMoocType: 'Moóc sàn',
    driver: 'Nguyễn Văn A',
    CMND: '99912287412',
    phone: '647521976448',
    address: '1 Đồng Khởi, Phường Bến Nghé, Quận 1, TPHCM',
    GPLX: 'G9789',
    GPLXExpiredDate: '01/01/2024',
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
  licensePlatesInfo,
  moocOptions,
  moocInfo,
  licensePlateMoocOptions
}