from django.db import models
from django.utils.translation import gettext_lazy as _
import enum
# Create your models here.

@enum.unique
class SiteType(str, enum.Enum):
    FULL_SITE = 'FULL_SITE'
    FRONT_BASIC = "FRONT_BASIC"
    BACK_BASIC = "BACK_BASIC"

    @classmethod
    def choices(cls):
        return [(item.value, item.name) for item in cls]


class Product(models.Model):

    description = models.CharField(max_length=244)
    body = models.CharField(max_length=244, default=" ")
    siteType = models.CharField(_("site_type_name"), max_length=64, choices=SiteType.choices(), unique=True)
    createdAt = models.DateTimeField(auto_now_add=True)


    class Meta:
        ordering = ('createdAt',)

    def __str__(self):
        return self.siteType

