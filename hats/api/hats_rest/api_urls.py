from django.urls import path
from .views import api_list_hats

urlpatterns = [
    path("locations/<int:location_vo_id>/hats/", api_list_hats, name="api_list_shoes"),
]
