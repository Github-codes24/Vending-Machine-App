/**
 * Decalre all the constant keys and thier values here for using in throughout the app.
 */

import {Dimensions, Platform} from 'react-native';
import {Strings} from './Strings';
import {Images} from './Images';

export const LocalStorageKeys = {
  SHARED_PREFRENCE: 'Esskn_pref',
  KEYCHAIN_SERVICE: 'Esskn_service',
  ACCESS_TOKEN: 'access_token',
  DEVICE_TOKEN: 'device_token',
  USER_DATA: 'user_data',
  IS_INTRO_SHOW: 'is_intro_show',
  IS_KEYCHAIN_HAS_DATA: 'is_keychain_has_data',
  CUSTOMER_DATA: 'customerData',
  RECENT_SEARCH_DATA: 'recentSearchData',
};
export const ApiConstants = {
  APP_VERSION: '1.0.0',
  DEVICE_TYPE: Platform.OS,
  CERTIFICATE_TYPE: __DEV__ ? 'development' : 'distribution',
  GET: 'GET',
  POST: 'POST',
  PATCH: 'PATCH',
  POST_WITH_FORM: 'POST_WITH_FORM',
  PUT: 'PUT',
  DELETE: 'DELETE',
  SERVER_DATE_TIME_FORMAT: 'YYYY-MM-DD HH:mm:ss',
};
export const AppConstants = {
  FCM_TOKEN: '',
  USER_EMAIL: '',
  ADDRESS_DATA: '',
  CART_DATA: '',
  SHOW_DEFAULT_ADDRESS: '',
  ADDRESS_CALL_KEY: '',
  CUSTOMER_ID: '',
  CREDIT_POINTS: '',
  STRIPE_CUSTOMER_ID: '',
  STRIPE_SECRET_KEY: '',
  RESET_TOKEN: '',
  USER_ACCESS_TOKEN: '',
  GUEST_USER_ACCESS_TOKEN: '',
  APP_VERSION: '0.0.1',
  IS_LOG: true,
  NETWORK_CHECK: false,
  TOUCH_RADIUS: 20,
  TOUCH_OPACITY: 0.5,
  TOUCH_DURATION: 500,
  MALE: 'male',
  FEMALE: 'female',
  EMAIL_REGEX: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/,
  // MOBILE_REGEX: /^[0][1-9]\d{9}$|^[1-9]\d{5,15}$/,
  MOBILE_REGEX: /^\d{10}$/,
  NUMBER_OR_DECIMAL_REGEX: /^(\d*\.)?\d+$/,
  NUMBER_REGEX: /^\d+$/,
  CHARACTER_OR_NUMBER_REGEX: /^(?=.*[A-Z])(?=.*\d)[A-Z\d]{4,7}$/,
  NAME_REGEX: /([a-zA-Z]{1,30}\s*)+/,
  FULLNAME_REGEX: /^[a-zA-z]+([\s][a-zA-Z]+)*$/,
  PASSWORD_REGEX:
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
  PIN_CODE_REGEX: /^[1-9][0-9]{5}$/,
  ADDRESS_REGEX: /^[a-zA-Z0-9\s,.'-]{3,}$/,
  CARD_REGEX:
    /^(?:4[0-9]{12}(?:[0-9]{3})?|[25][1-7][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/,
  DATE_FORMAT_APP: 'DD MMM,YYYY',
  TIME_FORMAT_APP: 'HH:MM A',
  SUBJECT_MAX_LENGTH: 100,
  MESSAGE_MAX_LENGTH: 1000,
  KEYBOARD: {
    /** returnKeyType */
    NEXT: 'next',
    DONE: 'done',
    /** autoCapitalize */
    NONE: 'none',
    /** Keyboard type */
    EMAIL: 'email-address',
    PHONE: 'phone-pad',
    NUMBER: 'number-pad',
    DECIMAL: 'decimal-pad',
    NUMERIC: 'numeric',
    DEFAULT: 'default',
  },
  STATUS_BAR_HEIGHT: 0,
  QUANTITY: [],
  ADDRESS: null,
  isItemsAvailableInCart: 0,
  FILTERED_BRAND_DETAILS_DATA: [],
  CURRENCY_RATE: 0,
  notificationCount: 0,
  POSTCODE: '',
};
export const StoreConstantValues = {
  DEVICE_ID: '',
  USER_ACCESS_TOKEN: '',
  USER_INFO_DATA: '',
  USER_ID: '',
  AUTHORIZATION_DATA: '',
};

const {width, height} = Dimensions.get('window');

export const MetrixConstant = {
  SCREEN_WIDTH: Dimensions.get('window').width,
  SCREEN_HEIGHT: Dimensions.get('window').height,

  //Margin
  BASE_MARGIN: width / 30,
  DOUBLE_BASE_MARGIN: width / 15,
  SMALL_MARGIN: width / 60,

  //Padding
  BASE_PADDING: width / 30,
  DOUBLE_BASE_PADDING: width / 15,
  SMALL_PADDING: width / 60,

  baseCurvePadding: 27,
  orderBaseCurvePadding: 40,

  BUTTON_HEIGHT: 50, //Button height
  INPUT_HEIGHT: 50, // Input height
  buttonBorderRadius: 6,

  paddingTop:
    Platform.OS === 'ios' ? (width === 896 ? 44 : height === 812 ? 40 : 20) : 0,
  HEADER_HEIGHT:
    Platform.OS === 'ios'
      ? Dimensions.get('window').height === 896
        ? 88
        : 64
      : 56,
  paddingBottom: Platform.OS === 'ios' ? 0 : 25,
};

export const profileData = [
  {
    id: 1,
    title: Strings.myOrders,
    offer: 'check & Track you orders',
    img: Images.ic_order_placed,
    arrow:
      'https://www.freeiconspng.com/thumbs/white-arrow-png/white-arrow-transparent-png-22.png',
  },
  {
    id: 2,
    title: Strings.savedCards,
    offer: 'Manage your saved cards',
    img: Images.ic_save_card,
    arrow:
      'https://www.freeiconspng.com/thumbs/white-arrow-png/white-arrow-transparent-png-22.png',
  },
  {
    id: 3,
    title: Strings.savedAddress,
    offer: 'Manage your saved address',
    img: Images.ic_save_address,
    arrow:
      'https://www.freeiconspng.com/thumbs/white-arrow-png/white-arrow-transparent-png-22.png',
  },
  {
    id: 4,
    title: Strings.contactUs,
    offer: 'Get help for your queries ',
    img: Images.ic_contact_us,
    arrow:
      'https://www.freeiconspng.com/thumbs/white-arrow-png/white-arrow-transparent-png-22.png',
  },
  {
    id: 5,
    title: Strings.shareApp,
    offer: 'Share with your friends & family',
    img: Images.ic_share_app,
    arrow:
      'https://www.freeiconspng.com/thumbs/white-arrow-png/white-arrow-transparent-png-22.png',
  },
  {
    id: 6,
    title: Strings.rateUS,
    offer: 'Express your experience with ratings',
    img: Images.ic_rate_us,
    arrow:
      'https://www.freeiconspng.com/thumbs/white-arrow-png/white-arrow-transparent-png-22.png',
  },
  {
    id: 7,
    title: Strings.notifications,
    offer: 'Set Incoming notifications ',
    img: Images.ic_notification_profile,
    arrow: null,
  },
  {
    id: 8,
    title: Strings.faqs,
  },
  {
    id: 9,
    title: Strings.aboutUs,
  },
  {
    id: 10,
    title: Strings.termsOfUse,
  },
  {
    id: 12,
    title: Strings.privacyPolicy,
  },
  {
    id: 13,
    title: Strings.returns,
  },
  {
    id: 14,
    title: Strings.cancellation,
  },
];

export const AddressTypeData = [
  {
    id: 0,
    title: Strings.home,
    isSelected: false,
    image: Images.ic_address_grey,
    value: 'home',
  },
  {
    id: 1,
    title: Strings.office,
    isSelected: false,
    image: Images.ic_office,
    value: 'office',
  },
  {
    id: 2,
    title: Strings.other,
    isSelected: false,
    value: 'other',
  },
];

export const CardTagData = [
  {
    id: 0,
    title: Strings.personal,
    isSelected: false,
  },
  {
    id: 1,
    title: Strings.business,
    isSelected: false,
  },
  {
    id: 2,
    title: Strings.other,
    isSelected: false,
  },
];

export const shimmerData = [
  {id: 1},
  {id: 2},
  {id: 3},
  {id: 4},
  {id: 5},
  {id: 6},
];
