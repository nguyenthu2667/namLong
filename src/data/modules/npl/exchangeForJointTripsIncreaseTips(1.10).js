// Thông tin quản lý
const dataManagement = [
  {
    ID: 'QĐCG/001',
    date: '01/10/2022',
    routeList: 'Sài Gòn - Cần Thơ (SG-CT), Cát Lái-Tân Tạo(CL-TT)',
    isFileAttach: "Có",
    note: '',
    statusName: 'Đã khóa',
    statusColor: 'green',
  },
  {
    ID: 'QĐCG/002',
    date: '10/09/2022',
    routeList: 'Sài Gòn - Bình Dương (SG-BD)',
    isFileAttach: "Không",
    note: '',
    statusName: 'Chưa khóa',
    statusColor: 'gray',
  },
]

const fieldsManagement = [
  { key: 'ID', label: 'Mã chứng từ' },
  { key: 'date', label: 'Ngày áp dụng' },
  { key: 'routeList', label: 'Tuyến trong danh sách' },
  { key: 'isFileAttach', label: 'Có file đính kèm' },
{ key: 'note', label: 'Ghi chú' },
  { key: 'statusName', label: 'Trạng thái' },
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

const routeOptions = [
  {value: 'Bình Dương - Bình Phước', text: 'Bình Dương - Bình Phước'},
  {value: 'Cát Lái - Tân Tạo', text: 'Cát Lái - Tân Tạo'},
]

export default {
  dataManagement,
  fieldsManagement,
  dataSigningAndApprovalProcess,
  fieldsSigningAndApprovalProcess,
  routeOptions,
}