# Generated by Django 5.0.6 on 2024-07-17 15:20

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('common', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='customer',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 7, 18, 0, 20, 20, 331556), verbose_name='Создана'),
        ),
        migrations.AlterField(
            model_name='customer',
            name='district',
            field=models.CharField(max_length=255, verbose_name='Район'),
        ),
        migrations.AlterField(
            model_name='customer',
            name='updated_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 7, 18, 0, 20, 20, 331571), verbose_name='Обновлена'),
        ),
        migrations.AlterField(
            model_name='downloadedfile',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 7, 18, 0, 20, 20, 331066), verbose_name='Создана'),
        ),
        migrations.AlterField(
            model_name='order',
            name='created_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 7, 18, 0, 20, 20, 330355), verbose_name='Создана'),
        ),
        migrations.AlterField(
            model_name='order',
            name='updated_at',
            field=models.DateTimeField(default=datetime.datetime(2024, 7, 18, 0, 20, 20, 330379), verbose_name='Обновлена'),
        ),
    ]