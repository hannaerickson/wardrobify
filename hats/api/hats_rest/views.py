from django.shortcuts import render
from django.http import JsonResponse
from .models import Hat, LocationVO
from common.json import ModelEncoder
from django.views.decorators.http import require_http_methods


# Create your views here.

class HatListEncoder(ModelEncoder):
    model = Hat
    properties = [
        "style_name",
        "color",
    ]


@require_http_methods(["GET, POST"])
def api_list_hats(request, location_vo_id=None):
    if request.method == "GET":
        hats = Hat.objects.filter(location=location_vo_id)
        return JsonResponse(
            {"hats": hats},
            encoder=HatListEncoder,
        )
