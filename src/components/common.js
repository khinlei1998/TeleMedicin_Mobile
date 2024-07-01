import AsyncStorage from '@react-native-async-storage/async-storage';
export const BASE_URL = 'http://192.168.100.133:8000/api';
export const PHOTO_URL = 'http://192.168.100.133:8000/';

// export const BASE_URL = 'http://app.telehealthmyanmar.com/Backend/public/index.php/api';
// export const PHOTO_URL = 'http://app.telehealthmyanmar.com/Backend/public/';




export const DEFAULT_CONFIG = {

	responseType: 'json',
	headers: {
		"Content-Type": "application/json",
		"Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNjc5MTU2MGIyZTE4MDkzZjk1ODQ4OWJlMDM5NGZhN2RiOTgzYzJiOWE2ZGZlY2EzNjBhOGE4OGEwZTMzNTgzZDRhNTBmNWQxYTIxNjY2YjIiLCJpYXQiOjE2NDAyNDA1ODEuNzgxMzE5LCJuYmYiOjE2NDAyNDA1ODEuNzgxMzI1LCJleHAiOjE2NzE3NzY1ODEuNzc4MTg0LCJzdWIiOiIxIiwic2NvcGVzIjpbInVzZXIiXX0.XIvRKJIBxUW9acA8Er1C_15iLMXOhV4BpWI8cXGe_ryyD36rTsOvyBqkm8xpPe6Z31U9_zv49WpDsvtVUg2ISh0oFqhgHaTwC-IPtIOlqj21rTz4epXRcjwOCzeW48Al99sANKEmDg6spy98adabc9TY6c1wBrKAMrOJOA-G420vKEfIhQBDbDkgIWqMeDbujapZdKOro1Gwv_mJENAaryFowEp7V3X7HPAUG4eUWVRql0mf-D1HQhbQcQkGg5cZYhgNEuM8s8Qgwg-mFKNDeZT4V6DmQvJP5JV2a_H-l838NbC4biqzqnWwTcUxK-UUDP50Cn9rF7v3cBOj3TN1c6IePbVX_J3IqumOM07AVitxKOBbAoBBfjZb-kYcci1wy_GOxx0SfyFJGLt-o3Usc0KtO8hB8i9eBM5pRkDQbh1a_fD0dtEcOlsO1cHOrXmckGeGqXei9h8DJXJE05tbukm3hJJLZwz3HbpfG3jl-zslwJVl_ncYdqnbtRN_YtTSFhg9dMyNe9qX5XYSVK7RfzT8eiWx4sO1Elk_Oq9z9xJ6hGvwN86EOTxX89BdIZlezJ49eEH0TQRvGqfEJ2SG8IGEDF-MGPWpkZrxYq6YVZIHaD9b7KgcT0zxx9CV2jkQE8CAI_hujCoUYuxnY8ltk2F2XHQRzhwxXHU92pHsjT0"

	}
};
export const nodataIcon = require('../../assets/images/pages/box.png');

export const Image_Uplaod = {
	responseType: 'json',
	headers: {
		'Content-Type': 'multipart/form-data;',
	}
};

export const InvestigationList = [
	{ value: 0, label: 'HAEMATOLOGY & COAGULATION' },
	{ value: 1, label: 'SEROLOGY & IMMUNOLOGY' },
	{ value: 2, label: 'BIOCHEMISTRY' },
	{ value: 3, label: 'TUMOUR MARKERS' },
	{ value: 4, label: 'HORMONES' },
	{ value: 5, label: 'URINE FOR' },
	{ value: 6, label: 'CULTURE & SENSITIVITY' },
	{ value: 7, label: 'MICROBIOLOGY' },
	{ value: 8, label: 'STOOL FOR' },

]

