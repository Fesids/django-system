from django.urls import path
from .views import ProfileViewSet, ConnectionViewSet, ChatMessageViewSet

urlpatterns = [

    path("message/list", ChatMessageViewSet.as_view({
        "get": "list"
    })),

    path("message/new", ChatMessageViewSet.as_view({
        "post": "save"
    })),

    path("message/sent/<int:userId>/<int:conId>", ChatMessageViewSet.as_view({
        "get": "sendedMessagesList"
    })),
    path("message/received/<int:userId>/<int:conId>", ChatMessageViewSet.as_view({
            "get": "receivedMessagesList"
        })),

    path("connection/list/<int:profile>", ConnectionViewSet.as_view({
        "get": "getConnectionsByProfile"
    })),
    path("connection/list", ConnectionViewSet.as_view({
        "get": "list"
    })),

    path("connection/new/<int:profile_id>", ConnectionViewSet.as_view({
        "post": "save"
    })),

    path("profile/list", ProfileViewSet.as_view({
          'get': 'list'
      })),
    path("profile/new/<int:user_id>", ProfileViewSet.as_view({
          'post': 'save'
      })),

    path("profile/user/<int:userId>", ProfileViewSet.as_view({
        'get': 'getProfileByUser'
    })),

    path("profile/detail/<int:id>", ProfileViewSet.as_view({
        'get': 'getProfileById'
    }))


]

