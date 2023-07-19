from django.urls import path
from .views import RequestViewSet, SalesRequestViewSet

urlpatterns = [
    path("list", RequestViewSet.as_view({
        'get': 'list',
        'post': 'create'
    })),

    path("list/<int:id>", RequestViewSet.as_view({
        'get': 'retrieve',
        'put': 'update',
        'delete': 'delete'
    })),

    path("list/department/received/<int:id>", RequestViewSet.as_view({
        'get': 'requestReceivedByDeptId'
    })),

    path("list/department/sender/<int:id>", RequestViewSet.as_view({
        'get': 'requestSendByDeptId'
    })),

    path("list/client", SalesRequestViewSet.as_view({
        'get': 'list'
    })),

    path("list/client/new", SalesRequestViewSet.as_view({
        'post': 'create'
    })),

    path("list/client/<int:id>", SalesRequestViewSet.as_view({
        "patch": "UpDestinationDeptId",
        "get": "retrieve",
        "delete": "drop"
    }))

]