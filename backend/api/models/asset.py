from django.db import models
from api.models.compliance import ComplianceArea
from api.models.vulnerability_item import VulnerabilityItem
from api.models.vulnerability import Vulnerability

class AssetAbstractModel(models.Model):
    num = models.IntegerField('자산번호',null=False, blank=False )
    project = models.ForeignKey('Project', verbose_name='프로젝트', on_delete=models.CASCADE)
    area_alias = models.CharField('분야', max_length=10, null=False, blank=False, choices=(('FISM', '정보보호관리체계'), ('SRV', '서버'),('DBM', '데이터베이스'), ('INF', '네트워크 인프라'),('NET', '네트워크 장비'), ('ISS', '정보보호시스템'),('WEB', '웹 애플리케이션'),('MOB', '모바일 애플리케이션'), ('HTS', 'HTS')))
    code = models.CharField('자산코드', max_length=100, null=False, blank=False, default='')
    name = models.CharField('업무명/용도', null=False, blank=False, max_length=100, default='')
    assessors = models.CharField('평가자', null=True, blank=True, max_length=100, default='')
    note = models.TextField('비고', blank=True, null=True, default='')

    full_code = models.CharField('자산전체코드', null=True, max_length=100, unique=True)

    # regacy field
    parents = models.CharField('기준자산', null=True, max_length=10)

    class Meta:
        abstract = True
        ordering = ['num']

class HardwareAssetModel(models.Model):
    hostname = models.CharField('호스트명', blank=True, max_length=100, default='')
    is_switch = models.BooleanField('스위치/라우터 여부', blank=True, default=True, choices=((True, '스위치'), (False, '라우터')))
    is_external = models.BooleanField('대외구간 연결', blank=True, default=False, choices=((False, '아니오'),(True, '예')))
    backup_cycle = models.IntegerField('백업주기(일)', blank=True, default=0)
    pwd_change_cycle = models.IntegerField('비밀번호변경주기(일)', blank=True, default=0)

    class Meta:
        abstract = True

class ApplicationAssetModel(models.Model):
    ip_url = models.CharField('IP/URL', blank=True, max_length=200, default='')
    is_financial = models.BooleanField('전자금융서비스 여부', default=False, choices=((False, '아니오'),(True, '예')))
    is_server = models.BooleanField('서버측 점검 여부', default=False, choices=((False, '아니오'),(True, '예')))
    is_https = models.BooleanField('HTTPS 적용 여부', default=False, choices=((False, '아니오'),(True, '예')))

    class Meta:
        abstract = True

class Asset(AssetAbstractModel, HardwareAssetModel, ApplicationAssetModel):
    version = models.CharField('버전', null=True, blank=True, max_length=100, default='')
    platform = models.CharField('자산종류', max_length=20, null=False, blank=False, default='NONE')
    platform_t = models.CharField('자산세부종류', max_length=100, blank=True, null=True, default='',)
    product_model = models.CharField('제조사/제품명', max_length=100,blank=True,default='',)
    asset_value = models.IntegerField('자산가치', default=3, choices=((1, 1),(2, 2),(3, 3),(4, 4),(5, 5),))
    operator = models.CharField('담당자',max_length=50,blank=True,null=True,default='')
    progress = models.PositiveSmallIntegerField('진행단계', choices=((1, '초기단계(1)'),(2, '스캔준비(2)'),(3, '스캔완료(3)'),(4, '확인점검(4)'),(5, '점검완료(5)'),),default=1, null=True)
    is_test = models.BooleanField('테스트환경 여부', default=False, choices=((False, '아니오'),(True, '예')))
    is_server = models.BooleanField('서버측 점검 여부',default=False, choices=((False, '아니오'),(True, '예')))
    is_new = models.BooleanField('신규 여부', default=True, choices=((False, '아니오'),(True, '예')))
    manual_done = models.BooleanField('평가완료 여부', default=False)

    # legacy fields
    gubun = models.CharField('자산구분',max_length=20, blank=False, default='NONE',choices=(('NONE', '-----------'),))
    instance_name = models.CharField('인스턴스명',max_length=100,blank=True,null=True,)
    

    def __str__(self):
        return f'{self.code} : {self.name}'

    def init_vulobjs(self):
        print('init called')
        projectObj = self.project
        compAreaObj = projectObj.get_compliance_area_obj(self.area_alias)

        vulItemObjs = VulnerabilityItem.objects.filter(compliance_area_type=compAreaObj, platform=self.platform)
        
        # 네트워크장비만 다른분야랑 다름.. 확인 필요
        if self.area_alias == 'NET' :
            if self.is_switch == False :    # 라우터면
                vulItemObjs = vulItemObjs.filter(is_router=True)
            else :    # 스위치면
                vulItemObjs = vulItemObjs.filter(is_switch=True)

        if self.area_alias == 'WEB' :
            if self.is_financial == False :
                vulItemObjs = vulItemObjs.filter(is_financial=False)
            
            if self.is_https == False :
                vulItemObjs = vulItemObjs.filter(is_https=False)

        if self.area_alias == 'MOB' :
            if self.is_financial == False :
                vulItemObjs = vulItemObjs.filter(is_financial=False)
            
            if self.is_server == False :
                vulItemObjs = vulItemObjs.filter(is_server=False)

        vulObjs = []
        for vulItem in vulItemObjs:
            vulObjs.append(Vulnerability(project=projectObj, asset=self, vulnerability_item=vulItem, status= f'예) {vulItem.default_status}' if vulItem.default_status != "" else ""))
        print(len(vulObjs))
        Vulnerability.objects.bulk_create(vulObjs)
        return True
    
    def reset_vulobjs(self):
        projectObj = self.project
        compAreaObj = projectObj.get_compliance_area_obj(self.area_alias)
        vulItemObjs = VulnerabilityItem.objects.filter(compliance_area_type=compAreaObj, platform=self.platform)
        if self.area_alias == 'NET' :
            if self.is_switch == False :    # 라우터면
                vulItemObjs = vulItemObjs.filter(is_router=True)
            else :    # 스위치면
                vulItemObjs = vulItemObjs.filter(is_switch=True)

        if self.area_alias == 'WEB' :
            if self.is_financial == False :
                vulItemObjs = vulItemObjs.filter(is_financial=False)
            
            if self.is_https == False :
                vulItemObjs = vulItemObjs.filter(is_https=False)

        if self.area_alias == 'MOB' :
            if self.is_financial == False :
                vulItemObjs = vulItemObjs.filter(is_financial=False)
            
            if self.is_server == False :
                vulItemObjs = vulItemObjs.filter(is_server=False)

        newAssetVulItemDict = { _.code : _  for _ in vulItemObjs }

        bulk_list = []
        vulObjs = Vulnerability.objects.filter(asset=self.id)
        for vulObj in vulObjs :
            vulItemKey = vulObj.vulnerability_item.code
            if vulItemKey in newAssetVulItemDict.keys() :
                vulObj.vulnerability_item = newAssetVulItemDict[vulItemKey]
                vulObj.save()
                del newAssetVulItemDict[vulItemKey]
                print(f'[*] Change vulItem {vulObj}')
            else :
                print(f'[*] Delete {vulObj}')
                vulObj.delete()

        for vulCode in newAssetVulItemDict:
            vulItem = newAssetVulItemDict[vulCode]
            bulk_list.append(Vulnerability(project=projectObj, asset=self, vulnerability_item=vulItem, status= f'예) {vulItem.default_status}' if vulItem.default_status != "" else ""))
            print(f'[*] New vulItem {vulObj}')

        return True