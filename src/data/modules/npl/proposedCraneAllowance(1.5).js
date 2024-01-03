// Thông tin quản lý
const dataManagement = [
  {
    ID: 'ĐXPCC/001',
    date: '11/11/2022',
    noCraneAllowance: '100.000',
    craneMoreThan10Times: '200.000',
    isFileAttach: "Có",
    note: '',
    statusName: 'Đã khóa',
    statusColor: 'green',
  },
  {
    ID: 'ĐXPCC/002',
    date: '12/11/2022',
    noCraneAllowance: '150.000',
    craneMoreThan10Times: '250.000',
    isFileAttach: "Không",
    note: '',
    statusName: 'Chưa khóa',
    statusColor: 'gray',
  },
]
const fieldsManagement = [
  { key: 'ID', label: 'Mã nghiệp vụ' },
  { key: 'date', label: 'Ngày áp dụng' },
  { key: 'noCraneAllowance', label: 'PC khi chở hàng không cẩu', tdClass: 'text-right' },
  { key: 'craneMoreThan10Times', label: 'Số tiền cẩu trên 10 lần', tdClass: 'text-right' },
  { key: 'isFileAttach', label: 'Có file đính kèm' },
{ key: 'note', label: 'Ghi chú' },
  { key: 'statusName', label: 'Trạng thái' },
]

// Chi tiết phụ cấp cẩu
const dataDetailCrane = [
  {time: '1', amount: '280.000'},
  {time: '2', amount: '280.000'},
  {time: '3', amount: '160.000'},
  {time: '4', amount: '160.000'},
  {time: '5', amount: '160.000'},
  {time: '6', amount: '160.000'},
  {time: '7', amount: '120.000'},
  {time: '8', amount: '120.000'},
  {time: '9', amount: '120.000'},
  {time: '10', amount: '120.000'},
]
const fieldsDetailCrane = [
  {key: 'time', label: 'Số lần cẩu'},
  {key: 'amount', label: 'Số tiền', tdClass: 'text-right'},
  {key: 'isNewRow', label: '', thClass: 'd-none', tdClass: 'd-none'},
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
  dataDetailCrane,
  fieldsDetailCrane,
  dataSigningAndApprovalProcess,
  fieldsSigningAndApprovalProcess,
}