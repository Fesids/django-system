from django.contrib import admin
from .models import CustomUserModel, Department
# Register your models here.


@admin.register(CustomUserModel)
class CustomUserModelAdmin(admin.ModelAdmin):

    fields = ['username', 'email', 'department', 'is_active', 'is_staff', 'is_superuser']


@admin.register(Department)
class Department(admin.ModelAdmin):
    fields = ["department_name"]