from django.contrib import admin
from .models import ChatMessage, Connection, Profile, Chat
# Register your models here.

@admin.register(Chat)
class ChatAdmin(admin.ModelAdmin):
    fields = ["members"]

@admin.register(Profile)
class ProfileAdmin(admin.ModelAdmin):
    fields = ["user", "name", "pic", "connections"]

@admin.register(Connection)
class ConnectionAdmin(admin.ModelAdmin):
    fields = ["profile"]


@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    fields = ["body", "msg_sender", "msg_receiver","seen" ]