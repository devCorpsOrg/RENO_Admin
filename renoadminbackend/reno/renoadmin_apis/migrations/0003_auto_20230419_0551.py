# Generated by Django 3.2.16 on 2023-04-19 00:21

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('renoadmin_apis', '0002_alter_cmsmodel_pageid'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='config_setting',
            name='ids',
        ),
        migrations.RemoveField(
            model_name='pmsmodel',
            name='id',
        ),
        migrations.RemoveField(
            model_name='projectbooking',
            name='ids',
        ),
        migrations.RemoveField(
            model_name='projectmanagementmodel',
            name='id',
        ),
        migrations.RemoveField(
            model_name='purchased_item',
            name='id',
        ),
        migrations.RemoveField(
            model_name='supportdetails',
            name='id',
        ),
        migrations.RemoveField(
            model_name='user_product',
            name='id',
        ),
        migrations.RemoveField(
            model_name='userdetails',
            name='id',
        ),
        migrations.AlterField(
            model_name='cmsmodel',
            name='pageid',
            field=models.CharField(default=uuid.uuid4, max_length=6, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='config_setting',
            name='id',
            field=models.CharField(default=uuid.uuid4, max_length=6, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='pmsmodel',
            name='prod_id',
            field=models.CharField(default=uuid.uuid4, max_length=6, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='projectbooking',
            name='id',
            field=models.CharField(default=uuid.uuid4, max_length=6, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='projectmanagementmodel',
            name='proj_id',
            field=models.CharField(default=uuid.uuid4, max_length=6, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='purchased_item',
            name='pid',
            field=models.CharField(default=uuid.uuid4, max_length=6, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='supportdetails',
            name='support_id',
            field=models.CharField(default=uuid.uuid4, max_length=6, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='user_product',
            name='pid',
            field=models.CharField(default=uuid.uuid4, max_length=6, primary_key=True, serialize=False),
        ),
        migrations.AlterField(
            model_name='userdetails',
            name='uid',
            field=models.CharField(default=uuid.uuid4, max_length=6, primary_key=True, serialize=False),
        ),
    ]
