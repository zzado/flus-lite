
module.exports = global.config = {
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
    
    EFI_PROJECT_AREALIST : [
        {value:'SRV', label: '서버'},
        {value:'DBM', label: '데이터베이스'},
        {value:'NET', label: '네트워크 장비'},
        {value:'FISM', label: '정보보호관리체계'},
        {value:'INF', label: '네트워크 인프라'},
        {value:'ISS', label: '정보보호시스템'},
        {value:'WEB', label: '웹 애플리케이션'},
        {value:'MOB', label: '모바일 애플리케이션'},
        {value:'HTS', label: 'HTS'},
    ],
    OPEN_PROJECT_AREALIST : [
        {value:'WEB', label: '웹 애플리케이션'},
        {value:'MOB', label: '모바일 애플리케이션'},
    ]

};