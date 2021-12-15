from rest_framework import generics, mixins, status, response, views
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from api.serializers import *
from api.models import *
from flus_lite import settings


class RealGridAssetAPI(views.APIView):
    def post(self, request, *args, **kwargs):
        areaAlias = kwargs['areaAlias']
        projectId = kwargs['projectId']
        gridData = request.data
        
        dataDict = dict()
        if not gridData :
            dataDict['error'] = f'Wrong data'
            return response.Response(dataDict)
        
        # projectId valid check
        try:
            projectObj = Project.objects.get(id=projectId)
        except Project.DoesNotExist:
            dataDict['error'] = f'Wrong project id'
            return response.Response(dataDict)

        # areaAlias valid check
        if projectObj.get_compliance_area_obj(areaAlias) is None:
            dataDict['error'] = f'Wrong area alias'
            return response.Response(dataDict)
        
        # 자산종류에 따라 취약점 object도 생성
        createdAssetList = []
        for assetInfo in gridData['createdRow']:
            #assetObj = Asset()
            #print(assetInfo)
            assetInfo['project'] = projectId
            assetInfo['area_alias'] = areaAlias
            assetInfo['num'] = int(assetInfo['code'].replace(settings.AREA_SIGNATURE[areaAlias], ''))
            assetInfo['platform'] = assetInfo.get('platform', 'NONE')
            platformList = [ _ for _ in settings.G_PLATFORM_INFO[projectObj.compliance.code][areaAlias]]
            platformList.remove('[[OTHER]]') if '[[OTHER]]' in platformList else platformList
            if assetInfo['platform'] not in platformList:
                assetInfo['platform_t'] = assetInfo['platform']
                assetInfo['platform'] = '[[OTHER]]'
                
            
            assetObj = AssetSerializer(data=assetInfo)
            if assetObj.is_valid():
                assetObj.save()
            else :

                return response.Response(assetObj.errors, status=status.HTTP_400_BAD_REQUEST)

            #     assetObj.__dict__[_] = assetInfo[_]

            # try :
            #     assetObj.num = int((assetObj.code).replace(settings.AREA_SIGNATURE[areaAlias], ''))
            # except ValueError:
            #     dataDict['error'] = f'Wrong data'
            #     return dataDict
            
            # assetObj.project = projectObj
            # assetObj.area_alias = areaAlias
            # assetObj.save()
            # assetObj.init_vulobjs()            
            
        # 자산종류 바뀌면 취약점 바뀌도록
        
        for assetInfo in gridData['updatedRow']:
            assetObj = Asset.objects.get(id=assetInfo['id'])
            assetVarKeyList = []
            
            for _ in assetInfo['data'] :
                assetVarKey = _['fieldName']
                if assetVarKey == 'platform' :
                    platformList = [_ for _ in settings.G_PLATFORM_INFO[projectObj.compliance.code][areaAlias]]
                    platformList.remove('[[OTHER]]') if '[[OTHER]]' in platformList else platformList
                    if _['newValue'] not in platformList:
                        assetObj.__dict__[assetVarKey] = '[[OTHER]]'
                        assetObj.__dict__['platform_t'] = _['newValue']
                        continue

                assetVarKeyList.append(assetVarKey)
                assetObj.__dict__[assetVarKey] = _['newValue']
        
            
            assetObj.save()

            for _ in assetVarKeyList :
                if _ in ['platform',  'is_financial', 'is_https', 'is_server', 'is_switch'] :
                    assetObj.reset_vulobjs()
                    break
                
        for assetIdx in gridData['deletedRow']:
            assetObj = Asset.objects.get(id=assetIdx)
            assetObj.delete()
            
        dataDict['result'] = 'success'
        return response.Response(dataDict)