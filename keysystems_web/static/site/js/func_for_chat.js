// Кнопка закрыть
function btnClose() {
    let ModalRequestClose = document.createElement('div')
    ModalRequestClose.classList.add('modal1_img')
    ModalRequestClose.classList.add('modal-close')

    let modalCloseImg = document.createElement('img')
    modalCloseImg.setAttribute('src', link)
    ModalRequestClose.appendChild(modalCloseImg)

    return ModalRequestClose
}

// Заголовок
function modalTitle(title) {
    let ModalRequestH = document.createElement('h4')
    ModalRequestH.innerHTML = title
    return ModalRequestH
}

// создает список ПО для кураторской панели
function selectPO(selector, arr, selSoft) {
    for (let i = 0; i < arr.length; i++) {
        let optionPO = document.createElement('option')
        optionPO.setAttribute('value', arr[i]['id'])
        optionPO.innerHTML = arr[i]['title']

        if (arr[i]['title'] == selSoft) {
            optionPO.selected = true;
        }
        document.querySelector(selector).appendChild(optionPO)
    }
}

// для скачивания файлов (приложены к заявкам)
function btnLdFile(selector, arr) {
    // console.log('>>>>>> arr')
    // console.log(arr)
    for (let i = 0; i < arr.length; i++) {
        let btnFile = document.createElement('button')
        btnFile.classList.add('update_file_btn')
        document.querySelector(selector).appendChild(btnFile)

        let ldFileLink = document.createElement('a')
        ldFileLink.setAttribute('href', arr[i]['url'])
        ldFileLink.setAttribute('download', arr[i]['filename']);
        btnFile.appendChild(ldFileLink)

        let ldFileLinkItem = document.createElement('div')
        ldFileLinkItem.classList.add('update_file_item')
        ldFileLink.appendChild(ldFileLinkItem)

        // картинка слева
        let ldFileLeft = document.createElement('div')
        ldFileLeft.classList.add('update_file_img')
        ldFileLinkItem.appendChild(ldFileLeft)

        let ldFileImg = document.createElement('img')
        // добавить переменную
        ldFileImg.setAttribute('src', arr[i]['icon'])
        ldFileLeft.appendChild(ldFileImg)

        // центр - название файла, размер
        let ldFileCenter = document.createElement('div')
        ldFileCenter.classList.add('update_file_center')
        ldFileLinkItem.appendChild(ldFileCenter)

        let ldFileName = document.createElement('p')
        ldFileName.classList.add('update_file_name')
        ldFileName.classList.add('file_name_width')
        ldFileName.innerHTML = arr[i]['filename']
        ldFileCenter.appendChild(ldFileName)

        let ldFileSize = document.createElement('p')
        ldFileSize.classList.add('update_file_size')
        ldFileSize.innerHTML = arr[i]['file_size']
        ldFileCenter.appendChild(ldFileSize)

        // картинка справа
        let ldFileRight = document.createElement('div')
        ldFileRight.classList.add('update_file_dnl')
        ldFileLinkItem.appendChild(ldFileRight)

        let ldFileDnl = document.createElement('img')
        ldFileDnl.setAttribute('src', fileDnl)
        ldFileRight.appendChild(ldFileDnl)
    }
}

//  если пользователь в списке исполнителей
function isMyOrder(arr) {
    let myOrder = false
    for (let i = 0; i < arr.length; i++) {
        if (arr[i]['id'] == window.userId) {
            myOrder = true
        }
    }
    return myOrder
}

