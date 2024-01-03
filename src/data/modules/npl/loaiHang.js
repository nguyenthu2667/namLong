const data = [
    {
        id: 'LH01',
        name: 'Hàng rời',
        statusName: 'Đang sử dụng',
        statusColor: 'Green',
        note: '...'
    },
    {
        id: 'LH02',
        name: 'Hàng cont',
        statusName: 'Không sử dụng',
        statusColor: 'Red',
        note: '...'
    }
]

const option = [
    "Cảo",
    "Xích",
    "Phủ"
]
const optionLoaiHang = [
    "Hàng rời",
    "Cont nhập",
    "Cont xuất"
]

const fields = [
    {
        key: 'id',
        label: "Mã",
        col: 4,
        type: "key"
    },
    {
        key: 'name',
        label: "Tên",
        col: 4,
    },
    {
        key: 'statusName',
        label: "Trạng thái",
        col: 4,
    },
    {
        key: 'note',
        label: "Ghi chú",
        col: 4,
    },
]

export default { data, fields, option, optionLoaiHang }