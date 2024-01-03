import { UserRole } from "../utils/auth.roles";
import systemAPI from "../api/modules/systemAPI";
import { listRegion } from "@/data/latlngRegions";

//MENU===================================================

export const defaultMenuType = "menu-default"; // 'menu-default', 'menu-sub-hidden', 'menu-hidden';

//ROUTER=================================================

export const adminRoot = "/admin"; // base-router

//API-BASE================================================

export const BASE_API = "https://apidev.namlongtekgroup.com";

// IMG-BASE ==============================================

export const urlImage = "https://imgsmartcity.namlongtekgroup.com/";

//SIDE-BAR===============================================

export const subHiddenBreakpoint = 1440;
export const menuHiddenBreakpoint = 768;

//LANGUGE===============================================

export const defaultLocale = "vn";
export const defaultDirection = "ltr";
export const localeOptions = getLocale();

//FIREBASE==============================================

export const firebaseConfig = {
  apiKey: "AIzaSyBHi0LFaSe7TfMtCWhlLVFGNktd6JJ0QgI",
  authDomain: "nlt-smarts-2946d.firebaseapp.com",
  projectId: "nlt-smarts-2946d",
  storageBucket: "nlt-smarts-2946d.appspot.com",
  messagingSenderId: "409637778044",
  appId: "1:409637778044:web:60d1cc301250f34b5e4ff9",
  measurementId: "G-SF4NMMXYCN",
};

//MAP====================================================
/** 2D, 3D, GG **/
export const defaultMapType = "GG";
/** HoChiMinh, HaNoi,... binding modifine to latlngRegions.js **/
export const defaultRegionCode = "PhanRang";
export const defaultRegionCenter = [
  listRegion[defaultRegionCode].lat,
  listRegion[defaultRegionCode].lng,
];

//OTHER==================================================

export const timer = 500;

//AUTH===================================================

export const isAuthGuardActive = true; //tắt,mở Auth

//THEME==================================================

export const themeRadiusStorageKey = "theme_radius";
export const themeSelectedColorStorageKey = "theme_selected_color";
export const defaultColor = "light.blueyale";
export const colors = [
  "bluenavy",
  "blueyale",
  "blueolympic",
  "greenmoss",
  "greenlime",
  "purplemonster",
  "orangecarrot",
  "redruby",
  "yellowgranola",
  "greysteel",
];

//FUNCTIONS=============================================

function getLocale() {
  let array = [];
  systemAPI
    .getLanguages()
    .then((val) => {
      let result = val.status ? val.data : [];
      if (result.length > 0) {
        result.forEach((item) => {
          let obj = {
            id: item.Code,
            name: item.LanguageName,
            direction: "ltr",
            icon: item.Icon,
          };
          array.push(obj);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  return array;
}

export const lightcolors = [
  "lightsalmon",
  "red",
  "orange",
  "yellow",
  "pink",
  "lightskyblue",
  "lightslategray",
  "lightgreen",
  "lightblue",
  "lightorange",
  "lightyellow",
  "lightpink",
  "khaki",
  "#FFD700",
  "#FFDAB9",
  "#90EE90",
  "#66CDAA",
  "#00FFFF",
  "#00BFFF",
  "#F4A460",
  "#D3D3D3",
  "#EE82EE",
  "#8e44ad",
  "#d35400",
];
