import LocalizedStrings from 'react-native-localization';

const Strings = new LocalizedStrings({
  en: {
    // Common
    cancel: 'Cancel',
    continue: 'Continue',
    back: 'Back',
    yes: 'Yes',
    no: 'No',
    ok: 'OK',
    done: 'Done',
    thankYou: 'Thank You',
    pleaseWait: 'Please Wait',
    retry: 'Retry',
    
    // Start Screen
    welcome: 'Welcome',
    pleaseScanYourRFIDCard: 'Please Scan Your RFID Card',
    
    // Choose Language Screen
    chooseLanguage: 'Choose Language',
    english: 'English',
    hindi: 'Hindi',
    marathi: 'Marathi',
    
    // Cancel Confirmation
    areYouSureWantToCancelTheProcess: 'Are you sure want to cancel the process?',
    
    // Home Screen
    howCanWeHelpYouToday: 'How Can We Help Today!',
    checkBalance: 'Check Balance',
    prescriptionSelection: 'Medicine Prescriptions',
    
    // Account Balance
    yourAccountBalanceIs: 'Your Account Balance is',
    
    // Select Relationship
    orderMedicineFor: 'Order Medicine For',
    selectRelationshipOption: 'Select Relationship Option:',
    self: 'Self',
    wife: 'Wife',
    husband: 'Husband',
    daughter: 'Daughter',
    son: 'Son',
    other: 'Other',
    
    // Select Prescription
    selectPrescription: 'Select Prescription',
    prescriptionNo: 'Prescription No.',
    
    // Order Confirmation
    doYouWantToConfirmThisTransaction: 'Do you want to confirm this transaction?',
    
    // Transaction Messages
    transactionCancelledDueToInsufficientBalance: 'Transaction cancelled due to insufficient balance.',
    transactionSuccessful: 'Transaction Successful!',
    
    // Balance & Billing
    balanceAndBillingAmount: 'Balance & Billing Amount',
    currentBalance: 'Current Balance:',
    billingAmount: 'Billing Amount:',
    noMedicinesFound: 'No medicines found',
    
    // Medicine Dispatch
    theMedicineDispatched: 'Please wait, the medicine is being dispatched !',
    yourMedicineHasBeenSuccessfullyDispatched: 'Your medicine has been successfully dispatched!',
    
    // Collect Medicine
    collectYourMedicine: 'Collect your medicine !',
    viewBill: 'View Bill',
    yourMedicineIsReadyForCollection: 'Your medicine is ready for collection',
    pleaseProceedToTheCounter: 'Please proceed to the counter',
    pleaseWaitWhileWePrepareYourMedicine: 'Please wait while we prepare your medicine...',
    
    
    
    // Bill
    printBill: 'Print Bill',
    billNumber: 'Bill Number',
    billingDate: 'Billing Date',
    patientInformation: 'Patient Information',
    name: 'Name',
    age: 'Age',
    phoneNo: 'Phone No.',
    dateOfBirth: 'Date of Birth',
    email: 'Email',
    gender: 'Gender',
    address: 'Address',
    listOfPrescribedMedicine: 'List of Prescribed Medicine',
    medicationName: 'Medication Name',
    totalItem: 'Total Item',
    totalCost: 'Total Cost',
    total: 'Total',
    availableAccountBalance: 'Available Account Balance',
  },
  
  hi: {
    // Common
    cancel: 'रद्द करें',
    continue: 'जारी रखें',
    back: 'वापस',
    yes: 'हाँ',
    no: 'नहीं',
    ok: 'ठीक है',
    done: 'पूर्ण',
    thankYou: 'धन्यवाद',
    pleaseWait: 'कृपया प्रतीक्षा करें',
    retry: 'पुनर्यादी',
    
    // Start Screen
    welcome: 'स्वागत है',
    pleaseScanYourRFIDCard: 'कृपया अपना RFID कार्ड स्कैन करें',
    
    // Choose Language Screen
    chooseLanguage: 'भाषा चुनें',
    english: 'अंग्रेज़ी',
    hindi: 'हिंदी',
    marathi: 'मराठी',
    
    // Cancel Confirmation
    areYouSureWantToCancelTheProcess: 'क्या आप वाकई प्रक्रिया को रद्द करना चाहते हैं?',
    
    // Home Screen
    howCanWeHelpYouToday: 'आज हम आपकी कैसे मदद कर सकते हैं!',
    checkBalance: 'बैलेंस जांचें',
    prescriptionSelection: 'दवा नुस्खे',
    
    // Account Balance
    yourAccountBalanceIs: 'आपका खाता शेष है',
    
    // Select Relationship
    orderMedicineFor: 'के लिए दवा ऑर्डर करें',
    selectRelationshipOption: 'संबंध विकल्प चुनें:',
    self: 'स्वयं',
    wife: 'पत्नी',
    husband: 'पति',
    daughter: 'बेटी',
    son: 'बेटा',
    other: 'अन्य',
    
    // Select Prescription
    selectPrescription: 'नुस्खा चुनें',
    selectPrescriptionNumber: 'नुस्खा नंबर',
    
    // Order Confirmation
    doYouWantToConfirmThisTransaction: 'क्या आप इस लेनदेन की पुष्टि करना चाहते हैं?',
    yourMedicineIsReadyForCollection: 'आपकी दवा संग्रह के लिए तैयार है!',
    pleaseProceedToTheCounter: 'कृपया प्रतीक्षा करा, औषध पाठवले जात आहे !',
    noMedicinesFound: 'दवा नुस्खा नाही',
    
    
    // Transaction Messages
    transactionCancelledDueToInsufficientBalance: 'अपर्याप्त शेष राशि के कारण लेनदेन रद्द हो गया।',
    transactionSuccessful: 'लेनदेन सफल!',
    
    // Balance & Billing
    balanceAndBillingAmount: 'शेष राशि और बिलिंग राशि',
    currentBalance: 'वर्तमान शेष:',
    billingAmount: 'बिलिंग राशि:',
    
    // Medicine Dispatch
    theMedicineDispatched: 'कृपया प्रतीक्षा करें, दवा भेजी जा रही है !',
    
    // Collect Medicine
    collectYourMedicine: 'अपनी दवा लें !',
    viewBill: 'बिल देखें',
    pleaseWaitWhileWePrepareYourMedicine: 'कृपया प्रतीक्षा करें, दवा भेजी जा रही है !',
    yourMedicineHasBeenSuccessfullyDispatched: 'आपकी दवा सफलतापूर्वक भेज दी गई है',
    
    
    // Bill
    printBill: 'बिल प्रिंट करें',
    billNumber: 'बिल नंबर',
    billingDate: 'बिलिंग तिथि',
    patientInformation: 'रोगी की जानकारी',
    name: 'नाम',
    age: 'आयु',
    phoneNo: 'फोन नं.',
    dateOfBirth: 'जन्म तिथि',
    email: 'ईमेल',
    gender: 'लिंग',
    address: 'पता',
    listOfPrescribedMedicine: 'निर्धारित दवा की सूची',
    medicationName: 'दवा का नाम',
    totalItem: 'कुल आइटम',
    totalCost: 'कुल लागत',
    total: 'कुल',
    availableAccountBalance: 'उपलब्ध खाता शेष',
  },
  
  mr: {
    // Common
    cancel: 'रद्द करा',
    continue: 'सुरू ठेवा',
    back: 'मागे',
    yes: 'होय',
    no: 'नाही',
    ok: 'ठीक आहे',
    done: 'पूर्ण',
    thankYou: 'धन्यवाद',
    pleaseWait: 'कृपया प्रतीक्षा करा',
    retry: 'पुनर्यादी',

    
    // Start Screen
    welcome: 'स्वागत आहे',
    pleaseScanYourRFIDCard: 'कृपया तुमचे RFID कार्ड स्कॅन करा',
    
    // Choose Language Screen
    chooseLanguage: 'भाषा निवडा',
    english: 'इंग्रजी',
    hindi: 'हिंदी',
    marathi: 'मराठी',
    
    // Cancel Confirmation
    areYouSureWantToCancelTheProcess: 'तुम्हाला खात्री आहे की तुम्ही प्रक्रिया रद्द करू इच्छिता?',
    
    // Home Screen
    howCanWeHelpYouToday: 'आज आम्ही तुमची कशी मदत करू शकतो!',
    checkBalance: 'शिल्लक तपासा',
    prescriptionSelection: 'औषध पर्चे',
    
    // Account Balance
    yourAccountBalanceIs: 'तुमची खाते शिल्लक आहे',
    
    // Select Relationship
    orderMedicineFor: 'साठी औषध ऑर्डर करा',
    selectRelationshipOption: 'नाते पर्याय निवडा:',
    self: 'स्वतः',
    wife: 'पत्नी',
    husband: 'पति',
    daughter: 'मुलगी',
    son: 'मुलगा',
    other: 'इतर',
    
    // Select Prescription
    selectPrescription: 'पर्ची निवडा',
    prescriptionNo: 'पर्ची नंबर',
    noMedicinesFound: 'दवा नुस्खा नाही',

    
    // Order Confirmation
    doYouWantToConfirmThisTransaction: 'तुम्हाला या व्यवहाराची पुष्टी करायची आहे का?',
    yourMedicineIsReadyForCollection: 'तुमचे औषध घ्या!',
    pleaseProceedToTheCounter: 'कृपया प्रतीक्षा करा, औषध पाठवले जात आहे !',
    
    // Transaction Messages
    transactionCancelledDueToInsufficientBalance: 'अपुरी शिल्लक असल्यामुळे व्यवहार रद्द झाला.',
    transactionSuccessful: 'व्यवहार यशस्वी!',
    
    // Balance & Billing
    balanceAndBillingAmount: 'शिल्लक आणि बिलिंग रक्कम',
    currentBalance: 'सध्याची शिल्लक:',
    billingAmount: 'बिलिंग रक्कम:',
    
    // Medicine Dispatch
    theMedicineDispatched: 'कृपया प्रतीक्षा करा, औषध पाठवले जात आहे !',
    
    // Collect Medicine
    collectYourMedicine: 'तुमचे औषध घ्या !',
    viewBill: 'बिल पहा',
    pleaseWaitWhileWePrepareYourMedicine: 'कृपया प्रतीक्षा करा, औषध पाठवले जात आहे !',
    yourMedicineHasBeenSuccessfullyDispatched: 'तुमचे औषध घ्या!',
    
    // Bill
    printBill: 'बिल प्रिंट करा',
    billNumber: 'बिल क्रमांक',
    billingDate: 'बिलिंग तारीख',
    patientInformation: 'रुग्ण माहिती',
    name: 'नाव',
    age: 'वय',
    phoneNo: 'फोन नं.',
    dateOfBirth: 'जन्मतारीख',
    email: 'ईमेल',
    gender: 'लिंग',
    address: 'पत्ता',
    listOfPrescribedMedicine: 'निर्धारित औषधांची यादी',
    medicationName: 'औषधाचे नाव',
    totalItem: 'एकूण वस्तू',
    totalCost: 'एकूण किंमत',
    total: 'एकूण',
    availableAccountBalance: 'उपलब्ध खाते शिल्लक',
  }
});

export default Strings;