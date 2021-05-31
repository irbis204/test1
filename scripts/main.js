
import {createCategory} from "./function";
import {sort} from "./function"
import {list} from './global'
import {Application} from "./global"
import {updateStorage} from "./function"
import {searchCategory} from "./function"
import {getStorage} from "./function"
// Запролняю свойствами поля обьекта
Application.main.className = 'main';
Application.main.classList.add('center');
Application.saveBlock.container.classList.add('center');
Application.addBlock.input.placeholder = 'Categori name...';
Application.addBlock.button.onclick = () => createCategory(Application.addBlock.input.value);
Application.sortButton.onclick = () => sort(categories, 'text');
Application.searchBlock.button.onclick = () => searchCategory(Application.searchBlock.input.value);
Application.saveBlock.buttonSave.onclick = () => updateStorage();
Application.saveBlock.buttonGet.onclick = () => getStorage();

// Заполняю объекты обьектами
Application.addBlock.container.appendChild(Application.addBlock.input);
Application.addBlock.container.appendChild(Application.addBlock.button);
Application.searchBlock.container.appendChild(Application.searchBlock.input);
Application.searchBlock.container.appendChild(Application.searchBlock.button);
Application.main.appendChild(Application.addBlock.container);
Application.main.appendChild(Application.searchBlock.container);
Application.main.appendChild(Application.sortButton);
Application.main.appendChild(Application.counts.container);
Application.main.appendChild(list);

Application.saveBlock.container.appendChild(Application.saveBlock.buttonSave);
Application.saveBlock.container.appendChild(Application.saveBlock.buttonGet);
Application.main.appendChild(Application.saveBlock.container);

export let check = document.createElement('div');
Application.main.appendChild(check);

document.body.appendChild(Application.main);
getStorage();