export const HAEMATOLOGY = [
	{ value: '0', shortend: 'cp', range: '12-16 g/dl', label: 'CP (Auto/Manual)', code: '0' },
	{ value: '1', shortend: 'hb', range: '', label: 'Hb%', code: '0' },
	{ value: '2', shortend: 't_dc', range: '', label: 'T & DC', code: '0' },
	{ value: '3', shortend: 'platelet', range: '', label: 'Platelet Count', code: '0' },
	{ value: '4', shortend: 'esr', range: '', label: 'ESR', code: '0' },
	{ value: '5', shortend: 'pcv', range: '37-47%', label: 'PCV', code: '0' },
	{ value: '6', shortend: 'le_cell', range: '', label: 'LE cell', code: '0' },
	{ value: '7', shortend: 'eosinophil', range: '', label: 'Eosinophil Count', code: '0' },
	{ value: '8', shortend: 'bt_ct', range: '', label: 'BT, CT', code: '0' },
	{ value: '9', shortend: 'abo_grouping', range: '', label: 'ABO Grouping', code: '0' },
	{ value: '10', shortend: 'rh_grouping', range: '', label: 'RH Grouping', code: '0' },
	{ value: '11', shortend: 'g6pd_qual', range: '', label: 'G-6PD (Qualitative)', code: '0' },
	{ value: '12', shortend: 'g6pd_quan', range: '', label: 'G-6PD (Quantitative)', code: '0' },
	{ value: '13', shortend: 'pt', range: '', label: 'PT(INR)', code: '0' },
	{ value: '14', shortend: 'aptt', range: '', label: 'APTT', code: '0' },
	{ value: '15', shortend: 'fibrin', range: '', label: 'Fibrinogen', code: '0' },
	{ value: '16', shortend: 'hbf', range: '', label: "Hb f(singer's Test)", code: '0' },
	{ value: '17', shortend: 'coomb', range: '', label: "Coomb's Test", code: '0' },
	{ value: '18', shortend: 'iron', range: '', label: "Iron", code: '0' },
	{ value: '19', shortend: 'ferritin', range: '', label: "Ferritin", code: '0' },
	{ value: '20', shortend: 'hb_electro', range: '', label: "Hb Electrophoresis", code: '0' },
	{ value: '21', shortend: 'mp_film', range: '', label: "Mp (film)", code: '0' },
	{ value: '22', shortend: 'mf_film', range: '', label: "Mf (film)", code: '0' },
]

export const SEROLOGY = [
	{ value: '0', shortend: 'aso', range: '', label: 'ASO', code: '1' },
	{ value: '1', shortend: 'ra', range: '', label: 'RA', code: '1' },
	{ value: '2', shortend: 'anf', range: '', label: 'ANF', code: '1' },
	{ value: '3', shortend: 'widal_test', range: '', label: 'Widal Test', code: '1' },
	{ value: '4', shortend: 'hiv_ab', range: '', label: 'HIV Ab 1-2', code: '1' },
	{ value: '5', shortend: 'hbs_ag', range: '', label: 'HBs Ag', code: '1' },
	{ value: '6', shortend: 'hbs_ab', range: '', label: 'HBs Ab', code: '1' },
	{ value: '7', shortend: 'hbe_ag', range: '', label: 'HBe Ag', code: '1' },
	{ value: '8', shortend: 'hbe_ab', range: '', label: 'HBe Ab', code: '1' },
	{ value: '9', shortend: 'hbc_ab', range: '', label: 'HBc Ab', code: '1' },
	{ value: '10', shortend: 'hbv_profile', range: '', label: 'HBV Profile (combo)', code: '1' },
	{ value: '11', shortend: 'hcv_ab', range: '', label: 'HCV Ab', code: '1' },
	{ value: '12', shortend: 'mp_ict', range: '', label: 'MP (ICT)', code: '1' },
	{ value: '13', shortend: 'mf_ict', range: '', label: 'MF (ICT)', code: '1' },
	{ value: '14', shortend: 'tb_ict', label: 'TB (ICT)', code: '1' },
	{ value: '15', shortend: 'vdrl', range: '', label: 'VDRL', code: '1' },
	{ value: '16', shortend: 'h_pylori', range: '', label: "H-pylori", code: '1' },
	{ value: '17', shortend: 'dengue_ict', range: '', label: "Dengue (ICT)", code: '1' },
	{ value: '18', shortend: 'dengue_ns1', range: '', label: "Dengue (NS1 Antigen)", code: '1' },
	{ value: '19', shortend: 'dengue_duo', range: '', label: "Dengue Duo (ICT + NS1Ag)", code: '1' },
	{ value: '20', shortend: 'chikunguanya_ab', range: '', label: "Chikunguanya Ab (ICT)", code: '1' },
]

