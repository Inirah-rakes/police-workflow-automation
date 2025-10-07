from django.contrib import admin
from .models import CSRRequest

# This makes the CSRRequest model visible on the admin site.
admin.site.register(CSRRequest)
