
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

  PROJECT_FIELD : {
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
    CATEGORY : [
      { value: '공개용', label: '공개용' },
      { value: '종합', label: '종합' },
    ]
  },

  INFRA_DEVICE_AREA_LIST : [
    'SRV',
    'DBM',
    'NET',
    'ISS',
  ],

    
    
  ASSET_FIELD_FOR_REALGRID : { 
    FISM : ["id", "num", "code",  "name", "asset_value", "operator", "assessors", "is_new", "manual_done",  "note"],
    INF : ["id", "num", "code",  "name", "asset_value", "operator", "assessors", "is_new", "manual_done",  "note"],
    SRV : ["id", "num", "code",  "name", "asset_value", "platform", "version", "hostname", "ip_url",  "operator", "assessors","is_new", "is_test", "manual_done", "note",],
    DBM : ["id", "num", "code",  "name", "asset_value", "platform", "version", "hostname", "ip_url",  "operator", "assessors","is_new", "is_test", "manual_done", "note",],
    NET : ["id", "num", "code",  "name", "asset_value", "platform", "version", "product_model", "hostname", "ip_url",   "operator", "assessors", "is_new", "is_test", "is_switch", "is_external", "backup_cycle", "pwd_change_cycle", "manual_done", "note",],
    ISS : ["id", "num", "code",  "name", "asset_value", "platform", "version", "product_model", "hostname", "ip_url",  "operator", "assessors","is_new", "is_test", "manual_done", "note",],
    MOB : ["id", "num", "code",  "name", "asset_value", "platform", "operator", "assessors", "is_new", "is_test", "is_server", "is_financial", "manual_done", "note"],
    WEB : ["id", "num", "code",  "name", "asset_value", "ip_url", "operator", "assessors", "is_new", "is_test", "is_financial", "is_https", "manual_done", "note"],
    HTS : ["id", "num", "code",  "name", "asset_value", "operator", "assessors", "is_new", "is_test", "is_financial", "manual_done",  "note"]
  },

  VUL_FIELD_FOR_REALGRID : { 
    SRV : ["vul_id","poc_id", "asset_code", "vulitem_code", "vulitem_name", "vulitem_description", "vulitem_checking_guide", "vulitem_judgment_guide", "vul_gathering_data", "vul_status", "vul_result", "poc_point", "poc_found_date", "poc_reported_date", "poc_patched_date", "poc_is_new", "poc_note"],

    DBM : ["vul_id","poc_id", "asset_code", "vulitem_code", "vulitem_name", "vulitem_description", "vulitem_checking_guide", "vulitem_judgment_guide", "vul_gathering_data", "vul_status", "vul_result", "poc_point", "poc_found_date", "poc_reported_date", "poc_patched_date", "poc_is_new", "poc_note"],

    NET : ["vul_id","poc_id", "asset_code", "vulitem_code", "vulitem_name", "vulitem_description", "vulitem_checking_guide", "vulitem_judgment_guide", "vul_gathering_data", "vul_status", "vul_result", "poc_point", "poc_found_date", "poc_reported_date", "poc_patched_date", "poc_is_new", "poc_note"],
    
    INF : ["vul_id","poc_id", "asset_code", "vulitem_code", "vulitem_name", "vulitem_description", "vulitem_checking_guide", "vulitem_judgment_guide", "vul_status", "vul_result", "poc_point", "poc_found_date", "poc_reported_date", "poc_patched_date", "poc_is_new", "poc_note"],

    ISS : ["vul_id","poc_id", "asset_code", "vulitem_code", "vulitem_name", "vulitem_description", "vulitem_checking_guide", "vulitem_judgment_guide",  "vul_status", "vul_result", "poc_point", "poc_found_date", "poc_reported_date", "poc_patched_date", "poc_is_new", "poc_note"],

    MOB : ["vul_id","poc_id", "asset_code", "vulitem_code", "vulitem_name", "vulitem_description", "vulitem_checking_guide", "vulitem_judgment_guide",  "vul_status", "vul_result", "poc_point", "poc_found_date", "poc_reported_date", "poc_patched_date", "poc_is_new", "poc_note"],

    WEB : ["vul_id","poc_id", "asset_code", "vulitem_code", "vulitem_name", "vulitem_description", "vulitem_checking_guide", "vulitem_judgment_guide",  "vul_status", "vul_result", "poc_point", "poc_found_date", "poc_reported_date", "poc_patched_date", "poc_is_new", "poc_note"],

    HTS : ["vul_id","poc_id", "asset_code", "vulitem_code", "vulitem_name", "vulitem_description", "vulitem_checking_guide", "vulitem_judgment_guide",  "vul_status", "vul_result", "poc_point", "poc_found_date", "poc_reported_date", "poc_patched_date", "poc_is_new", "poc_note"],
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
  },
    

    ASSET_MODEL_READABLE_NAME : {
        id: 'id',
        num: '자산번호',
        area_alias: '평가분야',
        code: '자산코드',
        name: '자산이름',
        assessors: '평가자',
        note: '비고',
        full_code: 'full_code',
        hostname: '호스트명',
        is_switch: '스위치 여부',
        is_external: '대외구간 연결여부',
        backup_cycle: '백업주기(일)',
        pwd_change_cycle: '비밀번호 변경주기(일)',
        ip_url: 'IP/URL',
        is_financial: '전자금융서비스 여부',
        is_https: 'HTTPS 여부',
        version: '버전',
        platform: '자산종류',
        platform_t: '자산종류(기타)',
        product_model: '제조사명',
        asset_value: '자산가치',
        operator: '담당자',
        progress: '평가 진행상황',
        is_test: '테스트 장비여부',
        is_server: '서버측 점검여부',
        is_new: '신규 여부',
        manual_done: '평가 완료여부',
        project: 'project'
    },
    

  ASSET_FIELD : {
    IS_SWITCH :[ 
      {value:true, label:'스위치'}, 
      {value:false, label:'라우터'} 
    ],
    IS_EXTERNAL :[ 
      {value:true, label:'외부망 연결'},
      {value:false, label:'외부망 미연결'} 
    ],

    IS_FINANCIAL :[ 
      {value:true, label:'전자금융서비스'},
      {value:false, label:'일반서비스'}
    ],

    IS_HTTPS :[
      {value:true, label:'HTTPS'},
      {value:false, label:'HTTP'}
    ],
    IS_TEST: [ 
      {value:true, label:'테스트'},
      {value:false, label:'운영'} 
    ],
    IS_SERVER : [ 
      {value:true, label:'서버측 점검'}, 
      {value:false, label:'서버측 미점검'} 
    ],
    IS_NEW: [ 
      {value:true, label:'신규'}, 
      {value:false, label:'기존'} ],
  },

  PROJECT_INIT_STATE :{
    name: '',
    category: '',
    compliance: '',
    area: [],
    assessors: [],
    start_date: '',
    end_date: '',
    client_company: '',
    assessment_company: '',
    note: '',
    allUserList : [],
    allComplianceList : [],
  },

  ASSET_INIT_STATE :{
    num : 1,
    name: '',
    assessors: '',
    operator: '',
    note: '',
    hostname: '',
    ip_url: '',
    version: '',
    product_model: '',
    platform: 'NONE',
    platform_t : '',
    is_new: true,
    is_switch: true,
    is_external: false,
    is_financial: true,
    is_https: false,
    is_test: false,
    is_server: true,
    asset_value: 3,
    pwd_change_cycle: 0,
    backup_cycle: 0,
    platformList:[],
  },

  VUL_INIT_STATE : 
  {
    id: 0,
    vulnerability_item: {
      full_code: '',
      code: '',
      name: '',
      risk: 0,
      checking_guide: '',
      judgment_guide: '',
      description: ''
    },
    pocs: [
    ],
    asset: {
      pk: 0,
      code: '',
      hostname: '',
      platform: '',
      platform_t: ''
    },
    status: '',
    auto_result: '',
    auto_result_reason: '',
    result: '',
    check_method: '',
    sampling: '',
    is_reported: false,
    is_patched: false,
    new_description: '',
    new_solution: '',
    gathering_data: '',
    is_test: false,
    needs_login: false,
    is_new: false,
    project: 0
  },
};



