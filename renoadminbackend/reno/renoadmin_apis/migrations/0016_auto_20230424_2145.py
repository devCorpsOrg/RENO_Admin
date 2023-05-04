# Generated by Django 3.2.16 on 2023-04-24 16:15

from django.db import migrations, models
import renoadmin_apis.models


class Migration(migrations.Migration):

    dependencies = [
        ('renoadmin_apis', '0015_listings'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pmsmodel',
            name='pic',
            field=models.ImageField(upload_to=renoadmin_apis.models.pmsModel.nameFile),
        ),
        migrations.AlterField(
            model_name='pmsmodel',
            name='project_details',
            field=models.CharField(max_length=200),
        ),
    ]
