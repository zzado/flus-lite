from api.serializers import *
from rest_framework import generics, mixins, response, status
from rest_framework.permissions import IsAuthenticated
from api.models import *

class ProjectListCreateAPI(mixins.ListModelMixin, mixins.CreateModelMixin,generics.GenericAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    #permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.list(request)
    
    def post(self, request, *args, **kwargs):
        return self.create(request)

class ProjectDetailUpdateDeleteAPI(mixins.RetrieveModelMixin, mixins.UpdateModelMixin, mixins.DestroyModelMixin, generics.GenericAPIView):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        print('!!')
        instance = self.get_object()
        self.perform_destroy(instance)
        return response.Response({'result':True}, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


