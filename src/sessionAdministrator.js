const _ = require("lodash");

function SessionAdministrator(){

    function hasUsers() {return !this._accounts.length == 0};

    function checkUserAndPasswordStrings(anUsername, aPassword){
        if(!_.isString(anUsername)){
            throw new Error("Username not string");    
        }
        if(!_.isString(aPassword)){
            throw new Error("Password not string");    
        }
    }

    function addUser(anUsername, aPassword){
        checkUserAndPasswordStrings(anUsername,aPassword);
        if (this._accounts.some(acc=>acc.username==anUsername)){
            throw new Error("There is a user with that name already");
        }
        this._accounts.push({username: anUsername, password: aPassword});
    }

    function registeredUser(anUsername){
        return this._accounts.some((acc) => acc.username == anUsername);
    }

    function logIn(anUsername, aPassword){
        checkUserAndPasswordStrings(anUsername,aPassword);

        if (this._loggedUser){
            throw new Error("There is a logged user already");    
        }

        const matchingUser = this._accounts.find((acc)=>acc.username == anUsername);
        if (matchingUser){
            if (matchingUser.password == aPassword){ 
                this._loggedUser = anUsername;
            } else {
                throw new Error("Wrong password");    
            }
        } else {
            throw new Error("User not registered");
        }
        
    }

    function logOut(anUsername){
        if (anUsername != this._loggedUser){
            throw new Error("Not logged");
        }else {
            this._loggedUser = null;
        }
    }

    function currentlyLogged(anUsername){
        return this._loggedUser == anUsername;
    }

    return {
        _accounts: [], 
        _loggedUser: null,
        addUser,
        hasUsers,
        registeredUser,
        currentlyLogged,
        logIn,
        logOut
    }
    
}

module.exports = SessionAdministrator;