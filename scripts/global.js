import {createElement} from './function'
import {categories} from './function';
//
// export let categories = {
//     array: [],
//     dateSorted: 1,
//     textSorted: 1,
//     upload: false,
// }

export const list = document.createElement('ul');

export let Application = {
    main: createElement({type: 'div'}),
    addBlock: {
        container: createElement({type: 'div'}),
        input: createElement({type: 'input', className: 'input'}),
        button: createElement({type: 'button', className: 'button-add', text: '+'}),
    },
    searchBlock: {
        container: createElement({type: 'div'}),
        input: createElement({type: 'input', className: 'input'}),
        button: createElement({type: 'button', className: 'button-add', text: 'Search'}),
    },
    sortButton: createElement({type: 'button', className: 'button', text: 'Sort by name'}),
    saveBlock: {
        container: createElement({type: 'div', className: 'optionDiv'}),
        buttonSave: createElement({type: 'button', className:'button', text: 'Save'}),
        buttonGet: createElement({type: 'button', className:'button', text: 'Get'}),
    },
    counts:{
        container: createElement({type: 'div', className: 'center'}),
        categories: 0,
        cases: 0,

    },
    categories: [],
}