// функция для списка кураторов
function createCuratorsList(selector, arr, status) {
    let myOrder = false
    let curatorContainer = document.querySelector(selector)
    curatorContainer.innerHTML = ''
    for (let i = 0; i < arr.length; i++) {
        let curatorForRequest = document.createElement('div')
        curatorForRequest.classList.add('curator_item')

        // let curatorContainer = document.querySelector(selector)
        // curatorContainer.innerHTML = ''
        curatorContainer.appendChild(curatorForRequest)

        let curatorItemLeft = document.createElement('div')
        curatorItemLeft.classList.add('curator_item_left')
        curatorForRequest.appendChild(curatorItemLeft)

        let curItemImg = document.createElement('img')
        curItemImg.setAttribute('src', curatorItemImg)
        curatorItemLeft.appendChild(curItemImg)

        let curatorUser = document.createElement('div')
        curatorUser.classList.add('curator_item_center')
        curatorUser.innerHTML = arr[i]['full_name']
        curatorForRequest.appendChild(curatorUser)

        if (arr[i]['id'] == window.userId && status !== 'done') {
            myOrder = true
            let userMe = document.createElement('span')
            userMe.innerHTML = ` (Я)`
            curatorUser.append(userMe)
        }

        let curatorItemRight = document.createElement('a')
        curatorItemRight.setAttribute('href', '#modal_add_curator')
        curatorItemRight.setAttribute('data-user', arr[i]['id'])
        curatorItemRight.classList.add('modal-trigger')
        curatorItemRight.classList.add('curator_item_right')
        curatorForRequest.appendChild(curatorItemRight)

        let curItemImgClose = document.createElement('img')
        curItemImgClose.setAttribute('src', link)
        curatorItemRight.appendChild(curItemImgClose)


    }
    // if (myOrder) {
    // кнопка добавить испольнителей
    let addCurator = document.createElement('a')
    addCurator.setAttribute('href', '#modal_add_curator')
    addCurator.classList.add('btn_add_curator')
    addCurator.classList.add('modal-trigger')

    document.querySelector(selector).appendChild(addCurator)

    let addCuratorImg = document.createElement('img')
    addCuratorImg.setAttribute('src', imgPlus)
    addCurator.appendChild(addCuratorImg)

    // триггер удалить куратора
    modalAddCuratorsTrigger('.curator_item_right')
    // триггер добавить куратора
    modalAddCuratorsTrigger('.btn_add_curator')
}

// изменяет список кураторов
function clickAddCurator(delUser = null) {
    document.getElementById('btnAddCurator').addEventListener('click', function () {

        // Получаем выбранный элемент
        const selectedOption = document.getElementById('add_curator_1').value;

        // Отправляем данные на бэкэнд через WebSocket
        window.chatSocket.send(JSON.stringify({
            'event': 'edit_curator',
            'add': selectedOption,
            'del': delUser,
            'order_id': window.orderId,
            'room_name': window.roomName
        }));
    });
}



