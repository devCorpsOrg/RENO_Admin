# Generated by Django 3.2.16 on 2023-04-24 16:28

from django.db import migrations, models
import renoadmin_apis.models


class Migration(migrations.Migration):

    dependencies = [
        ('renoadmin_apis', '0016_auto_20230424_2145'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cmsmodel',
            name='media',
            field=models.ImageField(upload_to=renoadmin_apis.models.cmsModel.nameFile),
        ),
        migrations.AlterField(
            model_name='listings',
            name='pic_url',
            field=models.ImageField(upload_to=renoadmin_apis.models.listings.nameFile),
        ),
        migrations.AlterField(
            model_name='projectmanagementmodel',
            name='pic',
            field=models.ImageField(upload_to=renoadmin_apis.models.ProjectManagementModel.nameFile),
        ),
        migrations.AlterField(
            model_name='supportdetails',
            name='pic',
            field=models.ImageField(upload_to=renoadmin_apis.models.SupportDetails.nameFile),
        ),
        migrations.AlterField(
            model_name='userdetails',
            name='name',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='userdetails',
            name='pic',
            field=models.ImageField(upload_to=renoadmin_apis.models.Userdetails.nameFile),
        ),
    ]
