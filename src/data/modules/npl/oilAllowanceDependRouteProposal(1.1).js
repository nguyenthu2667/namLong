const dataManagement = [
  { ID: 'PCVV/22/09/0001', date: '09/09/2022', note: '...' },
  { ID: 'PCVV/11/08/0001', date: '10/09/2022', note: '...' },
  { ID: 'PCVV/12/09/0001', date: '15/09/2022', note: '...' },
]

const dataDetailRouteAndAllowance = [
  {
    ID: 'Long An-Sài Gòn',
    oldAllowance: '3',
    newAllowance: '5',
    note: '...',
  },
  {
    ID: 'Sài Gòn-Bình Dương',
    oldAllowance: '3',
    newAllowance: '5',
    note: '...',
  },
  {
    ID: 'Sài Gòn-Sóng Thần',
    oldAllowance: '2',
    newAllowance: '5',
    note: '...',
  }

]
const fieldsManagement = [
  // { key: 'ID', label: 'Mã nghiệp vụ' },
  { key: 'ID', label: 'Chứng từ', type: 'key' },
  { key: 'date', label: 'Ngày bắt đầu áp dụng', type: 'date'},
  { key: 'note', label: 'Ghi chú', type: 'note' },
]

const fieldsDetailRouteAndAllowance = [
  { key: 'ID', label: 'Mã tuyến/Tên Tuyến' },
  { key: 'oldAllowance', label: 'Mức phụ cấp cũ' },
  { key: 'newAllowance', label: 'Mức phụ cấp mới' },
  { key: 'note', label: 'Ghi chú' },

]

export default {
  dataManagement,
  dataDetailRouteAndAllowance,
  fieldsManagement,
  fieldsDetailRouteAndAllowance,
}