// создает модальное окно с выбором исполнителей
function modalAddCuratorsTrigger(selector) {
    const targets = document.querySelectorAll(`#statusOrder ${selector}`)

    if (targets) {
        targets.forEach(target => {
            target.addEventListener('click', (event) => {

                // тут удаляем если он один
                let curatorsList = document.querySelectorAll('.curator_item').length
                // console.log(`>>>>> ${curatorsList} ${selector}`)

                if (curatorsList > 1 && selector == '.curator_item_right') {
                    // console.log(event)
                    event.preventDefault()
                    event.stopPropagation();
                    window.chatSocket.send(JSON.stringify({
                        'event': 'edit_curator',
                        'del': target.getAttribute('data-user'),
                        'order_id': window.orderId,
                        'room_name': window.roomName
                    }));
                    return
                }

                // Выполняем запрос к бэку
                fetch("/get-curators", {
                    method: "POST", // Указываем метод POST
                    headers: {
                        "Content-Type": "application/json", // Указываем, что отправляем JSON данные
                        "X-CSRFToken": getCSFRT() // Добавляем CSRF токен, если используете Django
                    },
                    body: JSON.stringify({
                        order_id: window.orderId,
                        user_id: window.userId
                    })
                })
                    .then(response => response.json())
                    .then(data => {
                        console.log('data')
                        console.log(data)

                        // if (data.length == 0) {
                        //     event.preventDefault()
                        //     event.stopPropagation();
                        //     return
                        // }

                        let modalAddCurator = document.querySelector('#modal_add_curator')
                        modalAddCurator.innerHTML = ''


                        let modalAddCuratorContent = document.createElement('div')
                        modalAddCuratorContent.classList.add('modal-content')
                        modalAddCurator.appendChild(modalAddCuratorContent)

                        let modalAddCuratorClose = btnClose()
                        modalAddCuratorContent.appendChild(modalAddCuratorClose)


                        if (selector == '.btn_add_curator') {
                            let modalAddCuratorTitle = modalTitle('Добавить исполнителя')
                            modalAddCuratorContent.appendChild(modalAddCuratorTitle)
                        } else {
                            let modalAddCuratorTitle = modalTitle('Снять с себя задачу')
                            modalAddCuratorContent.appendChild(modalAddCuratorTitle)

                            let text = document.createElement('p')
                            text.innerHTML = 'Для того чтобы снять с себя задачу, вам необходимо назничить кого другого на роль исполнителя.'
                            modalAddCuratorContent.appendChild(text)
                        }

                        // Форма
                        let formAddCurator = document.createElement('form')
                        formAddCurator.classList.add('mod_request_form')
                        formAddCurator.classList.add('enter_form')
                        formAddCurator.setAttribute('id', 'form_add_curator')
                        formAddCurator.setAttribute('method', 'post')
                        formAddCurator.innerHTML = getCSFRT()
                        modalAddCuratorContent.appendChild(formAddCurator)

                        // Выбрать исполнителя
                        let addCurator = document.createElement('p')
                        // addCurator.id = 'test-id-addCurator'
                        formAddCurator.appendChild(addCurator)

                        let labelAddCurator = document.createElement('label')
                        labelAddCurator.setAttribute('for', 'add_curator')
                        labelAddCurator.classList.add('required')
                        labelAddCurator.innerHTML = `Выберите исполнителя`
                        addCurator.appendChild(labelAddCurator)

                        let selectAddCurator = document.createElement('select')
                        selectAddCurator.setAttribute('name', 'add_curator')
                        selectAddCurator.setAttribute('id', 'add_curator_1')
                        addCurator.appendChild(selectAddCurator)

                        // добавить цикл с вариантами выбора
                        // console.log('data.length')
                        // console.log(data.length)
                        for (let i = 0; i < data.length; i++) {
                            // console.log(data[i])
                            let optionAddCurator = document.createElement('option')
                            optionAddCurator.setAttribute('value', data[i]['id'])
                            optionAddCurator.innerHTML = data[i]['full_name']
                            selectAddCurator.appendChild(optionAddCurator)
                        }

                        // футер-кнопки
                        let footerAddCurator = document.createElement('div')
                        footerAddCurator.classList.add('mod_support_flex')
                        modalAddCuratorContent.appendChild(footerAddCurator)

                        let btnAddCuratorCancel = document.createElement('a')
                        btnAddCuratorCancel.classList.add('btn_support_cancel')
                        btnAddCuratorCancel.classList.add('modal-close')
                        btnAddCuratorCancel.innerHTML = `Отмена`
                        footerAddCurator.appendChild(btnAddCuratorCancel)

                        let btnAddCuratorSubmit = document.createElement('button')
                        btnAddCuratorSubmit.setAttribute('id', 'btnAddCurator')
                        btnAddCuratorSubmit.classList.add('btn_support_submit')
                        btnAddCuratorSubmit.classList.add('modal-close')
                        // btnAddCuratorSubmit.innerHTML = `Добавить`
                        
                        console.log('>>>>> target.getAttribute(data-user)')
                        console.log(target.getAttribute('data-user'))

                        let delUser = null
                        if (selector == '.btn_add_curator') {
                            btnAddCuratorSubmit.innerHTML = `Добавить`
                        } else {
                            btnAddCuratorSubmit.innerHTML = `Подтвердить`
                            delUser = target.getAttribute('data-user')
                        }
                        footerAddCurator.appendChild(btnAddCuratorSubmit)

                        clickAddCurator(delUser)
                    })
                    .catch(error => console.error('Error:', error));
            });

        }
        )
    }
}

