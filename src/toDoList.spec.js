//const { describe } = require('yargs');
const createEmptyTodoList = require('./toDoList.js');
//import createEmptyTodoList from 'toDoList.js';

describe('toDoListTest', () => {
    test('newlyCreatedListHasNoTodos', () => {
        console.log(createEmptyTodoList);
        let emptyList = createEmptyTodoList();
        expect(emptyList.isEmpty()).toEqual(true);
    });
    test('listShoudKnowDescriptionAndDateOfOneTodo', () => {
        
        let newList = createEmptyTodoList();
        let description = "Hay que limpiar la cocina";
        let dueDate = new Date(2022, 1, 25);
        newList.addTodo("Limpieza", description, dueDate);
        expect(newList.isEmpty()).toEqual(false);
        expect(newList.descriptionOf("Limpieza")).toEqual(description);
        expect(newList.dueDateOf("Limpieza").getFullYear()).toEqual(2022);
        expect(newList.dueDateOf("Limpieza").getMonth()).toEqual(1);
        expect(newList.dueDateOf("Limpieza").getDate()).toEqual(25);
    });
    test('listShoudKnowDescriptionAndDateOfManyTodos', () => {
        
        let list1 = createEmptyTodoList();
        let description1 = "Hay que limpiar la cocina";
        let dueDate1 = new Date(2022, 1, 25);
        list1.addTodo("Limpieza", description1, dueDate1);

        let description2 = "Hay que hacer las compras";
        let dueDate2 = new Date(2023, 2, 24);
        list1.addTodo("Compras", description2, dueDate2);  

        expect(list1.isEmpty()).toEqual(false);
        expect(list1.descriptionOf("Limpieza")).toEqual(description1);
        expect(list1.dueDateOf("Limpieza").getFullYear()).toEqual(2022);
        expect(list1.dueDateOf("Limpieza").getMonth()).toEqual(1);
        expect(list1.dueDateOf("Limpieza").getDate()).toEqual(25);

        expect(list1.descriptionOf("Compras")).toEqual(description2);
        expect(list1.dueDateOf("Compras").getFullYear()).toEqual(2023);
        expect(list1.dueDateOf("Compras").getMonth()).toEqual(2);
        expect(list1.dueDateOf("Compras").getDate()).toEqual(24);
    });
    test('todoPriorityDefaultsToMinimum', () => { 
        let newList = createEmptyTodoList();
        let description = "Hay que limpiar la cocina";
        let dueDate = new Date(2022, 1, 25);
        newList.addTodo("Limpieza", description, dueDate);
        expect(newList.priorityOf("Limpieza")).toEqual(5);
    });
    test('todoPriorityCanBeSet', () => { 
        let newList = createEmptyTodoList();
        let description = "Hay que limpiar la cocina";
        let dueDate = new Date(2022, 1, 25);
        newList.addTodo("Limpieza", description, dueDate, 3);
        expect(newList.priorityOf("Limpieza")).toEqual(3);
    });
    test('nameMustBeAString', () => { 
        let newList = createEmptyTodoList();
        let description = "Hay que limpiar la cocina";
        let dueDate = new Date(2022, 1, 25);
        expect(() => {newList.addTodo(5, description, dueDate, 3)}).toThrow(TypeError);
        expect(() => {newList.addTodo(5, description, dueDate, 3)}).toThrow("Id should be a string");
        
    });
    test('descriptionMustBeAString', () => { 
        let newList = createEmptyTodoList();
        let description = 1;
        let dueDate = new Date(2022, 1, 25);
        expect(() => {newList.addTodo("Limpieza", description, dueDate, 3)}).toThrow(TypeError);
        expect(() => {newList.addTodo("Limpieza", description, dueDate, 3)}).toThrow("Description should be a string");  
    });
    test('dueDateMustBeADate', () => { 
        let newList = createEmptyTodoList();
        let description = "Hay que limpiar";
        let dueDate = 1;
        expect(() => {newList.addTodo("Limpieza", description, dueDate, 3)}).toThrow(TypeError);
        expect(() => {newList.addTodo("Limpieza", description, dueDate, 3)}).toThrow("dueDate should be a date");  
    });
    test('priorityMustBeAnInteger', () => { 
        let newList = createEmptyTodoList();
        let description = "Hay que limpiar";
        let dueDate = new Date(2022, 1, 25);
        expect(() => {newList.addTodo("Limpieza", description, dueDate, "")}).toThrow(TypeError);
        expect(() => {newList.addTodo("Limpieza", description, dueDate, "")}).toThrow("Priority should be an integer");  
    });
    test('priorityMustBeBetween1and5', () => { 
        let newList = createEmptyTodoList();
        let description = "Hay que limpiar";
        let dueDate = new Date(2022, 1, 25);
        expect(() => {newList.addTodo("Limpieza", description, dueDate, 0)}).toThrow(Error);
        expect(() => {newList.addTodo("Limpieza", description, dueDate, 0)}).toThrow("Priority should be between 1 and 5");  
    });
    test('todos go to main project as default', () => { 
        let newList = createEmptyTodoList();
        let description = "Hay que limpiar";
        let dueDate = new Date(2022, 1, 25);
        newList.addTodo("Limpieza", description, dueDate);

        expect(newList.projectsOf("Limpieza")).toEqual(['main']);
    });
    test('todos can go to different projects', () => { 
        let newList = createEmptyTodoList();
        let description = "Hay que limpiar";
        let dueDate = new Date(2022, 1, 25);
        let project = "Hogar";
        newList.addTodo("Limpieza", description, dueDate, 1, project);

        expect(newList.projectsOf("Limpieza")).toEqual([project]);
    });
    test('there cannot be two todos with the same name in the same project', () => { 
        let list1 = createEmptyTodoList();
        let description1 = "Hay que limpiar la cocina";
        let dueDate1 = new Date(2022, 1, 25);
        list1.addTodo("Limpieza", description1, dueDate1);

        expect(()=>{list1.addTodo("Limpieza", description1, dueDate1)}).toThrow(Error);
        expect(()=>{list1.addTodo("Limpieza", description1, dueDate1)}).toThrow("Multiple todos with the same name");         
    });
    test('there can be two todos with the same name in different projects', () => { 
        let newList = createEmptyTodoList();
        let description1 = "Hay que limpiar la cocina";
        let dueDate1 = new Date(2022, 1, 25);
        newList.addTodo("Limpieza", description1, dueDate1, 1, 'main');
        newList.addTodo("Limpieza", description1, dueDate1, 1, 'not-main');

        expect(newList.projectsOf("Limpieza")).toEqual(['main', 'not-main']);
    });
    test('project must be a string', () => { 
        let newList = createEmptyTodoList();
        let description1 = "Hay que limpiar la cocina";
        let dueDate1 = new Date(2022, 1, 25);
    
        expect(()=>{newList.addTodo("Limpieza", description1, dueDate1, 1, 1)}).toThrow(TypeError);
        expect(()=>{newList.addTodo("Limpieza", description1, dueDate1, 1, 1)}).toThrow("project must be a string");
    });
    
});