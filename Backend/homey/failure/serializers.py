from rest_framework import serializers
from .models import Failure

class FailureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Failure
        fields = '__all__'
