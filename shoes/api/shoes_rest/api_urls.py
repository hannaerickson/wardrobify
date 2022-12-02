from django.urls import path
from .views import api_list_shoes

urlpatterns = [
    path(
        "bins/<int:bin_vo_id>/shoes/",
        api_list_shoes,
        name="api_list_shoes"
    ),
]
