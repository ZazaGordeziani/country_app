interface LanguageData {
  [key: string]: {
    title: string;
    home: string;
    booking: string;
    about: string;
    contact: string;
    validation: string;
    chooseLanguage: string;
  };
}

const langData: LanguageData = {
  ka: {
    title: "იმოგზაურე და აღმოაჩინე  ახალი კულტურული სამყარო",
    home: "მთავარი",
    booking: "შეკვეთა",
    about: "ჩვენს შესახებ",
    contact: "კონტაქტი",
    validation: "ანგარიშის დადასტურება",
    chooseLanguage: "აირჩიე ენა",
  },
  en: {
    title: "Travel Around and Explore New Cultures",
    home: "Home",
    booking: "Booking",
    about: "About us",
    contact: "Contact us",
    validation: "Account Validation",
    chooseLanguage: "Choose Language",
  },
};

export default langData;
