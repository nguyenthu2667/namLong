const data = [
  {
    ID: "ĐXHMTD/22/09/001",
    applicationStartDate: "01/10/2022",
    creditLimit: "1,000,000,000",
    debtLimit: "500,000,000",
    tolerance: "10%",
    limitToExceedTheLimit: "Có",
    status: "Chưa duyệt",
    note: "...",
  },
  {
    ID: "ĐXHMTD/22/09/002",
    applicationStartDate: "10/09/2022",
    creditLimit: "2,000,000,000",
    debtLimit: "500,000,000",
    tolerance: "10%",
    limitToExceedTheLimit: "Có",
    status: "Đã duyệt",
    note: "...",
  },
  {
    ID: "ĐXHMTD/22/09/003",
    applicationStartDate: "15/09/2022",
    creditLimit: "3,000,000,000",
    debtLimit: "500,000,000",
    tolerance: "10%",
    limitToExceedTheLimit: "Có",
    status: "Đã duyệt",
    note: "...",
  },
]

const dataSigningAndApprovalProcess = [
  {
    dateTime: "05/09/2022 15:00",
    performer: "Bành Thị Thúy Hằng",
    action: "Trình ký đề xuất",
    content: "Đề xuất hạn mức tín dụng 10/2022",
  },
  {
    dateTime: "06/09/2022 15:00",
    performer: "Cát Diệp Hải Lan",
    action: "Kế toán xác nhận",
    content: "...",
  },
  {
    dateTime: "07/09/2022 15:00",
    performer: "Kim Ngọc Nghiên",
    action: "BGĐ phê duyệt",
    content: "OK",
  }
]

const fields = [
  { key: 'ID', label: 'Mã nghiệp vụ' },
  { key: 'applicationStartDate', label: 'Ngày bắt đầu áp dụng' },
  { key: 'creditLimit', label: 'Hạn mức tín dụng' },
  { key: 'debtLimit', label: 'Hạn mức nợ' },
  { key: 'tolerance', label: 'Dung sai(+)' },
  { key: 'limitToExceedTheLimit', label: 'Có chặn vượt hạn mức?' },
  { key: 'status', label: 'Trạng thái' },
  { key: 'note', label: 'Ghi chú' },
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
  data,
  dataSigningAndApprovalProcess,
  fields,
  fieldsSigningAndApprovalProcess,
}