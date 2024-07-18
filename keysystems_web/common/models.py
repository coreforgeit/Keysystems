from django.db import models
from django.contrib.auth.models import AbstractUser, Group, Permission
from datetime import datetime

from enums import OrderStatus, ORDER_CHOICES


# пользователи
class UserKS(AbstractUser):
    inn = models.BigIntegerField('ИНН', null=True, blank=True)
    email = models.CharField('Почта', max_length=100, null=True, blank=True)
    full_name = models.CharField('ФИО', max_length=255, null=True, blank=True)
    phone = models.CharField('Телефон', max_length=100, null=True, blank=True)

    groups = models.ManyToManyField(
        Group,
        related_name='customuser_set',
        blank=True,
        help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.',
        related_query_name='customuser',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='customuser_set',
        blank=True,
        help_text='Specific permissions for this user.',
        related_query_name='customuser',
    )


# Список ПО
class Soft(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField('Название ПО', max_length=255)
    description = models.CharField('Описание', max_length=255)
    is_active = models.BooleanField('Активно', default=True)

    objects = models.Manager()

    class Meta:
        verbose_name = 'ПО'
        verbose_name_plural = 'ПО'
        db_table = 'soft'


# используемое ПО (связывает пользователя и ПО)
class UsedSoft(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(UserKS, on_delete=models.CASCADE, related_name='used_soft')
    soft = models.ForeignKey(Soft, on_delete=models.CASCADE, related_name='used_soft')

    objects = models.Manager()

    class Meta:
        verbose_name = 'ПО пользователей'
        verbose_name_plural = 'ПО пользователей'
        db_table = 'used_soft'


# темы обращений
class OrderTopic(models.Model):
    id = models.AutoField(primary_key=True)
    topic = models.CharField('Тема', max_length=255)
    is_active = models.BooleanField(default=True)

    objects = models.Manager()

    class Meta:
        verbose_name = 'Тема обращения'
        verbose_name_plural = 'Темы обращений'
        db_table = 'orders_topics'


# заказы
class Order(models.Model):
    id = models.AutoField(primary_key=True)
    # created_at = models.DateTimeField('Создана', default=datetime.now())
    created_at = models.DateTimeField('Создана', auto_now_add=True)
    # updated_at = models.DateTimeField('Обновлена', default=datetime.now())
    updated_at = models.DateTimeField('Обновлена', auto_now=True)

    from_user = models.ForeignKey(UserKS, on_delete=models.DO_NOTHING, related_name='created_orders')
    text = models.CharField('Текст', max_length=255)
    soft = models.ForeignKey(Soft, on_delete=models.DO_NOTHING, related_name='order')
    topic = models.ForeignKey(OrderTopic, on_delete=models.DO_NOTHING, related_name='order')
    executor = models.ForeignKey(UserKS, on_delete=models.DO_NOTHING, related_name='executed_orders', null=True, blank=True)
    status = models.CharField('Статус', default=OrderStatus.NEW.value, choices=ORDER_CHOICES)

    objects = models.Manager()

    class Meta:
        verbose_name = 'Заявка'
        verbose_name_plural = 'Заявки'
        db_table = 'orders'


# загруженные файлы
class DownloadedFile(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField('Создана', default=datetime.now())
    user_ks = models.ForeignKey(UserKS, on_delete=models.DO_NOTHING, related_name='downloadedfile')
    order = models.ForeignKey(Order, on_delete=models.CASCADE, related_name='downloadedfile')
    url = models.CharField('Ссылка', max_length=255, default=OrderStatus.NEW.value, choices=ORDER_CHOICES)

    objects = models.Manager()

    class Meta:
        verbose_name = 'Скаченный файл'
        verbose_name_plural = 'Скаченные файлы'
        db_table = 'downloaded_file'


# модель клиентов customer
class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    created_at = models.DateTimeField('Создана', auto_now_add=True)
    updated_at = models.DateTimeField('Обновлена', auto_now=True)
    inn = models.BigIntegerField('ИНН', null=True, blank=True)
    district = models.CharField('Район', max_length=255)
    title = models.CharField('Название', max_length=255)

    objects: models.Manager = models.Manager()

    def __str__(self):
        return f"{self.title}"

    class Meta:
        verbose_name = 'Клиент'
        verbose_name_plural = 'Клиенты'
        db_table = 'customers'