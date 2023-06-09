# Generated by Django 3.2.16 on 2023-05-04 16:27

from django.db import migrations, models
import renoadmin_apis.models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('renoadmin_apis', '0021_alter_products_featured_flag'),
    ]

    operations = [
        migrations.CreateModel(
            name='Categories',
            fields=[
                ('id', models.CharField(default=uuid.uuid4, max_length=200, primary_key=True, serialize=False)),
                ('pic_url', models.ImageField(blank=True, upload_to=renoadmin_apis.models.Categories.name_file)),
                ('prod_category', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Deals',
            fields=[
                ('id', models.CharField(default=uuid.uuid4, max_length=200, primary_key=True, serialize=False)),
                ('pic_url', models.ImageField(blank=True, upload_to=renoadmin_apis.models.Deals.name_file)),
                ('requester', models.CharField(max_length=100)),
                ('subject', models.CharField(max_length=150)),
                ('msg', models.TextField()),
                ('status', models.CharField(max_length=100)),
            ],
        ),
        migrations.AlterField(
            model_name='crm',
            name='pic_url',
            field=models.ImageField(blank=True, upload_to=renoadmin_apis.models.CRM.name_file),
        ),
        migrations.AlterField(
            model_name='customers',
            name='pic_url',
            field=models.ImageField(blank=True, upload_to=renoadmin_apis.models.Customers.name_file),
        ),
        migrations.AlterField(
            model_name='products',
            name='pic_url',
            field=models.ImageField(blank=True, upload_to=renoadmin_apis.models.Products.name_file),
        ),
        migrations.AlterField(
            model_name='reviews',
            name='pic_url',
            field=models.ImageField(blank=True, upload_to=renoadmin_apis.models.Reviews.name_file),
        ),
        migrations.AlterField(
            model_name='transactions',
            name='pic_url',
            field=models.ImageField(blank=True, upload_to=renoadmin_apis.models.Transactions.name_file),
        ),
    ]
