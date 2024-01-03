const data = [
    {
        ID: 'PCCXBN/22/09/0001',
        creatDate: '01/10/2022',
        oilAllowanceOutside: '500.000',
        overtimeAllowanceOutside: '400.000',
        isFileAttach: "Có",
        statusName: 'Đã khóa',
        statusNameColor: 'Green',
        note: '',
        pcXangXe: {
            fields: [
                {
                    key: 'name',
                    label: 'Khu vực',
                    type: 'select'
                },
                {
                    key: 'money',
                    label: 'Số tiền phụ cấp'
                },
                {
                    key: 'actions',
                    label: 'Thao tác'
                },
            ],
            data: [
                {
                    name: 'Long An',
                    money: '200,000'
                },
                {
                    name: 'TP.HCM',
                    money: '100,000'
                }
            ]
        },
        pcNgoaiGioLamViec: {
            fields: [
                {
                    key: 'name',
                    label: 'Khu vực',
                    type: 'select'
                },
                {
                    key: 'money',
                    label: 'Số tiền phụ cấp'
                },
                {
                    key: 'actions',
                    label: 'Thao tác'
                },
            ],
            data: [
                {
                    name: 'Long An',
                    money: '500,000'
                },
                {
                    name: 'TP.HCM',
                    money: '300,000'
                }
            ]
        }
    },
    {
        ID: 'PCCXBN/22/09/0002',
        creatDate: '11/11/2022',
        oilAllowanceOutside: '300.000',
        overtimeAllowanceOutside: '200.000',
        isFileAttach: "Không",
        statusName: 'Chưa khóa',
        statusNameColor: 'gray',
        note: '',
        pcXangXe: {
            fields: [
                {
                    key: 'name',
                    label: 'Khu vực',
                    type: 'select'
                },
                {
                    key: 'money',
                    label: 'Số tiền phụ cấp'
                },
                {
                    key: 'actions',
                    label: 'Thao tác'
                },
            ],
            data: [
                {
                    name: 'Long An',
                    money: '200,000',
                },
                {
                    name: 'TP.HCM',
                    money: '100,000',
                },

            ]
        },
        pcNgoaiGioLamViec: {
            fields: [
                {
                    key: 'name',
                    label: 'Khu vực',
                    type: 'select'
                },
                {
                    key: 'money',
                    label: 'Số tiền phụ cấp'
                },
                {
                    key: 'actions',
                    label: 'Thao tác'
                },
            ],
            data: [
                {
                    name: 'Long An',
                    money: '500,000'
                },
                {
                    name: 'TP.HCM',
                    money: '300,000'
                }
            ]
        }
    }
]

const optionKhuVuc = ['Long An', "Đà Nẵng", "Phú Nhuận", "Cát Lái", 'Sài Gòn', 'Vũng Tàu', "Tây Ninh", 'Quận 1', "Quận 2", "Quận 3"]

const fields = [
    {
        key: 'ID',
        label: "Mã nghiệp vụ",
        col: 4,
        type: "key"
    },
    {
        key: 'creatDate',
        label: "Ngày áp dụng",
        col: 4,
    },
    {
        key: 'oilAllowanceOutside',
        label: 'PC xăng ngoài các khu vực đã chọn',
        tdClass: 'text-right'
    },
    {
        key: 'overtimeAllowanceOutside',
        label: 'PC ngoài giờ ngoài các khu vực đã chọn',
        tdClass: 'text-right'
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
        key: 'creatDate',
        label: "Ngày áp dụng",
        col: 4,
        type: 'date'
    },
    {
        key: 'statusName',
        label: "Trạng thái",
        col: 4,
        type: 'status'
    },
    {
        key: 'note',
        label: "Ghi chú",
        col: 12,
        type: 'note'
    },
    {
        key: 'pcXangXe',
        label: "Phụ cấp xăng xe",
        col: 6,
        type: 'table'
    },
    {
        key: 'pcNgoaiGioLamViec',
        label: "Phụ cấp ngoài giờ làm việc",
        col: 6,
        type: 'table'
    },
]

const regionOptions = [
    {value: 'TPHCM', text: 'TPHCM'},
    {value: 'Long An', text: 'Long An'},
    {value: 'Bình Phước', text: 'Bình Phước'},
    {value: 'Bình Dương', text: 'Bình Dương'},
]

export default { data, fields, fieldsForm, optionKhuVuc, regionOptions }