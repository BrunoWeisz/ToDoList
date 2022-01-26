const SessionAdministrator = require('./sessionAdministrator.js');

describe('Session Administrator Test', () => {
    test('can create new session', () => {
        let newAdmin = new SessionAdministrator();
        expect(newAdmin.hasUsers()).toEqual(false);
    });
    test('can create new user with pasword', () => {
        let admin = new SessionAdministrator();
        const username = "yo";
        const password = "123";
        admin.addUser(username, password);

        expect(admin.hasUsers()).toEqual(true);
        expect(admin.registeredUser(username)).toEqual(true);
        expect(admin.currentlyLogged(username)).toEqual(false);
    });
    test('can create many users with pasword', () => {
        let admin = new SessionAdministrator();
        const username1 = "yo";
        const password1 = "123";
        admin.addUser(username1, password1);

        const username2 = "yont";
        const password2 = "1234";
        admin.addUser(username2, password2);

        expect(admin.hasUsers()).toEqual(true);
        expect(admin.registeredUser(username1)).toEqual(true);
        expect(admin.currentlyLogged(username1)).toEqual(false);
        expect(admin.registeredUser(username2)).toEqual(true);
        expect(admin.currentlyLogged(username2)).toEqual(false);
    });
    test('registered user can login with password', () => {
        let admin = new SessionAdministrator();
        const username = "yo";
        const password = "123";
        admin.addUser(username, password);
        admin.logIn(username, password);

        expect(admin.registeredUser(username)).toEqual(true);
        expect(admin.currentlyLogged(username)).toEqual(true);
    });
    test('unregistered user cannot login', () => {
        let admin = new SessionAdministrator();
        const username = "yo";
        const password = "123";
        
        expect(()=>{admin.logIn(username, password)}).toThrow(Error);
        expect(()=>{admin.logIn(username, password)}).toThrow("User not registered");

        expect(admin.registeredUser(username)).toEqual(false);
        expect(admin.currentlyLogged(username)).toEqual(false);
    });
    test('registered must use his password to login', () => {
        let admin = new SessionAdministrator();
        const username = "yo";
        const password = "123";
        const fakePassword = "1234";
        admin.addUser(username, password);
        
        expect(()=>{admin.logIn(username, fakePassword)}).toThrow(Error);
        expect(()=>{admin.logIn(username, fakePassword)}).toThrow("Wrong password");

        expect(admin.registeredUser(username)).toEqual(true);
        expect(admin.currentlyLogged(username)).toEqual(false);
    });
    test('cannot login two users at the same time', () => {
        let admin = new SessionAdministrator();
        const username1 = "yo";
        const password1 = "123";
        admin.addUser(username1, password1);

        const username2 = "yont";
        const password2 = "1234";
        admin.addUser(username2, password2);

        admin.logIn(username1, password1);

        expect(()=>{admin.logIn(username2,password2)}).toThrow(Error);
        expect(()=>{admin.logIn(username2,password2)}).toThrow("There is a logged user already");
        
        expect(admin.registeredUser(username1)).toEqual(true);
        expect(admin.currentlyLogged(username1)).toEqual(true);
        expect(admin.registeredUser(username2)).toEqual(true);
        expect(admin.currentlyLogged(username2)).toEqual(false);
    });
    test('logged user can log out', () => {
        let admin = new SessionAdministrator();
        const username = "yo";
        const password = "123";
        admin.addUser(username, password);
        admin.logIn(username, password);
        admin.logOut(username);

        expect(admin.registeredUser(username)).toEqual(true);
        expect(admin.currentlyLogged(username)).toEqual(false);
    });
    test('not logged user cannot log out', () => {
        let admin = new SessionAdministrator();
        const username = "yo";
        const password = "123";
        admin.addUser(username, password);
        admin.logIn(username, password);

        const username2 = "yo2";
        const password2 = "1234";
        admin.addUser(username2, password2);

        expect(()=>{admin.logOut(username2)}).toThrow(Error);
        expect(()=>{admin.logOut(username2)}).toThrow("Not logged");

        expect(admin.registeredUser(username)).toEqual(true);
        expect(admin.currentlyLogged(username)).toEqual(true);
    });
    test('username must be a string when register', () => {
        let admin = new SessionAdministrator();
        const username = 1;
        const password = "123";
        
        expect(()=>{admin.addUser(username, password)}).toThrow(Error);
        expect(()=>{admin.addUser(username, password)}).toThrow("Username not string");

        expect(admin.registeredUser(username)).toEqual(false);
    });
    test('password must be a string when register', () => {
        let admin = new SessionAdministrator();
        const username = "bla";
        const password = 2;
        
        expect(()=>{admin.addUser(username, password)}).toThrow(Error);
        expect(()=>{admin.addUser(username, password)}).toThrow("Password not string");

        expect(admin.registeredUser(username)).toEqual(false);
    });
    test('there cannot be two users with same username', () => {
        let admin = new SessionAdministrator();
        const username1 = "yo";
        const password1 = "123";
        admin.addUser(username1, password1);

        const username2 = "yo";
        const password2 = "1234";
        

        expect(()=>{admin.addUser(username2, password2);}).toThrow(Error);
        expect(()=>{admin.addUser(username2, password2);}).toThrow("There is a user with that name already");
        
        expect(admin.registeredUser(username1)).toEqual(true);
        expect(admin.currentlyLogged(username1)).toEqual(false);
    });
    
    
});