// кнопка "взять в работу" - изменение статуса
function status_btn(status) {
    let oldStatus = document.querySelector('#mark_status p')
    if (oldStatus) {
        oldStatus.remove()
    }
    let text_status = document.createElement('p')
    text_status.classList.add('status_req_p')
    document.querySelector('#mark_status').appendChild(text_status)

    let oldBtn = document.querySelector('#btn_mark_status a')
    if (oldBtn) {
        oldBtn.remove()
    }
    let link_status = document.createElement('a')
    document.querySelector('#btn_mark_status').appendChild(link_status)

    let btn_status = document.createElement('button')
    btn_status.classList.add('btn_req_p')
    link_status.appendChild(btn_status)

    // строка "статус"
    if (status == 'new') {
        text_status.classList.add('status_new_req')
        text_status.innerHTML = 'Задача'
    } else if (status == 'active') {
        text_status.classList.add('status_work_req')
        text_status.innerHTML = 'В работе'
    } else if (status == 'done') {
        text_status.classList.add('status_end_req')
        text_status.innerHTML = 'Выполнено'
    }

    // кнопка 
    if (curatorUser == true && status == 'new' && window.mgtOrder) {
        link_status.setAttribute('href', '#')

        btn_status.classList.add('btn_new_req')
        btn_status.innerHTML = 'Взять в работу'

        btn_status.setAttribute('data-newStatus', 'active')
    }
    else if (curatorUser == true && status == 'active' && window.mgtOrder) {
        link_status.setAttribute('href', '#')

        btn_status.classList.add('btn_work_req')
        btn_status.innerHTML = 'Завершить работу'

        btn_status.setAttribute('data-newStatus', 'done')
    }
    else if (curatorUser == false && status == 'done') {
        link_status.setAttribute('href', '#modalBackToWork')
        link_status.classList.add('modal-trigger')

        btn_status.classList.add('status_work_req')
        btn_status.innerHTML = 'Вернуть в работу'

        btn_status.setAttribute('data-newStatus', 'active')
        // маркер для события. Чтоб принимать коммент
        btn_status.setAttribute('data-comment', true)
    }
    else {
        link_status.setAttribute('href', '#')

        btn_status.style.display = 'none'
    }


    // изменение статуса
    document.querySelector('#btn_mark_status button').addEventListener('click', function () {
        console.log('c1')
        // маркер для перенаправки на модальное окно
        let needComment = this.getAttribute('data-comment')
        let newStatus = this.getAttribute('data-newStatus')
        if (needComment) {
            console.log(needComment)
            eventReturnWork(newStatus)
        } else {
            sendChangeStatus(newStatus)
        }

    })
}


// принимает возврат в работу
function eventReturnWork(newStatus) {
    document.querySelector('#btnDescriptionSubmit').addEventListener('click', function () {
        comment = ''
        let commentBack = document.querySelector('#formBackToWork textarea')
        if (commentBack) {
            comment = commentBack.value
        }
        sendChangeStatus(newStatus, comment = comment)
        // перезагружает страницу
        window.location.reload()
    })
}

// сокет - отправяется новый статус на бэк (долбавил параметр comment для возврата в работу)
function sendChangeStatus(newStatus, comment = null) {
    window.chatSocket.send(JSON.stringify({
        'event': 'edit_status',
        'room_name': window.roomName,
        'status': newStatus,
        'order_id': window.orderId,
        'comment': comment,
        'user_id': window.userId,
    }))
}



// функция создает сообщения
function createMsg(ObjMsg, userId, withHeader = true) {
    let newMsg = document.createElement('div')
    newMsg.classList.add('msg')
    if (userId == ObjMsg['from_user']['id']) {
        newMsg.classList.add('msgFromMe')
    } else {
        newMsg.classList.add('msgFromHim')
    }

    if (withHeader == true) {
        let headerMsg = document.createElement('div')
        headerMsg.classList.add('header_msg')
        newMsg.appendChild(headerMsg)

        let fromMsg = document.createElement('p')
        fromMsg.classList.add('from_msg')
        fromMsg.innerHTML = ObjMsg['from_user']['full_name']
        headerMsg.appendChild(fromMsg)

        let timeMsg = document.createElement('p')
        timeMsg.classList.add('time_msg')
        timeMsg.innerHTML = ObjMsg['time']
        headerMsg.appendChild(timeMsg)
    }

    let contextMsg = document.createElement('div')

    if (ObjMsg['type_msg'] == 'msg') {
        contextMsg.classList.add('context_msg')
        contextMsg.innerHTML = ObjMsg['text']
    }
    else {
        // let contextMsg = document.createElement('div')
        // url, 
        addUpdateFile(contextMsg, ObjMsg)
        // contextMsg.classList.add('context_msg')
        // contextMsg.innerHTML = ObjMsg['filename']
    }
    newMsg.appendChild(contextMsg)

    return newMsg
}

