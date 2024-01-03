// Thông tin quản lý
const dataManagement = [
  {
    ID: 'ĐXPCVV/001',
    date: '11/11/2022',
    // fromRoute: '1',
    // toRoute: '5',
    // amount: '100.000',
    isFileAttach: "Có",
    note: '',
    statusName: 'Đã khóa',
    statusColor: 'green',
  },
  {
    ID: 'ĐXPCVV/002',
    date: '12/11/2022',
    // fromRoute: '6',
    // toRoute: '8',
    // amount: '200.000',
    isFileAttach: "Không",
    note: '',
    statusName: 'Chưa khóa',
    statusColor: 'gray',
  }
]
const fieldsManagement = [
  { key: 'ID', label: 'Mã chứng từ' },
  { key: 'date', label: 'Ngày áp dụng' },
  // { key: 'fromRoute', label: 'Từ chuyến', tdClass: 'text-right' },
  // { key: 'toRoute', label: 'Đến chuyến', tdClass: 'text-right' },
  // { key: 'amount', label: 'Số tiền phụ cấp', tdClass: 'text-right' },
  { key: 'isFileAttach', label: 'Có file đính kèm' },
{ key: 'note', label: 'Ghi chú' },
  { key: 'statusName', label: 'Trạng thái' },
]

// Thông tin định mức phụ cấp vá vỏ		
const dataShellPatchAllowanceRate = [
  {
    fromRoute: '1',
    toRoute: '5',
    amount: '100.000'
  },
  {
    fromRoute: '6',
    toRoute: '8',
    amount: '150.000'
  },
  {
    fromRoute: '8',
    toRoute: '10',
    amount: '120.000'
  },
]
const fieldsShellPatchAllowanceRate = [
  { key: 'formRoute', label: 'Từ chuyến' },
  { key: 'toRoute', label: 'Đến chuyến' },
  { key: 'amount', label: 'Số tiền phụ cấp ' },
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
  dataShellPatchAllowanceRate,
  fieldsShellPatchAllowanceRate,
  dataSigningAndApprovalProcess,
  fieldsSigningAndApprovalProcess,
}