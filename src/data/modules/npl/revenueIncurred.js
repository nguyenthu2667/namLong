const data = [
  {
    ID: "DTPS01",
    fees: "Phí nâng hạ cont",
    proceeds: "1,000,000",
    attach: "filemaupdf",
    note: "...",
    status: "Đã duyệt",
    refuseReason: "...",
    approvalTime: "	14:30 05/09/2022",
    approver: "Nguyễn Văn A",
  },
  {
    ID: "DTPS02",
    fees: "Phí lưu bãi",
    proceeds: "1,200,000",
    attach: "hoadonluubai.pdf",
    note: "...",
    status: "Đã duyệt",
    refuseReason: "...",
    approvalTime: "	16: 18 04/09/2022",
    approver: "Nguyễn Văn B",
  },
  {
    ID: "DTPS03",
    fees: "Phí bốc xếp",
    proceeds: "800,000",
    attach: "...",
    note: "	...",
    status: "Đã từ chối",
    refuseReason: "Không thu phí bốc xếp của khách",
    approvalTime: "09:45 04/09/2022",
    approver: "Nguyễn Văn A",
  }
]

const fields = [
  {key: 'ID', label: 'Mã nghiệp vụ'},
  {key: 'fees', label: 'Chi phí thu'},
  {key: 'proceeds', label: 'Số tiền thu'},
  {key: 'attach', label: 'File đính kèm'},
  {key: 'note', label: 'Ghi chú'},
  {key: 'status', label: 'Trạng thái'},
  {key: 'refuseReason', label: 'Lý do từ chối'},
  {key: 'approvalTime', label: 'Thời gian xét duyệt'},
  {key: 'approver', label: 'Người xét duyệt'},
]

export default {
  data,
  fields,
}