export const BIOCHEMISTRY = [
	{ value: '0', shortend: 'total_bilirubin', range: '', label: 'Total Bilirubin', code: '2' },
	{ value: '1', shortend: 'alkaline', range: '', label: 'Alkaline Phosphatase', code: '2' },
	{ value: '2', shortend: 'alt_sgpt', range: '< 35 U/L', label: 'ALT (SGPT)', code: '2' },
	{ value: '3', shortend: 'ast_sgot', range: '< 32 U/L', label: 'AST (SGOT)', code: '2' },// Liver Function Profile
	{ value: '4', shortend: 'cholesterol', range: '< 200 mg/dl', label: 'Cholesterol', code: '2' },
	{ value: '5', shortend: 'triglycerides', range: '0-150 mg/dl', label: 'Triglycerides', code: '2' },
	{ value: '6', shortend: 'hdl', range: '> 40 mg/dl', label: 'HDL', code: '2' },
	{ value: '7', shortend: 'ldl', range: '0-130 mg/dl', label: 'LDL', code: '2' },//Lipid Profile
	{ value: '8', shortend: 'urea', range: '6-20 mg/dl', label: 'Urea', code: '2' },
	{ value: '9', shortend: 'creatinine', range: '', label: 'Creatinine', code: '2' },
	{ value: '10', shortend: 'electrolyte', range: '', label: 'Electrolyte (Na, K, CL)', code: '2' },
	{ value: '12', shortend: 'bicarbonate', range: '20-30 mmol/L', label: 'Bicarbonate', code: '2' },// Renal Profile
	{ value: '13', shortend: 'glucose', range: '', label: 'Glucose(FBS,RBS,2HPP)', code: '2' },
	{ value: '14', shortend: 'hb_a1c', range: '4.8-5.9%', label: 'HB A1C', code: '2' },
	{ value: '15', shortend: 'ogtt', range: '', label: 'OGTT', code: '2' },
	{ value: '16', shortend: 'blood_ketone', range: '', label: 'Blood Ketone', code: '2' },//Diabetes Profile
	{ value: '17', shortend: 'cK', range: '', label: 'CK', code: '2' },
	{ value: '18', shortend: 'ck_mb', range: '', label: 'CK-MB', code: '2' },
	{ value: '19', shortend: 'ldh', range: '135-214 U/L', label: 'LDH', code: '2' },
	{ value: '20', shortend: 'troponin_i', range: '', label: 'Troponin-I', code: '2' },
	{ value: '21', shortend: 'troponin_t', range: '< 14 pg/ml', label: 'Troponin-T', code: '2' },
	{ value: '22', shortend: 'd_dimer', range: '', label: 'D-Dimer', code: '2' },
	{ value: '23', shortend: 'myoglobin', range: '', label: 'Myoglobin', code: '2' },
	{ value: '24', shortend: 'hs_crp', range: '', label: 'hs CRP', code: '2' },//Cardiac Profile
	{ value: '25', shortend: 'total_protein', range: '', label: 'Total Protein', code: '2' },
	{ value: '26', shortend: 'albumin', range: '', label: 'Albumin', code: '2' },
	{ value: '27', shortend: 'globulin', range: '', label: 'Globulin', code: '2' },// T & DP
	{ value: '28', shortend: 'uric_acid', range: '155-357 mg/dl', label: 'Uric Acid', code: '2' },
	{ value: '29', shortend: 'crp', range: '', label: 'CRP', code: '2' },
	{ value: '30', shortend: 'amylase', range: '', label: 'Amylase', code: '2' },
	{ value: '31', shortend: 'calcium', range: '', label: 'Calcium', code: '2' },
	{ value: '32', shortend: 'phosphate', range: '', label: 'Phosphate', code: '2' },
	{ value: '33', shortend: 'phosphorous', range: '', label: 'Phosphorous', code: '2' },
	{ value: '34', shortend: 'magnesium', range: '', label: 'Magnesium', code: '2' },//Other Biochemistry Tests
]

export const TUMOUR = [
	{ value: '0', shortend: 'ca_125', range: '', label: 'CA 125', code: '3' },
	{ value: '1', shortend: 'ca_153', range: '', label: 'CA 153', code: '3' },
	{ value: '2', shortend: 'afp', range: '', label: 'AFP (a Feto Protein)', code: '3' },
	{ value: '3', shortend: 'cea', range: '', label: 'CEA', code: '3' },
	{ value: '4', shortend: 'psa_total', range: '', label: 'PSA (total)', code: '3' },
	{ value: '5', shortend: 'psa_free', range: '', label: 'PSA (Free)', code: '3' },
	{ value: '6', shortend: 'ifob_feces', range: '', label: 'IFOB (Feces)', code: '3' },
]

