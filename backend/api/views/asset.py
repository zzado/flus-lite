from flus_lite import settings
from rest_framework import generics, mixins, response, status, viewsets, views
from rest_framework.permissions import IsAuthenticated
from api.serializers import *
from api.models import *


class AssetAPI(viewsets.ModelViewSet):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    #permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)

class AssetListByAreaAliasAPI(mixins.ListModelMixin, generics.GenericAPIView):
    serializer_class = AssetSerializer
    #permission_classes = [IsAuthenticated]
    queryset = None

    def get(self, request, *args, **kwargs):
        try:
            projectObj = Project.objects.get(pk=kwargs['projectId'])
        except Project.DoesNotExist:
            return response.Response(settings.COMMON_ERROR_MESSAGE, status=status.HTTP_400_BAD_REQUEST)
            
        if projectObj.get_compliance_area_obj(kwargs['areaAlias']) is None :
            return response.Response(settings.COMMON_ERROR_MESSAGE, status=status.HTTP_400_BAD_REQUEST)

        self.queryset = Asset.objects.filter(project=projectObj, area_alias=kwargs['areaAlias'])
        return self.list(request)

class AssetListByProjectAPI(mixins.ListModelMixin, generics.GenericAPIView):
    serializer_class = AssetSerializer
    #permission_classes = [IsAuthenticated]
    queryset = None

    def get(self, request, *args, **kwargs):
        try:
            projectObj = Project.objects.get(pk=kwargs['projectId'])
        except Project.DoesNotExist:
            return response.Response(settings.COMMON_ERROR_MESSAGE, status=status.HTTP_400_BAD_REQUEST)
            
        self.queryset = Asset.objects.filter(project=projectObj)
        return self.list(request)


class AssetMultiFuncAPI(views.APIView):
    #serializer_class = AssetSerializer
    #permission_classes = [IsAuthenticated]
    #queryset = None

    def post(self, request, *args, **kwargs):
        areaAlias = kwargs['areaAlias']
        projectId = kwargs['projectId']
        gridData = request.data
        print(gridData)
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

        
        for assetInfo in gridData['updatedRow']:
            assetObj = Asset.objects.get(id=assetInfo['id'])
            if assetInfo.get('platform') == '' or assetInfo.get('platform') == None : assetInfo['platform'] = 'NONE'
            platformList = [ _ for _ in settings.G_PLATFORM_INFO[projectObj.compliance.code][areaAlias]]
            platformList.remove('[[OTHER]]') if '[[OTHER]]' in platformList else platformList
            if assetInfo['platform'] not in platformList:
                assetInfo['platform_t'] = assetInfo['platform']
                assetInfo['platform'] = '[[OTHER]]'
                
            assetObj = AssetSerializer(assetObj, data=assetInfo)
            if assetObj.is_valid():
                assetObj.save()
            else :
                return response.Response(assetObj.errors, status=status.HTTP_400_BAD_REQUEST)


        for assetIdx in gridData['deletedRow']:
            assetObj = Asset.objects.get(id=assetIdx)
            assetObj.delete()
            
        dataDict['result'] = 'success'
        
        return response.Response(dataDict)
