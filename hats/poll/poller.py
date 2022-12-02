import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "hats_project.settings")
django.setup()

# Import models from hats_rest, here.
# from hats_rest.models import Something
from api.hats_rest.models import LocationVO

def poll():
    while True:
        print('Hats poller polling for data')
        try:
            # Write your polling logic, here
            url = 'http://wardrobe-api:8000/api/locations/'
            response = requests.get(url)
            content = json.loads(response.content)
            for location in content["locations"]:
                LocationVO.objects.update_or_create(
                    import_href=location["href"],
                    defaults={"closet_name": location["closet_name"]},
                )
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
