from django.db import models
from django.conf import settings
from accounts.models import Department
# Create your models here.


class SalesRequest(models.Model):
    destination_dept_id = models.ForeignKey(Department, related_name="destination_dept_sale", on_delete=models.CASCADE)
    subject = models.CharField(max_length=255)
    body = models.CharField(max_length=255)
    client_email = models.EmailField(max_length=244)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject


class Request(models.Model):

    request_image = models.ImageField(upload_to="uploads/request", blank=True, null=True, default=' ')
    user_sender = models.ForeignKey(settings.AUTH_USER_MODEL, related_name="user_id", on_delete=models.CASCADE)
    sender_dept_id = models.ForeignKey(Department, related_name="sender_dept", on_delete=models.CASCADE)
    destination_dept_id = models.ForeignKey(Department, related_name="destination_dept", on_delete=models.CASCADE)
    subject = models.CharField(max_length=255)
    body = models.CharField(max_length=255)
    createdAt = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.subject


