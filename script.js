Parse.serverURL = 'https://parseapi.back4app.com';

Parse.initialize(
  'JqdbNDMER1nviBYat4yVAtuFFrxt4dJesUyn3xe0',
  'zp7JhXCj3EkUT3JzCVsPcDwjKlqwIufAud2qLJPM'
);

const modal = document.querySelector('.modal-container')
const modalTask = document.querySelector('.modal-tasks-container')
const tbody = document.querySelector('tbody')
const userName = document.querySelector('#name')
const userProduct = document.querySelector('#product')
const userLastName = document.querySelector('#lastName')
const userStatus = document.querySelector('#status')
const btnSalvar = document.querySelector('#btnSalvar')
const btnAdd = document.querySelector('#btnAdd')

let itens
let id

function openModal(edit = false, index = 0) {
  modal.classList.add('active')

  modal.onclick = e => {
    if (e.target.className.indexOf('modal-container') !== -1) {
      modal.classList.remove('active')
    }
  }

  if (edit) {
    userName.value = itens[index].name
    userLastName.value = itens[index].lastName
    userProduct.value = itens[index].product
    userStatus.value = itens[index].status
    id = index  
  } else {
      userName.value = ''
      userLastName.value = ''
      userProduct.value = ''
  }
}

function openTaskModal(index = 0) {
  modalTask.classList.add('active')

  modalTask.onclick = e => {
    if (e.target.className.indexOf('modal-tasks-container') !== -1) {
      modalTask.classList.remove('active')
    }
  }

  id = index
}

function editItem(index) {
  openModal(true, index)
}

function deleteItem(index) {
  remove(itens[index].id)
}

async function insertItem(item, index) {
  let tr = document.createElement('tr')

  tr.innerHTML = `
    <td>${item.name}</td>
    <td>${item.lastName}</td>
    <td>${item.product}</td>
    <td>${item.status}</td>
    <td class="acao">
      <button onclick="editItem(${index})"><i class='bx bx-edit' ></i></button>
      <button onclick="deleteItem(${index})"><i class='bx bx-trash'></i></button>
    </td>
  `
  tbody.appendChild(tr)
}

btnAdd.onclick = e => {

  e.preventDefault();

  modalTask.classList.remove('active')
  id = undefined;  
}

btnSalvar.onclick = e => {
  if (userName.value == '' || userLastName.value == '') {
    return
  }

  e.preventDefault();

  if (id !== undefined) {
    console.log('!undefined');
    console.log('ID', itens[id].id);
    itens[id].name = userName.value
    itens[id].lastName = userLastName.value
    itens[id].product = userProduct.value
    itens[id].status = userStatus.value;
    update(itens[id].id)
  } else {
    inserir()    
  }
  

  modal.classList.remove('active')
  id = undefined  
}

const lista = async () => {
  const coleta = Parse.Object.extend('Coleta');
  const query = new Parse.Query(coleta);

  try {
    const results = await query.find();
    tbody.innerHTML = ''
    itens = []
    results.forEach((item, index) => {      
      itens.push({ 'id': item.id, 'name': item.attributes.name, 'lastName': item.attributes.lastName, 'product': item.attributes.product, 'status': [], 'status': item.attributes.status});
      insertItem(item.attributes, index)      
    })
  } catch (error) {
    console.error('Error while fetching Tarefa', error);
  }
};

const inserir = async () => {
  const myNewObject = new Parse.Object('Coleta');

  myNewObject.set('name', userName.value);
  myNewObject.set('lastName', userLastName.value);
  myNewObject.set('product', userProduct.value);
  myNewObject.set('status', userStatus.value);

  console.log('Tarefa created', itens);

  try {
    const result = await myNewObject.save();
    console.log('Tarefa created', result);
    lista();
  } catch (error) {
    console.error('Error while creating Tarefa: ', error);
  }
};

async function remove(id) {
  const query = new Parse.Query('Coleta');
  console.log('id', id);
  try {
    const response = await query.get(id);
    await response.destroy()
    console.log('Delet ParseObject', response);
    lista();
  } catch (error) {
    console.error('Error while updating Tarefa', error);
  }
};

async function update(id) {
  const query = new Parse.Query("Coleta");
  
  try {
    const data = await query.get(id);
    data.set('name', userName.value);
    data.set('lastName', userLastName.value);
    data.set('product', userProduct.value);
    data.set('status', userStatus.value);

    await data.save();
    console.log("Object updated successfully!");
    lista()
  } catch (error) {
    console.error("Error updating object: " + error.message);
  }
}

lista()
