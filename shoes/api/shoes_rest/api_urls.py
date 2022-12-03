from django.urls import path
from .views import api_list_shoes, api_show_shoes

urlpatterns = [
    path(
        "bins/<int:bin_vo_id>/shoes/",
        api_list_shoes,
        name="api_list_shoes"
    ),
    path(
        "shoes/<int:id>/",
        api_show_shoes,
        name="api_show_shoes"
    ),
    path(
        "shoes/",
        api_list_shoes,
        name="api_all_shoes"
    ),
]
