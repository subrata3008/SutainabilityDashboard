export const activityScopeData = [{
    value:'collector',
    label:'Collector'
},{
    value:'collectorAndTrader',
    label:'Collector and trader'
},{
    value:'trader',
    label:'Trader'
},{
    value:'factoryOrprocessor',
    label:'Food factory or processor'
},{
    value:'producerOrrenderer',
    label:'Producer or renderer'
}]

export const avgMonthVolumeList = [{
    value:'lessThanhundred',
    label:'Less than 100 tonnes per month'
},{
    value:'hundredTofiveHundred',
    label:'100 to 500 tonnes per month'
},{
    value:'fivehundredTothousand',
    label:'500 to 1000 tonnes per month'
},{
    value:'moreThanthousand',
    label:'More than 1000 tonnes per month'
}]

export const suppliedRawMaterialList = [{
    value:'UCO',
    label:'Used cooking oil (UCO)'
},{
    value:'AF',
    label:'Animal fat'
},{
    value:'PFAD',
    label:'Palm fatty acid distillate (PFAD)'
},{
    value:'OTHERS',
    label:'Other vegetable oil processing waste and residues (e.g. SBEO)'
},{
    value:'FF',
    label:'Fish fat'
},{
    value:'TCO',
    label:'Technical Corn Oil'
}]
 



export const partofVolutarySchemeList = [{
    value:'euRed',
    label:'EU RED compliant (ISCC, Red Cert,...)'
},{
    value:'epa',
    label:'EPA compliant'
},{
    value:'nonCertified',
    label:'Non-certified'
},{
    value:'no',
    label:'Dont know'
},{
    value:'other',
    label:'Other, please elaborate'
}];

 

export const unitOfMeasureList = [{
    value:'MT',
    label:'Metric Tonnes'
},{
    value:'UG6',
    label:'Gallon (U.S.) 60F'
},{
    value:'L15',
    label:'Liter 15 C'
},{
    value:'BB6',
    label:'Barrel [42 gallons (U.S.)] 60F'
}]
export const tabList = [{
    value:'0',
    label:'Supplier & Cargo Details '
},{
    value:'1',
    label:'Batch Sustainability Details'
}];

 


export const batchType = {
    SELLER:'SUPPLIER',
    ESTATEMILL:'ESTATEMILL',
    REFINERYWAREHOUSEDATA:'REFINERYWAREHOUSEDATA',
    SHIPPEDPRODUCEDVOL:'SHIPPEDPRODUCEDVOL'
};

export const complienceList = [{
    value:'EU',
    label:'EU RED compliant '
},{
    value:'EPA',
    label:'EPA RFS compliant'
}];

export const feedBackStockList = [{
    value:'Soybean Oil Crd US Gulf',
    label:'Soybean Oil Crd US Gulf'
},{
    value:'Corn Oil Rfnd MidWest',
    label:'Corn Oil Rfnd MidWest'
},
// {
//     value:'Coconut Oil CRD PHL',
//     label:'Coconut Oil CRD PHL'
// },{
//     value:'Peanut Oil SE Crude',
//     label:'Peanut Oil SE Crude'
// },{
//     value:'Peanut Oil SE Refined',
//     label:'Peanut Oil SE Refined'
// },{
//     value:'Palm Stearin RBD Malaysia FOB',
//     label:'Palm Stearin RBD Malaysia FOB'
// },{
//     value:'Palm Fatty Acid Dstl Malaysia FOB',
//     label:'Palm Fatty Acid Dstl Malaysia FOB'
// },
{
    value:'Used Cooking Oil US Gulf',
    label:'Used Cooking Oil US Gulf'
},{
    value:'Used Cooking Oil Indonesia',
    label:'Used Cooking Oil Indonesia'
},{
    value:'Ethanol Denatured',
    label:'Ethanol Denatured'
}];


export const counterParties = [
    {
        value:'singNeste',
        label:'Neste Singapore PTE Ltd / 250 North Bridge Road 17-01 Raffles City Tower Singapore 179101 SINGAPORE'
    },{
        value:'sinclairUsa',
        label:'HF Sinclair - The Navajo Refinery 501 E Main St, Artesia, NM 88210, United States'
    },{
        value:'phillipsUsa',
        label:'Phillips 66 San Francisco Refinery / 1290 San Pablo Ave, Rodeo, CA 94572, United States'
    },{
        value:'swedAb',
        label:'BP refinery / Refinería de bp Energía España Poligono industrial El Serrallo s/n, 12100 El Grao de Castellón, Castellón, Spain'
    },{
        value:'suissSA',
        label:'Cenovus - Husky Minnedosa Ethanol Plant /500 1st Ave, Minnedosa, MB R0J 1E0, Canada'
    },
]

