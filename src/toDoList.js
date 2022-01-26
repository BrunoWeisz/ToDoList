/* todo
Name:
Description:
dueDate:
priority:
*/ 
const _ = require("lodash");

function createTodo(anId, aDescription, aDueDate, aPriority){
    return {
        id: anId,
        description: aDescription,
        dueDate: aDueDate,
        priority: aPriority
    };
}

function createEmptyProject(aName){

    function hasName(aPotentialName){
        return this._name == aPotentialName;
    }

    function _checkConditions(anId, aDescription, aDueDate, priority){
        if (!(_.isString(anId))){
            throw new TypeError("Id should be a string");
        }
        if (!(_.isString(aDescription))){
            throw new TypeError("Description should be a string");
        }
        if (!(_.isDate(aDueDate))){
            throw new TypeError("dueDate should be a date");
        }
        if (!(_.isInteger(priority))){
            throw new TypeError("Priority should be an integer");
        }
        if (priority < 1 || priority > 5){
            throw new Error("Priority should be between 1 and 5");
        }
        
    }

    function addTodo(anId, aDescription, aDueDate, aPriority){

        _checkConditions(anId, aDescription, aDueDate, aPriority);
        this._todos.push(createTodo(anId, aDescription, aDueDate, aPriority));
    }

    function findTodo(anId){
        const todoFound = this._todos.find((todo)=>todo.id == anId);
        if (!todoFound){
            throw new Error("Non existent todo");
        }
        return todoFound;
    }

    function descriptionOf(anId){
        return findTodo.call(this, anId).description;
    };

    function dueDateOf(anId){
        return findTodo.call(this, anId).dueDate;
    };

    function priorityOf(anId){
        return findTodo.call(this, anId).priority;
    };

    function hasTodo(anId){
        return this._todos.some((todo) => todo.id == anId);
    }

    function removeTodo(anId){
        this._todos = this._todos.filter(todo => todo.id != anId);
    }

    return {
        _name: aName,
        _todos: [],
        hasName,
        addTodo,
        descriptionOf,
        dueDateOf,
        priorityOf,
        hasTodo,
        removeTodo
    }
}

function createEmptyTodoList(){

    function isEmpty(){return this._empty};

    function addTodo(anId, 
                     aDescription, 
                     aDueDate, 
                     aPriority = 5, 
                     aProject = 'main')
    {
        
        if (!(_.isString(aProject))){
            throw new TypeError("project must be a string");
        }

        if (this._projects.filter(pr => pr.hasTodo(anId) && pr.hasName(aProject)).length > 0){
            throw new Error("Multiple todos with the same name");
        }

        if (!this._projects.find(pr => pr.hasName(aProject))){
            this._projects.push(createEmptyProject(aProject));
        }

        const currentProject = this._projects.find(pr => pr.hasName(aProject));
        currentProject.addTodo(anId, aDescription, aDueDate, aPriority);

        this._empty = false;
    };

    function descriptionInProject(anId, aProject = "main"){
        return findProject.call(this, aProject).descriptionOf(anId);
    }

    function dueDateInProject(anId, aProject = "main"){
        return findProject.call(this, aProject).dueDateOf(anId);
    }

    function priorityInProject(anId, aProject = "main"){
        return findProject.call(this, aProject).priorityOf(anId);
    }

    function findProject(aProjectName){
        const projectFound = this._projects.find(pr => pr.hasName(aProjectName))
        if (!projectFound){
            throw new Error("Non existent project");
        }
        return projectFound;
    }

    function projectsOf(anId){
        return this._projects.filter(pr => pr.hasTodo(anId)).map(pr=> pr._name);
    }

    function removeTodo(anId, aProject){
        this._projects.find((pr)=> pr.hasName(aProject)).removeTodo(anId);
    }

    function removeProject(aProject){
        this._projects = this._projects.filter(pr => !pr.hasName(aProject));
    }

    return {
        _empty: true,
        _projects: [],
        _todos: [],
        addTodo,
        isEmpty,
        projectsOf,
        descriptionInProject,
        priorityInProject,
        dueDateInProject,
        removeTodo,
        removeProject
    }
}

module.exports = createEmptyTodoList;