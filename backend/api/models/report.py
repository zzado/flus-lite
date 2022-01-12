from django.db import models

class Report(models.Model):
    project = models.ForeignKey('Project', related_name='report', on_delete=models.CASCADE)
    area_alias = models.CharField('분야', max_length=10, null=False, blank=False)
    result = models.TextField('결과요약', blank=True, null=False)
    reg_date = models.DateField('작성일', blank=False)