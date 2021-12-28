
module.exports = global.config = {
    AREA_SIGNATURE : {"FISM": "M", "SRV": "S", "DBM": "D", "INF": "I", "NET": "N", "ISS": "P", "WEB": "W", "MOB": "V", "HTS": "H", "PEN": "PT", "CSP": "CSP", "SBO": "SBO"},

    AREA_RNAME : {
        'FISM': '정보보호관리체계',
        'SRV': '서버',
        'DBM': '데이터베이스',
        'NET': '네트워크 장비',
        'INF': '네트워크 인프라',
        'ISS': '정보보호시스템',
        'WEB': '웹 애플리케이션',
        'MOB': '모바일 애플리케이션',
        'HTS': 'HTS',
    },
    PROJECT_VALID_CHECK_FIELDS : {
        'name': '프로젝트명',
        'category': '종합/공개용',
        'compliance': '평가기준',
        'area': '평가분야',
        'start_date': '프로젝트 시작일',
        'end_date': '프로젝트 종료일',
        'client_company': '평가대상 기관',
        'assessment_company': '평가 기관',
    },
    ASSET_VALID_CHECK_FIELDS : {
        'num': '자산번호',
        'name': '자산명',
        'is_new': '신규/기존',
        'is_test': '테스트/운영',
        'platform': '자산종류',
        'asset_value': '자산가치',
    },
    
    EFI_PROJECT_AREALIST : [
        {value:'FISM', label: '정보보호관리체계'},
        {value:'SRV', label: '서버'},
        {value:'DBM', label: '데이터베이스'},
        {value:'NET', label: '네트워크 장비'},
        {value:'INF', label: '네트워크 인프라'},
        {value:'ISS', label: '정보보호시스템'},
        {value:'WEB', label: '웹 애플리케이션'},
        {value:'MOB', label: '모바일 애플리케이션'},
        {value:'HTS', label: 'HTS'},
    ],
    OPEN_PROJECT_AREALIST : [
        {value:'WEB', label: '웹 애플리케이션'},
        {value:'MOB', label: '모바일 애플리케이션'},
    ],

    INFRA_DEVICE_AREA_LIST : [
        'SRV',
        'DBM',
        'NET',
        'ISS',
    ],
    
    ASSET_GRID_FIELD : { 
        FISM : ["id", "num", "code",  "name", "asset_value", "operator", "assessors", "is_new", "manual_done",  "note"],
        INF : ["id", "num", "code",  "name", "asset_value", "operator", "assessors", "is_new", "manual_done",  "note"],
        SRV : ["id", "num", "code",  "name", "asset_value", "platform", "version", "hostname", "ip_url",  "operator", "assessors","is_new", "is_test", "manual_done", "note",],
        DBM : ["id", "num", "code",  "name", "asset_value", "platform", "version", "hostname", "ip_url",  "operator", "assessors","is_new", "is_test", "manual_done", "note",],
        NET : ["id", "num", "code",  "name", "asset_value", "platform", "version", "product_model", "hostname", "ip_url",   "operator", "assessors", "is_new", "is_test", "is_switch", "is_external", "backup_cycle", "pwd_change_cycle", "manual_done", "note",],
        ISS : ["id", "num", "code",  "name", "asset_value", "platform", "version", "product_model", "hostname", "ip_url",  "operator", "assessors","is_new", "is_test", "manual_done", "note",],
        MOB : ["id", "num", "code",  "name", "asset_value", "platform", "operator", "assessors", "is_new", "is_test", "is_financial", "manual_done", "note"],
        WEB : ["id", "num", "code",  "name", "asset_value", "ip_url", "operator", "assessors", "is_new", "is_test", "is_financial", "is_https", "manual_done", "note"],
        HTS : ["id", "num", "code",  "name", "asset_value", "operator", "assessors", "is_new", "is_test", "is_financial", "manual_done",  "note"]
    },

    VUL_GRID_FIELD : { 
 
        SRV : ["vul_id","poc_id", "asset_code", "vulitem_code", "vulitem_name", "vulitem_description", "vulitem_checking_guide", "vulitem_judgment_guide", "vul_gathering_data", "vul_status", "vul_result", "poc_point", "poc_found_date", "poc_reported_date", "poc_patched_date", "poc_is_new", "poc_note"],

        DBM : ["vul_id","poc_id", "asset_code", "vulitem_code", "vulitem_name", "vulitem_description", "vulitem_checking_guide", "vulitem_judgment_guide", "vul_gathering_data", "vul_status", "vul_result", "poc_point", "poc_found_date", "poc_reported_date", "poc_patched_date", "poc_is_new", "poc_note"],

        NET : ["vul_id","poc_id", "asset_code", "vulitem_code", "vulitem_name", "vulitem_description", "vulitem_checking_guide", "vulitem_judgment_guide", "vul_gathering_data", "vul_status", "vul_result", "poc_point", "poc_found_date", "poc_reported_date", "poc_patched_date", "poc_is_new", "poc_note"],
        //SRV : ["vul_id","poc_id", "asset_code", "asset_hostname", "asset_platform", "vulitem_name",  "vulitem_code", "vulitem_description", "vulitem_checking_guide", "vulitem_judgment_guide", "vul_gathering_data", "vul_status", "poc_point", "poc_found_date", "poc_found_date", "poc_reported_date", "poc_patched_date", "poc_is_new", "poc_note"],
        
        INF : ["id", "num", "code",  "name", "asset_value", "operator", "assessors", "is_new", "manual_done",  "note"],

        ISS : ["id", "num", "code",  "name", "asset_value", "platform", "version", "product_model", "hostname", "ip_url", "operator", "assessors","is_new", "is_test", "manual_done", "note",],
        MOB : ["id", "num", "code",  "name", "asset_value", "platform", "operator", "assessors", "is_new", "is_test", "is_financial", "manual_done", "note"],
        WEB : ["id", "num", "code",  "name", "asset_value", "ip_url", "operator", "assessors", "is_new", "is_test", "is_financial", "is_https", "manual_done", "note"],
        HTS : ["id", "num", "code",  "name", "asset_value", "operator", "assessors", "is_new", "is_test", "is_financial", "manual_done",  "note"]
    },

    VUL_FIELD : {
        RESULT :[
            {value: 'Y', label: '취약'},
            {value: 'N', label: '양호'},
            {value: 'NA', label: 'NA'},
            {value: '', label: '미정'}
        ],
        IS_REPROTED : [
            {value: true, label: '전달'},
            {value: false, label: '미전달'}
        ],
        IS_PATCHED : [
            {value: true, label: '조치'},
            {value: false, label: '미조치'}
        ],
        IS_NEW : [
            {value: true, label: '신규'},
            {value: false, label: '기존'}
        ],
    }  
    

};
