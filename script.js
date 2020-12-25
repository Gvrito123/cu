class CRUD {
    db = new Map();
    lastId = 0;
    constructor(){

    }
    add(source){
        const sampleObject = {
            content: '',
            id: 0
        }
        sampleObject.id = this.lastId;
        sampleObject.content = source;
        this.db.set(sampleObject.id,sampleObject);
        this.lastId++;
        return sampleObject.id;
    }
    read(id){
        if(!this.db.has(id)) return null;
        return this.db.get(id);
    }
    delete(id){
        if(!this.db.has(id)) return null;
        return this.db.delete(id);
    }
    readAll(){
        let tempArr = [];
        this.db.forEach((value)=> {
            tempArr.push(value)
        })
        return tempArr;
    }
    update(id,updatedContent){
        if(!this.db.has(id)) return null;
        let object = this.db.get(id);
        object.content = updatedContent;
        return this.db.set(id,object);
    }
    randomColor(){
        const colors = [
            '#ff6e40',
            '#ffea00',
            '#00e676',
            '#9e9d24',
            '#8bc34a',
            '#f4ff81',
            '#00b0ff',
            '#0091ea',
            '#00bfa5',
            '#3d5afe',
            '#2196f3',
            '#ff1744',
            '#e040fb',
            '#ef9a9a',
        ]
        const number = Math.floor(Math.random()*colors.length);
        return colors[number];
    }
    addCard(target,text) {
        let cards = this.readAll();
        target.innerHTML = null;
        for(let key in cards){
            const template = `
                <div class="todo-card" id="card${cards[key].id}">
                    <div class="todo-card-content">
                        <span class="todo-card-content-text" id="todo-text-${cards[key].id}">${cards[key].content}</span>
                        <input type="text" id="edit-${cards[key].id}" class="card-edit">
                    </div>
                    <div class="todo-card-buttons">
                        <button class ="edit-button button" id="edit${cards[key].id}">Edit</button>
                        <button class="delete-button button" id="delete${cards[key].id}">x</button>
                    </div>
                </div>
            `;
            target.innerHTML += template;
            let card = document.getElementById(`card${cards[key].id}`);
            card.style.backgroundColor = `${this.randomColor()}`;
        }
        const editBtns = target.getElementsByClassName('edit-button')
        const delBtns = target.getElementsByClassName('delete-button')
        function isnumber(str) {
            if(str.match(/(\d+)/)){
                return str.match(/(\d+)/)[0]
            }
        }
        for(let i = 0; i < editBtns.length; i++) {
            editBtns[i].addEventListener('click', () => {
                let id = isnumber(editBtns[i].id);
                let span = document.getElementById(`todo-text-${i}`)
                let editField = document.getElementById(`edit-${i}`);
                span.style.display = 'none';
                editField.style.display = 'inline'
                editField.value = span.innerHTML;
                editField.onkeydown = (key) => {
                    if(key.keyCode == 13){
                        this.update(i, editField.value);
                        span.style.display = 'inline';
                        span.innerHTML = editField.value;
                        editField.style.display = 'none';
                    }
                }
            })
        }
        for(let i = 0; i < delBtns.length; i++) {
            delBtns[i].addEventListener('click', () => {
                let id = isnumber(delBtns[i].id);
                const card = document.getElementById(`card${id}`);
                this.delete(id*1);
                card.style.display = 'none';
            })
        }
    }
}
const input = document.getElementById('field');
const addBtn = document.getElementById('submit');
const todoList = document.getElementById('list');
const editBtns = document.getElementsByClassName('edit-button');
const delBtns = document.getElementsByClassName('delete-button');
let crud;
window.addEventListener('DOMContentLoaded',()=> {
    crud = new CRUD();
})
addBtn.addEventListener('click',() => {
    let value = input.value;
    let id = crud.add(value);
    let cards = crud.readAll();
    crud.addCard(todoList,value);
})
input.onkeydown = (key) => {
    if(key.keyCode == 13){
        addBtn.click();
        input.value = null;
    }
}