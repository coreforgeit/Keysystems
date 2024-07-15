document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.modal');
    var instances = M.Modal.init(elems);
  });

//   Модальное окно "create_request"

let ModalCreateRequest = document.createElement('div')
ModalCreateRequest.classList.add('modal')
ModalCreateRequest.setAttribute('id', 'modal_create_request')

// Modal_content
let modalContent = document.createElement('div')
modalContent.classList.add('modal-content')
ModalCreateRequest.appendChild(modalContent)

// Кнопка закрыть
let ModalRequestClose = document.createElement('div')
ModalRequestClose.classList.add('modal1_img')
modalContent.appendChild(ModalRequestClose)

let modalCloseImg = document.createElement('img')
modalCloseImg.setAttribute('src', link)
ModalRequestClose.appendChild(modalCloseImg)

// Заголовок
let ModalRequestH = document.createElement('h4')
ModalRequestH.innerHTML = 'Создать заявку'
modalContent.appendChild(ModalRequestH)

// Форма
let form = document.createElement('form')
form.classList.add('mod_request_form')
form.setAttribute('method', 'post')
modalContent.appendChild(form)

// Тип обращения
let typeAppeal = document.createElement('p')
form.appendChild(typeAppeal)

let labelTypeAppeal = document.createElement('label')
labelTypeAppeal.setAttribute('for', 'type_appeal')
labelTypeAppeal.classList.add('required')
labelTypeAppeal.innerHTML = `Тема обращения`
typeAppeal.appendChild(labelTypeAppeal)

let selectTypeAppeal = document.createElement('select')
selectTypeAppeal.setAttribute('name', 'type_appeal')
selectTypeAppeal.setAttribute('id', 'type_appeal')
typeAppeal.appendChild(selectTypeAppeal)

// добавить цикл с вариантами выбора
for (let i = 0; i<soft.length; i++) {
    let optionTypeAppeal = document.createElement('option')
    optionTypeAppeal.setAttribute('value', topics[i].pk)
    optionTypeAppeal.innerHTML = topics[i].fields.topic
    selectTypeAppeal.appendChild(optionTypeAppeal)
}

// Программное обеспечение
let typeSoft = document.createElement('p')
form.appendChild(typeSoft)

let labelTypeSoft = document.createElement('label')
labelTypeSoft.setAttribute('for', 'type_soft')
labelTypeSoft.classList.add('required')
labelTypeSoft.innerHTML = `Програмное обеспечение`
typeSoft.appendChild(labelTypeSoft)

let selectTypeSoft = document.createElement('select')
selectTypeSoft.setAttribute('name', 'type_soft')
selectTypeSoft.setAttribute('id', 'type_soft')
typeSoft.appendChild(selectTypeSoft)

// цикл с вариантами выбора
for (let i = 0; i<soft.length; i++) {
    let optionTypeSoft = document.createElement('option')
    optionTypeSoft.setAttribute('value', soft[i].pk)
    optionTypeSoft.innerHTML = soft[i].fields.title
    selectTypeSoft.appendChild(optionTypeSoft)
}

// Краткое описание
let description = document.createElement('p')
form.appendChild(description)

let labelDescription = document.createElement('label')
labelDescription.setAttribute('for', 'description')
labelDescription.classList.add('required')
labelDescription.innerHTML = `Краткое описание`
description.appendChild(labelDescription)

// счетчик символов
let textareaConteiner = document.createElement('div')
textareaConteiner.style.position = 'relative'
description.appendChild(textareaConteiner)
// textareaConteiner.appendChild(textareaDescription)

let textareaDescription = document.createElement('textarea')
textareaDescription.setAttribute('name', 'description')
textareaDescription.setAttribute('id', 'description')
textareaDescription.setAttribute('maxlength', '55')
textareaConteiner.appendChild(textareaDescription)

// элемент для отображения количества символов
let charCount = document.createElement('div');
charCount.id = 'charCount'
charCount.textContent = '0/55'
textareaConteiner.appendChild(charCount)

// обработчик событий input для обновления счетсика
textareaDescription.addEventListener('input', () => {
    const currentLength = textareaDescription.value.length
    const maxLength = textareaDescription.getAttribute('maxlength')
    charCount.textContent = `${currentLength}/${maxLength}`
})

// приложить файл
let addFile = document.createElement('p')
form.appendChild(addFile)

let inputAddFile = document.createElement('input')
inputAddFile.classList.add('add_file')
inputAddFile.setAttribute('type', 'file')
inputAddFile.setAttribute('id', 'addfile')
inputAddFile.setAttribute('name', 'addfile')
inputAddFile.setAttribute('multiple', 'multiple')
inputAddFile.style.display = 'none'
addFile.appendChild(inputAddFile)

let labelAddFile = document.createElement('label')
labelAddFile.setAttribute('for', 'addfile')
labelAddFile.classList.add('add_file')
labelAddFile.textContent = 'Добавить файлы'
labelAddFile.style.cursor = 'pointer'
addFile.appendChild(labelAddFile)

let labelAddFileImg = document.createElement('img')
labelAddFileImg.setAttribute('src', linkAddFile)
labelAddFile.prepend(labelAddFileImg)

// загруженный файл
// Элемент для отображения названия загруженного файла
let fileNameDisplay = document.createElement('div');
fileNameDisplay.classList.add('file_name_display');
fileNameDisplay.style.marginTop = '10px';
addFile.appendChild(fileNameDisplay);

// Обработчик события изменения файла
inputAddFile.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        for (let i=0; i<files.length; i++) {
            const file = files[i]
            const fileItem = document.createElement('div')
            fileItem.textContent = file.name
            fileNameDisplay.appendChild(fileItem)
        }
    }
});

// кнопка отправить заявку
let btnSubmitRequest = document.createElement('button')
btnSubmitRequest.classList.add('enter_button')
btnSubmitRequest.innerHTML = `Отправить запрос`
form.appendChild(btnSubmitRequest)


// создать модальное окно
document.body.append(ModalCreateRequest)
