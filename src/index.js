import './style.css'
import createEmptyTodoList from './toDoList';
import screen from './screen';
import mainBackground from './../resources/mainBackground.jpeg'

console.log("hello world");

const webpage = (function(createModelAccount){
    function createAccount(){
        this.userAccount = createModelAccount();
        
    }

})(createEmptyTodoList);
