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
        validated_data['code'] = f'{settings.AREA_SIGNATURE[validated_data["area_alias"]]}{validated_data["num"]:02d}'
        validated_data['full_code'] = f'[{validated_data["project"].id}]{validated_data["area_alias"]}-{validated_data["code"]}'
        assetObj = Asset(**validated_data)
        try :
            assetObj.save()
        except :
            raise serializers.ValidationError(f'중복된 자산번호 존재')
        
        assetObj.init_vulobjs()
        return assetObj

    class Meta:
        model = Asset
        exclude = ['parents', 'gubun', 'instance_name']
        read_only_fields = ['full_code', 'code']
        extra_kwargs = {'platform': {'required': True}}

