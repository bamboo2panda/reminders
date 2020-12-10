from django.urls import path

from rest_framework import routers
from .views import EventViewSet

router = routers.SimpleRouter()
router.register('event', EventViewSet, basename='event')

urlpatterns = []
urlpatterns += router.urls
