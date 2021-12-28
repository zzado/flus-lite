from django.contrib import admin
from django.urls import path
from legacy.views import *

urlpatterns = [
    path('export-html-report/<int:projectId>/<str:areaAlias>/', ExportHTMLReport.as_view()),   
]
