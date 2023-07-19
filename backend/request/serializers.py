from rest_framework import serializers
from .models import Request, SalesRequest


class RequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = Request
        fields = "__all__"



class SalesRequestSerializer(serializers.ModelSerializer):

    class Meta:
        model = SalesRequest
        fields = "__all__"
