export const assetColunms = [
    {
        "name": "id",
        "fieldName": "id",
        "type": "data",
        "width": 70,
        "visible": false,
        "header": {
            "text": "id"
        },
        "readOnly": true
    },
    {
        "name": "num",
        "fieldName": "num",
        "type": "data",
        "width": 40,
        "visible": false,
        "header": {
            "text": "자산번호"
        },
        "readOnly": true
    },
    {
        "name": "code",
        "fieldName": "code",
        "type": "data",
        "width": 40,
        "header": {
            "text": "자산코드"
        },
        "autoFilter": true,
        "sortable": true,
        "readOnly": true
    },
    {
        "name": "name",
        "fieldName": "name",
        "type": "data",
        "width": 120,
        "header": {
            "text": "자산이름"
        },
        "editor": {
            "type": "multiline",
            "altEnterNewLine": true
        },
        "styleName": "multiline-editor",
        "autoFilter": true,
        "sortable": false
    },
    {
        "name": "hostname",
        "fieldName": "hostname",
        "type": "data",
        "width": 120,
        "header": {
            "text": "호스트명"
        },
        "editor": {
            "type": "multiline",
            "altEnterNewLine": true
        },
        "styleName": "multiline-editor",
        "autoFilter": true,
        "sortable": false
    },
    {
        "name": "ip_url",
        "fieldName": "IP/URL",
        "type": "data",
        "width": 120,
        "header": {
            "text": "IP/URL"
        },
        "editor": {
            "type": "multiline",
            "altEnterNewLine": true
        },
        "styleName": "multiline-editor",
        "autoFilter": true,
        "sortable": false
    },
    {
        "name": "platform",
        "fieldName": "platform",
        "type": "data",
        "width": 80,
        "header": {
            "text": "자산종류"
        },
        "autoFilter": true,
        "sortable": false,
        "editor": {
            "type": "dropdown",
            "domainOnly": false,
            "textReadOnly": false,
            "values": [],
            "labels": []
        }
    },
    {
        "name": "platform_t",
        "fieldName": "platform_t",
        "type": "data",
        "width": 80,
        "header": {
            "text": "자산종류(기타)"
        },
        "editor": {
            "type": "multiline",
            "altEnterNewLine": true
        },
        "styleName": "multiline-editor",
        "autoFilter": true,
        "sortable": false
    },
    {
        "name": "product_model",
        "fieldName": "product_model",
        "type": "data",
        "width": 80,
        "header": {
            "text": "제조사/제품명"
        },
        "editor": {
            "type": "multiline",
            "altEnterNewLine": true
        },
        "styleName": "multiline-editor",
        "autoFilter": true,
        "sortable": false
    },
    {
        "name": "version",
        "fieldName": "version",
        "type": "data",
        "width": 40,
        "header": {
            "text": "버전"
        },
        "editor": {
            "type": "multiline",
            "altEnterNewLine": true
        },
        "styleName": "multiline-editor",
        "autoFilter": true,
        "sortable": false
    },
    {
        "name": "asset_value",
        "fieldName": "asset_value",
        "type": "data",
        "width": 40,
        "defaultValue": 5,
        "header": {
            "text": "자산가치"
        },
        "autoFilter": true,
        "sortable": false,
        "editor": {
            "type": "number",
            "integerOnly": true,
            "positiveOnly": true,
            "editFormat": 0
        },
        "numberFormat": 0
    },
    {
        "name": "is_financial",
        "fieldName": "is_financial",
        "type": "data",
        "width": 40,
        "defaultValue": "N",
        "header": {
            "text": "전자금융기반시설 여부(Y/N)"
        },
        "editor": {
            "booleanFormat": "N:Y:0",
            "emptyValue": false
        },
        "booleanFormat": "N:Y",
        "autoFilter": true,
        "sortable": false
    },
    {
        "name": "is_switch",
        "fieldName": "is_switch",
        "type": "data",
        "width": 40,
        "defaultValue": "Y",
        "header": {
            "text": "스위치 여부(Y/N)"
        },
        "editor": {
            "booleanFormat": "N:Y:0",
            "emptyValue": false
        },
        "booleanFormat": "N:Y",
        "autoFilter": true,
        "sortable": false
    },
    {
        "name": "is_external",
        "fieldName": "is_external",
        "type": "data",
        "width": 40,
        "defaultValue": "N",
        "header": {
            "text": "대외구간 연결여부(Y/N)"
        },
        "editor": {
            "booleanFormat": "N:Y:0",
            "emptyValue": false
        },
        "booleanFormat": "N:Y",
        "autoFilter": true,
        "sortable": false
    },
    {
        "name": "backup_cycle",
        "fieldName": "backup_cycle",
        "type": "data",
        "width": 40,
        "defaultValue": 0,
        "header": {
            "text": "백업주기(일)"
        },
        "autoFilter": true,
        "sortable": false,
        "editor": {
            "type": "number",
            "integerOnly": true,
            "positiveOnly": true,
            "editFormat": 0
        },
        "numberFormat": 0
    },
    {
        "name": "pwd_change_cycle",
        "fieldName": "pwd_change_cycle",
        "type": "data",
        "defaultValue": 0,
        "width": 40,
        "header": {
            "text": "비밀번호 변경주기(일)"
        },
        "autoFilter": true,
        "sortable": false,
        "editor": {
            "type": "number",
            "integerOnly": true,
            "positiveOnly": true,
            "editFormat": 0
        },
        "numberFormat": 0
    },
    {
        "name": "is_test",
        "fieldName": "is_test",
        "type": "data",
        "width": 70,
        "defaultValue": "운영",
        "header": {
            "text": "테스트 환경여부(테스트/운영)"
        },
        "editor": {
            "booleanFormat": "운영:테스트:0",
            "emptyValue": false
        },
        "booleanFormat": "운영:테스트",
        "autoFilter": true,
        "sortable": false
    },
    {
        "name": "is_https",
        "fieldName": "is_https",
        "type": "data",
        "width": 70,
        "defaultValue": "N",
        "header": {
            "text": "HTTPS 통신여부(Y/N)"
        },
        "editor": {
            "booleanFormat": "N:Y:0",
            "emptyValue": false
        },
        "booleanFormat": "N:Y",
        "autoFilter": true,
        "sortable": false
    },
    {
        "name": "is_server",
        "fieldName": "is_server",
        "defaultValue": "Y",
        "type": "data",
        "width": 70,
        "header": {
            "text": "서버측 평가여부(Y/N)"
        },
        "editor": {
            "booleanFormat": "N:Y:0",
            "emptyValue": false
        },
        "booleanFormat": "N:Y",
        "autoFilter": true,
        "sortable": false
    },
    {
        "name": "operator",
        "fieldName": "operator",
        "type": "data",
        "width": 70,
        "header": {
            "text": "담당자"
        },
        "editor": {
            "type": "multiline",
            "altEnterNewLine": true
        },
        "styleName": "multiline-editor",
        "autoFilter": true,
        "sortable": false
    },
    {
        "name": "assessors",
        "fieldName": "assessors",
        "type": "data",
        "width": 70,
        "header": {
            "text": "평가자"
        },
        "editor": {
            "type": "multiline",
            "altEnterNewLine": true
        },
        "styleName": "multiline-editor",
        "autoFilter": true,
        "sortable": false
    },
    {
        "name": "is_new",
        "fieldName": "is_new",
        "type": "data",
        "width": 70,
        "defaultValue": "신규",
        "header": {
            "text": "신규 평가여부(신규/기존)"
        },
        "editor": {
            "booleanFormat": "기존:신규:0",
            "emptyValue": false
        },
        "booleanFormat": "기존:신규",
        "autoFilter": true,
        "sortable": false
    },
    {
        "name": "note",
        "fieldName": "note",
        "type": "data",
        "width": 70,
        "header": {
            "text": "비고"
        },
        "editor": {
            "type": "multiline",
            "altEnterNewLine": true
        },
        "styleName": "multiline-editor",
        "autoFilter": true,
        "sortable": false
    },
    {
        "name": "manual_done",
        "fieldName": "manual_done",
        "defaultValue": "N",
        "type": "data",
        "width": 70,
        "header": {
            "text": "평가완료 여부(Y/N)"
        },
        "editor": {
            "booleanFormat": "N:Y:0",
            "emptyValue": false
        },
        "booleanFormat": "N:Y",
        "autoFilter": true,
        "sortable": false
    }
];

