export const data = [
  {
    ID: "24102011",
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
    ID: "24102012",
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
    ID: "24102013",
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

export const fields = [
  {key: 'ID', label: 'Mã nghiệp vụ',col:6,type:"key"},
  {key: 'costsIncurred', label: 'Chi phí phát sinh',col:6},
  {key: 'amountIncurred', label: 'Số tiền phát sinh',col:6},
  {key: 'attach', label: 'File đính kèm',col:6},
  {key: 'status', label: 'Trạng thái',col:6},
  {key: 'refuseReason', label: 'Lý do từ chối',col:6},
  {key: 'approvalTime', label: 'Thời gian xét duyệt',col:6},
  {key: 'approver', label: 'Người xét duyệt',col:6},
  {key: 'note', label: 'Ghi chú',col:6},
]

export default { data, fields }