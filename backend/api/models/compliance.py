from django.db import models
import datetime

class Compliance(models.Model):
    id = models.IntegerField(default=1)
    name = models.CharField('기준명', max_length=100, blank=False)
    category = models.CharField('평가기준 구분', max_length=100, blank=False)
    code = models.CharField('기준 코드', max_length=100, blank=False, primary_key=True, unique=True)
    alias = models.CharField('별칭', max_length=100, blank=False)
    year = models.SmallIntegerField('발표 년도', choices=list(zip(range(2015, 2050), range(2015, 2050))), default=datetime.datetime.today().year, blank=False)
    no = models.SmallIntegerField('등록 번호', default=1, blank=False)
    date = models.DateField('등록 일자', null=True, blank=True)

    class Meta:
        ordering = ['code']

    def __str__(self):
        return f'{self.name}({self.year}-{self.no})'

class ComplianceArea(models.Model):
    id = models.IntegerField(default=1)
    name = models.CharField('분야명', max_length=100, blank=True)
    code = models.CharField('분야 코드', max_length=100, blank=False, primary_key=True, unique=True)
    compliance_type = models.ForeignKey('Compliance', verbose_name='컴플라이언스', on_delete=models.CASCADE, default=None)
    compliance_code = models.CharField('기준', max_length=100, blank=False)
    alias = models.CharField('분야 별칭', max_length=100, blank=False)

    class Meta:
        ordering = ['code']

    def __str__(self):
        return self.code