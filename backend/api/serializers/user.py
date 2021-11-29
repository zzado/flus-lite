from rest_framework import serializers
from django.contrib.auth.models import User

class SignUpUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "password")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        if len(validated_data["username"]) >= 5 and len(validated_data["password"]) >= 8 :
            userObj = User.objects.create_user(validated_data["username"], None, validated_data["password"])
        else :
            raise serializers.ValidationError(f'length error')

        return userObj