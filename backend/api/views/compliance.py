from api.serializers import *
from rest_framework import generics, mixins, response, status
from rest_framework.permissions import IsAuthenticated
from api.models import *

class ComplianceListAPI(mixins.ListModelMixin, generics.GenericAPIView):
    queryset = Compliance.objects.all()
    serializer_class = ComplianceSerializer
    #permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.list(request)
    