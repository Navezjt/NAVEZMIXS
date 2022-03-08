import { t } from "@lingui/macro";

export function languages() {
  const data = [
    { raw: "Afar", t: t`Afar` },
    { raw: "Abkhaz", t: t`Abkhaz` },
    { raw: "Avestan", t: t`Avestan` },
    { raw: "Afrikaans", t: t`Afrikaans` },
    { raw: "Akan", t: t`Akan` },
    { raw: "Amharic", t: t`Amharic` },
    { raw: "Aragonese", t: t`Aragonese` },
    { raw: "Arabic", t: t`Arabic` },
    { raw: "Assamese", t: t`Assamese` },
    { raw: "Avaric", t: t`Avaric` },
    { raw: "Aymara", t: t`Aymara` },
    { raw: "Azerbaijani", t: t`Azerbaijani` },
    { raw: "Bashkir", t: t`Bashkir` },
    { raw: "Belarusian", t: t`Belarusian` },
    { raw: "Bulgarian", t: t`Bulgarian` },
    { raw: "Bislama", t: t`Bislama` },
    { raw: "Bambara", t: t`Bambara` },
    { raw: "Bengali", t: t`Bengali` },
    { raw: "Tibetan", t: t`Tibetan` },
    { raw: "Breton", t: t`Breton` },
    { raw: "Bosnian", t: t`Bosnian` },
    { raw: "Catalan", t: t`Catalan` },
    { raw: "Chechen", t: t`Chechen` },
    { raw: "Chamorro", t: t`Chamorro` },
    { raw: "Corsican", t: t`Corsican` },
    { raw: "Cree", t: t`Cree` },
    { raw: "Czech", t: t`Czech` },
    { raw: "Old Church Slavonic", t: t`Old Church Slavonic` },
    { raw: "Chuvash", t: t`Chuvash` },
    { raw: "Welsh", t: t`Welsh` },
    { raw: "Danish", t: t`Danish` },
    { raw: "German", t: t`German` },
    { raw: "Divehi", t: t`Divehi` },
    { raw: "Dzongkha", t: t`Dzongkha` },
    { raw: "Ewe", t: t`Ewe` },
    { raw: "Greek", t: t`Greek` },
    { raw: "English", t: t`English` },
    { raw: "Esperanto", t: t`Esperanto` },
    { raw: "Spanish", t: t`Spanish` },
    { raw: "Estonian", t: t`Estonian` },
    { raw: "Basque", t: t`Basque` },
    { raw: "Persian", t: t`Persian` },
    { raw: "Fula", t: t`Fula` },
    { raw: "Finnish", t: t`Finnish` },
    { raw: "Fijian", t: t`Fijian` },
    { raw: "Faroese", t: t`Faroese` },
    { raw: "French", t: t`French` },
    { raw: "Western Frisian", t: t`Western Frisian` },
    { raw: "Irish", t: t`Irish` },
    { raw: "Scottish Gaelic", t: t`Scottish Gaelic` },
    { raw: "Galician", t: t`Galician` },
    { raw: "Guaraní", t: t`Guaraní` },
    { raw: "Gujarati", t: t`Gujarati` },
    { raw: "Manx", t: t`Manx` },
    { raw: "Hausa", t: t`Hausa` },
    { raw: "Hebrew", t: t`Hebrew` },
    { raw: "Hindi", t: t`Hindi` },
    { raw: "Hiri Motu", t: t`Hiri Motu` },
    { raw: "Croatian", t: t`Croatian` },
    { raw: "Haitian", t: t`Haitian` },
    { raw: "Hungarian", t: t`Hungarian` },
    { raw: "Armenian", t: t`Armenian` },
    { raw: "Herero", t: t`Herero` },
    { raw: "Interlingua", t: t`Interlingua` },
    { raw: "Indonesian", t: t`Indonesian` },
    { raw: "Interlingue", t: t`Interlingue` },
    { raw: "Igbo", t: t`Igbo` },
    { raw: "Nuosu", t: t`Nuosu` },
    { raw: "Inupiaq", t: t`Inupiaq` },
    { raw: "Ido", t: t`Ido` },
    { raw: "Icelandic", t: t`Icelandic` },
    { raw: "Italian", t: t`Italian` },
    { raw: "Inuktitut", t: t`Inuktitut` },
    { raw: "Japanese", t: t`Japanese` },
    { raw: "Javanese", t: t`Javanese` },
    { raw: "Georgian", t: t`Georgian` },
    { raw: "Kongo", t: t`Kongo` },
    { raw: "Kikuyu", t: t`Kikuyu` },
    { raw: "Kwanyama", t: t`Kwanyama` },
    { raw: "Kazakh", t: t`Kazakh` },
    { raw: "Kalaallisut", t: t`Kalaallisut` },
    { raw: "Khmer", t: t`Khmer` },
    { raw: "Kannada", t: t`Kannada` },
    { raw: "Korean", t: t`Korean` },
    { raw: "Kanuri", t: t`Kanuri` },
    { raw: "Kashmiri", t: t`Kashmiri` },
    { raw: "Kurdish", t: t`Kurdish` },
    { raw: "Komi", t: t`Komi` },
    { raw: "Cornish", t: t`Cornish` },
    { raw: "Kyrgyz", t: t`Kyrgyz` },
    { raw: "Latin", t: t`Latin` },
    { raw: "Luxembourgish", t: t`Luxembourgish` },
    { raw: "Ganda", t: t`Ganda` },
    { raw: "Limburgish", t: t`Limburgish` },
    { raw: "Lingala", t: t`Lingala` },
    { raw: "Lao", t: t`Lao` },
    { raw: "Lithuanian", t: t`Lithuanian` },
    { raw: "Luba-Katanga", t: t`Luba-Katanga` },
    { raw: "Latvian", t: t`Latvian` },
    { raw: "Malagasy", t: t`Malagasy` },
    { raw: "Marshallese", t: t`Marshallese` },
    { raw: "Māori", t: t`Māori` },
    { raw: "Macedonian", t: t`Macedonian` },
    { raw: "Malayalam", t: t`Malayalam` },
    { raw: "Mongolian", t: t`Mongolian` },
    { raw: "Marathi", t: t`Marathi` },
    { raw: "Malay", t: t`Malay` },
    { raw: "Maltese", t: t`Maltese` },
    { raw: "Burmese", t: t`Burmese` },
    { raw: "Nauru", t: t`Nauru` },
    { raw: "Norwegian Bokmål", t: t`Norwegian Bokmål` },
    { raw: "Northern Ndebele", t: t`Northern Ndebele` },
    { raw: "Nepali", t: t`Nepali` },
    { raw: "Ndonga", t: t`Ndonga` },
    { raw: "Dutch", t: t`Dutch` },
    { raw: "Norwegian Nynorsk", t: t`Norwegian Nynorsk` },
    { raw: "Norwegian", t: t`Norwegian` },
    { raw: "Southern Ndebele", t: t`Southern Ndebele` },
    { raw: "Navajo", t: t`Navajo` },
    { raw: "Chichewa", t: t`Chichewa` },
    { raw: "Occitan", t: t`Occitan` },
    { raw: "Ojibwe", t: t`Ojibwe` },
    { raw: "Oromo", t: t`Oromo` },
    { raw: "Oriya", t: t`Oriya` },
    { raw: "Ossetian", t: t`Ossetian` },
    { raw: "Panjabi", t: t`Panjabi` },
    { raw: "Pāli", t: t`Pāli` },
    { raw: "Polish", t: t`Polish` },
    { raw: "Pashto", t: t`Pashto` },
    { raw: "Portuguese", t: t`Portuguese` },
    { raw: "Quechua", t: t`Quechua` },
    { raw: "Romansh", t: t`Romansh` },
    { raw: "Kirundi", t: t`Kirundi` },
    { raw: "Romanian", t: t`Romanian` },
    { raw: "Russian", t: t`Russian` },
    { raw: "Kinyarwanda", t: t`Kinyarwanda` },
    { raw: "Sanskrit", t: t`Sanskrit` },
    { raw: "Sardinian", t: t`Sardinian` },
    { raw: "Sindhi", t: t`Sindhi` },
    { raw: "Northern Sami", t: t`Northern Sami` },
    { raw: "Sango", t: t`Sango` },
    { raw: "Sinhala", t: t`Sinhala` },
    { raw: "Slovak", t: t`Slovak` },
    { raw: "Slovenian", t: t`Slovenian` },
    { raw: "Samoan", t: t`Samoan` },
    { raw: "Shona", t: t`Shona` },
    { raw: "Somali", t: t`Somali` },
    { raw: "Albanian", t: t`Albanian` },
    { raw: "Serbian", t: t`Serbian` },
    { raw: "Swati", t: t`Swati` },
    { raw: "Southern Sotho", t: t`Southern Sotho` },
    { raw: "Sundanese", t: t`Sundanese` },
    { raw: "Swedish", t: t`Swedish` },
    { raw: "Swahili", t: t`Swahili` },
    { raw: "Tamil", t: t`Tamil` },
    { raw: "Telugu", t: t`Telugu` },
    { raw: "Tajik", t: t`Tajik` },
    { raw: "Thai", t: t`Thai` },
    { raw: "Tigrinya", t: t`Tigrinya` },
    { raw: "Turkmen", t: t`Turkmen` },
    { raw: "Tagalog", t: t`Tagalog` },
    { raw: "Tswana", t: t`Tswana` },
    { raw: "Tonga", t: t`Tonga` },
    { raw: "Turkish", t: t`Turkish` },
    { raw: "Tsonga", t: t`Tsonga` },
    { raw: "Tatar", t: t`Tatar` },
    { raw: "Twi", t: t`Twi` },
    { raw: "Tahitian", t: t`Tahitian` },
    { raw: "Uyghur", t: t`Uyghur` },
    { raw: "Ukrainian", t: t`Ukrainian` },
    { raw: "Urdu", t: t`Urdu` },
    { raw: "Uzbek", t: t`Uzbek` },
    { raw: "Venda", t: t`Venda` },
    { raw: "Vietnamese", t: t`Vietnamese` },
    { raw: "Volapük", t: t`Volapük` },
    { raw: "Walloon", t: t`Walloon` },
    { raw: "Wolof", t: t`Wolof` },
    { raw: "Xhosa", t: t`Xhosa` },
    { raw: "Yiddish", t: t`Yiddish` },
    { raw: "Yoruba", t: t`Yoruba` },
    { raw: "Zhuang", t: t`Zhuang` },
    { raw: "Chinese", t: t`Chinese` },
    { raw: "Zulu", t: t`Zulu` },
  ];

  return data;
}
