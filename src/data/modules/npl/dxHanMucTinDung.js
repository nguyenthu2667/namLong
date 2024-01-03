const data = [
    {
        ID: 'ĐXHMTD/22/09/0001',
        createDate: '01/10/2022',
        client: 'Nguyễn Văn A',
        hanMucTinDung: '20,000,000',
        thoiHanThanhToan: '10 ngày',
        dungSai: '10%',
        isPrevent: 'Có',
        SDT: '0961421396',
        Email: 'abc@gmail.com',
        DiaChi: '43RHồ Văn Huê, Phú Nhuận',
        isFileAttach: "Có",
        note: '...',
        statusName: 'Đã khóa',
        statusNameColor: 'Green',
    },
    {
        ID: 'ĐXHMTD/22/09/0002',
        createDate: '11/10/2022',
        client: 'Nguyễn Văn B',
        hanMucTinDung: '30,000,000',
        thoiHanThanhToan: '10 ngày',
        dungSai: '10%',
        isPrevent: 'Không',
        SDT: '0961421396',
        Email: 'abc@gmail.com',
        DiaChi: '43RHồ Văn Huê, Phú Nhuận',
        isFileAttach: "Không",
        note: '...',
        statusName: 'Chưa khóa',
        statusNameColor: 'gray',
    },
]

const optionKhuVuc = ['Long An', "Đà Nẵng", "Phú Nhuận", "Cát Lái", 'Sài Gòn', 'Vũng Tàu', "Tây Ninh", 'Quận 1', "Quận 2", "Quận 3"]
const optionClient = ['Nguyễn Văn A', "Nguyễn Văn B", "Trần Văn C", "Trần Văn D"]

const fields = [
    {
        key: 'ID',
        label: "Mã chứng từ",
        col: 4,
        type: "key"
    },
    {
        key: 'createDate',
        label: "Ngày áp dụng",
        col: 4,
    },
    {
        key: 'client',
        label: "Khách hàng",
        col: 4,
        type: 'select'
    },
    {
        key: 'SDT',
        label: "Số điện thoại",
        col: 4,
    },
    {
        key: 'Email',
        label: "Email",
        col: 4,
    },
    {
        key: 'DiaChi',
        label: "Địa chỉ",
        col: 4,
    },
    {
        key: 'hanMucTinDung',
        label: "Hạn mức tín dụng",
        tdClass: 'text-right',
        col: 4
    },
    {
        key: 'thoiHanThanhToan',
        label: 'Thời hạn thanh toán',
        tdClass: 'text-right',
        col: 4
    },
    {
        key: 'dungSai',
        label: "Dung sai",
        tdClass: 'text-right',
        col: 4
    },
    {
        key: 'isPrevent',
        label: "Có chặn vượt hạn mức",
        col: 4
    },
    { key: 'isFileAttach', label: 'Có file đính kèm' },
    {
        key: 'note',
        label: "Ghi chú",
        col: 4,
    },
    {
        key: 'statusName',
        label: "Trạng thái",
        col: 4,
    },

]

const fieldsForm = [
    {
        key: 'ID',
        label: "Mã nghiệp vụ",
        col: 4,
        type: "key"
    },
    {
        key: 'createDate',
        label: "Ngày áp dụng",
        col: 4,
        type: 'date'
    },
    {
        key: 'client',
        label: "Khách hàng",
        col: 4,
        type: 'select'
    },
    {
        key: 'hanMucTinDung',
        label: "Hạn mức tín dụng",
        col: 3
    },
    {
        key: 'thoiHanThanhToan',
        col: 3
    },
    {
        key: 'dungSai',
        label: "Dung sai",
        col: 3
    },
    {
        key: 'statusName',
        label: "Trạng thái",
        col: 3,
        type: 'status'
    },
    {
        key: 'note',
        label: "Ghi chú",
        col: 12,
        type: 'note'
    },
]

export default { data, fields, fieldsForm, optionKhuVuc, optionClient }