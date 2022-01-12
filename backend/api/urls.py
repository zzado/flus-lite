from django.contrib import admin
from django.urls import path, include
from api.views import *
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'project', ProjectAPI)
router.register(r'asset', AssetAPI)
router.register(r'vulnerability', VulnerabilityAPI)
router.register(r'screenshot', ScreenShotAPI)
router.register(r'referfile', ReferFileAPI)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/signup/', SignUpAPI.as_view()),
    path('auth/signin/', SignInAPI.as_view()),
    path('auth/user/', UserInfoGetAPI.as_view()),
    path('user/', UserListAPI.as_view()),

    #path('area-docx/<int:projectId>/<str:areaAlias>/', AreaDocxContextApi.as_view()),


    path('compliance/', ComplianceListAPI.as_view()),
    path('platform/<str:complianceKey>/<str:areaAlias>/', PlatformListAPI.as_view()),

    path('asset-by-project/<int:projectId>/', AssetListByProjectAPI.as_view()),
    path('asset-by-project/<int:projectId>/<str:areaAlias>/', AssetListByAreaAliasAPI.as_view()),

    path('vuls-by-asset/<int:assetId>/', VulnerabilityListByAssetAPI.as_view()),
    path('vuls-by-area/<int:projectId>/<str:areaAlias>/', VulnerabilityListByAreaAPI.as_view()),

    path('poc/<int:pk>/', POCDetailUpdateDeleteAPI.as_view()),

    path('realgrid/asset/<int:projectId>/<str:areaAlias>/', RealGridAssetAPI.as_view()),
    path('realgrid/vul/<int:projectId>/<str:areaAlias>/', RealGridVulAPI.as_view()),

    path('screenshots-by-vul/<int:vulId>/', ScreenShotByVulAPI.as_view()),

    #path('referfile/<int:pk>/', ReferFileAPI.as_view()),
    path('referfile-by-vul/<int:vulId>/', ReferFileByVulAPI.as_view()),

]
