from rest_framework import generics, mixins, status, response, views
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from api.serializers import *
from api.models import *
from flus_lite import settings

class AreaDocxContextApi(views.APIView):
    def get(self, request, *args, **kwargs):
        projectId = kwargs['projectId']
        areaAlias = kwargs['areaAlias']
        
        try :
            projectObj = Project.objects.get(pk=projectId)
        except Project.DoesNotExist:
            return response.Response(settings.COMMON_ERROR_MESSAGE, status=status.HTTP_400_BAD_REQUEST)
            
        print(projectObj)
        # 
        
        assetObjs = projectObj.assets.filter(area_alias=areaAlias)
        vulObjs = projectObj.vuls.filter(asset__in=assetObjs)
        vulYObjs = vulObjs.filter(result='Y')
        
        vulYExceptPatchObjs = vulYObjs.filter(is_patched=False)
        
        newAssetObjs = assetObjs.filter(is_new=True)
        newVulObjs = vulObjs.filter(asset__in=newAssetObjs)
        newVulYObjs = newVulObjs.filter(result='Y')
        
        oldAssetObjs = assetObjs.filter(is_new=False)
        oldVulObjs = vulObjs.filter(asset__in=oldAssetObjs)
        oldVulYObjs = oldVulObjs.filter(result='Y')
        

        # 자산가치별 자산 수
        assetCountByAssetVaule = {
            1: assetObjs.filter(asset_value=1).count(),
            2: assetObjs.filter(asset_value=2).count(),
            3: assetObjs.filter(asset_value=3).count(),
            4: assetObjs.filter(asset_value=3).count(),
            5: assetObjs.filter(asset_value=3).count(),
        }

        # 평가항목 수
        vulCount = vulObjs.count()
        
        # 취약점 수
        vulYCount = vulYObjs.count()
        
        # 취약점 종류 수
        vulCodeCount = vulYObjs.values_list('vulnerability_item__code').distinct().count()
        
        # 취약률
        vulRate = round(vulYCount/vulCount * 100, 1)
        
        # 패치된 취약점을 제외한 취약점 수
        vulYCountExceptPatch = vulYExceptPatchObjs.count()
        # 패치된 취약점을 제외한 취약점 종류 수
        vulCodeCountExceptPatch = vulYExceptPatchObjs.values_list('vulnerability_item__code').distinct().count()
        vulRateExceptPatch = round(vulYCountExceptPatch/vulCount * 100, 1)
        
        # 취약점 별 자산수
        from django.db.models import Count
        vulCodeIncludeAssetCount = vulYObjs.values('vulnerability_item__code', 'vulnerability_item__name', 'vulnerability_item__risk').distinct().annotate(vulnerable_asset_count=Count('asset')).order_by('-vulnerability_item__risk', '-vulnerable_asset_count')

        # 신규 자산수
        newAssetCount = newAssetObjs.count()
        
        # 신규 자산의 평가항목 수
        newVulCount = newVulObjs.count()
        
        # 기존 자산 수
        oldAssetCount = oldAssetObjs.count()
        
        # 기존 자산의 평가항목 수
        oldVulCount = oldVulObjs.count()
        
        from django.db.models import Sum
        # 평가 지수 :: (1 - 평가항목들의 위험도 합 / 취약항목들의 위험도 합) * 100
        assessmentScore = round((1-vulYObjs.aggregate(Sum('vulnerability_item__risk')).get('vulnerability_item__risk__sum', 0)/vulObjs.aggregate(Sum('vulnerability_item__risk')).get('vulnerability_item__risk__sum'))*100, 1)
        print(assessmentScore)

        # 신규 자산에 대한 평가 지수 :: (1 - 평가항목들의 위험도 합 / 취약항목들의 위험도 합) * 100
        newAssessmentScore = round((1-newVulYObjs.aggregate(Sum('vulnerability_item__risk')).get('vulnerability_item__risk__sum', 0)/newVulObjs.aggregate(Sum('vulnerability_item__risk')).get('vulnerability_item__risk__sum'))*100, 1)
        print(newAssessmentScore)
        
        # 기존 자산에 대한 평가 지수
        oldAssessmentScore = round((1-oldVulYObjs.aggregate(Sum('vulnerability_item__risk')).get('vulnerability_item__risk__sum', 0)/oldVulObjs.aggregate(Sum('vulnerability_item__risk')).get('vulnerability_item__risk__sum',1))*100, 1)
        print(oldAssessmentScore)
        
        # 평가 등급 :: 1등급-(90 ~ 100), 2등급-(80 ~ 89), 3등급-(70 ~ 79), 4등급-(60 ~ 69), 5등급-(0 ~ 59)
        



        docxContext={}
        docxContext['대상기관'] = projectObj.client_company
        docxContext['평가_기준'] = projectObj.compliance
        docxContext['위험도별_자산수'] = assetCountByAssetVaule
        docxContext['총_자산수'] = assetObjs.count()

        docxContext['평가_항목수'] = vulCount
        docxContext['취약점_수'] = vulYCount
        docxContext['취약점_종류'] = vulCodeCount
        docxContext['취약률'] = vulRate

        docxContext['AP_취약점_수'] = vulYCountExceptPatch
        docxContext['AP_취약점_종류'] = vulCodeCountExceptPatch        
        docxContext['AP_취약률'] = vulRateExceptPatch

        docxContext['주요_취약점'] = vulCodeIncludeAssetCount[:10]
        
        docxContext['기존_자산수'] = oldAssetCount
        docxContext['기존_평가항목수'] = newVulCount

        docxContext['신규_자산수'] = newAssetCount
        docxContext['신규_평가항목수'] = oldVulCount

        docxContext['평가_지수'] = assessmentScore
        docxContext['평가_등급'] = grade['total']#project.get_total_level_grade(current_area_alias, compliances=compliances),
        
        docxContext['기존'] = ('Y' if project.get_area_all_assets(current_area_alias, is_new=False).count() != 0 else 'N')
        docxContext['기존_평가지수'] = round(project.get_total_level(current_area_alias, compliances=compliances)['old'],1)
        docxContext['기존_등급'] = grade['old']#project.get_total_level_grade(current_area_alias, compliances=compliances, is_new=False),
        
        docxContext['신규_평가지수'] = round(project.get_total_level(current_area_alias, compliances=compliances)['new'],1)
        docxContext['신규_등급'] = grade['new']
        docxContext['기존대상_취약점수'] = project.get_existing_asset_vulnerability_count(current_area_alias)
        docxContext['재발견_취약점수'] = project.get_existing_vulnerability(current_area_alias).count()


        #print(sortedVuls)
        # mysql works
        #sortedVuls = vulYObjs.values('vulnerability_item__code', 'vulnerability_item__name', 'vulnerability_item__risk').distinct('vulnerability_item__code')
    
        
        return response.Response(docxContext)
        docxContext = {}
        docxContext['분야명'] = settings.AREA_CN_LISTS[areaAlias]
        
        
        docxContext['문서_번호'] = ''
        docxContext['출력일'] = ''
        docxContext['평가_목적'] = ''
        docxContext['평가_인력'] = ''
        docxContext['평가_일정'] = ''
        docxContext['평가_방법'] = ''
                
        if areaAlias != 'FISM' :
            if areaAlias in ['INF', 'ISS'] :
                docxContext['평가_분석'] = ''#TK2(F(total_result_summery.get('평가 대상').get('평가 분석(기존 보호대책 중심)')))
                docxContext['특이사항'] = ''#TK(F(total_result_summery.get('평가 대상').get('특이사항')))
                if areaAlias == 'INF' :
                    docxContext['구간별_분석'] = ''#TK(F(total_result_summery.get('평가 대상').get('구간별 분석')))
            else :
                docxContext['평가_분석'] = ''#TK(F(total_result_summery.get('평가 대상').get('평가 분석(기존 보호대책 중심)')))
                docxContext['특이사항'] = ''#TK(F(total_result_summery.get('평가 대상').get('특이사항')))

        docxContext['결과_총평'] = ''#F(total_result_summery.get('평가 결과 (요약)').get('결과 총평'))
        

        
        docxContext['TOP10'] = ('Y' if docxContext['주요_취약점'].count() >= 10 else 'N')
        tempList = TK(F(total_result_summery.get('보호대책 및 권고사항').get('보호대책')))
        print(tempList)
        docxContext['보호대책'] = []
        for x in tempList :
            if len(x) == 3 :
                x[2] = x[2].split("\n- ")[1:]
            for i, _ in enumerate(x):
                if type(_) is str :
                    x[i] = _.strip()
            docxContext['보호대책'].append(x)

        print(docxContext['보호대책'] )

        docxContext['권고사항'] = F(total_result_summery.get('보호대책 및 권고사항').get('권고사항'))
        docxContext['첨부목록'] = total_result_summery.get('문서 정보').get('첨부 목록')[0].split('\n')
        #docxContext['안내사항'] = F(total_result_summery.get('안내 사항').get(''))
        
        if docxContext['재발견_취약점수'] != 0 :
            docxContext['재발견'] = 'Y'
            docxContext['재발견_주요_취약점'] = project.get_vulnerable_vulnerability_item_frequency(current_area_alias, compliances=compliances, is_new=False)[:10]
            tempVar = docxContext['재발견_취약점수'] / docxContext['기존대상_취약점수']
            docxContext['재발견율'] = round(tempVar * 100, 1)
            docxContext['재발견_TOP10'] = ('Y' if docxContext['재발견_주요_취약점'].count() >= 10 else 'N')
            docxContext['재발견_지수'] = docxContext['기존_평가지수'] if docxContext['기존_평가지수'] <= docxContext['신규_평가지수'] or docxContext['신규_평가지수'] == 0 else round(docxContext['기존_평가지수'] - (docxContext['기존_평가지수'] - docxContext['신규_평가지수'])*tempVar, 1)

        else :
            docxContext['재발견'] = 'N'

        return response.Response(docxContext)
