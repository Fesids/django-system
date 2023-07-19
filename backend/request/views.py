import json

from django.shortcuts import render
from django.shortcuts import get_object_or_404
from rest_framework import views,status, serializers, response, permissions, generics, viewsets
from rest_framework.response import Response
from .serializers import RequestSerializer, SalesRequestSerializer
from .models import Request, SalesRequest

# Create your views here.
class RequestMixin(views.APIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Request.objects.all()
    serializer_class = RequestSerializer


class SalesRequestMixin(views.APIView):
    permission_classes = (permissions.AllowAny, )
    queryset = SalesRequest.objects.all()
    serializer_class = SalesRequestSerializer



class RequestList(RequestMixin, generics.ListAPIView):
    pass


'''class RequestCreate(RequestMixin):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({"body": serializer.data}, status.HTTP_201_CREATED)

        else:

            return Response({"message": serializer.errors}, status.HTTP_400_BAD_REQUEST)'''


class RequestViewSet(viewsets.ViewSet, RequestMixin):

    permission_classes = (permissions.AllowAny,)

    def list(self, request):
        requests = Request.objects.all()
        serializer = self.serializer_class(requests,many=True)

        return Response(serializer.data, status.HTTP_200_OK)

    def requestReceivedByDeptId(self, request, *args, **kwargs):
        dept_id = kwargs.get("id")
        requests = Request.objects.filter(destination_dept_id=dept_id)
        serializer = self.serializer_class(requests, many=True)

        return Response(serializer.data, status.HTTP_200_OK)

    def requestSendByDeptId(self, request, *args, **kwargs):
        dept_id = kwargs.get("id")
        requests = Request.objects.filter(sender_dept_id=dept_id)
        serializer = None#self.serializer_class(requests, many=True)

        if len(requests):
            serializer = self.serializer_class(requests, many=True)

            return Response(serializer.data, status.HTTP_200_OK)

        return Response({"message": "No message send"}, status.HTTP_400_BAD_REQUEST)

    def create(self, request, *args, **kwargs):

        sender_dept_id= request.data["sender_dept_id"]
        destination_dept_id = request.data["destination_dept_id"]
        subject = request.data["subject"]
        body = request.data["body"]
        request_img = request.data["request_image"]
        user_sender = request.data["user_sender"]
        create_request_body = {
            "user_sender": user_sender,
            "sender_dept_id": sender_dept_id,
            "destination_dept_id": destination_dept_id,
            "subject": subject,
            "body": body,
            "request_image": request_img
        }
        serializer = self.serializer_class(data=create_request_body)

        if serializer.is_valid():
            serializer.save()

            return Response({"body": serializer.data}, status.HTTP_201_CREATED)

        else:

            return Response({"message": serializer.errors}, status.HTTP_400_BAD_REQUEST)

    def retrieve(self, request, *args, **kwargs):
        request = get_object_or_404(Request, id=kwargs.get("id"))

        if request:
            serializer = self.serializer_class(instance=request)

            return Response(serializer.data, status.HTTP_200_OK)

        else:
            return Response({"message": f"failed to retrieve request with id {kwargs.get('id')}"})

    def update(self, request, *args, **kwargs):
        request_up = get_object_or_404(Request, id=kwargs.get("id"))

        if request:
            serializer = self.serializer_class(instance=request_up, data=request.data)
            if serializer.is_valid():
                serializer.save()

                return Response(serializer.data, status.HTTP_200_OK)

            else:

                return Response(serializer.errors, status.HTTP_400_BAD_REQUEST)


    def delete(self, request, *args, **kwargs):
        del_request = get_object_or_404(Request, id=kwargs.get("id"))

        if del_request:
            try:
                del_request.delete()

                return Response({"message": "request was deleted"}, status.HTTP_200_OK)

            except:
                return Response({"message": f"request with id {kwargs.get('id')}"})


## SalesRequest
class SalesRequestViewSet(viewsets.ViewSet, SalesRequestMixin):
    serializer_class = SalesRequestSerializer
    def list(self, request):
        sales_request = self.queryset
        serializer = None#self.serializer_class(sales_request, many=True)

        if len(sales_request):
            self.serializer = self.serializer_class(sales_request, many=True)

            return Response(self.serializer.data, status.HTTP_200_OK)

        return Response({"message": "No client request"}, status.HTTP_200_OK)

    '''def detail(self, request, *args, **kwargs):
        id = kwargs.get("id")
        sale_request = get_object_or_404(SalesRequest, id=id)

        serializer = self.serializer_class(instance=sale_request)

        if sale_request:
            return Response({"body": serializer.data}, status.HTTP_200_OK)

        return Response({"message": "Request doesnt exist"})'''


    def create(self, request):

        '''serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response({"body": serializer.data}, status.HTTP_201_CREATED)

        else:

            return Response({"message": serializer.errors}, status.HTTP_400_BAD_REQUEST)'''
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(serializer.data, status.HTTP_201_CREATED)
        else:

            return Response({"message": serializer.errors}, status.HTTP_400_BAD_REQUEST)


    def UpDestinationDeptId(self, request, *args, **kwargs):
        id = kwargs.get("id")
        up_destination = get_object_or_404(SalesRequest, id=id)
        data = request.data
        dest_dept_id = data["destination_dept_id"]
        if up_destination:
            try:
                serializer = self.serializer_class(instance=up_destination, data={"destination_dept_id":dest_dept_id},
                                                   partial=True)

                if serializer.is_valid():
                    serializer.save()

                    return Response({"message": "upado com sucesso"}, status.HTTP_200_OK)

            except:
                return Response({"message": "failed to up"}, status.HTTP_400_BAD_REQUEST)

        else:
            return Response({"message": "request not found"}, status.HTTP_404_NOT_FOUND)


    def retrieve(self, request, *args, **kwargs):
        request = get_object_or_404(SalesRequest, id=kwargs.get("id"))

        if request:
            serializer = self.serializer_class(instance=request)

            return Response(serializer.data, status.HTTP_200_OK)

        else:
            return Response({"message": f"failed to retrieve request with id {kwargs.get('id')}"})

    def drop(self, request, *args, **kwargs):
        #del_request = get_object_or_404(Request, id=kwargs.get("id"))
        del_request = get_object_or_404(SalesRequest, id=kwargs.get("id"))

        if del_request:
            try:
                del_request.delete()

                return Response({"message": "request was deleted"}, status.HTTP_200_OK)

            except:
                return Response({"message": f"request with id {kwargs.get('id')}"})