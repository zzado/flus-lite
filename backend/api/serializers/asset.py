from rest_framework import serializers
from flus_lite import settings
from api.models import *

class AssetSerializer(serializers.ModelSerializer):
    
    def validate_area_alias(self, data):
        projectObj = Project.objects.get(pk=self.initial_data['project'])
        compAreaList = [ _.alias for _ in projectObj.area.all()]
        
        if data not in compAreaList : raise serializers.ValidationError(f'"{data}" is not included in "{projectObj}".')
        return data

    def validate_platform(self, data):
        complianceCode = Project.objects.get(pk=self.initial_data['project']).compliance.code
        areaAlias = self.initial_data['area_alias']
        if data not in settings.G_PLATFORM_INFO[complianceCode][areaAlias] : raise serializers.ValidationError(f'"{data}" is not included in "{areaAlias}".')
        return data

    def create(self, validated_data):
        validated_data['full_code'] = f'[{validated_data["project"].id}]{validated_data["area_alias"]}-{validated_data["code"]}'
        assetObj = Asset(**validated_data)
        assetObj.save()
        assetObj.init_vulobjs()
        return assetObj

    class Meta:
        model = Asset
        exclude = ['full_code', 'parents', 'gubun', 'instance_name']
        extra_kwargs = {'platform': {'required': True}}
