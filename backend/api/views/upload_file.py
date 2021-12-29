from api.serializers import *
from rest_framework import generics, mixins, response, status
from rest_framework.permissions import IsAuthenticated
from api.models import *

class ScreenShotByVulAPI(mixins.ListModelMixin, mixins.CreateModelMixin,generics.GenericAPIView):
    queryset = None
    serializer_class = None
    #permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        vulId = kwargs['vulId']
        try:
            vulObj = Vulnerability.objects.get(pk=vulId)
        except Vulnerability.DoesNotExist:
            return response.Response({'error': 'invaild vulid'}, status=status.HTTP_400_BAD_REQUEST)
        
        self.serializer_class = ScreenShotListSerializer
        self.queryset = Screenshot.objects.filter(vulnerability=vulObj)
        return self.list(request)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return response.Response(serializer.initial_data, status=status.HTTP_201_CREATED, headers=headers)

    def post(self, request, *args, **kwargs):
        self.serializer_class = ScreenShotCreateSerializer
        return self.create(request)



class ScreenShotAPI(mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Screenshot.objects.all()
    serializer_class = ScreenShotListSerializer
    
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return response.Response({'result':True }, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)
