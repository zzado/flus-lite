from rest_framework import generics, mixins, response, status, viewsets
from rest_framework.permissions import IsAuthenticated
from api.serializers import *
from api.models import *

class ProjectAPI(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = None
    #permission_classes = [IsAuthenticated]

    def list(self, request, *args, **kwargs):
        self.serializer_class = ProjectGetSerializer
        return super().list(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        self.serializer_class = ProjectSetSerializer
        return super().create(request, *args, **kwargs)

    def retrieve(self, request, *args, **kwargs):
        self.serializer_class = ProjectGetSerializer
        return super().retrieve(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        self.serializer_class = ProjectSetSerializer
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return super().destroy(request, *args, **kwargs)
    

