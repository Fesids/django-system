from django.contrib import admin
from .models import Request, SalesRequest
# Register your models here.


@admin.register(SalesRequest)
class SalesRequestAdmin(admin.ModelAdmin):
    fields = ["destination_dept_id", "subject", "body", "client_email"]


@admin.register(Request)
class RequestAdmin(admin.ModelAdmin):
    fields = ["user_sender","sender_dept_id","destination_dept_id","subject","body"]
