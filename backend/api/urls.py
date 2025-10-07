from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CSRRequestViewSet, AnalyticsDataView

# Create a router and register our viewset with it.
router = DefaultRouter()
router.register(r'requests', CSRRequestViewSet, basename='csrrequest')

# The API URLs are now determined automatically by the router.
urlpatterns = [
    path('', include(router.urls)),
    path('analytics/', AnalyticsDataView.as_view(), name='analytics-data'),
]
