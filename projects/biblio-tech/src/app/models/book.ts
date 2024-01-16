export class Book {
    constructor(
        public id: number,
        public title: string,
        public resume: string,
        public image: string,
        public createdAt: Date,
        public updateAt: Date|null,
        public idUser: number
    ){ 
        this.createdAt = new Date();
    }
}