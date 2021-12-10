from rest_framework import serializers
from api.models import *

class ComplianceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Compliance
        exclude = ['id', 'name']