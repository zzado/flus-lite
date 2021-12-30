from rest_framework import serializers
from api.models import *
from drf_extra_fields.fields import Base64ImageField, Base64FileField

# class ScreenShotSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Screenshot
#         fields = '__all__'


class ScreenshotGetSerializer(serializers.ModelSerializer):
    image = serializers.CharField(source='get_encoded_data', read_only=True)
    name = serializers.CharField(source='get_filename', read_only=True)
    class Meta:
        model = Screenshot
        fields = '__all__'


class ScreenshotSetSerializer(serializers.ModelSerializer):
    image = Base64ImageField()
    class Meta:
        model = Screenshot
        fields = '__all__'

    def create(self, validated_data):
        image = validated_data.get('image')
        vulnerability = validated_data.get('vulnerability')
        return Screenshot.objects.create(image=image, vulnerability=vulnerability)




class ReferFileSetSerializer(serializers.ModelSerializer):
    class Meta:
        model = RerferFile
        fields = '__all__'
    
    def validate(self, data):
        print('22')
    
    def validate_file(self, data):
        print(data)
        # complianceObj = Compliance.objects.get(pk=self.initial_data['compliance'])
        # compAreaObjs = complianceObj.compliancearea_set.all()
        
        # for _ in data :
        #     if _ not in compAreaObjs :
        #         raise serializers.ValidationError(f'"{_}" is not included in "{complianceObj}".')
        return data

    def create(self, validated_data):
        file = validated_data.get('file')
        vulnerability = validated_data.get('vulnerability')
        return RerferFile.objects.create(file=file, vulnerability=vulnerability)

    
class ReferFileGetSerializer(serializers.ModelSerializer):
    class Meta:
        model = RerferFile
        fields = '__all__'
