//import {categories} from './global';
import {list} from './global';
import {Application} from './global'

export function createElement({type, className, text}){
    const element = document.createElement(type);

    if (className) {
        element.classList.add(className);
    }

    element.textContent = text;
    Object.defineProperty(element, 'text', {
        set(value){
            element.textContent = value;
        }
    });

    return element;
}

let upload = false;

export let categories = {
    array: [],
    dateSorted: 1,
    textSorted: 1,
    upload: false,
}

export function createCategory(text){
    let category;
    const CategoryItem = {
        item: document.createElement('li'),
        title: {
            container: createElement({type: 'div', className: 'category'}),
            buttons: {
                container: createElement({type: 'div', className: 'category'}),
                expandButton: createElement({type: 'button', className: 'button-option', text: '\u142F'}),
                renameButton: createElement({type: 'button', className: 'button-option', text: '\u270E'}),
                deleteButton: createElement({type: 'button', className: 'button-option', text: '\u00D7'})
            },
            name: createElement({type: 'h4', className:'name', text}),
            },
        todoBlock: {
            container: createElement({type: 'div'}),
        },
        countCases: createElement({type: 'h4', className:'name', text:'0 cases'}),

    }

    // Установка функций при нажатии

    CategoryItem.title.buttons.renameButton.onclick = () => edit(categories.array, CategoryItem.item);
    CategoryItem.title.buttons.deleteButton.onclick = () => deleteItem(categories, CategoryItem.item);
    CategoryItem.title.buttons.expandButton.onclick = () => {
        if( CategoryItem.title.buttons.expandButton.textContent === '\u142F') {
            CategoryItem.title.buttons.expandButton.text = '\u1431';
        } else {
            CategoryItem.title.buttons.expandButton.textContent = '\u142F';
        }
        toggle(CategoryItem, category);
    }
// Создание DOM дерева
    CategoryItem.title.container.appendChild(CategoryItem.title.name);
    CategoryItem.title.buttons.container.appendChild(CategoryItem.title.buttons.expandButton);
    CategoryItem.title.buttons.container.appendChild(CategoryItem.title.buttons.renameButton);
    CategoryItem.title.buttons.container.appendChild(CategoryItem.title.buttons.deleteButton);
    CategoryItem.title.container.appendChild(CategoryItem.title.buttons.container);
    CategoryItem.item.appendChild(CategoryItem.title.container);
    CategoryItem.item.appendChild(CategoryItem.todoBlock.container);
    list.appendChild(CategoryItem.item);
    Application.categories.push(CategoryItem);

    if (!upload) {
        category = {
            text,
            item: CategoryItem.item,
            array: [],
            dateSorted: 1,
            textSorted: 1,
            countCases: 0,
        };
        categories.array.push(category);
    } else {
        Application.counts.category = categories.array.length;
        Application.counts.container.textContent = `${Application.counts.cases} cases in ${Application.counts.category} categories`;
        let tempCategory = arguments[1];
        CategoryItem.title.buttons.expandButton.textContent = '\u1431';
        tempCategory.item = CategoryItem.item;
        tempCategory.countCases = 0;
        return CategoryItem;
    }
    Application.counts.category++;
    Application.counts.container.textContent = `${Application.counts.cases} cases in ${Application.counts.category} categories`;
    updateStorage();
}

function toggle(CategoryItem, category){
    if (CategoryItem.todoBlock.container.lastChild === null) {
        createTODO(CategoryItem, category);
    } else if (CategoryItem.todoBlock.container.className.includes('hide')){
        CategoryItem.todoBlock.container.classList.remove('hide');
    } else {
        CategoryItem.todoBlock.container.classList.add('hide');
    }
}

export function createTODO(CategoryItem, category){
    CategoryItem.todoBlock.container.className = 'todo';
    let TODO = {
        addBlock: {
            container: createElement({type: 'div', className: 'optionDiv'}),
            input: createElement({type: 'input', className: 'input-todo'}),
            button: createElement({type: 'button', className: 'button-add-todo', text: '+'}),
        },
        searchBlock: {
            container: createElement({type: 'div', className: 'optionDiv'}),
            input: createElement({type: 'input', className: 'input-todo'}),
            button: createElement({type: 'button', className: 'button-add-todo', text: 'Search'}),
        },
        sortBlock: {
            container: createElement({type: 'div', className: 'optionDiv'}),
            buttonTextSort: createElement({type: 'button', className:'button-sort', text: 'Sort by text'}),
            buttonDataSort: createElement({type: 'button', className:'button-sort', text: 'Sort by date'}),
        },
        todoBlock: document.createElement('ol'),
    }

    CategoryItem.todoBlock.todo = TODO;

    TODO.addBlock.input.placeholder = '  Add string...';
    TODO.addBlock.button.onclick = () => createItem({category: category, todo: TODO});
    TODO.addBlock.container.appendChild(TODO.addBlock.input);
    TODO.addBlock.container.appendChild(TODO.addBlock.button);
    CategoryItem.todoBlock.container.appendChild(CategoryItem.countCases);
    CategoryItem.todoBlock.container.appendChild(TODO.addBlock.container);
    TODO.searchBlock.button.onclick = () => search(category, TODO.searchBlock.input.value);
    TODO.searchBlock.container.appendChild(TODO.searchBlock.input);
    TODO.searchBlock.container.appendChild(TODO.searchBlock.button);
    CategoryItem.todoBlock.container.appendChild(TODO.searchBlock.container);
    TODO.sortBlock.buttonDataSort.onclick = () => sort(category, 'date');
    TODO.sortBlock.buttonTextSort.onclick = () => sort(category, 'text');
    TODO.sortBlock.container.appendChild(TODO.sortBlock.buttonDataSort);
    TODO.sortBlock.container.appendChild(TODO.sortBlock.buttonTextSort);
    CategoryItem.todoBlock.container.appendChild(TODO.sortBlock.container);
    CategoryItem.todoBlock.container.appendChild(TODO.todoBlock);


    if (upload){
        return TODO;
    }
}

