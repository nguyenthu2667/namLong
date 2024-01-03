/** Load region default **/
export const listRegion = {
  HoChiMinh: {
    id: 1,
    zip: null,
    lat: 10.7941878,
    lng: 106.6724396,
    url: "ho-chi-minh",
    name: "Hồ Chí Minh",
  },
  CanTho: {
    id: 2,
    zip: null,
    lat: 10.0272537,
    lng: 105.7698039,
    url: "can-tho",
    name: "Cần Thơ",
  },
  LongAn: {
    id: 3,
    zip: null,
    lat: 10.7645085,
    lng: 106.1512756,
    url: "long-an",
    name: "Long An",
    BBOX: "105.466844085,10.263642848,106.784837053,11.163368640",
  },
  HauGiang: {
    id: 4,
    zip: null,
    lat: 9.7909411,
    lng: 105.6335449,
    url: "hau-giang",
    name: "Hậu Giang",
  },
  PhuYen: {
    id: 5,
    zip: null,
    lat: 13.2013,
    lng: 109.1696,
    url: "phu-yen",
    name: "Phú Yên",
  },
  PhuTho: {
    id: 6,
    zip: null,
    lat: 21.3188,
    lng: 105.135,
    url: "phu-tho",
    name: "Phú Thọ",
  },
  ThanhHoa: {
    id: 7,
    zip: null,
    lat: 19.8136326,
    lng: 105.7653916,
    url: "thanh-hoa",
    name: "Thanh Hóa",
  },
  QuangNinh: {
    id: 8,
    zip: null,
    lat: 21.0800153,
    lng: 107.3007202,
    url: "quang-ninh",
    name: "Quảng Ninh",
  },
  NinhBinh: {
    id: 9,
    zip: null,
    lat: 20.1813,
    lng: 105.9686,
    url: "ninh-binh",
    name: "Ninh Bình",
  },
  DakNong: {
    id: 10,
    zip: null,
    lat: 12.1313061,
    lng: 107.7326202,
    url: "dak-nong",
    name: "Đắk Nông",
  },
  HaNoi: {
    id: 11,
    zip: null,
    lat: 20.9755,
    lng: 105.6528,
    url: "dak-nong",
    name: "Đắk Nông",
  },
  NinhThuan: {
    id: 12,
    zip: null,
    lat: 11.4647,
    lng: 109.0445,
    url: "ninh-thuan",
    name: "Ninh Thuận",
  },
  Sapporo: {
    id: 13,
    zip: null,
    lat: 42.9857,
    lng: 141.248,
    url: "sapporo",
    name: "Sapporo",
  },
  Vinh: {
    id: 14,
    zip: null,
    lat: 18.787203,
    lng: 105.605202,
    url: "vinh",
    name: "Vinh",
  },
  CaMau: {
    id: 15,
    zip: null,
    lat: 9.176205,
    lng: 105.150862,
    url: "ca-mau",
    name: "Cà Mau",
  },
  DaNang: {
    id: 16,
    zip: null,
    lat: 16.0720934,
    lng: 107.9380421,
    url: "da-nang",
    name: "Đà Nẵng",
  },
  PhanRang: {
    id: 16,
    zip: null,
    lat: 11.56432,
    lng: 108.98858,
    url: "phan-rang",
    name: "Phan Rang",
  },
};

/** Sử dụng cho bản đồ - Zoom In / Zoom Out sẽ hiển thị các layer theo mức thu phóng **/
export const showList = [
  "hospital",
  "pharmacy",
  "school",
  "university",
  "hotel",
  "bank",
  "restaurant",
  "cafe",
  "buddhist",
  "hindu",
  "christian",
  "christian_catholic",
  "muslim",
];

export const showListNonLabel = ["bus_station", "bus_stop", "atm"];

export const showZoom = {
  14: {
    data: ["university", "hospital"], // lớp dữ liệu
    number: 1000, // giới hạn các điểm được phép hiển thị trong khung nhìn
    distance: 500, // khoảng cách tối thiểu giữa các điểm
  },
  15: {
    data: ["university", "hospital", "restaurant", "bank"],
    number: 2000,
    distance: 350,
  },
  16: {
    data: [
      "hospital",
      "pharmacy",
      "school",
      "university",
      "hotel",
      "bank",
      "restaurant",
      "buddhist",
      "hindu",
    ],
    number: 3000,
    distance: 200,
  },
  17: {
    data: [
      "hospital",
      "pharmacy",
      "school",
      "university",
      "hotel",
      "bank",
      "restaurant",
      "buddhist",
      "hindu",
      "christian",
      "christian_catholic",
      "muslim",
      "bus_station",
      "bus_stop",
    ],
    number: 4000,
    distance: 100,
  },
  18: {
    data: [], // lấy all lớp dữ liệu
    number: 5000,
    distance: 50,
  },
};

/** Sử dụng để làm form add, edit động theo database **/
export const typeInputForm = [
  {
    key: "String",
    class: "text-left",
    default: "",
  },
  {
    key: "MutedString",
    class: "text-muted text-left",
    default: "",
  },
  {
    key: "MutedStringCenter",
    class: "text-muted text-center",
    default: "",
  },
  {
    key: "String-Tree",
    class: "",
    default: "",
  },
  {
    key: "Number",
    class: "",
    default: "",
  },
  {
    key: "MutedNumber",
    class: "",
    default: "",
  },
  {
    key: "MutedNumberCenter",
    class: "",
    default: "",
  },
  {
    key: "Select",
    class: "",
    default: "",
  },
  {
    key: "Select-Tree",
    class: "",
    default: "",
  },
  {
    key: "Email",
    class: "",
    default: "",
  },
  {
    key: "Phone",
    class: "",
    default: "",
  },
  {
    key: "Date",
    class: "",
    default: "",
  },
  {
    key: "Time",
    class: "",
    default: "",
  },
  {
    key: "DateTime",
    class: "",
    default: "",
  },
  {
    key: "Image",
    class: "",
    default: "",
  },
  {
    key: "Avatar",
    class: "",
    default: "",
  },
  {
    key: "Password",
    class: "",
    default: "",
  },
  {
    key: "Bit",
    class: "",
    default: "",
  },
  {
    key: "Check",
    class: "",
    default: "",
  },
  {
    key: "CheckDouble",
    class: "",
    default: "",
  },
  {
    key: "Key",
    class: "",
    default: "",
  },
  {
    key: "Alert",
    class: "",
    default: "",
  },
  {
    key: "Process",
    class: "",
    default: "",
  },
];

/** Sử dụng để làm field table động theo database **/
export const typeRowTable = [];
