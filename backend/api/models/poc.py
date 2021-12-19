from django.db import models


class POC(models.Model):
    result = models.CharField('취약여부', max_length=10, default='')
    auto_result = models.CharField('자동판단결과', max_length=10, default='')
    vulnerability = models.ForeignKey('Vulnerability', related_name='pocs', on_delete=models.CASCADE,)
    point = models.TextField('취약항목', default='')
    found_date = models.DateField('등록일자', null=True, blank=True)
    is_reported = models.BooleanField('전달', default=False)
    reported_date = models.DateField('전달일자',null=True,blank=True)
    is_patched = models.BooleanField('조치확인', default=False)
    patched_date = models.DateField('조치확인일자',null=True,blank=True)
    is_new = models.BooleanField('신규여부(신규/기존)',default=True,)
    note = models.TextField('비고', blank=True, default='')

    class Meta:
        ordering = ['-found_date']


