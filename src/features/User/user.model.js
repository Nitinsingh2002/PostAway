export default class userModel {
    constructor(id, name, email, password) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
    }

    static getAllUser() {
        return users;
    }

    static SignUp(name, email, password) {
        const newUser = new userModel(
            users.length + 1,
            name,
            email,
            password
        )
        users.push(newUser);
        return newUser;
    }

    static LogIn(email, password) {
        const user = users.find((u) => u.email == email && u.password == password);
        return user;
    }
}




var users = [
    new userModel(
        1,
        'user1',
        'user@gmail.com',
        'userpassword'
    )
]