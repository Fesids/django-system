import json

from django.shortcuts import render, get_object_or_404, get_list_or_404
from django.db.models import Q
from rest_framework import views, viewsets, status, permissions, generics
from rest_framework.response import Response
from .serializers import ChatMessageSerializer, ProfileSerializer, ConnectionSerializer
from .models import ChatMessage, Connection, Profile
from accounts.models import CustomUserModel

# Create your views here.


class ProfileMixin(views.APIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer


class ConnectionMixin(views.APIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Connection.objects.all()
    serializer_class = ConnectionSerializer


class ChatMessageMixin(views.APIView):
    permission_classes = (permissions.AllowAny,)
    queryset = ChatMessage.objects.all()
    serializer_class = ChatMessageSerializer


class ProfileViewSet(viewsets.ViewSet, ProfileMixin):

    def getProfileById(self, request, *args, **kwargs):
        profile_id = kwargs.get("id")

        profile = self.queryset.get(id=profile_id)

        if not profile:
            return Response({"err": "profile not found"}, status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(profile)
        return Response(serializer.data, status.HTTP_200_OK)


    def getProfileByUser(self, request, *args, **kwargs):
        user_id = kwargs.get("userId")

       # profile = get_object_or_404(Profile, user=user_id)
        prof = self.queryset.get(user=user_id)

        if not prof:
            return Response({"err": "Profile not found"}, status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(prof)
        return Response(serializer.data, status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        profiles = self.queryset
        serializer = self.serializer_class(profiles, many=True)

        return Response(serializer.data, status.HTTP_200_OK)

    def save(self, request, *args, **kwargs):
        user_id = kwargs.get("user_id")

        name = request.data["name"]
        pic = request.data["pic"]

        user = get_object_or_404(CustomUserModel, id=user_id)

        create_body = {
            "user": user_id,
            "name": name,
            "pic": pic
        }

        serializer = self.serializer_class(data=create_body)

        if serializer.is_valid():
            serializer.save()

            return Response({"body": serializer.data}, status.HTTP_201_CREATED)

        else:

            return Response({"err": serializer.errors}, status.HTTP_400_BAD_REQUEST)


class ConnectionViewSet(viewsets.ViewSet, ConnectionMixin):

    def getConnectionsByProfile(self, request, *args, **kwargs):
            profile_id = kwargs.get("profile")

            profile = get_object_or_404(Profile, id=profile_id)

            connections = profile.connections.all()

            if not len(connections):
                return Response({"err": "This user has no connections yet"})

            serializer = self.serializer_class(connections, many=True)

            return Response(serializer.data, status.HTTP_200_OK)


            '''profile_id = kwargs.get("profile")

            connections = self.queryset.filter(
                Q(msg_sender__icontains=profile_id) | Q(msg_receiver__icontains=profile_id)
            )

            if not len(connections):
                return Response({"err": "No connection found"}, status.HTTP_404_NOT_FOUND)

            serializer = self.serializer_class(connections, many=True)

            return Response(serializer.data, status.HTTP_200_OK)'''


    def list(self, request, *args, **kwargs):
        connections = self.queryset
        serializer = self.serializer_class(connections, many=True)

        return Response(serializer.data, status.HTTP_200_OK)

    def save(self, request, *args, **kwargs):
        profile_id = kwargs.get("profile_id")

        create_body = {
            "profile": profile_id
        }

        serializer = self.serializer_class(data=create_body)

        if serializer.is_valid():
            serializer.save()

            return Response({"body": serializer.data}, status.HTTP_201_CREATED)

        return Response({"err": serializer.errors}, status.HTTP_400_BAD_REQUEST)


class ChatMessageViewSet(viewsets.ViewSet, ChatMessageMixin):


    def receivedMessagesList(self, request, *args, **kwargs):
        user_id = kwargs.get("userId")
        connection_id = kwargs.get("conId")
        conn = get_object_or_404(Connection, id=connection_id)
        user = get_object_or_404(Profile, user=user_id) #Profile.objects.get(user=user_id)
        profile = get_object_or_404(Profile, id=conn.profile.id)
        rec_chats = self.queryset.filter(msg_sender=user
                                    , msg_receiver=profile)
        #profile = Profile.objects.get(id=fr)

        #serializer = ConnectionSerializer(conn)
        serializer = self.serializer_class(rec_chats, many=True)

        return Response(serializer.data)



    def sendMessagesList(self, request, *args, **kwargs):
        user_id = kwargs.get("userId")
        connection_id = kwargs.get("conId")
        conn = get_object_or_404(Connection, id=connection_id)
        user = get_object_or_404(Profile, user=user_id) #Profile.objects.get(user=user_id)
        profile = get_object_or_404(Profile, id=conn.profile.id)
        rec_chats = self.queryset.filter(msg_sender=profile
                                    , msg_receiver=user)
        #profile = Profile.objects.get(id=fr)

        #serializer = ConnectionSerializer(conn)
        serializer = self.serializer_class(rec_chats, many=True)

        return Response(serializer.data)



    def sendedMessagesList(self, request, *args, **kwargs):
        user_id = kwargs.get("userId")
        connection_id = kwargs.get("conId")
        conn = get_object_or_404(Connection, id=connection_id)
        user = get_object_or_404(Profile, user=user_id) #Profile.objects.get(user=user_id)
        profile = get_object_or_404(Profile, id=conn.profile.id)
        rec_chats = self.queryset.filter(msg_sender=profile
                                    , msg_receiver=user)
        #profile = Profile.objects.get(id=fr)

        #serializer = ConnectionSerializer(conn)
        serializer = self.serializer_class(rec_chats, many=True)

        return Response(serializer.data)


    def list(self, request, *args, **kwargs):
        messages = self.queryset
        serializer = self.serializer_class(messages, many=True)

        return Response(serializer.data, status.HTTP_200_OK)

    def save(self, request, *args, **kwargs):

        body = request.data["body"]
        msg_sender = request.data["msg_sender"]
        msg_receiver = request.data["msg_receiver"]

        create_body = {
            "body": body,
            "msg_sender": msg_sender,
            "msg_receiver": msg_receiver
        }

        serializer = self.serializer_class(data=create_body)

        if serializer.is_valid():
            serializer.save()

            return Response({"body": serializer.data}, status.HTTP_201_CREATED)

        return Response({"err": serializer.errors}, status.HTTP_400_BAD_REQUEST)
