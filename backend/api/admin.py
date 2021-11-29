from django.contrib import admin
from api.models.asset import Asset
from api.models.compliance import Compliance, ComplianceArea
from api.models.project import Project
from api.models.vulnerability import Vulnerability
from api.models.vulnerability_item import VulnerabilityItem
from api.models.poc import POC

admin.site.register(Asset)
admin.site.register(Project)
admin.site.register(Compliance)
admin.site.register(ComplianceArea)
admin.site.register(Vulnerability)
admin.site.register(VulnerabilityItem)
admin.site.register(POC)
