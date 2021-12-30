from django.shortcuts import render
from django.views.generic.base import TemplateView
from rest_framework import response, status
from flus_lite import settings
from api.models import *

class ExportHTMLReport(TemplateView):
    template_name = "html-report-template.html"

    def get_context_data(self, **kwargs):
        #context = super().get_context_data(**kwargs)
        context = {}
        try:
            projectObj = Project.objects.get(pk=kwargs['projectId'])
        except Project.DoesNotExist:
            return response.Response(settings.COMMON_ERROR_MESSAGE, status=status.HTTP_400_BAD_REQUEST)
            
        if projectObj.get_compliance_area_obj(kwargs['areaAlias']) == None :
            return response.Response(settings.COMMON_ERROR_MESSAGE, status=status.HTTP_400_BAD_REQUEST)
            
        reportContextList = []
        assetObjs = Asset.objects.filter(project=projectObj, area_alias=kwargs['areaAlias'])
        for assetObj in assetObjs :
            reportContextList.append({'assetObj': assetObj, 'vulObjs' : Vulnerability.objects.filter(asset=assetObj, result='Y')})

        context['areaAlias'] = kwargs['areaAlias']
        context['areaAliasName'] = settings.AREA_CN_LISTS[kwargs['areaAlias']]
        context['projectCompliance'] = projectObj.compliance    
        context['reportContext'] = reportContextList
        
        return context
