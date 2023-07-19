from django.urls import path
from . import views

urlpatterns = [
    path("product_list/", views.ProductList.as_view()),
    path("new/", views.ProductCreate.as_view()),
    path("teste/", views.testeGet.as_view()),

    path("product_list/detail/<int:id>/", views.ManageProduct.as_view({
        'get': 'retrieve'
    }))
]