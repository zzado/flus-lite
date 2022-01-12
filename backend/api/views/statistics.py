from rest_framework import generics, mixins, status, response, views
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from api.serializers import *
from api.models import *
from flus_lite import settings


#  평가 등급 :: 1등급-(90 ~ 100), 2등급-(80 ~ 89), 3등급-(70 ~ 79), 4등급-(60 ~ 69), 5등급-(0 ~ 59)
def getGradeFromScore(score) :
    if score >= 90 and score <= 100 :
        return 1
    elif score >= 80 and score < 90 :
        return 2
    elif score >= 70 and score < 80 :
        return 3
    elif score >= 60 and score < 70 :
        return 4
    elif score >= 50 and score < 60 :
        return 5


def getAreaStatistic(projectObj, areaAlias):
    # 분야별 자산들
    assetObjs = projectObj.assets.filter(area_alias=areaAlias)
    # 분야별 평가항목들
    vulObjs = projectObj.vuls.filter(asset__in=assetObjs)
    # 분야별 취약항목들
    vulYObjs = vulObjs.filter(result='Y')
    # 패치된 취약항목을 제외한 취약항목들
    vulYExceptPatchObjs = vulYObjs.filter(is_patched=False)
    # "신규" 자산들
    newAssetObjs = assetObjs.filter(is_new=True)
    # "신규" 자산들의 평가항목들
    newVulObjs = vulObjs.filter(asset__in=newAssetObjs)
    # "신규" 자산들의 취약항목들
    newVulYObjs = newVulObjs.filter(result='Y')
    # "기존" 자산들
    oldAssetObjs = assetObjs.filter(is_new=False)
    # "기존" 자산들의 평가항목들
    oldVulObjs = vulObjs.filter(asset__in=oldAssetObjs)
    # "기존" 자산들의 취약항목들
    oldVulYObjs = oldVulObjs.filter(result='Y')
    # 재발견 취약항목(is_new=false)
    notPatchedVulObjs = vulYObjs.filter(is_new=False)

    # 자산가치별 자산 수
    assetCountByAssetVaule = {
        1: assetObjs.filter(asset_value=1).count(),
        2: assetObjs.filter(asset_value=2).count(),
        3: assetObjs.filter(asset_value=3).count(),
        4: assetObjs.filter(asset_value=4).count(),
        5: assetObjs.filter(asset_value=5).count(),
    }

    # 
    vulYCountByRisk = {
        1: vulYObjs.filter(vulnerability_item__risk=1).count(),
        2: vulYObjs.filter(vulnerability_item__risk=2).count(),
        3: vulYObjs.filter(vulnerability_item__risk=3).count(),
        4: vulYObjs.filter(vulnerability_item__risk=4).count(),
        5: vulYObjs.filter(vulnerability_item__risk=5).count(),
    }

    #
    vulYCountExceptPatcByRisk = {
        1: vulYExceptPatchObjs.filter(vulnerability_item__risk=1).count(),
        2: vulYExceptPatchObjs.filter(vulnerability_item__risk=2).count(),
        3: vulYExceptPatchObjs.filter(vulnerability_item__risk=3).count(),
        4: vulYExceptPatchObjs.filter(vulnerability_item__risk=4).count(),
        5: vulYExceptPatchObjs.filter(vulnerability_item__risk=5).count(),
    }


    print(assetCountByAssetVaule)
    # 전체 자산 수
    allAssetCount = assetObjs.count()

    # 평가항목 수
    vulCountByAllAsset = vulObjs.count()
    
    # 취약점 수
    vulYCountByAllAsset = vulYObjs.count()
    
    # 취약점 종류 수
    vulCodeCountByAllAsset = vulYObjs.values_list('vulnerability_item__code').distinct().count()
    
    # 취약률 ( 취약점 수/ 평가항목수 ) * 100
    vulRateByAllAsset = round(vulYCountByAllAsset/vulCountByAllAsset * 100, 1)

    # 패치된 취약점을 제외한 취약점 수
    vulYCountByAllAssetExceptPatch = vulYExceptPatchObjs.count()

    # 패치된 취약점을 제외한 취약점 종류 수
    vulCodeCountByAllAssetExceptPatch = vulYExceptPatchObjs.values_list('vulnerability_item__code').distinct().count()

    # 패치된 취약점을 제외한 취약률 (패치된 취약점을 제외한 취약점 / 평가항목수) * 100
    vulRateByAllAssetExceptPatch = round(vulYCountByAllAssetExceptPatch/vulCountByAllAsset * 100, 1)
    
    # 취약점 별 자산수
    from django.db.models import Count
    vulYInfoIncludeAssetCount = vulYObjs.values('vulnerability_item__code', 'vulnerability_item__name', 'vulnerability_item__risk').distinct().annotate(vulnerable_asset_count=Count('asset')).order_by('-vulnerability_item__risk', '-vulnerable_asset_count')

    # 신규 자산수
    newAssetCount = newAssetObjs.count()
    
    # 신규 자산의 평가항목 수
    newVulCount = newVulObjs.count()
    
    # 기존 자산 수
    oldAssetCount = oldAssetObjs.count()
    
    # 기존 자산의 평가항목 수
    oldVulCount = oldVulObjs.count()
    
    # 기존 자산의 취약점 수
    oldVulYCount = oldVulYObjs.count()


    from django.db.models import Sum
    # 평가 지수 :: (1 - 평가항목들의 위험도 합 / 취약항목들의 위험도 합) * 100
    assessmentScoreFromAllAsset = round((1-vulYObjs.aggregate(Sum('vulnerability_item__risk')).get('vulnerability_item__risk__sum', 0)/vulObjs.aggregate(Sum('vulnerability_item__risk')).get('vulnerability_item__risk__sum'))*100, 1)
    
    # 평가 등급 :: 1등급-(90 ~ 100), 2등급-(80 ~ 89), 3등급-(70 ~ 79), 4등급-(60 ~ 69), 5등급-(0 ~ 59)
    assessmentGradeFromAllAsset = getGradeFromScore(assessmentScoreFromAllAsset)
    
    # 신규 자산에 대한 평가 지수 :: (1 - 평가항목들의 위험도 합 / 취약항목들의 위험도 합) * 100
    assessmentScoreFromNewAsset = round((1-newVulYObjs.aggregate(Sum('vulnerability_item__risk')).get('vulnerability_item__risk__sum', 0)/newVulObjs.aggregate(Sum('vulnerability_item__risk')).get('vulnerability_item__risk__sum'))*100, 1)
    print(assessmentScoreFromNewAsset)

    # 평가 등급 :: 1등급-(90 ~ 100), 2등급-(80 ~ 89), 3등급-(70 ~ 79), 4등급-(60 ~ 69), 5등급-(0 ~ 59)
    assessmentGradeFromNewAsset = getGradeFromScore(assessmentScoreFromNewAsset)
    
    # 기존 자산에 대한 평가 지수
    assessmentScoreFromOldAsset = round((1-oldVulYObjs.aggregate(Sum('vulnerability_item__risk')).get('vulnerability_item__risk__sum', 0)/oldVulObjs.aggregate(Sum('vulnerability_item__risk')).get('vulnerability_item__risk__sum',1))*100, 1) if oldVulYCount > 0 else 0
    
    # 평가 등급 :: 1등급-(90 ~ 100), 2등급-(80 ~ 89), 3등급-(70 ~ 79), 4등급-(60 ~ 69), 5등급-(0 ~ 59)
    assessmentGradeFromOldAsset = getGradeFromScore(assessmentScoreFromOldAsset)
    
    notPatchedVulCount = notPatchedVulObjs.count()

    vulYInfoIncludeAssetCountExceptPatch = notPatchedVulObjs.values('vulnerability_item__code', 'vulnerability_item__name', 'vulnerability_item__risk').distinct().annotate(vulnerable_asset_count=Count('asset')).order_by('-vulnerability_item__risk', '-vulnerable_asset_count')

    # 재발견 취약점들의 취약률 ( 재발견 취약점 수/ 기존 자산들의 평가항목수 ) * 100
    vulRateFromNotPatchedVul = round(notPatchedVulCount/oldVulCount * 100, 1) if oldVulYCount > 0 else 0

    assessmentScoreForNotPatchedVulExist = assessmentScoreFromOldAsset if assessmentScoreFromOldAsset <= assessmentScoreFromNewAsset or assessmentScoreFromNewAsset == 0 else round(assessmentScoreFromOldAsset - (assessmentScoreFromOldAsset - assessmentScoreFromNewAsset)*vulRateFromNotPatchedVul, 1)


    statisticContext={
        # (전체) 자산 수
        'allAssetCount': allAssetCount,
        # (전체) 평가항목 수
        'vulCountByAllAsset': vulCountByAllAsset, 
        # (전체) 취약점 수
        'vulYCountByAllAsset': vulYCountByAllAsset,
        # (전체) 취약점 종류 수
        'vulCodeCountByAllAsset': vulCodeCountByAllAsset, 
        # (전체) 취약률 ( 취약점 수/ 평가항목수 ) * 100
        'vulRateByAllAsset': vulRateByAllAsset, 
        # (전체) 평가 지수 :: (1 - 평가항목들의 위험도 합 / 취약항목들의 위험도 합) * 100
        'assessmentScoreFromAllAsset': assessmentScoreFromAllAsset,
        # (전체) 평가 등급 
        'assessmentGradeFromAllAsset': assessmentGradeFromAllAsset, 
        
        # (신규) 자산수
        'newAssetCount': newAssetCount,
        # (신규) 평가항목 수
        'newVulCount': newVulCount,
        # (신규) 평가 지수 :: (1 - 평가항목들의 위험도 합 / 취약항목들의 위험도 합) * 100
        'assessmentScoreFromNewAsset': assessmentScoreFromNewAsset,
        # (신규) 평가 등급
        'assessmentGradeFromNewAsset': assessmentGradeFromNewAsset, 

        # (기존) 자산 수
        'oldAssetCount': oldAssetCount,
        # (기존) 평가항목 수
        'oldVulCount': oldVulCount,
        # (기존) 취약점 수
        'oldVulYCount': oldVulYCount, 
        # (기존) 평가 지수
        'assessmentScoreFromOldAsset': assessmentScoreFromOldAsset,
        # (기존) 평가 등급
        'assessmentGradeFromOldAsset': assessmentGradeFromOldAsset,

        # 취약점 별 자산수
        'vulYInfoIncludeAssetCount': vulYInfoIncludeAssetCount,
        # 자산가치별 자산 수
        'assetCountByAssetVaule': assetCountByAssetVaule, 

        
        # 패치된 취약점을 제외한 취약점 수
        'vulYCountByAllAssetExceptPatch': vulYCountByAllAssetExceptPatch,

        # 패치된 취약점을 제외한 취약점 종류 수
        'vulCodeCountByAllAssetExceptPatch': vulCodeCountByAllAssetExceptPatch,
        # 패치된 취약점을 제외한 취약률 (패치된 취약점을 제외한 취약점 / 평가항목수) * 100
        'vulRateByAllAssetExceptPatch': vulRateByAllAssetExceptPatch,
        

        # 재발견 취약점수
        'notPatchedVulCount': notPatchedVulCount,
        # 재발견 취약점 별 자산수
        'vulYInfoIncludeAssetCountExceptPatch': vulYInfoIncludeAssetCountExceptPatch,
        # 재발견 취약점들의 취약률 ( 재발견 취약점 수/ 기존 자산들의 평가항목수 ) * 100
        'vulRateFromNotPatchedVul': vulRateFromNotPatchedVul,

        'assessmentScoreForNotPatchedVulExist': assessmentScoreForNotPatchedVulExist,

        'vulYCountByRisk': vulYCountByRisk,
        'vulYCountExceptPatcByRisk': vulYCountExceptPatcByRisk,
    }
    
    return statisticContext
   