from django.shortcuts import render
from django.views.generic.base import TemplateView
from rest_framework import response, status
from flus_lite import settings
from api.models import *
from rest_framework import status, response, views

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


from docxtpl import DocxTemplate
from django.http import HttpResponse
from urllib.parse import quote
import os, io, time
from api.views.statistics import getAreaStatistic
from .models import reportDefaultData

class ExportDocxAreaReport(views.APIView):
    def get(self, request, *args, **kwargs):
        projectId = kwargs['projectId']
        areaAlias = kwargs['areaAlias']
        
        try :
            projectObj = Project.objects.get(pk=projectId)
        except Project.DoesNotExist:
            return response.Response(settings.COMMON_ERROR_MESSAGE, status=status.HTTP_400_BAD_REQUEST)
            
        docxContext = getAreaStatistic(projectObj, areaAlias)
        docxContext['vulYInfoIncludeAssetCount'] = docxContext['vulYInfoIncludeAssetCount'][:10]
        docxContext['vulYInfoIncludeAssetCountExceptPatch'] = docxContext['vulYInfoIncludeAssetCountExceptPatch'][:10]
        
        print(projectObj.client_company)
        if projectObj.category == '공개용':
            docxContext['문서제목'] = f'{projectObj.client_company} 공개용 애플리케이션 보안 취약점 평가결과'
        else :
            docxContext['문서제목'] = settings.AREA_CN_LISTS[areaAlias]
        docxContext['문서번호'] = '첨부1'
        docxContext['평가분야'] = settings.AREA_CN_LISTS[areaAlias]
        docxContext['출력일자'] = time.strftime("%Y.%m.%d.", time.localtime(time.time()))
        docxContext['평가구분'] = projectObj.category
        docxContext['평가기준'] = [f'「전자금융기반시설 보안 취약점 평가기준({projectObj.compliance.year}-{projectObj.compliance.no}호, {projectObj.compliance.year-1}.12.)」 준용']
        
        docxContext = {**docxContext, **reportDefaultData[areaAlias]}
        

        DOCX_TEMPLATE_PATH =  os.path.join(settings.SUBFILES_ROOT, 'area-docx.docx') 
        docxObj = DocxTemplate(DOCX_TEMPLATE_PATH)
        docxObj.render(docxContext)

        fp_image1, fp_image2 = self.makeAreaChartForDocx(docxContext, areaAlias)
        if areaAlias == 'INF' :
            docxObj.replace_pic('chart2.png', fp_image2)
        elif areaAlias != 'FISM'  :
            docxObj.replace_pic('chart1.png', fp_image1)
            docxObj.replace_pic('chart2.png', fp_image2)
        
        with io.BytesIO() as fp :
            docxObj.save(fp)
            fp.seek(0)
            docxBinData = fp.read()

        responseObj = HttpResponse(docxBinData, content_type='application/zip')
        #responseObj['Content-Disposition'] = f"attachment; filename*=UTF-8 ''{quote(docxContext['문서제목'])}.docx"
        
        #response['Content-Disposition'] = f"attachment; filename*=UTF-8''{quote(downName)}"
        return responseObj


    def makeAreaChartForDocx(self, docxContext, areaAlias) :
        import numpy, time
        import matplotlib, matplotlib.font_manager as font_manager, matplotlib.pyplot as plt, matplotlib.ticker as mtick

        matplotlib.use('Agg')
        
        font_manager.fontManager.addfont(os.path.join(settings.SUBFILES_ROOT, 'Fonts/malgun.ttf'))
        font_manager.fontManager.addfont(os.path.join(settings.SUBFILES_ROOT, 'Fonts/malgunbd.ttf'))
        font_manager.fontManager.addfont(os.path.join(settings.SUBFILES_ROOT, 'Fonts/malgunsl.ttf'))
        fp_image1 = None
        fp_image2 = None

        plt.rcParams["font.family"] = 'Malgun Gothic'
        plt.rcParams["font.size"] = '15'
        plt.rcParams["figure.figsize"] = (10,4.5)
        fig, ax = plt.subplots()
        ax.yaxis.set_major_formatter(mtick.FormatStrFormatter('%d'))

        x = ['매우낮음(1)','낮음(2)','보통(3)','높음(4)','매우높음(5)']
        if areaAlias != 'FISM' :
            y = list(docxContext['assetCountByAssetVaule'].values())
            for i, v in enumerate(x) :
                plt.text(v, y[i], y[i], fontsize=13, color='#000000', horizontalalignment='center', verticalalignment='bottom')

            plt.bar(x, y, label='자산')
            plt.legend()
            plt.yticks([])
            plt.tight_layout()
            fp_image1 = io.BytesIO()
            plt.savefig(fp_image1)
            plt.close()
            fp_image1.seek(0)
        

        plt.rcParams["font.family"] = 'Malgun Gothic'
        plt.rcParams["font.size"] = '15'
        plt.rcParams["figure.figsize"] = (10,5)
        fig, ax = plt.subplots()
        ax.yaxis.set_major_formatter(mtick.FormatStrFormatter('%d'))

        fp_image2 = io.BytesIO()

        if(docxContext['vulYCountByAllAsset'] != docxContext['vulYCountByAllAssetExceptPatch']) :
            y1 = list(docxContext['vulYCountExceptPatcByRisk'].values())
            y2 = list(docxContext['vulYCountByRisk'].values())

            loc_bar= numpy.arange(len(x))
            ax.bar(loc_bar-0.15, y1, label='조치후', width=0.28, color='#A4A4A4')
            ax.bar(loc_bar+0.15, y2, label='분석시', width=0.28)

            for i, v in enumerate(loc_bar+0.15,) :
                plt.text(v, y2[i], y2[i], fontsize=13, color='#000000', horizontalalignment='center', verticalalignment='bottom')

            for i, v in enumerate(loc_bar-0.15,) :
                plt.text(v, y1[i], y1[i], fontsize=13, color='#000000', horizontalalignment='center', verticalalignment='bottom')

            plt.xticks(loc_bar, x)
            plt.yticks([])
            plt.tight_layout()
            plt.legend()
            
            plt.savefig(fp_image2)
            plt.close()
        else :
            y = list(docxContext['vulYCountByRisk'].values())
            for i, v in enumerate(x) :
                plt.text(v, y[i], y[i], fontsize=13, color='#000000', horizontalalignment='center', verticalalignment='bottom')

            plt.bar(x, y, label='취약점')
            plt.legend()
            plt.yticks([])
            plt.tight_layout()

            plt.savefig(fp_image2)
            plt.close()
        
        fp_image2.seek(0)
        return fp_image1, fp_image2