export interface IPost {
    title?: string;
    body?: string;
    userId?: number;
    id?: number;
}

export class Post implements IPost {
    constructor(
        public title?: string,
        public body?: string,
        public userId?: number,
        public id?: number,
    ) { }
}
