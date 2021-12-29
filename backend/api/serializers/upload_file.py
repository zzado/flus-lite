from rest_framework import serializers
from api.models import *
from drf_extra_fields.fields import Base64ImageField

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

    def create(self, validated_data):
        image = validated_data.pop('image')
        vulnerability = validated_data.pop('vulnerability')
        return Screenshot.objects.create(image=image, vulnerability=vulnerability)


class ScreenshotSetSerializer(serializers.ModelSerializer):
    image = Base64ImageField()
    class Meta:
        model = Screenshot
        fields = '__all__'

    def create(self, validated_data):
        image = validated_data.get('image')
        vulnerability = validated_data.get('vulnerability')
        return Screenshot.objects.create(image=image, vulnerability=vulnerability)