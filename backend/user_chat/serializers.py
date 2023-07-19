from rest_framework.serializers import ModelSerializer
from .models import ChatMessage, Profile, Connection


class ChatMessageSerializer(ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = "__all__"


class ProfileSerializer(ModelSerializer):
    class Meta:
        model = Profile
        fields = "__all__"

class ConnectionSerializer(ModelSerializer):
    class Meta:
        model = Connection
        fields = "__all__"