# Generated by Django 4.2.1 on 2023-07-17 17:40

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='SalesRequest',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('subject', models.CharField(max_length=255)),
                ('body', models.CharField(max_length=255)),
                ('client_email', models.EmailField(max_length=244)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('destination_dept_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='destination_dept_sale', to='accounts.department')),
            ],
        ),
        migrations.CreateModel(
            name='Request',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('request_image', models.ImageField(blank=True, default=' ', null=True, upload_to='uploads/request')),
                ('subject', models.CharField(max_length=255)),
                ('body', models.CharField(max_length=255)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('destination_dept_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='destination_dept', to='accounts.department')),
                ('sender_dept_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sender_dept', to='accounts.department')),
                ('user_sender', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='user_id', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
