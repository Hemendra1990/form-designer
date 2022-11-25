
export class UserService {
    async getUsers() {
        return await fetch('./users.json').then(res => res.json()).then(d => d);
    }
}