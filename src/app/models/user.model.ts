export interface IUser {
    id?: string;
    username?: string;
    name?: string;
    email?: string;
    website?: string;
}

export class User implements IUser {
    constructor(
        public id?: string,
        public username?: string,
        public name?: string,
        public email?: string,
        public website?: string,
    ) { }
}
