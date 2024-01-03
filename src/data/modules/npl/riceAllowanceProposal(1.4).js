// Thông tin quản lý
const dataManagement = [
  {
    ID: 'ĐXPCC/001',
    date: '11/11/2022',
    stockDateAllowance: '120.000',
    nonStockDateAllowance: '280.000',
    returnStockDateAllowance: '120.000',
    isFileAttach: "Có",
    note: '',
    statusName: 'Đã khóa',
    statusColor: 'green',
  },
  {
    ID: 'ĐXPCC/002',
    date: '12/11/2022',
    stockDateAllowance: '130.000',
    nonStockDateAllowance: '280.000',
    returnStockDateAllowance: '130.000',
    isFileAttach: "Không",
    note: '',
    statusName: 'Chưa khóa',
    statusColor: 'gray',
  },
]
const fieldsManagement = [
  { key: 'ID', label: 'Mã chứng từ' },
  { key: 'date', label: 'Ngày áp dụng' },
  { key: 'stockDateAllowance', label: 'PC ngày có hàng', tdClass: 'text-right' },
  { key: 'nonStockDateAllowance', label: 'PC ngày không hàng', tdClass: 'text-right' },
  { key: 'returnStockDateAllowance', label: 'PC ngày trả hàng', tdClass: 'text-right' },
  { key: 'isFileAttach', label: 'Có file đính kèm' },
{ key: 'note', label: 'Ghi chú' },
  { key: 'statusName', label: 'Trạng thái' },
]

// Thông tin phụ cấp cơm			
const dataRiceAllowance = [
  {
    availabilityDayAllowance: '100, 000',
    nonStockDayAllowance: '50, 000',
    paymentDayAllowance: '100, 000',
  },
  {
    availabilityDayAllowance: '150, 000',
    nonStockDayAllowance: '80, 000',
    paymentDayAllowance: '150, 000',
  },
  {
    availabilityDayAllowance: '120, 000',
    nonStockDayAllowance: '0',
    paymentDayAllowance: '120, 000',
  }
]
const fieldsRiceAllowance = [
  { key: 'availabilityDayAllowance', label: 'Phụ cấp ngày có hàng' },
  { key: 'nonStockDayAllowance', label: 'Phụ cấp ngày không hàng' },
  { key: 'paymentDayAllowance', label: 'Phụ cấp ngày trả hàng' },
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
  dataRiceAllowance,
  fieldsRiceAllowance,
  dataSigningAndApprovalProcess,
  fieldsSigningAndApprovalProcess,
}