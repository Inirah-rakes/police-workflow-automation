from rest_framework import serializers
from .models import CSRRequest

class CSRRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = CSRRequest
        fields = '__all__' # This will include all fields from the model
