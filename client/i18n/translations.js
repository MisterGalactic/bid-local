import { GET_CATEGORIES } from "../queries/home";

// import LocalizedStrings from 'react-native-localization';
export const DEFAULT_LANGUAGE = 'en';

const translations = {
  en: {
    WELCOME: 'Welcome to React',
    STEP1: 'Step One',
    SEE_CHANGES: 'See Your Changes',
    CHANGE_LANGUAGE: 'Change Language',
    LANGUAGE_SETTINGS: 'Change Language',
    BACK: 'Back'
  },
  de: {
    WELCOME: 'Willkommen bei React',
    STEP1: '1. Schritt',
    SEE_CHANGES: 'Änderungen ansehen',
    CHANGE_LANGUAGE: 'Sprache wechseln',
    LANGUAGE_SETTINGS: 'Sprache wechseln',
    BACK: 'Zurück'
  }
};

const en = {
  chinese: 'Chinese',
  english: 'English',

  welcome: 'Internationalization and Localization in React Native',
  signoutBtn: 'Sign out',
  signOutAlertTitle: 'Cancel',
  signOutAlertMess: 'Are you sure you want to sign out?',
  confirm: 'Okay',
  resetBtn: 'Reset password',

  signIn: 'Sign In',
  email: 'Email',
  password: 'Password',
  login: 'Login',
  notSignUp: 'Not signed up? Register here',
  forgotPassword: 'Forgot password?',

  register: 'Register',
  backToLogin: 'Back to login',

  home: 'Home',
  myDetails: 'My Details',
  biddingHistory: 'Bidding History',
  wonItems: 'Won Items',
  userItems: 'User Items',
  buyCredits: 'Buy Credits',
  addItems: 'Add Item',
  addBlog: 'Add Blog',
  changeLanguage: 'Change Language',
  logout: 'Logout',

  shop: 'Shop',
  discover: 'Discover',
  cart: 'Cart',
  account: 'Account',

  all: 'All',
  featured: 'Featured',
  coins: 'Coins',
  art: 'Art',
  brands: 'Brands',
  realEstate: 'Real Estate',
  watch: 'Watches',
  cars: 'Cars',
  unsorted: 'Unsorted',

  viewAll: 'View All',

  yourCredit: 'Your Credit',
  timeLeft: 'Time Left',
  startsIn: 'Starts In',
  makeOffer: 'MAKE OFFER',
  itemDescription: 'Item Description',
  sellerInfo: 'Seller Info',
  name: 'name',
  tel: 'Tel',

  firstName: 'First Name',
  lastName: 'Last Name',
  phoneNumber: 'Phone Number',
  address1: 'Address',
  address2: 'Second Address',
  city: 'City',
  postcode: 'Postcode',
  country: 'Country',

  savePress: 'Press to Save Changes',
  editPress: 'Press to Edit Details',

  additional: 'Add new item',

  auctionWinner: 'You are the auction winner.',
  highestBidder: 'You are the current highest bidder.',
  auctionEnded: 'Auction has ended.',
  noWinners: 'Auction has ended with no winners.',
  auctionScheduled: 'Auction is scheduled.',
  scheduled: 'Scheduled',
  outbid: 'You have been outbid.',
  noBidsYet: 'No bids have been placed yet.',
  ended: 'Ended',

  title: 'Title',
  startingPrice: 'Starting Price',
  duration: 'Duration (Minutes)',
  pubDate: 'Publish Date & Time',
  startDate: 'Start Date & Time',
  endDate: 'End Date & Time',
  description: 'Description',
  categories: 'Categories',
  selectCat: 'Select Categories',
  images: 'Images',
  addItem: 'Add Item',
  uploadingImage: 'Uploading Image',
  submit: 'submit',

  day: 'day',
  days: 'days',

  hr: 'hr',
  hrs: 'hrs',

  min: 'min',
  mins: 'mins',

  sec: 'sec',
  secs: 'secs',

};

const zh = {
  chinese: '中文',
  english: '英語',

  welcome: 'React Native 中的国际化和本地化',
  signoutBtn: '登出',
  signOutAlertTitle: '取消',
  signOutAlertMess: '您确定要退出吗？',
  confirm: '好的',
  resetBtn: '重设密码',

  signIn: '登入',
  email: '電郵',
  password: '密碼',
  login: '登入',
  notSignUp: '未有註冊？ 按這裡註冊',
  forgotPassword: '忘記密碼？',

  register: '註冊',
  backToLogin: '返回登入',

  home: '主頁',
  myDetails: '個人資料',
  biddingHistory: '出價記錄',
  wonItems: '贏了的拍賣',
  userItems: '我的物品',
  buyCredits: '購買積分',
  addItems: '添加項目',
  addBlog: '添加文章',
  changeLanguage: '更改語言',
  logout: '登出',

  shop: '購買',
  discover: '推薦',
  cart: '購物車',
  account: '帳戶',

  all: '全部',
  featured: '精選',
  coins: '硬幣',
  art: '藝術',
  brands: '品牌',
  realEstate: '物業',
  watch: '手錶',
  cars: '汽車',
  unsorted: '未分類',

  viewAll: '查看全部',

  yourCredit: '積分',
  timeLeft: '剩餘時間',
  startsIn: '等待開始',
  makeOffer: '出價',
  itemDescription: '商品描述',
  sellerInfo: '賣家資料',
  name: '姓名',
  tel: '電話號碼',

  firstName: '名字',
  lastName: '姓氏',
  phoneNumber: '電話號碼',
  address1: '地址第 1 行 (室號/樓層/大廈名稱或座號/屋苑名稱/地段)',
  address2: '地址第 2 行 (門牌/街道/分區)',
  city: '城鎮／市',
  postcode: '郵政編號',
  country: '國家',

  savePress: '按這裡保存更改',
  editPress: '按這裡修改資料',

  additional: '添加新項目',

  auctionWinner: '你是拍賣的贏家。',
  highestBidder: '你現在是最高的出價者。',
  auctionEnded: '拍賣已經結束。',
  noWinners: '拍賣已經結束，沒有贏家。',
  auctionScheduled: '拍賣即將開始。',
  scheduled: '未開始',
  outbid: '你的出價已經被超越。',
  noBidsYet: '未有人出價。',
  ended: '結束',

  title: '標題',
  startingPrice: '起始價格',
  duration: '時段(分鐘)',
  pubDate: '發布日期和時間',
  startDate: '開始日期和時間',
  endDate: '結束日期和時間',
  description: '描述',
  categories: '類別',
  selectCat: '選擇類別',
  images: '圖片',
  addItem: '添加項目',
  uploadingImage: '正在上傳圖片',
  submit: '提交',

  day: '日',
  days: '日',

  hr: '小時',
  hrs: '小時',

  min: '分鐘',
  mins: '分鐘',

  sec: '秒',
  secs: '秒',

};

export {en, zh, translations};