/* todo
Name:
Description:
dueDate:
priority:
*/ 
const _ = require("lodash");

function createEmptyTodoList(){

    function isEmpty(){
        return this._empty;
    };

    function _checkConditions(anId, aDescription, aDueDate, priority, project){
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
        if (!(_.isString(project))){
            throw new TypeError("project must be a string");
        }
        if (this._todos.filter((todo)=> todo.id == anId && todo.project == project).length > 0){
            throw new Error("Multiple todos with the same name");
        }
    }

    function addTodo(anId, 
                     aDescription, 
                     aDueDate, 
                     aPriority = 5, 
                     aProject = 'main')
    {
        
        _checkConditions.call(this, anId, aDescription, aDueDate, aPriority, aProject);
        
        this._empty = false;
        this._todos.push({
                            id: anId,
                            description: aDescription,
                            dueDate: aDueDate,
                            priority: aPriority,
                            project: aProject
                        });
    };

    function descriptionOf(anId){
        console.log(this._todos);
        return this._todos.find((todo)=>todo.id == anId).description;
    };

    function dueDateOf(anId){
        return this._todos.find((todo)=>todo.id == anId).dueDate;
    };

    function priorityOf(anId){
        return this._todos.find((todo)=>todo.id == anId).priority;
    };

    function projectsOf(anId){
        return this._todos.filter((todo)=>todo.id == anId).map(todo=> todo.project);
    }

    return {
        _empty: true,
        _todos: [],
        addTodo,
        isEmpty,
        descriptionOf,
        dueDateOf,
        priorityOf,
        projectsOf
    }
}

module.exports = createEmptyTodoList;