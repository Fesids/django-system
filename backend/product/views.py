from django.shortcuts import render
from rest_framework import serializers, response, generics, permissions, status
from rest_framework.response import Response
from rest_framework import views, viewsets
from django.shortcuts import get_object_or_404

from .models import Product
from .serializers import ProductSerializer
# Create your views here.


class ProductMixin(views.APIView):
    permission_classes = (permissions.AllowAny,)
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ProductList(ProductMixin, generics.ListAPIView):
    pass


class testeGet(views.APIView):

    def get(self, request, *args, **kwargs):
        return Response("que vergonha")


class ProductCreate(ProductMixin):

    def post(self, request, *args, **kwargs):

        newProductBody = {
            "body": request.data['body'],
            #"product_name": request.data['product_name'],
            "description": request.data["description"],
            "siteType": request.data['siteType']

        }

        serializer = self.serializer_class(data=newProductBody)

        if serializer.is_valid():



            serializer.save()

            return Response({"status": "created", "product": serializer.data}, status.HTTP_201_CREATED)

        else:
            return Response({"status": "failed", "message": serializer.errors}, status.HTTP_400_BAD_REQUEST)


class ManageProduct(ProductMixin, viewsets.ViewSet):

    id = None
    product = None

    '''def dispatch(self, request, *args, **kwargs):
        self.id = kwargs.get("id")
        self.product = get_object_or_404(Product, id=self.id)
        return super().dispatch(self.product, self.id)'''

    def retrieve(self, request, *args, **kwargs):
        id = kwargs.get("id")
        product = get_object_or_404(Product, id=id)

        if product:
            serializer = self.serializer_class(instance=product)

            return Response(serializer.data, status.HTTP_200_OK)

        return Response({"err": f"No product with id {self.id}  not found"}, status.HTTP_404_NOT_FOUND)