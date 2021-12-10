from django.db import models

class Project(models.Model):
    name = models.CharField('프로젝트명', max_length=100)
    compliance = models.ForeignKey('Compliance', verbose_name='평가기준', blank=False, on_delete=models.CASCADE)
    category = models.CharField('평가구분', max_length=100, blank=True, choices=( ('종합', '종합'), ('공개용', '공개용'), ), default='종합')
    area = models.ManyToManyField('ComplianceArea', verbose_name= '평가분야', blank=False)
    start_date = models.DateField('시작일', blank=False)
    end_date = models.DateField('종료일', blank=False)
    assessors = models.ManyToManyField('auth.User', blank=True, verbose_name='프로젝트 참여자',)
    client_company = models.CharField('대상기관', max_length=100, blank=False)
    assessment_company = models.CharField('평가기관', max_length=100, blank=False)
    note = models.TextField('비고', blank=True)
    
    # legacy fields
    document_num = models.CharField('문서번호', max_length=100, blank=True, null=True)
    man_day = models.SmallIntegerField('적수', blank=True, null=True)
    
    class Meta:
        ordering = ['id']
        
    def __str__(self):
        return self.name

    def get_compliance_area_obj(self, areaAlias):
        compAreaObjs = self.area.all()
        for compAreaObj in compAreaObjs :
            if compAreaObj.alias == areaAlias : return compAreaObj
        return None