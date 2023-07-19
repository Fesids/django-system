from django.urls import path
from . import views

urlpatterns = [
    # auth path

    path("signup/", views.SignupView.as_view()),
    path("login/", views.LoginView.as_view()),
    path("csrf_cookie/", views.GetCSRFToken.as_view()),
    path("external/signup/", views.SignUpExternalUser.as_view()),
    path("user", views.user),
    path('refresh-token', views.CookieTokenRefreshView.as_view()),
    path('logout', views.LogoutView.as_view()),

    # CRUD path

    path("list/", views.UserList.as_view()),
    path("update/<int:id>", views.UpdateUser.as_view()),
    path("delete/<int:id>", views.DeleteUser.as_view()),

    # user by departments

    path("all/department/<int:dept_id>", views.GetAllUserByDepartment.as_view()),

    # search users
    path("search", views.SearchUser.as_view())
]