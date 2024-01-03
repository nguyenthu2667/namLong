// Thông tin quản lý
const dataManagement = [
  {
    ID: 'ĐXPCLX/001',
    date: '01/10/2022',
    amount: '100.000',
    isFileAttach: "Có",
    note: '',
    statusName: 'Đã khóa',
    statusColor: 'green',
  },
  {
    ID: 'ĐXPCLX/002',
    date: '01/10/2022',
    amount: '200.000',
    isFileAttach: "Không",
    note: '',
    statusName: 'Chưa khóa',
    statusColor: 'gray',
  },
]
const fieldsManagement = [
  { key: 'ID', label: 'Mã nghiệp vụ' },
  { key: 'date', label: 'Ngày áp dụng' },
  { key: 'amount', label: 'Số tiền phụ cấp/chuyến', tdClass: 'text-right'},
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

export default {
  dataManagement,
  fieldsManagement,
  dataSigningAndApprovalProcess,
  fieldsSigningAndApprovalProcess,
}