const data = [
  {
    ID: "ĐXGVC/22/09/001",
    applicationStartDate: "01/10/2022",
    route: "LA-SG",
    customer: "Công ty Nhâm Thận",
    type: "Hàng rời",
    nameProduct: "Ure",
    specialRequest: "Phủ bạt",
    shippingCost: "5,000,000",
    status: "Chưa duyệt",
    note: "...",
  },
  {
    ID: "ĐXGVC/22/09/002",
    applicationStartDate: "10/09/2022",
    route: "BD-TT",
    customer: "Công ty ABC",
    type: "Hàng rời",
    nameProduct: "Giấy",
    specialRequest: "Phủ bạt",
    shippingCost: "3,000,000",
    status: "Đã duyệt",
    note: "...",
  }
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
  { key: 'ID', label: "Mã nghiệp vụ" },
  { key: 'applicationStartDate', label: "Ngày bắt đầu áp dụng" },
  { key: 'route', label: "Tuyến đường" },
  { key: 'customer', label: "Khách hàng" },
  { key: 'type', label: "Loại hàng" },
  { key: 'nameProduct', label: "Mặt hàng" },
  { key: 'specialRequest', label: "Yêu cầu đặc biệt" },
  { key: 'shippingCost', label: "Giá vận chuyển" },
  { key: 'status', label: "Trạng thái" },
  { key: 'note', label: "Ghi chú" },
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