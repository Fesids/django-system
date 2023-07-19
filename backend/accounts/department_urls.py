from django.urls import path
from . import department_views
urlpatterns = [
    path("list/", department_views.Departmentlist.as_view()),
    path("new/", department_views.DepartmentCreate.as_view()),
    path("update/<int:id>", department_views.DepartmentUpdate.as_view()),
    path("delete/<int:id>", department_views.DepartmentDelete.as_view()),
    path("detail/<int:id>", department_views.DepartmentDetail.as_view())
]