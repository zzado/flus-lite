from rest_framework import serializers
from api.models import *

class ProjectSerializer(serializers.ModelSerializer):
    def validate_area(self, data):
        complianceObj = Compliance.objects.get(pk=self.initial_data['compliance'])
        compAreaObjs = complianceObj.compliancearea_set.all()
        
        for _ in data :
            if _ not in compAreaObjs :
                raise serializers.ValidationError(f'"{_}" is not included in "{complianceObj}".')
        return data

    class Meta:
        model = Project
        exclude = ['document_num', 'man_day']