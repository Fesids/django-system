from rest_framework.serializers import ModelSerializer
from .models import ChatMessage, Profile, Connection, Chat


class ChatMessageSerializer(ModelSerializer):
    class Meta:
        model = ChatMessage
        fields = "__all__"




class ConnectionSerializer(ModelSerializer):
    class Meta:
        model = Connection
        fields = "__all__"

class ProfileSerializer(ModelSerializer):
    connections = ConnectionSerializer(many=True, required=False)
    class Meta:
        model = Profile
        fields = "__all__"


class ChatSerializer(ModelSerializer):

    class Meta:
        model = Chat
        fields = "__all__"

