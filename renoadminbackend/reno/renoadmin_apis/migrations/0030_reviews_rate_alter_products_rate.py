# Generated by Django 4.0.10 on 2023-05-18 07:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('renoadmin_apis', '0029_crm_email'),
    ]

    operations = [
        migrations.AddField(
            model_name='reviews',
            name='rate',
            field=models.FloatField(default=0),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='products',
            name='rate',
            field=models.FloatField(),
        ),
    ]
