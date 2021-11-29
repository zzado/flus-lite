from flus_lite import settings
from rest_framework import generics, mixins, response, status
from rest_framework.permissions import IsAuthenticated
from api.serializers import *
from api.models import *

class AssetListCreateAPI(mixins.ListModelMixin, mixins.CreateModelMixin,generics.GenericAPIView):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.list(request)
    
    def post(self, request, *args, **kwargs):
        return self.create(request)

class AssetDetailUpdateDeleteAPI(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Asset.objects.all()
    serializer_class = AssetSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):        
        return self.update(request, *args, **kwargs)
        
    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class AssetListByAreaAliasAPI(mixins.ListModelMixin, generics.GenericAPIView):
    serializer_class = AssetSerializer
    permission_classes = [IsAuthenticated]
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
    permission_classes = [IsAuthenticated]
    queryset = None

    def get(self, request, *args, **kwargs):
        try:
            projectObj = Project.objects.get(pk=kwargs['projectId'])
        except Project.DoesNotExist:
            return response.Response(settings.COMMON_ERROR_MESSAGE, status=status.HTTP_400_BAD_REQUEST)
            
        self.queryset = Asset.objects.filter(project=projectObj)
        return self.list(request)
