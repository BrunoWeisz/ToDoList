const SessionAdministrator = require("./sessionAdministrator");
import './style.css'
const fs =require('../node_modules/fs');

const ScreenView = (function(){
    function displayRegisterForm(){

        console.log("Displaying form");
        const space = document.querySelector("#page");
        function add(err, text){
            space.innerHTML = text;
        }
        
        fs.readAsText('./html-aux/registerForm.html', "utf-8", add);
        

        
        /*const registerForm = document.createElement("form");
        registerForm.classList.add("register-form");
        space.appendChild(registerForm);

        const usernameDiv = document.createElement("div");
        const usernameLabel = document.createElement("label");
        const usernameInput = document.createElement("input");
        registerForm.appendChild(usernameDiv);
        usernameDiv.appendChild(usernameLabel);
        usernameDiv.appendChild(usernameInput);

        const passwordDiv = document.createElement("div");
        const passwordLabel = document.createElement("label");
        const passwordInput = document.createElement("input");
        registerForm.appendChild(passwordDiv);
        passwordDiv.appendChild(passwordLabel);
        passwordDiv.appendChild(passwordInput);

        const submitButton = document.createElement("button");
        registerForm.appendChild(submitButton);

        usernameLabel.textContent = "Username: ";
        passwordLabel.textContent = "Password: ";
        submitButton.textContent = "Register";*/
    }
    
    return {
        displayRegisterForm
    }
})();

const screenModel = (function(){
    function loadButtons(){
        console.log("loadingButtons");
        const registerCallback = function(ev){
            ScreenView.displayRegisterForm();
        }
        const loginButton = document.querySelector(".register");
        loginButton.addEventListener("click", registerCallback, {once:true});


        console.log("Finished loading Buttons");
    }

    return{
        loadButtons
    }

})();

export default screenModel;