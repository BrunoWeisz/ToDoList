//const { describe } = require('yargs');
const createEmptyTodoList = require('./toDoList.js');
//import createEmptyTodoList from 'toDoList.js';

function descriptionOf(anId){

}

describe('toDoListTest', () => {
    test('newlyCreatedListHasNoTodos', () => {
        let emptyList = createEmptyTodoList();
        expect(emptyList.isEmpty()).toEqual(true);
    });
    test('listShoudKnowDescriptionAndDateOfOneTodo', () => {
        
        let newList = createEmptyTodoList();
        let description = "Hay que limpiar la cocina";
        let dueDate = new Date(2022, 1, 25);
        newList.addTodo("Limpieza", description, dueDate);
        expect(newList.isEmpty()).toEqual(false);
        expect(newList.descriptionInProject("Limpieza")).toEqual(description);
        expect(newList.dueDateInProject("Limpieza").getFullYear()).toEqual(2022);
        expect(newList.dueDateInProject("Limpieza").getMonth()).toEqual(1);
        expect(newList.dueDateInProject("Limpieza").getDate()).toEqual(25);
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
        expect(list1.descriptionInProject("Limpieza")).toEqual(description1);
        expect(list1.dueDateInProject("Limpieza").getFullYear()).toEqual(2022);
        expect(list1.dueDateInProject("Limpieza").getMonth()).toEqual(1);
        expect(list1.dueDateInProject("Limpieza").getDate()).toEqual(25);

        expect(list1.descriptionInProject("Compras")).toEqual(description2);
        expect(list1.dueDateInProject("Compras").getFullYear()).toEqual(2023);
        expect(list1.dueDateInProject("Compras").getMonth()).toEqual(2);
        expect(list1.dueDateInProject("Compras").getDate()).toEqual(24);
    });
    test('todoPriorityDefaultsToMinimum', () => { 
        let newList = createEmptyTodoList();
        let description = "Hay que limpiar la cocina";
        let dueDate = new Date(2022, 1, 25);
        newList.addTodo("Limpieza", description, dueDate);
        expect(newList.priorityInProject("Limpieza")).toEqual(5);
    });
    test('todoPriorityCanBeSet', () => { 
        let newList = createEmptyTodoList();
        let description = "Hay que limpiar la cocina";
        let dueDate = new Date(2022, 1, 25);
        newList.addTodo("Limpieza", description, dueDate, 3);
        expect(newList.priorityInProject("Limpieza")).toEqual(3);
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
    test('todos can be accessed by <id, project>', () => { 
        let newList = createEmptyTodoList();
        let id = "Limpieza";
        let description1 = "Hay que limpiar la cocina";
        let dueDate1 = new Date(2022, 1, 25);
        let project = "cena";
        newList.addTodo(id, description1, dueDate1, 1, project);
    
        expect(newList.descriptionInProject(id, project)).toEqual(description1);
        expect(newList.dueDateInProject(id, project)).toEqual(dueDate1);
        expect(newList.priorityInProject(id, project)).toEqual(1);
    });
    test('todos can be accessed by <id, project>', () => { 
        let newList = createEmptyTodoList();
        let id = "Limpieza";
        let description1 = "Hay que limpiar la cocina";
        let dueDate1 = new Date(2022, 1, 25);
        let project = "cena";
        newList.addTodo(id, description1, dueDate1, 1, project);
    
        expect(newList.descriptionInProject(id, project)).toEqual(description1);
        expect(newList.dueDateInProject(id, project)).toEqual(dueDate1);
        expect(newList.priorityInProject(id, project)).toEqual(1);
    });
    test('Access non-existent todo in existing project should raise Error', () => { 
        let newList = createEmptyTodoList();
        let id2 = "Limpieza";
        let description2 = "Hay que limpiar la cocina";
        let dueDate2 = new Date(2022, 1, 25);
        let project2 = "main";
        newList.addTodo(id2, description2, dueDate2, 1, project2);
        let id = "hola";
        let project = "main";
    
        expect(()=>{newList.descriptionInProject(id, project)}).toThrow(Error);
        expect(()=>{newList.dueDateInProject(id, project)}).toThrow(Error);
        expect(()=>{newList.priorityInProject(id, project)}).toThrow(Error);
        
        expect(()=>{newList.descriptionInProject(id, project)}).toThrow("Non existent todo");
        expect(()=>{newList.dueDateInProject(id, project)}).toThrow("Non existent todo");
        expect(()=>{newList.priorityInProject(id, project)}).toThrow("Non existent todo");

    });
    test('Access non-existent project should raise Error', () => { 
        let newList = createEmptyTodoList();
        let id = "hola";
        let project = "chau";
    
        expect(()=>{newList.descriptionInProject(id, project)}).toThrow(Error);
        expect(()=>{newList.dueDateInProject(id, project)}).toThrow(Error);
        expect(()=>{newList.priorityInProject(id, project)}).toThrow(Error);
        
        expect(()=>{newList.descriptionInProject(id, project)}).toThrow("Non existent project");
        expect(()=>{newList.dueDateInProject(id, project)}).toThrow("Non existent project");
        expect(()=>{newList.priorityInProject(id, project)}).toThrow("Non existent project");

    });
    test('todos can be removed', () => { 
        let newList = createEmptyTodoList();
        let id = "Limpieza";
        let description1 = "Hay que limpiar la cocina";
        let dueDate1 = new Date(2022, 1, 25);
        let project = "cena";
        newList.addTodo(id, description1, dueDate1, 1, project);
        newList.removeTodo(id, project);

        expect(()=>{newList.descriptionInProject(id, project)}).toThrow(Error);
        expect(()=>{newList.descriptionInProject(id, project)}).toThrow("Non existent todo");
    });
    test('projects can be removed', () => { 
        let newList = createEmptyTodoList();
        let id = "Limpieza";
        let description1 = "Hay que limpiar la cocina";
        let dueDate1 = new Date(2022, 1, 25);
        let project = "cena";
        newList.addTodo(id, description1, dueDate1, 1, project);
        newList.removeProject(project);

        expect(()=>{newList.descriptionInProject(id, project)}).toThrow(Error);
        expect(()=>{newList.descriptionInProject(id, project)}).toThrow("Non existent project");
    });
});