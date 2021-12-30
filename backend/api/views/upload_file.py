from api.serializers import *
from rest_framework import generics, mixins, response, status, viewsets
from rest_framework.permissions import IsAuthenticated
from api.models import *


class ScreenShotAPI(mixins.RetrieveModelMixin, mixins.CreateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = Screenshot.objects.all()
    serializer_class = ScreenshotSetSerializer
    #permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        serializer.initial_data['id'] = serializer.data['id']
        serializer.initial_data['name'] = serializer.data['image'].split('/')[-1]
        return response.Response(serializer.initial_data, status=status.HTTP_201_CREATED, headers=headers)

    def retrieve(self, request, *args, **kwargs):
        self.serializer_class = ScreenshotGetSerializer
        return super().retrieve(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        self.serializer_class = ScreenshotGetSerializer
        return super().destroy(request, *args, **kwargs)


class ScreenShotByVulAPI(mixins.ListModelMixin, generics.GenericAPIView):
    queryset = None
    serializer_class = None
    #permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        vulId = kwargs['vulId']
        try:
            vulObj = Vulnerability.objects.get(pk=vulId)
        except Vulnerability.DoesNotExist:
            return response.Response({'error': 'invaild vulid'}, status=status.HTTP_400_BAD_REQUEST)
        
        self.serializer_class = ScreenshotGetSerializer
        self.queryset = Screenshot.objects.filter(vulnerability=vulObj)
        return self.list(request)
    






class ReferFileAPI(mixins.RetrieveModelMixin, mixins.CreateModelMixin, mixins.DestroyModelMixin, viewsets.GenericViewSet):
    queryset = RerferFile.objects.all()
    serializer_class = ReferFileSetSerializer
    #permission_classes = [IsAuthenticated]
    
    def create(self, request, *args, **kwargs):
        print('11')
        return super().create(request, *args, **kwargs)
        
        print(request.data['file'][:30])

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return response.Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def retrieve(self, request, *args, **kwargs):
        return super().retrieve(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)


class ReferFileByVulAPI(mixins.ListModelMixin, generics.GenericAPIView):
    queryset = None
    serializer_class = None
    #permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        vulId = kwargs['vulId']
        try:
            vulObj = Vulnerability.objects.get(pk=vulId)
        except Vulnerability.DoesNotExist:
            return response.Response({'error': 'invaild vulid'}, status=status.HTTP_400_BAD_REQUEST)
        
        self.serializer_class = ReferFileGetSerializer
        self.queryset = RerferFile.objects.filter(vulnerability=vulObj)
        return self.list(request)
    