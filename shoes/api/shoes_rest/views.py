from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
from .models import Shoe, BinVO

class ShoeListEncoder(ModelEncoder):
    model = Shoe
    properties = ["manufacturer", "model_name"]

@require_http_methods(["GET"])
def api_list_shoes(request, bin_vo_id=None):
    shoes = Shoe.objects.filter(bin=bin_vo_id)
    return JsonResponse(
        {"shoes": shoes},
        encoder=ShoeListEncoder,
        safe=False,
    )
