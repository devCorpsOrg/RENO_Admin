# Generated by Django 3.2.16 on 2023-04-29 07:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('renoadmin_apis', '0017_auto_20230424_2158'),
    ]

    operations = [
        migrations.AlterField(
            model_name='projectmanagementmodel',
            name='project_type',
            field=models.CharField(blank=True, default='Featured', max_length=100),
        ),
    ]
