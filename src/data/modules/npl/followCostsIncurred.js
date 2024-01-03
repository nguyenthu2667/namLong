const data = [
  {
    ID: "ĐXGVC/22/09/001",
    costsIncurred: "Phí nâng hạ cont",
    amountIncurred: "1,000,000",
    attach: "filemau.pdf",
    status: "Đã duyệt",
    refuseReason: "",
    approvalTime: "	14:30 05/09/2022",
    approver: "Nguyễn Văn A",
    note: "",
  },
  {
    ID: "ĐXGVC/22/09/002",
    costsIncurred: "Phí bốc xếp",
    amountIncurred: "800,000",
    attach: "...",
    status: "	Đã từ chối",
    refuseReason: "Phí bốc xếp quá cao",
    approvalTime: "16: 18 04/09/2022",
    approver: "Nguyễn Văn B",
    note: "...",
  },
  {
    ID: "ĐXGVC/22/09/003",
    costsIncurred: "Phí công an",
    amountIncurred: "1,500,000",
    attach: "filemau.png",
    status: "Chờ duyệt",
    refuseReason: "...",
    approvalTime: "	09:45 04/09/2022",
    approver: "Nguyễn Văn A",
    note: "...",
  }
]

const fields = [
  {key: 'ID', label: 'Mã nghiệp vụ'},
  {key: 'costsIncurred', label: 'Chi phí phát sinh'},
  {key: 'amountIncurred', label: 'Số tiền phát sinh'},
  {key: 'attach', label: 'File đính kèm'},
  {key: 'status', label: 'Trạng thái'},
  {key: 'refuseReason', label: 'Lý do từ chối'},
  {key: 'approvalTime', label: 'Thời gian xét duyệt'},
  {key: 'approver', label: 'Người xét duyệt'},
  {key: 'note', label: 'Ghi chú'},
]

export default {
  data,
  fields,
}