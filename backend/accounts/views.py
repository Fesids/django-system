import json

from django.middleware import csrf
from django.shortcuts import render
from django.middleware.csrf import get_token
from django.contrib import auth
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import ensure_csrf_cookie, csrf_protect, csrf_exempt
from django.utils.decorators import method_decorator
from rest_framework import exceptions as rest_exceptions, response, decorators as rest_decorators, permissions as rest_permissions
from rest_framework_simplejwt import tokens, views as jwt_views, serializers as jwt_serializers, exceptions as jwt_exceptions

from django.db.models import Q
from django.conf import settings

from rest_framework import views, permissions, generics, status
from rest_framework.response import Response
from rest_framework_simplejwt import tokens, views as jwt_views, serializers as jwt_serializers, exceptions as jwt_exceptions

from .models import CustomUserModel, Department
from .serializers import UserSerializer
#from .custompermissions import updateuserpermission
# create your views here.

## auth views


class CookieTokenRefreshSerializer(jwt_serializers.TokenRefreshSerializer):
    refresh = None

    def validate(self, attrs):
        attrs['refresh'] = self.context['request'].COOKIES.get('refresh')
        if attrs['refresh']:
            return super().validate(attrs)
        else:
            token = jwt_exceptions.InvalidToken('No valid token found in cookie \'refresh\'')
            raise token


class CookieTokenRefreshView(jwt_views.TokenRefreshView):
    serializer_class = CookieTokenRefreshSerializer

    def finalize_response(self, request, response, *args, **kwargs):
        if response.data.get("refresh"):
            response.set_cookie(
                key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                value=response.data['refresh'],
                expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
            )

            del response.data["refresh"]
        response["X-CSRFToken"] = request.COOKIES.get("csrftoken")
        return super().finalize_response(request, response, *args, **kwargs)



class SignUpExternalUser(views.APIView):

    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = request.data

        username = data["username"]
        password = data["password"]
        re_password = data["re_password"]
        email = data["email"]
        #dept = data["department"]

        try:
            if password == re_password:
                if CustomUserModel.objects.filter(username=username):
                    return Response({"err": "a user with this username already exist"}, status.HTTP_400_BAD_REQUEST)
                else:
                    if len(password) < 6:
                        return Response({"err": "a password must've at least 6 characters"}, status.HTTP_400_BAD_REQUEST)

                    else:

                        depart = get_object_or_404(Department, id=1)
                        if not depart:
                            return Response({"err": f"department with id {id} not exist"})
                        user = CustomUserModel.objects.create_external_user(username=username, password=password, email=email, dept=depart)

                        return Response({"message": "user created successfully"}, status.HTTP_201_CREATED)

        except:
            return Response({"err": "failed to create user"}, status.HTTP_400_BAD_REQUEST)


#@method_decorator(csrf_protect, name='dispatch')
class SignupView(views.APIView):

    permission_classes = (permissions.AllowAny, )

    def post(self, request, format=None):
        data = request.data

        username = data["username"]
        password = data["password"]
        dept = data["department"]
        email = data["email"]
        re_password = data["re_password"]

        try:
            if password == re_password:
                if CustomUserModel.objects.filter(username=username).exists():
                    return Response({"err": "a user with this username already exists"}, status.HTTP_400_BAD_REQUEST)

                else:
                    if len(password) < 6:
                        return Response({"err": "the password should've at least 6 characters"},
                                        status.HTTP_400_BAD_REQUEST)

                    else:

                        depart = get_object_or_404(Department, id=dept)
                        if not depart:
                            return Response({"err": f"department with id {id} not exist"})

                        user = CustomUserModel.objects.create_user(username=username, email=email, password=password, dept=depart)

                        return Response({"successs": 'user created successfully'}, status.HTTP_201_CREATED)

        except:
            return Response({'err': "something went wrong when registering ypu account"}, status.HTTP_400_BAD_REQUEST)


def get_user_token(u):
    refresh = tokens.RefreshToken.for_user(u)

    return {
        "refresh_token": str(refresh),
        "access_token": str(refresh.access_token)
    }


