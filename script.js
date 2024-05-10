const textInput = document.querySelector('.text-input'); // input texto
const toDoList = document.querySelector('.to-do-list'); // container da lista de a fazeres
const submitBtn = document.querySelector('.submit-btn') // botão 'ok'
const clearListBtn = document.querySelector('.clear-list-btn')

//evento de click no botão para enviar
submitBtn.addEventListener('click', function () {
    if (!textInput.value)
        textInput.style.border = '2px solid #d54141'
    else
        addTopicsToList();
});

// evento de enviar pressionado a tecla 'enter'
textInput.addEventListener('keypress', function (event) {
    if (!textInput.value)
        textInput.style.border = '2px solid #d54141'
    else if (event.key === 'Enter') {
        addTopicsToList();
        event.preventDefault();
    }

});

//limpar a lista
clearListBtn.addEventListener('click', function () {
    toDoList.innerHTML = '';
});

//função para adicionar um tópico na lista e apagar quando feito
function addTopicsToList() {

    textInput.style.border = '1px solid rgb(118, 118, 118)';
    const checkBtn = document.createElement('div');
    checkBtn.textContent = '👉';
    checkBtn.classList.add('check');

    const newBtnsDiv = document.createElement('div');
    newBtnsDiv.classList.add('div-bts')

    const clearItemBtn = document.createElement('button');
    clearItemBtn.textContent = 'X';
    clearItemBtn.classList.add('clear-item-btn');
    newBtnsDiv.appendChild(clearItemBtn);

    const doneItemBtn = document.createElement('button');
    doneItemBtn.textContent = 'Done'
    doneItemBtn.classList.add('done-item-btn')
    newBtnsDiv.appendChild(doneItemBtn);

    const newItem = document.createElement('li')
    const newItemText = document.createElement('p')
    newItemText.textContent = textInput.value
    newItem.appendChild(checkBtn)
    newItem.appendChild(newItemText)
    newItem.appendChild(newBtnsDiv)

    toDoList.appendChild(newItem)


    const clearBtn = document.querySelectorAll('.clear-item-btn');
    const doneBtn = document.querySelectorAll('.done-item-btn');

    clearBtn.forEach((btn) => {
        btn.addEventListener('click', function (e) {
            btn.parentElement.parentElement.remove()
        });
    });

    doneBtn.forEach((btn) => {

        btn.addEventListener('click', function (e) {
            btn.parentElement.parentElement.firstChild.innerHTML = '✅'
            const listElement = document.querySelector('li').style.textDecoration = 'line-through'
            listElemnt.style.textDecoration = "line-through";
        })

    });

    textInput.value = "";
}




