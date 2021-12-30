from flus_lite import settings
from rest_framework import generics, mixins, response, status, viewsets
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
