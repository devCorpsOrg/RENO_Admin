# Generated by Django 3.2.16 on 2023-04-29 07:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('renoadmin_apis', '0018_alter_projectmanagementmodel_project_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectmanagementmodel',
            name='project_type',
            field=models.CharField(blank=True, default='Featured', max_length=100, null=True),
        ),
    ]
