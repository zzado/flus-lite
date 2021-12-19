from django.contrib import admin
from django.urls import path
from api.views import *

urlpatterns = [
    path('auth/signup/', SignUpAPI.as_view()),
    path('auth/signin/', SignInAPI.as_view()),
    path('auth/user/', UserInfoGetAPI.as_view()),
    path('user/', UserListAPI.as_view()),

    path('compliance/', ComplianceListAPI.as_view()),

    path('platform/<str:complianceKey>/<str:areaAlias>/', PlatformListAPI.as_view()),

    path('project/', ProjectListCreateAPI.as_view()),
    path('project/<int:pk>/', ProjectDetailUpdateDeleteAPI.as_view()),

    path('asset/', AssetListCreateAPI.as_view()),
    path('asset/<int:pk>/', AssetDetailUpdateDeleteAPI.as_view()),

    path('asset-by-project/<int:projectId>/', AssetListByProjectAPI.as_view()),
    path('asset-by-project/<int:projectId>/<str:areaAlias>/', AssetListByAreaAliasAPI.as_view()),

    path('vulnerability/', VulnerabilityListCreateAPI.as_view()),
    path('vulnerability/<int:pk>/', VulnerabilityDetailUpdateDeleteAPI.as_view()),

    path('poc/<int:pk>/', POCDetailUpdateDeleteAPI.as_view()),

    path('vuls-by-asset/<int:assetId>/', VulnerabilityListByAssetAPI.as_view()),

    path('realgrid/asset/<int:projectId>/<str:areaAlias>/', RealGridAssetAPI.as_view()),
]