// функция создает чат
function createChat(selector, arr_message, userId, chatType) {
    let lastUser = 0
    let chat_message = document.createElement('div')
    chat_message.classList.add('chat_msg_item')
    if (chatType == BASE.CLIENT) {
        chat_message.setAttribute('id', idOfChat.clientChat)
    } else {
        chat_message.setAttribute('id', idOfChat.curatorChat)
    }

    // chat_message.setAttribute('id', `area_chat_${arr_message[0]['chat']}`)
    for (let i = 0; i < arr_message.length; i++) {
        let withHeader = true
        if (i > 0 && arr_message[i]['from_user']['id'] == arr_message[i - 1]['from_user']['id']) {
            withHeader = false
        }
        let newMsg = createMsg(arr_message[i], userId, withHeader)
        chat_message.appendChild(newMsg)
        lastUser = arr_message[i]['from_user']['id']
    }

    // let fdf = document.querySelector(selector);
    // fdf.appendChild(chat_message);

    // return chat_message
    // chat_message.scrollTop = chat_message.scrollHeight;
    document.querySelector(selector).appendChild(chat_message)
}


// вызывает токен безопасности
function getCSFRT() {
    let name = 'csrftoken'
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Если это cookie с именем 'csrftoken', верните его значение
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

// МО "вернуть в работу"
function modalBackToWork() {
    moBackToWork.innerHTML = ''

    let modalBackToWorkContent = document.createElement('div')
    modalBackToWorkContent.classList.add('modal-content')
    moBackToWork.appendChild(modalBackToWorkContent)

    let close = btnClose()
    modalBackToWorkContent.appendChild(close)

    let title = modalTitle('Возврат в работу')
    modalBackToWorkContent.appendChild(title)

    let text = document.createElement('p')
    text.classList.add('mod_content_p')
    text.innerHTML = 'Для возврата в работу оставьте комментарий. Опишите что еще нужно доработать.'
    modalBackToWorkContent.appendChild(text)

    let form = document.createElement('form')
    form.classList.add('enter_form')
    form.setAttribute('id', 'formBackToWork')
    form.setAttribute('method', 'post')
    // form.innerHTML = tokenForForm
    modalBackToWorkContent.appendChild(form)

    let description = document.createElement('p')
    form.appendChild(description)

    let labelDescription = document.createElement('label')
    labelDescription.setAttribute('for', 'description')
    labelDescription.classList.add('required')
    labelDescription.innerHTML = `Комментарий`
    description.appendChild(labelDescription)

    let textAreaDescription = document.createElement('textarea')
    textAreaDescription.setAttribute('name', 'description')
    textAreaDescription.setAttribute('id', 'description')
    description.appendChild(textAreaDescription)

    let footerDescription = document.createElement('div')
    footerDescription.classList.add('mod_support_flex')
    form.appendChild(footerDescription)

    let btnDescriptionCancel = document.createElement('a')
    btnDescriptionCancel.classList.add('btn_support_cancel')
    btnDescriptionCancel.classList.add('modal-close')
    btnDescriptionCancel.innerHTML = `Отмена`
    footerDescription.appendChild(btnDescriptionCancel)

    // изменил элемент с button на а. При этом слители стили кнопки. Вернул опять button
    let btnDescriptionSubmit = document.createElement('button')
    // let btnDescriptionSubmit = document.createElement('a')
    btnDescriptionSubmit.setAttribute('id', 'btnDescriptionSubmit')
    btnDescriptionSubmit.classList.add('btn_support_submit')
    btnDescriptionSubmit.innerHTML = `Вернуть в работу`
    footerDescription.appendChild(btnDescriptionSubmit)

    // Инициализация модального окна Materialize после добавления в DOM
    M.Modal.init(modalBackToWork);
}

// функция добавляет сообщения в чат
function addMsgChat(data, userId) {
    let withHeader = true
    if (data.message.chat == BASE.CLIENT) {
        if (data.message.from_user.id == window.lastMsgForClientChat) {
            withHeader = false
        }
        let newMsg = createMsg(data.message, userId, withHeader)
        let chat_message = document.querySelector('#client_chat_item')
        chat_message.appendChild(newMsg)

        // Прокрутка вниз при получении нового сообщения
        chat_message.scrollTop = chat_message.scrollHeight;
        window.lastMsgForClientChat = data.message.from_user.id

        // меняем цифорку сообщений 
        if (window.selectedTab != '#tab2') {
            count_notice('id_client_chat', 1)
        }
    } else {
        if (data.message.from_user.id == window.lastMsgForCuratorChat) {
            withHeader = false
        }
        let newMsg = createMsg(data.message, userId, withHeader)
        let chat_message = document.querySelector('#curator_chat_item')
        chat_message.appendChild(newMsg)

        // Прокрутка вниз при получении нового сообщения
        chat_message.scrollTop = chat_message.scrollHeight;
        window.lastMsgForCuratorChat = data.message.from_user.id

        // меняем цифорку сообщений 
        if (window.selectedTab != '#tab3') {
            count_notice('id_curator_chat', 1)
        }
    }
}


// заменяет софт
function changeSoft(soft_id, soft_name) {
    if (curatorUser) {
        selectorSoft = document.querySelector('#tab1 select')
        let optionToSelect = selectorSoft.querySelector(`option[value="${soft_id}"]`);
        // console.log(selectorSoft)
        // console.log(optionToSelect)

        if (optionToSelect) {
            selectorSoft.value = soft_id;  // Устанавливаем значение select
            // selectorSoft.selected  // Устанавливаем значение select
        }
    }
    else {
        // soft_title
        titleSoft = document.getElementById('soft_title')
        if (titleSoft) {
            titleSoft.innerHTML = soft_name
        }
    }
}


// создание сокета и все с ним функции
function initOrderSocket(roomName, userId) {
    window.chatSocket = new WebSocket(
        'ws://'
        + window.location.host
        + '/ws/chat/'
        + roomName
        + '/'
    );

    // получение сообщений
    window.chatSocket.onmessage = function (e) {
        const data = JSON.parse(e.data);

        console.log('window.chatSocket.onmessage')
        console.log(data)

        if (data.type == 'msg') {
            addMsgChat(data, userId)
        }
        else if (data.type == 'edit_curator') {
            createCuratorsList('.curators_of_request', data.curators)
        }
        else if (data.type == 'edit_status') {
            status_btn(data.status)
        }
        else if (data.type == 'edit_soft') {
            changeSoft(data.soft_id, data.soft_name)
        }
    };
    window.chatSocket.onclose = function (e) {
        console.log('Chat socket closed unexpectedly');
    };

    // отправка сообщений client_chat
    document.querySelector('#client-msg-input').focus();
    document.querySelector('#client-msg-input').onkeyup = function (e) {
        if (e.key === 'Enter') {  // enter, return
            document.querySelector('#client-msg-submit').click();
        }
    };

    document.querySelector('#client-msg-submit').onclick = function (e) {
        const messageInputDom = document.querySelector('#client-msg-input');
        const message = messageInputDom.value;
        window.chatSocket.send(JSON.stringify({
            'event': 'msg',
            'message': message,
            'chat': 'client',
            'tab': window.selectedTab,
            'order_id': window.orderId,
            'user_id': window.userId
        }));
        messageInputDom.value = '';
    };

    // отправка сообщений curator_chat
    document.querySelector('#curator-msg-input').focus();
    document.querySelector('#curator-msg-input').onkeyup = function (e) {
        if (e.key === 'Enter') {  // enter, return
            document.querySelector('#curator-msg-submit').click();
        }
    };

    document.querySelector('#curator-msg-submit').onclick = function (e) {
        const messageInputDom = document.querySelector('#curator-msg-input');
        const message = messageInputDom.value;
        window.chatSocket.send(JSON.stringify({
            'event': 'msg',
            'message': message,
            'chat': 'curator',
            'tab': window.selectedTab,
            'order_id': window.orderId,
            'user_id': window.userId
        }));
        messageInputDom.value = '';
    };
}
