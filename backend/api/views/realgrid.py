from api.models import vulnerability
from rest_framework import generics, mixins, status, response, views
from rest_framework.authtoken.models import Token
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from api.serializers import *
from api.models import *
from flus_lite import settings


class RealGridVulAPI(views.APIView):
    def post(self, request, *args, **kwargs):
        areaAlias = kwargs['areaAlias']
        projectId = kwargs['projectId']
        #assetId = kwargs['assetId']
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
        
        # try:
        #     assetObj = Asset.objects.get(id=assetId)
        # except Asset.DoesNotExist:
        #     dataDict['error'] = f'Wrong asset id'
        #     return response.Response(dataDict)

        updatedVulList = []
        # createRow
        for newPocInfo in gridData['createdRow']:
            try:
                vulObj = Vulnerability.objects.get(id=newPocInfo.get('vul_id'))
                updatedVulList.append(vulObj)
            except Vulnerability.DoesNotExist:
                dataDict['error'] = f'Wrong vul id'
                return response.Response(dataDict)
            
            pocData = {
                'vulnerability': vulObj.id,
                'result': 'Y',
                'auto_result': '',
                'point': newPocInfo.get('poc_point', ''),
                'found_date': newPocInfo.get('poc_found_date'),
                'is_reported': True if newPocInfo.get('poc_reported_date') != None else False, 
                'reported_date': newPocInfo.get('poc_reported_date'),
                'is_patched': True if newPocInfo.get('poc_patched_date') != None else False,
                'patched_date': newPocInfo.get('poc_patched_date'),
                'is_new': newPocInfo.get('poc_is_new'),
                'note': newPocInfo.get('poc_note') if newPocInfo.get('poc_note') != None else '', 
            }
            pocObj = POC_CUDSerializer(data=pocData)
            if pocObj.is_valid():
                pocObj.save()
            else :
                return response.Response(pocObj.errors, status=status.HTTP_400_BAD_REQUEST)

        # updateRow
        for rowData in gridData['updatedRow']:
            try:
                vulObj = Vulnerability.objects.get(id=rowData.get('vul_id'))
                updatedVulList.append(vulObj)
            except Vulnerability.DoesNotExist:
                dataDict['error'] = f'Wrong vul id'
                return response.Response(dataDict)
            
            updatedData = { _['fieldName']: _['newValue'] for _ in rowData.get('data')}
            if rowData.get('poc_id') :
                # update poc
                try:
                    pocObj = POC.objects.get(id=rowData.get('poc_id'))
                except POC.DoesNotExist:
                    dataDict['error'] = f'Wrong poc id'
                    return response.Response(dataDict)
                
                pocData = { _.replace('poc_', ''): updatedData[_] for _ in updatedData }
                pocObj = POC_CUDSerializer(pocObj, data=pocData, partial=True)
                if pocObj.is_valid():
                    pocObj.save()
                else :
                    return response.Response(pocObj.errors, status=status.HTTP_400_BAD_REQUEST)
            else :
                if updatedData.get('vul_result') and updatedData.get('vul_result') == 'Y' :
                    # new poc
                    pocData = {
                        'vulnerability': vulObj.id,
                        'result': 'Y',
                        'auto_result': '',
                        'point': updatedData.get('poc_point', ''),
                        'found_date': updatedData.get('poc_found_date'),
                        'is_reported': True if updatedData.get('poc_reported_date') != None else False, 
                        'reported_date': updatedData.get('poc_reported_date'),
                        'is_patched': True if updatedData.get('poc_patched_date') != None else False,
                        'patched_date': updatedData.get('poc_patched_date'),
                        'is_new': updatedData.get('poc_is_new', True),
                        'note': updatedData.get('poc_note', '') 
                    }
                    pocObj = POC_CUDSerializer(data=pocData)
                    if pocObj.is_valid():
                        pocObj.save()
                    else :
                        return response.Response(pocObj.errors, status=status.HTTP_400_BAD_REQUEST)
                else :
                    if updatedData.get('vul_result') :
                        vulObj.result = updatedData.get('vul_result')
                    if updatedData.get('vul_status') :
                        vulObj.status = updatedData.get('vul_status')
                    if updatedData.get('vul_gathering_data') :
                        vulObj.gathering_data = updatedData.get('vul_gathering_data')
                    


        for rowData in gridData['deletedRow']:
            try:
                vulObj = Vulnerability.objects.get(id=rowData.get('vul_id'))
                updatedVulList.append(vulObj)
            except Vulnerability.DoesNotExist:
                dataDict['error'] = f'Wrong vul id'
                return response.Response(dataDict)
                
            if rowData.get('poc_id') :
                try:
                    pocObj = POC.objects.get(id=rowData.get('poc_id'))
                except POC.DoesNotExist:
                    dataDict['error'] = f'Wrong poc id'
                    return response.Response(dataDict)
                pocObj.delete()
            else:
                vulObj.reset()

        for _ in list(set(updatedVulList)) :
            _.update_status()

        print('111')
        return response.Response({'result':'success'}, status=status.HTTP_200_OK)

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
            if assetInfo.get('platform') == '' or assetInfo.get('platform') == None : assetInfo['platform'] = 'NONE'
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