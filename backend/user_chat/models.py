from django.db import models
from django.conf import settings
# Create your models here.


user = settings.AUTH_USER_MODEL


class Profile(models.Model):
    user = models.OneToOneField(user, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    pic = models.ImageField(upload_to="uploads/profile", blank=True, null=True)
    connections = models.ManyToManyField("Connection", related_name="my_connections", null=True)

    def __str__(self):
        return self.name


class Connection(models.Model):
    profile = models.OneToOneField(Profile, on_delete=models.CASCADE, null=True)

    def __str__(self):
        return self.profile.name


class ChatMessage(models.Model):
    body = models.TextField()
    msg_sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="msg_sender")
    msg_receiver = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="msg_receiver")
    seen = models.BooleanField(default=False)

    def __str__(self):
        return self.body





