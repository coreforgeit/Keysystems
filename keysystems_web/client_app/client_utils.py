from django.shortcuts import render, redirect
from django.http.request import HttpRequest
from django.core.files.storage import FileSystemStorage
from django.core.serializers import serialize
from datetime import datetime

import os
import json

from keysystems_web.settings import FILE_STORAGE
from .forms import OrderForm
from .models import Notice, News
from common.models import OrderTopic, Soft, Order, DownloadedFile
from common import log_error, months_str_ru
from enums import OrderStatus, NewsEntryType


# Собирает данные для стандартного окружения клиентской части
def get_main_client_front_data(request: HttpRequest) -> dict:
    user_orders_count = Order.objects.filter(from_user=request.user).exclude(status=OrderStatus.DONE).count()
    notice_count = Notice.objects.filter(viewed=False, user_ks=request.user).count()
    update_soft = News.objects.filter(type_entry=NewsEntryType.UPDATE).all()
    soft_view = serialize(format='json', queryset=update_soft)
    for up_soft in soft_view:
        log_error(up_soft, wt=False)

    soft_json = serialize(format='json', queryset=Soft.objects.filter(is_active=True).all())
    topics_json = serialize(format='json', queryset=OrderTopic.objects.filter(is_active=True).all())

    log_error(request.user.customer, wt=False)
    log_error(request.user.customer.inn, wt=False)
    return {
        'topics': topics_json,
        'soft': soft_json,
        'inn': request.user.customer,
        'orders_count': user_orders_count,
        'notice': notice_count,
        'update_count': 44,
    }


# сохраняет форму отправки обращения
def order_form_processing(request: HttpRequest, form: OrderForm):
    soft = Soft.objects.get(pk=form.cleaned_data['type_soft'])
    topic = OrderTopic.objects.get(pk=form.cleaned_data['type_soft'])
    new_order = Order(
        from_user=request.user,
        text=form.cleaned_data['description'],
        soft=soft,
        topic=topic
    )
    new_order.save()

    files = request.FILES.getlist('addfile')

    folder_path = os.path.join(FILE_STORAGE, str(request.user.inn), str(new_order.pk))
    if not os.path.exists(folder_path) and files:
        os.mkdir(folder_path)

    fs = FileSystemStorage()
    for uploaded_file in files:
        file_path = os.path.join(folder_path, uploaded_file.name)
        filename = fs.save(file_path, uploaded_file)
        file_url = fs.url(filename)

        DownloadedFile.objects.create(
            user_ks=request.user,
            order=new_order,
            url=file_url
        )
