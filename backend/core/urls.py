

from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/product/', include("product.urls")),
    path('api/auth/', include("accounts.urls")),
    path("api/department/", include("accounts.department_urls")),
    path("api/request/", include("request.urls")),
    path("", include("rest_framework.urls")),
    path("api/chat/", include("user_chat.urls"))
]