class LoginView(views.APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        data = request.data

        username = data["username"]
        password = data["password"]

        try:
            user = auth.authenticate(username=username, password=password)

            if user is not None:

                tokens = get_user_token(user)
                auth.login(request, user)
                res = Response()

                res.set_cookie(
                    key=settings.SIMPLE_JWT['AUTH_COOKIE'],
                    value=tokens["access_token"],
                    expires=settings.SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
                    secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                    httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                    samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
                )

                res.set_cookie(
                    key=settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'],
                    value=tokens["refresh_token"],
                    expires=settings.SIMPLE_JWT['REFRESH_TOKEN_LIFETIME'],
                    secure=settings.SIMPLE_JWT['AUTH_COOKIE_SECURE'],
                    httponly=settings.SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
                    samesite=settings.SIMPLE_JWT['AUTH_COOKIE_SAMESITE']
                )
                #response_user = get_object_or_404(CustomUserModel, email=username)
                res.data = tokens
                #print(response_user)
                res["X-CSRFToken"] = csrf.get_token(request)

                return res

            else:
                return Response({"err": "error when trying to authenticating"}, status.HTTP_400_BAD_REQUEST)

        except:
            return Response({"err": "something went wrong"}, status.HTTP_400_BAD_REQUEST)










'''@method_decorator(csrf_protect, name='dispatch')
class loginview(views.apiview):
    permission_classes = (permissions.allowany,)

    def post(self, request, format=none):
        data = request.data

        username = data["username"]
        password = data["password"]

        try:
            user = auth.authenticate(username=username, password=password)

            if user is not none:

                tokens = get_user_token(user)
                auth.login(request, user)
                return response({"success": "user authenticated"}, status.http_200_ok).set_cookie(
                    key= settings.simple_jwt['auth_cookie'],
                    value= tokens["access_token"],
                    expires=settings.simple_jwt['access_token_lifetime'],
                    secure= settings.simple_jwt['auth_cookie_secure'],
                    httponly= settings.simple_jwt['auth_cookie_http_only'],
                    samesite= settings.simple_jwt['auth_cookie_samesite']
                )

            else:
                return response({"err": "error when trying to authenticating"}, status.http_400_bad_request)

        except:
            return response({"err": "something went wrong"}, status.http_400_bad_request)

'''
@method_decorator(ensure_csrf_cookie, name='dispatch')
class GetCSRFToken(views.APIView):
    permission_classes = (permissions.AllowAny, )

    def get(self, request, format=None):
        return Response({'success': "jui"}, status.HTTP_200_OK)


class checkauthenticatedview(views.APIView):

    def get(self, request, format=None):
        user = self.request.user

        try:

            isauthenticated = user.is_authenticated

            if isauthenticated:

                return Response({'isauthenticated': 'true'}, status.HTTP_200_OK)

            else:

                return Response({'isauthenticated': 'false'}, status.HTTP_400_BAD_REQUEST)

        except:

            return Response({'err': 'something went wrong when checking authentication status'}, status.HTTP_400_BAD_REQUEST)


class LogoutView(views.APIView):

    def post(self, request, *args, **kwargs):
        try:
            auth.logout(request)

            refreshToken = request.COOKIES.get(
                settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
            token = tokens.RefreshToken(refreshToken)
            token.blacklist()

            res = response.Response()
            res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE'])
            res.delete_cookie(settings.SIMPLE_JWT['AUTH_COOKIE_REFRESH'])
            res.delete_cookie("X-CSRFToken")
            res.delete_cookie("csrftoken")
            res["X-CSRFToken"] = None

            return res

        except:
            return Response({'err': 'something went wrong when logging out'})


@rest_decorators.api_view(["GET"])
@rest_decorators.permission_classes([rest_permissions.IsAuthenticated])
def user(request):
    try:

        user = CustomUserModel.objects.get(id=request.user.id)

    except:

        return Response({"err": "queeeee isssss"}, status.HTTP_400_BAD_REQUEST)

    serializer = UserSerializer(user)

    return Response(serializer.data)




# user crud views

class UserList(generics.ListAPIView):
    permission_classes = (permissions.AllowAny, )
    queryset = CustomUserModel.objects.all()
    serializer_class = UserSerializer


@method_decorator(csrf_protect, name='dispatch')
class UpdateUser(views.APIView):

    id = None
    user = None
    serializer_class = UserSerializer
    #permission_classes = (permissions.isauthenticated, permissions.isadminuser )
    #### permission_classes = (updateuserpermission, )

    def dispatch(self, request, *args, **kwargs):
        self.id = kwargs.get("id")
        self.user = get_object_or_404(CustomUserModel, id=self.id)
        return super(UpdateUser, self).dispatch(request, self.id)

    def put(self, request, *args, **kwargs):
        if not self.user:
            return Response({"message": "account not found"}, status.HTTP_400_BAD_REQUEST)

        '''updatebody = {
            "username": request.data["username"],
            "email": request.data["email"],
            "first_name": request.data["first_name"],
            "last_name": request.data["last_name"]
        }'''

        serializer = UserSerializer(instance=self.user, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            return Response({"body": serializer.data})

        return Response({"err": serializer.errors})


class DeleteUser(views.APIView):

    user = None
    id = None
    permission_classes = (permissions.AllowAny, )

    def dispatch(self, request, *args, **kwargs):
        self.id = kwargs.get("id")
        self.user = get_object_or_404(CustomUserModel, id=self.id)
        return super(DeleteUser, self).dispatch(request, self.id)

    def delete(self, request, *args, **kwargs):

        if not self.user:

            return Response({"err": f"user with id {self.id} not found"})

        try:

            self.user.delete()

            return Response({"success": "user was deleted"}, status.HTTP_200_OK)

        except:

            return Response({"err": "failed to delete user"}, status.HTTP_400_BAD_REQUEST)


class GetAllUserByDepartment(views.APIView):
    permission_classes = [permissions.AllowAny,]
    serializer_class = UserSerializer
    dept_id = None
    users = None

    def dispatch(self, request, *args, **kwargs):
        self.dept_id = kwargs.get("dept_id")
        #self.users = customusermodel.objects.filter(department=self.dept_id)
        self.users = CustomUserModel.objects.filter(department=self.dept_id)
        return super(GetAllUserByDepartment, self).dispatch(request, self.dept_id)

    def get(self, request, *args, **kwargs):

        return Response({"body": UserSerializer(self.users, many=True).data})


class SearchUser(views.APIView):

    results = None
    permission_classes = [permissions.AllowAny]


    def dispatch(self, request, *args, **kwargs):

        query = request.get.get('search')

        if query == '':
            query = 'a'


        self.results = CustomUserModel.objects.filter(
            Q(email_icontains=query) | Q(username_icontains=query)
        )

        return super().dispatch(request, query)

    def get(self, request, *args, **kwargs):

        return Response({"body": UserSerializer(self.results, many=True).data})