export const HORMONES = [
	{ value: '0', shortend: 't3_total', range: '', label: 'T3 (Total)', code: '4' },
	{ value: '1', shortend: 't3_free', range: '', label: 'T3 (Free)', code: '4' },
	{ value: '2', shortend: 't4_total', range: '', label: 'T4 (Total)', code: '4' },
	{ value: '3', shortend: 't4_free', range: '', label: 'T4 (Free)', code: '4' },
	{ value: '4', shortend: 'tsh', range: '', label: 'TSH', code: '4' },
	{ value: '5', shortend: 'lh_urine', range: '', label: 'LH (Urine)', code: '4' },
	{ value: '6', shortend: 'hcg', range: '', label: 'HCG', code: '4' },
]

export const URINEFOR = [
	{ value: '0', shortend: 're_analyzer', range: '', label: 'RE & Analyzer', code: '5' },
	{ value: '1', shortend: 're', range: '', label: 'RE', code: '5' },
	{ value: '2', shortend: 'albumin', range: '', label: 'Albumin', code: '5' },
	{ value: '3', shortend: 'sugar', range: '', label: 'Sugar', code: '5' },
	{ value: '4', shortend: 'urobilinogen', range: '', label: 'Urobilinogen', code: '5' },
	{ value: '5', shortend: 'urobilirubin', range: '', label: 'Urobilirubin', code: '5' },
	{ value: '6', shortend: 'ketone_bodies', range: '', label: 'Ketone bodies', code: '5' },
	{ value: '7', shortend: 'ucg', range: '', label: 'UCG', code: '5' },
	{ value: '8', shortend: 'microalbumin', range: '', label: 'Microalbumin', code: '5' },
]

export const CULTURE = [
	{ value: '0', shortend: 'csf', range: '', label: 'CSF', code: '6' },
	{ value: '1', shortend: 'blood', range: '', label: 'Blood', code: '6' },
	{ value: '2', shortend: 'urine', range: '', label: 'Urine', code: '6' },
	{ value: '3', shortend: 'sputum', range: '', label: 'Sputum', code: '6' },
	{ value: '4', shortend: 'swabs', range: '', label: 'Swabs', code: '6' },
]

export const MICROBIOLOGY = [
	{ value: '0', shortend: 'sputum_afb', label: 'Sputum  AFB', code: '7' },
	{ value: '1', shortend: 'sputum_gram_stain', label: 'Sputum Gram Stain', code: '7' },
	{ value: '2', shortend: 'pap_smear', label: 'Pap Smear', code: '7' },
	{ value: '3', shortend: 'semen_analysis', label: 'Semen Analysis', code: '7' },
]

export const STOOL_FOR = [
	{ value: '0', shortend: 'sputum_afb', label: 'RE', code: '8' },
	{ value: '1', shortend: 'occult_blood', label: 'Occult Blood', code: '8' },
	{ value: '2', shortend: 'reducing_sugar', label: 'Reducing Sugar', code: '8' },
]
export const RADIO = [
	{ value: '0', shortend: 'x-ray', label: 'X-Ray', code: '9' },
	{ value: '1', shortend: 'ct', label: 'CT', code: '9' },
	{ value: '2', shortend: 'mri', label: 'MRI', code: '9' },
	{ value: '3', shortend: 'usg', label: 'USG', code: '9' },
]


export const INVESTIGATION_TYPES = [
	{ value: 0, label: 'HAEMATOLOGY & COAGULATION', shortend: 'haemotology', data: HAEMATOLOGY },
	{ value: 1, label: 'SEROLOGY & IMMUNOLOGY', shortend: 'serology', data: SEROLOGY },
	{ value: 2, label: 'BIOCHEMISTRY', shortend: 'biochemistry', data: BIOCHEMISTRY },
	{ value: 3, label: 'TUMOUR MARKERS', shortend: 'tumour_markers', data: TUMOUR },
	{ value: 4, label: 'HORMONES', shortend: 'hormones', data: HORMONES },
	{ value: 5, label: 'URINE FOR', shortend: 'urine_for', data: URINEFOR },
	{ value: 6, label: 'CULTURE & SENSITIVITY', shortend: 'culture', data: CULTURE },
	{ value: 7, label: 'MICROBIOLOGY', shortend: 'microbiology', data: MICROBIOLOGY },
	{ value: 8, label: 'STOOL FOR', shortend: 'stool_for', data: STOOL_FOR },
	{ value: 9, label: 'Radio', shortend: 'radio', data: RADIO },

]