// From https://bitbucket.org/atlassian/atlaskit-mk-2/raw/4ad0e56649c3e6c973e226b7efaeb28cb240ccb0/packages/core/select/src/data/countries.js
export const countryList = [ 
{value: 'AD', label: 'Andorra'},
{value: 'AE', label: 'United Arab Emirates'},
{value: 'AF', label: 'Afghanistan'},
{value: 'AG', label: 'Antigua and Barbuda'},
{value: 'AI', label: 'Anguilla'},
{value: 'AL', label: 'Albania'},
{value: 'AM', label: 'Armenia'},
{value: 'AO', label: 'Angola'},
{value: 'AQ', label: 'Antarctica'},
{value: 'AR', label: 'Argentina'},
{value: 'AS', label: 'American Samoa'},
{value: 'AT', label: 'Austria'},
{value: 'AU', label: 'Australia'},
{value: 'AW', label: 'Aruba'},
{value: 'AX', label: 'Alland Islands'},
{value: 'AZ', label: 'Azerbaijan'},
{value: 'BA', label: 'Bosnia and Herzegovina'},
{value: 'BB', label: 'Barbados'},
{value: 'BD', label: 'Bangladesh'},
{value: 'BE', label: 'Belgium'},
{value: 'BF', label: 'Burkina Faso'},
{value: 'BG', label: 'Bulgaria'},
{value: 'BH', label: 'Bahrain'},
{value: 'BI', label: 'Burundi'},
{value: 'BJ', label: 'Benin'},
{value: 'BL', label: 'Saint Barthelemy'},
{value: 'BM', label: 'Bermuda'},
{value: 'BN', label: 'Brunei Darussalam'},
{value: 'BO', label: 'Bolivia'},
{value: 'BR', label: 'Brazil'},
{value: 'BS', label: 'Bahamas'},
{value: 'BT', label: 'Bhutan'},
{value: 'BV', label: 'Bouvet Island'},
{value: 'BW', label: 'Botswana'},
{value: 'BY', label: 'Belarus'},
{value: 'BZ', label: 'Belize'},
{value: 'CA', label: 'Canada'},
{value: 'CC', label: 'Cocos (Keeling) Islands'},
{value: 'CD', label: 'Congo, Democratic Republic of the'},
{value: 'CF', label: 'Central African Republic'},
{value: 'CG', label: 'Congo, Republic of the'},
{value: 'CH', label: 'Switzerland'},
{value: 'CI', label: "Cote d'Ivoire"},
{value: 'CK', label: 'Cook Islands'},
{value: 'CL', label: 'Chile'},
{value: 'CM', label: 'Cameroon'},
{value: 'CN', label: 'China'},
{value: 'CO', label: 'Colombia'},
{value: 'CR', label: 'Costa Rica'},
{value: 'CU', label: 'Cuba'},
{value: 'CV', label: 'Cape Verde'},
{value: 'CW', label: 'Curacao'},
{value: 'CX', label: 'Christmas Island'},
{value: 'CY', label: 'Cyprus'},
{value: 'CZ', label: 'Czech Republic'},
{value: 'DE', label: 'Germany'},
{value: 'DJ', label: 'Djibouti'},
{value: 'DK', label: 'Denmark'},
{value: 'DM', label: 'Dominica'},
{value: 'DO', label: 'Dominican Republic'},
{value: 'DZ', label: 'Algeria'},
{value: 'EC', label: 'Ecuador'},
{value: 'EE', label: 'Estonia'},
{value: 'EG', label: 'Egypt'},
{value: 'EH', label: 'Western Sahara'},
{value: 'ER', label: 'Eritrea'},
{value: 'ES', label: 'Spain'},
{value: 'ET', label: 'Ethiopia'},
{value: 'FI', label: 'Finland'},
{value: 'FJ', label: 'Fiji'},
{value: 'FK', label: 'Falkland Islands (Malvinas)'},
{value: 'FM', label: 'Micronesia, Federated States of'},
{value: 'FO', label: 'Faroe Islands'},
{value: 'FR', label: 'France'},
{value: 'GA', label: 'Gabon'},
{value: 'GB', label: 'United Kingdom'},
{value: 'GD', label: 'Grenada'},
{value: 'GE', label: 'Georgia'},
{value: 'GF', label: 'French Guiana'},
{value: 'GG', label: 'Guernsey'},
{value: 'GH', label: 'Ghana'},
{value: 'GI', label: 'Gibraltar'},
{value: 'GL', label: 'Greenland'},
{value: 'GM', label: 'Gambia'},
{value: 'GN', label: 'Guinea'},
{value: 'GP', label: 'Guadeloupe'},
{value: 'GQ', label: 'Equatorial Guinea'},
{value: 'GR', label: 'Greece'},
{value: 'GS', label: 'South Georgia and the South Sandwich Islands'},
{value: 'GT', label: 'Guatemala'},
{value: 'GU', label: 'Guam'},
{value: 'GW', label: 'Guinea-Bissau'},
{value: 'GY', label: 'Guyana'},
{value: 'HK', label: 'Hong Kong'},
{value: 'HM', label: 'Heard Island and McDonald Islands'},
{value: 'HN', label: 'Honduras'},
{value: 'HR', label: 'Croatia'},
{value: 'HT', label: 'Haiti'},
{value: 'HU', label: 'Hungary'},
{value: 'ID', label: 'Indonesia'}, 
{value: 'IE', label: 'Ireland'}, 
{value: 'IL', label: 'Israel'}, 
{value: 'IM', label: 'Isle of Man'}, 
{value: 'IN', label: 'India'}, 
{value: 'IO', label: 'British Indian Ocean Territory'}, 
{value: 'IQ', label: 'Iraq'}, 
{value: 'IR', label: 'Iran, Islamic Republic of'}, 
{value: 'IS', label: 'Iceland'}, 
{value: 'IT', label: 'Italy'}, 
{value: 'JE', label: 'Jersey'}, 
{value: 'JM', label: 'Jamaica'}, 
{value: 'JO', label: 'Jordan'}, 
{value: 'JP', label: 'Japan'},
{value: 'KE', label: 'Kenya'}, 
{value: 'KG', label: 'Kyrgyzstan'}, 
{value: 'KH', label: 'Cambodia'}, 
{value: 'KI', label: 'Kiribati'}, 
{value: 'KM', label: 'Comoros'}, 
{value: 'KN', label: 'Saint Kitts and Nevis'}, 
{value: 'KP', label: "Korea, Democratic People's Republic of"},
{value: 'KR', label: 'Korea, Republic of'}, 
{value: 'KW', label: 'Kuwait'}, 
{value: 'KY', label: 'Cayman Islands'}, 
{value: 'KZ', label: 'Kazakhstan'}, 
{value: 'LA', label: "Lao People's Democratic Republic"},
{value: 'LB', label: 'Lebanon'}, 
{value: 'LC', label: 'Saint Lucia'}, 
{value: 'LI', label: 'Liechtenstein'}, 
{value: 'LK', label: 'Sri Lanka'}, 
{value: 'LR', label: 'Liberia'}, 
{value: 'LS', label: 'Lesotho'}, 
{value: 'LT', label: 'Lithuania'}, 
{value: 'LU', label: 'Luxembourg'}, 
{value: 'LV', label: 'Latvia'}, 
{value: 'LY', label: 'Libya'}, 
{value: 'MA', label: 'Morocco'}, 
{value: 'MC', label: 'Monaco'}, 
{value: 'MD', label: 'Moldova, Republic of'}, 
{value: 'ME', label: 'Montenegro'}, 
{value: 'MF', label: 'Saint Martin (French part)'}, 
{value: 'MG', label: 'Madagascar'}, 
{value: 'MH', label: 'Marshall Islands'}, 
{value: 'MK', label: 'Macedonia, the Former Yugoslav Republic of'}, 
{value: 'ML', label: 'Mali'}, 
{value: 'MM', label: 'Myanmar'}, 
{value: 'MN', label: 'Mongolia'}, 
{value: 'MO', label: 'Macao'}, 
{value: 'MP', label: 'Northern Mariana Islands'}, 
{value: 'MQ', label: 'Martinique'}, 
{value: 'MR', label: 'Mauritania'}, 
{value: 'MS', label: 'Montserrat'}, 
{value: 'MT', label: 'Malta'}, 
{value: 'MU', label: 'Mauritius'}, 
{value: 'MV', label: 'Maldives'}, 
{value: 'MW', label: 'Malawi'}, 
{value: 'MX', label: 'Mexico'}, 
{value: 'MY', label: 'Malaysia'}, 
{value: 'MZ', label: 'Mozambique'}, 
{value: 'NA', label: 'Namibia'}, 
{value: 'NC', label: 'New Caledonia'}, 
{value: 'NE', label: 'Niger'}, 
{value: 'NF', label: 'Norfolk Island'}, 
{value: 'NG', label: 'Nigeria'}, 
{value: 'NI', label: 'Nicaragua'}, 
{value: 'NL', label: 'Netherlands'}, 
{value: 'NO', label: 'Norway'}, 
{value: 'NP', label: 'Nepal'}, 
{value: 'NR', label: 'Nauru'}, 
{value: 'NU', label: 'Niue'}, 
{value: 'NZ', label: 'New Zealand'}, 
{value: 'OM', label: 'Oman'}, 
{value: 'PA', label: 'Panama'}, 
{value: 'PE', label: 'Peru'}, 
{value: 'PF', label: 'French Polynesia'}, 
{value: 'PG', label: 'Papua New Guinea'}, 
{value: 'PH', label: 'Philippines'}, 
{value: 'PK', label: 'Pakistan'}, 
{value: 'PL', label: 'Poland'}, 
{value: 'PM', label: 'Saint Pierre and Miquelon'}, 
{value: 'PN', label: 'Pitcairn'}, 
{value: 'PR', label: 'Puerto Rico'}, 
{value: 'PS', label: 'Palestine, State of'}, 
{value: 'PT', label: 'Portugal'}, 
{value: 'PW', label: 'Palau'}, 
{value: 'PY', label: 'Paraguay'}, 
{value: 'QA', label: 'Qatar'}, 
{value: 'RE', label: 'Reunion'}, 
{value: 'RO', label: 'Romania'}, 
{value: 'RS', label: 'Serbia'}, 
{value: 'RU', label: 'Russian Federation'}, 
{value: 'RW', label: 'Rwanda'}, 
{value: 'SA', label: 'Saudi Arabia'}, 
{value: 'SB', label: 'Solomon Islands'}, 
{value: 'SC', label: 'Seychelles'}, 
{value: 'SD', label: 'Sudan'}, 
{value: 'SE', label: 'Sweden'}, 
{value: 'SG', label: 'Singapore'}, 
{value: 'SH', label: 'Saint Helena'}, 
{value: 'SI', label: 'Slovenia'},
{value: 'SJ', label: 'Svalbard and Jan Mayen'},
{value: 'SK', label: 'Slovakia'}, 
{value: 'SL', label: 'Sierra Leone'}, 
{value: 'SM', label: 'San Marino'}, 
{value: 'SN', label: 'Senegal'}, 
{value: 'SO', label: 'Somalia'}, 
{value: 'SR', label: 'Suriname'}, 
{value: 'SS', label: 'South Sudan'}, 
{value: 'ST', label: 'Sao Tome and Principe'}, 
{value: 'SV', label: 'El Salvador'}, 
{value: 'SX', label: 'Sint Maarten (Dutch part)'}, 
{value: 'SY', label: 'Syrian Arab Republic'}, 
{value: 'SZ', label: 'Swaziland'}, 
{value: 'TC', label: 'Turks and Caicos Islands'}, 
{value: 'TD', label: 'Chad'}, 
{value: 'TF', label: 'French Southern Territories'}, 
{value: 'TG', label: 'Togo'}, 
{value: 'TH', label: 'Thailand'}, 
{value: 'TJ', label: 'Tajikistan'}, 
{value: 'TK', label: 'Tokelau'}, 
{value: 'TL', label: 'Timor-Leste'}, 
{value: 'TM', label: 'Turkmenistan'}, 
{value: 'TN', label: 'Tunisia'}, 
{value: 'TO', label: 'Tonga'}, 
{value: 'TR', label: 'Turkey'}, 
{value: 'TT', label: 'Trinidad and Tobago'}, 
{value: 'TV', label: 'Tuvalu'}, 
{value: 'TW', label: 'Taiwan, Republic of China'}, 
{value: 'TZ', label: 'United Republic of Tanzania'}, 
{value: 'UA', label: 'Ukraine'}, 
{value: 'UG', label: 'Uganda'}, 
{value: 'US', label: 'United States'}, 
{value: 'UY', label: 'Uruguay'}, 
{value: 'UZ', label: 'Uzbekistan'}, 
{value: 'VA', label: 'Holy See (Vatican City State)'}, 
{value: 'VC', label: 'Saint Vincent and the Grenadines'}, 
{value: 'VE', label: 'Venezuela'}, 
{value: 'VG', label: 'British Virgin Islands'}, 
{value: 'VI', label: 'US Virgin Islands'}, 
{value: 'VN', label: 'Vietnam'}, 
{value: 'VU', label: 'Vanuatu'}, 
{value: 'WF', label: 'Wallis and Futuna'}, 
{value: 'WS', label: 'Samoa'}, 
{value: 'XK', label: 'Kosovo'}, 
{value: 'YE', label: 'Yemen'}, 
{value: 'YT', label: 'Mayotte'}, 
{value: 'ZA', label: 'South Africa'}, 
{value: 'ZM', label: 'Zambia'}, 
{value: 'ZW', label: 'Zimbabwe'}
];

export const baseApiUrl = "https://yd31ps78m8.execute-api.us-east-1.amazonaws.com";
export const baseApiUrl2 = "https://ztb2dcu4lf.execute-api.us-east-1.amazonaws.com";
//export const baseApiUrlForData = "https://7xffhyozr1.execute-api.us-east-1.amazonaws.com";  