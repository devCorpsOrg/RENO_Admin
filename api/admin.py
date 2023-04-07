from django.contrib import admin
from django.apps import apps

models = apps.get_app_config('api').get_models()

# Register your models here.
admin.site.register(models)