export function createItem({category, todo:TODO, item}) {
    const date = new Date();
    let caseItem;
    let TODOItem = {
        item: createElement({type: 'li'}),
        itemContainer: {
            container: createElement({type: 'div', className: 'category'}),
            text:  createElement({type: 'h4'}),
            buttons: {
                container: createElement({type: 'div', className: 'category'}),
                editButton: createElement({type: 'button', className: 'button-option', text: '\u270E'}),
                deleteButton: createElement({type: 'button', className: 'button-option', text: '\u00D7'}),
                date: createElement({type: 'h5', className: 'date', text:  formatDate(date)}),
            },
            dropImage: {
                container: createElement({type: 'div', className: 'button-option'}),
                input: createElement({type: 'input', className: 'hide'}),
            },
            image: {
                images:[],
                button: createElement({type: 'button', className: 'close', text: '\u142F'}),
                container: createElement({type: 'div', className: 'popup-front'}),
                containerBack: createElement({type: 'div', className: 'popup'}),
            },
        },
        caseItem,
    };

    TODOItem.itemContainer.buttons.deleteButton.onclick = () => deleteItem(category, TODOItem.item);
    TODOItem.itemContainer.buttons.editButton.onclick = () => edit(category.array, TODOItem.item);

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(event => {
        TODOItem.itemContainer.dropImage.container.addEventListener(event, preventDefaults, false);
    });

    TODOItem.itemContainer.dropImage.container.onclick = () => {
        updateStorage();
            TODOItem.itemContainer.image.containerBack.className = 'popup-open';
    };
    TODOItem.itemContainer.image.button.onclick = () => {
        TODOItem.itemContainer.image.containerBack.className = 'popup';
    };

    TODOItem.itemContainer.dropImage.container.textContent = '\u{1F4F7}';
    TODOItem.itemContainer.dropImage.container.appendChild(TODOItem.itemContainer.dropImage.input);
    TODOItem.itemContainer.container.appendChild(TODOItem.itemContainer.text);
    TODOItem.itemContainer.buttons.container.appendChild(TODOItem.itemContainer.buttons.editButton);
    TODOItem.itemContainer.buttons.container.appendChild(TODOItem.itemContainer.buttons.deleteButton);
    TODOItem.itemContainer.buttons.container.appendChild(TODOItem.itemContainer.buttons.date);
    TODOItem.itemContainer.container.appendChild(TODOItem.itemContainer.dropImage.container);
    TODOItem.itemContainer.image.container.appendChild(TODOItem.itemContainer.image.button);
    TODOItem.itemContainer.image.containerBack.appendChild(TODOItem.itemContainer.image.container)
    document.body.appendChild(TODOItem.itemContainer.image.containerBack);
    TODOItem.itemContainer.container.appendChild(TODOItem.itemContainer.buttons.container);
    TODOItem.item.appendChild(TODOItem.itemContainer.container);
    category.item.lastChild.lastChild.appendChild(TODOItem.item);
    if (!upload) {
        caseItem = {
            item: TODOItem.item,
            text: TODO.addBlock.input.value,
            date,
            imageURL: [],
        };
        TODOItem.caseItem = caseItem;
        TODOItem.itemContainer.text.textContent = TODO.addBlock.input.value;
        category.array.push(caseItem);
        updateStorage();
    } else {
        TODOItem.itemContainer.buttons.date.textContent = formatDate(new Date(item.date));
        TODOItem.itemContainer.text.textContent = item.text;
        item.item = TODOItem.item;
        TODOItem.caseItem = item;
        setImage(TODOItem);
    }

    category.countCases++;
    category.item.lastChild.firstChild.text = `${category.countCases} cases`;
    Application.counts.cases++;
    Application.counts.container.textContent = `${Application.counts.cases} cases in ${Application.counts.category} categories`;

    let handle = handleDrop.bind(TODOItem);
    TODOItem.itemContainer.dropImage.container.addEventListener('drop', handle, false);
}

