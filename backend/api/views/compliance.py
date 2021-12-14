from api.serializers import *
from rest_framework import generics, mixins, response, status, views
from rest_framework.permissions import IsAuthenticated
from api.models import *

class ComplianceListAPI(mixins.ListModelMixin, generics.GenericAPIView):
    queryset = Compliance.objects.all()
    serializer_class = ComplianceSerializer
    #permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.list(request)

class PlatformListAPI(views.APIView):
    def get(self, request, *args, **kwargs):
        try:
            CompAreaObj = ComplianceArea.objects.get(compliance_type=kwargs['complianceKey'], alias=kwargs['areaAlias'])
        except ComplianceArea.DoesNotExist:
            return response.Response({'Invaild Compliance Key.'}, status=status.HTTP_400_BAD_REQUEST)
        
        vulItemObjs = CompAreaObj.vulnerabilityitem_set.all()
        platformList = list(set([_.platform for _ in vulItemObjs]))
        try :
            platformList.remove('[[OTHER]]')
        except ValueError: 
            pass
        
        return response.Response([ {'value': _, 'label': _ } for _ in platformList ])

        