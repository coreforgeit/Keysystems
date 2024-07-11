# Generated by Django 5.0.6 on 2024-07-10 11:12

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='UserKS',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('inn', models.BigIntegerField(verbose_name='ИНН')),
                ('email', models.CharField(blank=True, max_length=100, null=True, verbose_name='Почта')),
                ('full_name', models.CharField(blank=True, max_length=255, null=True, verbose_name='ФИО')),
                ('phone', models.CharField(blank=True, max_length=100, null=True, verbose_name='Телефон')),
                ('password', models.CharField(blank=True, max_length=100, null=True, verbose_name='Пароль')),
                ('role', models.CharField(choices=[('client', 'Клиент'), ('staff', 'Staff')], default='client', max_length=10, verbose_name='Роль')),
                ('product_id', models.IntegerField(verbose_name='ПО ID')),
            ],
            options={
                'verbose_name': 'Пользователь',
                'verbose_name_plural': 'Пользователи',
                'db_table': 'users_ks',
            },
        ),
    ]
