from django.db import models
from django.contrib.auth.models import BaseUserManager, AbstractUser, PermissionsMixin
from django.shortcuts import get_object_or_404

# Create your models here.


class Department(models.Model):
    department_name = models.CharField(max_length=244, null=False, blank=False)

    def __str__(self):
        return self.department_name


class UserManager(BaseUserManager):

    def create_external_user(self, username, email, password, dept=None):
        if not email:
            raise ValueError("A user must've email")
        user = self.create_user(username, email, password, dept)
        user.is_staff=False
        user.is_superuser= False
        user.is_external= True

    def create_user(self, username, email, password, dept=None):

        if not email:
            raise ValueError("A user must've an email")
        email = self.normalize_email(email)
        user = self.model(username=username, email=email, department=dept)
        user.set_password(password)


        user.save()

        return user

    def create_superuser(self, username, email, password=None):

        if not email:
            raise ValueError("A superuser must've an email")
        #dept = get_object_or_404(Department, id=1)
        user = self.create_user(username, email, password)
        user.is_staff = True
        user.is_superuser = True

        user.save()

        return user


class CustomUserModel(AbstractUser, PermissionsMixin):
    email = models.EmailField(max_length=244, unique=True)
    username = models.CharField(max_length=244, unique=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE,
                                   related_name="user_department", null=True, blank=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_external = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username', ]

    objects = UserManager()

    def __str__(self):
        return self.email