export const assetFields =[
    {
        "fieldName": "id",
        "dataType": "number"
        //"dataType": "number",
        //"subType": "uint"
    },
    {
        "fieldName": "code",
        "dataType": "text"
    },
    {
        "fieldName": "name",
        "dataType": "text"
    },
    {
        "fieldName": "hostname",
        "dataType": "text"
    },
    {
        "fieldName": "IP/URL",
        "dataType": "text"
    },
    {
        "fieldName": "platform",
        "dataType": "text"
    },
    {
        "fieldName": "platform_t",
        "dataType": "text"
    },
    {
        "fieldName": "product_model",
        "dataType": "text"
    },
    {
        "fieldName": "version",
        "dataType": "text"
    },
    {
        "fieldName": "asset_value",
        "dataType": "number",
        "subType": "uint"
    },
    {
        "fieldName": "is_financial",
        "dataType": "boolean",
        "booleanFormat": "N:Y:0"
    },
    {
        "fieldName": "is_switch",
        "dataType": "boolean",
        "booleanFormat": "N:Y:0"
    },
    {
        "fieldName": "is_external",
        "dataType": "boolean",
        "booleanFormat": "N:Y:0"
    },
    {
        "fieldName": "backup_cycle",
        "dataType": "number",
        "subType": "uint"
    },
    {
        "fieldName": "pwd_change_cycle",
        "dataType": "number",
        "subType": "uint"
    },
    {
        "fieldName": "is_test",
        "dataType": "boolean",
        "booleanFormat": "운영:테스트:0"
    },
    {
        "fieldName": "is_https",
        "dataType": "boolean",
        "booleanFormat": "N:Y:0"
    },
    {
        "fieldName": "is_server",
        "dataType": "boolean",
        "booleanFormat": "N:Y:0"
    },
    {
        "fieldName": "operator",
        "dataType": "text"
    },
    {
        "fieldName": "assessors",
        "dataType": "text"
    },
    {
        "fieldName": "is_new",
        "dataType": "boolean",
        "booleanFormat": "기존:신규:0"
    },
    {
        "fieldName": "note",
        "dataType": "text"
    },
    {
        "fieldName": "manual_done",
        "dataType": "boolean",
        "booleanFormat": "N:Y:0"
    }
]

export const initData = [{
    "code": "V123",
    "name": "전자금융기반시설 프로젝트2",
    "assessors": "김개똥",
    "note": "",
    "hostname": "test-host",
    "is_switch": true,
    "is_external": false,
    "backup_cycle": 0,
    "pwd_change_cycle": 0,
    "ip_url": "",
    "is_financial": false,
    "is_https": false,
    "version": "",
    "platform": "IOS",
    "platform_t": "",
    "product_model": "",
    "asset_value": 1,
    "operator": "",
    "is_test": false,
    "is_server": false,
    "is_new": false,
    "manual_done": false,
    "__rowState" : "created",
}]
