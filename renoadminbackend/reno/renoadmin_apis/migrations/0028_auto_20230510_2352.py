# Generated by Django 3.2.16 on 2023-05-10 18:22

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('renoadmin_apis', '0027_alter_projectbooking_proj_category'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectbooking',
            name='proj_category',
            field=models.CharField(default='', max_length=100),
        ),
        migrations.AlterField(
            model_name='projectmanagementmodel',
            name='project_type',
            field=models.IntegerField(choices=[(0, 0), (1, 1)], default=0),
        ),
    ]
