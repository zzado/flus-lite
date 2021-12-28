from django.shortcuts import render
from django.views.generic.base import TemplateView
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
            #return response.Response(settings.COMMON_ERROR_MESSAGE, status=status.HTTP_400_BAD_REQUEST)
            print('error')

        if projectObj.get_compliance_area_obj(kwargs['areaAlias']) == None :
            print('error2')
        
        reportContextList = []
        assetObjs = Asset.objects.filter(project=projectObj, area_alias=kwargs['areaAlias'])
        for assetObj in assetObjs :
            reportContextList.append({'assetObj': assetObj, 'vulObjs' : Vulnerability.objects.filter(asset=assetObj, result='Y')})

        context['areaAlias'] = kwargs['areaAlias']
        context['areaAliasName'] = settings.AREA_CN_LISTS[kwargs['areaAlias']]
        context['projectCompliance'] = projectObj.compliance    
        context['reportContext'] = reportContextList
        
        return context
        
# # Create your views here.
# def exportDetailHTML(self, action, form, taskID) :
#         AsyncTask.objects.filter(complete="1").delete()
#         task = AsyncTask.objects.get(pk=taskID)

#         projectObj = Project.objects.get(id=self.kwargs['project'])
#         compliances = []
#         for _ in projectObj.compliance.all() :
#             compliances.append(_)
#         areaAlias = self.kwargs['area']
#         assetObjs = form.cleaned_data['assets']
#         exclude_report = form.cleaned_data['exclude_report']

#         unixTime = time.strftime("%Y%m%d%H%M%S", time.localtime(time.time()))

#         htmlTemplate = 'reports/report_area_detail.html'
#         resultFilePath = Path(f'{settings.BASE_DIR}/temp/{areaAlias}_detail_{unixTime}.html')
        
#         task.update(_message = "결과 렌더링 중입니다.", _progress = "20")

#         context = dict()
#         context['project']= projectObj
#         context['current_area_alias']= areaAlias
#         context['current_area_name']= settings.AREA_CN_LISTS[areaAlias]
#         context['assets']= assetObjs
#         context['compliances']= compliances
#         context['exclude_report']= exclude_report
#         context['today']= date.today()
#         response = render(self.request, htmlTemplate, context)
#         response = embed_imagefiles(response)

#         task.update(_message = "응답 준비 중입니다.", _progress = "80")

#         if Report.objects.filter(Q(area_alias=areaAlias)&Q(project=projectObj)).exists() and projectObj.category == '종합':
#             vul_total_result = Report.objects.get(Q(area_alias=areaAlias)&Q(project=projectObj))
#             total_result_summary = literal_eval(vul_total_result.result)
#             documentInfo = str(total_result_summary['문서 정보']['문서 번호'][0])
#             if areaAlias in ["FISM", "INF"] :
#                 documentInfo = f'{documentInfo[:-1]}-별첨2] {settings.AREA_CN_LISTS[areaAlias]}'
#             else :
#                 documentInfo = f'{documentInfo[:-1]}-별첨1] {settings.AREA_CN_LISTS[areaAlias]}'
#         else :
#             documentInfo =  '공개용 홈페이지' if projectObj.category == '공개용' else f'{settings.AREA_CN_LISTS[areaAlias]}'

#         dnFileName = f'{documentInfo} 취약점 및 조치방법.html'

#         with open(resultFilePath, 'wb') as f:
#             f.write(response.content)
        
#         newFile = ResultFile()
#         newFile.update(_file_path=resultFilePath, _taskID=taskID, _down_name=dnFileName, _mode="download")
#         task.update(_progress = "100", _complete = "1")
#         return True
