from rest_framework import serializers
from flus_lite import settings
from api.models import *

class POCSerializer(serializers.ModelSerializer):
    class Meta:
        model = POC
        fields = '__all__'
        extra_kwargs = {'id': {'read_only': False, 'required': True}}

class POC_CUDSerializer(serializers.ModelSerializer):
    class Meta:
        model = POC
        fields = '__all__'
        