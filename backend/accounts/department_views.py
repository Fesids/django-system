import json

from rest_framework import views, response, generics, permissions, status
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from .serializers import DepartmentSerializer
from .models import Department


class DepartmentMixin(views.APIView):
    permission_classes = (permissions.AllowAny, )
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer


class Departmentlist(DepartmentMixin, generics.ListAPIView):
    pass


class DepartmentCreate(DepartmentMixin):

    def post(self, request, *args, **kwargs):

        data = request.data
        department_name = data["department_name"]


        serializer_resp = self.serializer_class(data={'department_name': department_name})
        if serializer_resp.is_valid():

            serializer_resp.save()

            return Response({"status": "success", "department": serializer_resp.data}, status.HTTP_201_CREATED)

        else:

            return Response({"status": "failed", 'message': serializer_resp.errors}, status.HTTP_400_BAD_REQUEST)



class DepartmentUpdate(DepartmentMixin):
    department = None
    dept_id = None

    def dispatch(self, request, *args, **kwargs):
        self.dept_id = kwargs.get("id")
        self.department = get_object_or_404(Department, id=self.dept_id)
        return super().dispatch(request, self.dept_id)

    def put(self, request, *args, **kwargs):
        if not self.department:
            return Response({"Message": f"department with id {self.dept_id} not found"}, status.HTTP_404_NOT_FOUND)

        serializer = self.serializer_class(instance=self.department, data=request.data, partial=True)

        if serializer.is_valid():
            serializer.save()

            return Response({"body": serializer.data}, status.HTTP_200_OK)

        return Response({"message": serializer.errors}, status.HTTP_404_NOT_FOUND)


class DepartmentDelete(DepartmentMixin):

    department = None
    id = None

    def dispatch(self, request, *args, **kwargs):
        self.id = kwargs.get("id")
        self.department = get_object_or_404(Department, id=self.id)
        return super().dispatch(request, self.id)

    def delete(self, request, *args, **kwargs):

        if not self.department:

            return Response({"ERR": f"department with id {self.id} doesn't exist"}, status.HTTP_400_BAD_REQUEST)

        try:

            self.department.delete()

            return Response({"Message": "department was deleted"}, status.HTTP_400_BAD_REQUEST)

        except:
            return Response({"ERR": "failed to delete department"}, status.HTTP_400_BAD_REQUEST)


class DepartmentDetail(DepartmentMixin):

    id = None
    department = None

    def dispatch(self, request, *args, **kwargs):
        self.id = kwargs.get("id")
        self.department = get_object_or_404(Department, id=self.id)
        return super().dispatch(request, self.id)

    def get(self, request, *args, **kwargs):

        if self.department:
            serializer = self.serializer_class(instance=self.department)

            return Response(serializer.data, status.HTTP_200_OK)

        return Response({"err": f"Department with id {self.id} not exist"})