function handleFiles(files, todoItem){
    [...files].forEach((file) => uploadFile(file, (image) => {
        const elementImage = createElement({type: 'div'});
        elementImage.setAttribute('style', `background:url('${image}') no-repeat center;`);
        elementImage.classList.add('image');
        todoItem.itemContainer.image.container.appendChild(elementImage);
        todoItem.itemContainer.image.images.push(elementImage);
        todoItem.caseItem.imageURL.push(image);
    }));


}

function uploadFile(file, callback){
    let url = './upload.php';
    let formData = new FormData();
    let imagePath;

    formData.append('file', file);
    fetch(url, {
        method: 'POST',
        body: formData
    })
        .then(async function(response){
            callback(await response.text());
        });
    return imagePath;
}

function handleDrop(e) {
    let dataTransfer = e.dataTransfer;
    let files = dataTransfer.files;

    handleFiles(files, this);
    updateStorage();
}

function preventDefaults (e) {
    e.preventDefault();
    e.stopPropagation();
}

export function deleteItem(category, item) {
    let deletedItem;

    category.array = category.array.filter((element) => {
        if(element.item === item){
            deletedItem = element;
        }
        return element.item !== item
    });
    item.remove();

    if (category['item'] === undefined){
        Application.counts.category--;
        Application.counts.cases = Application.counts.cases - deletedItem.countCases;
    } else {
        Application.counts.cases--;
        category.countCases--;
        category.item.lastChild.firstChild.text = `${category.countCases} cases`;
    }

    Application.counts.container.textContent = `${Application.counts.cases} cases in ${Application.counts.category} categories`;
    updateStorage();
}

export function search(category, textSearch) {
    let found = false;

    category.array.forEach((item) => {
        if (!textSearch) {
            item.item.style.display = '';
        } else if (!item.text.includes(textSearch)) {
            item.item.style.display = 'none';
        }
        else{
            found = true;
        }
    });

    return found;
}

export function edit(category, item) {
    const changeDiv = document.createElement('div');
    const editInput = document.createElement('input');
    const saveButton = document.createElement('button');
    const index = category.indexOf(category.find((element) => element.item === item));

    editInput.className = 'input';
    editInput.placeholder = category[index].text ;
    saveButton.className = 'button';
    saveButton.textContent = '\u2713';
    saveButton.onclick = () => {
        item.firstChild.classList.remove('hide');
        item.firstChild.firstChild.textContent = editInput.value;
        category[index].text = editInput.value;

        changeDiv.remove();
    };

    changeDiv.appendChild(editInput);
    changeDiv.appendChild(saveButton);
    item.appendChild(changeDiv);
    item.firstChild.classList.add('hide');
}

export function formatDate(date) {
    return `${date.getMonth() + 1}.${date.getDate()}.${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

export function sort(category, key) {
    let arrayCopy = category.array.slice(0);

    arrayCopy.sort((itemOne, itemTwo) => {
        if (itemOne[key] > itemTwo[key]){
            return 1 * category[`${key}Sorted`];
        }

        if (itemOne[key] === itemTwo[key]){
            return 0;
        }

        if (itemOne[key] < itemTwo[key]){
            return -1 * (category[`${key}Sorted`]);
        }

        return 0;
    });

    category[`${key}Sorted`] = category[`${key}Sorted`] === 1 ? -1 : 1;

    render(arrayCopy);
    arrayCopy = null;
}

export function render(category){
    let list = category[0].item.parentNode;

    category.forEach((item) => {
        list.removeChild(item.item);
        list.appendChild(item.item);
    });
}

export function updateStorage(){
    console.log(categories);
    window.localStorage.setItem('categories', JSON.stringify(categories));
    // categories = JSON.parse(window.localStorage.getItem('categories'));
    // console.log(categories);
}

export function getStorage(){
    upload = true;
    categories = JSON.parse(window.localStorage.getItem('categories'));
    categories.array.forEach((item) => {
        let todo = createTODO(createCategory(item.text, item), item);
        item.array.forEach((element) => {
            createItem({category: item, todo, item: element});
        });
    });
    upload = false;
    console.log(categories);
}

export function searchCategory(text){
    categories.array.forEach((item) => {
        if(!text){
            item.item.style.display = '';
        }  else if (!search(item, text)){
            item.item.style.display = 'none';
        }
        else{
            item.item.firstChild.lastChild.firstChild.textContent = '\u1431';
            item.item.lastChild.classList.remove('hide');
        }
    });

}

export function setImage (todo){
    if(todo.caseItem.imageURL) {
        todo.caseItem.imageURL.forEach((item) => {
            const elementImage = createElement({type: 'div'});
            elementImage.setAttribute('style', `background:url('${item}') no-repeat center;`);
            elementImage.classList.add('image');
            todo.itemContainer.image.container.appendChild(elementImage);
            todo.itemContainer.image.images.push(elementImage);
        });
    }
}

