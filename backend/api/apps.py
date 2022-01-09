from django.apps import AppConfig
from flus_lite import settings
import sys
class ApiConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'api'

    def ready(self):
        if 'runserver' in sys.argv:
            from api.models import VulnerabilityItem, Compliance
            #EFI-202101-WEB-SER-NONE-040
            complianceObjs = Compliance.objects.all()
            tempDict = {}
            for complianceObj in complianceObjs :
                compAreaObjs = complianceObj.compliancearea_set.all()
                tempDict[complianceObj.code] = {}
                for compArea in compAreaObjs :
                    tempDict[complianceObj.code][compArea.alias] = {}
                    vulItemObjs = compArea.vulnerabilityitem_set.all()
                    tempDict[complianceObj.code][compArea.alias] = list(set([_.platform for _ in vulItemObjs]))
                    
            settings.G_PLATFORM_INFO = tempDict
