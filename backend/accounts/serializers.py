from rest_framework import serializers
from django.conf import settings
from .models import CustomUserModel, Department


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = CustomUserModel
        fields = "__all__"


class DepartmentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Department
        fields = "__all__"
