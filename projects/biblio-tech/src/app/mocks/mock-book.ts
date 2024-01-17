import { Book } from '../models/book';

export const BOOKS: Book[] = [
  {
    id: 1,
    title: 'One Piece',
    resume: 'Le roi des pirates ca sera moi!',
    image: '',
    createdAt: new Date(1998, 9, 16),
    updateAt: null,
    idUser: 2,
    idCategory: [1, 2], // Exemple de valeurs d'idCategory, à ajuster selon vos catégories réelles
  },
  {
    id: 2,
    title: 'Oshi no ko',
    resume: 'Le résumé du livre',
    image: '',
    createdAt: new Date(1998, 9, 16),
    updateAt: null,
    idUser: 2,
    idCategory: [2, 3],
  },
  {
    id: 3,
    title: 'Frieren',
    resume: 'Le résumé du livre',
    image: '',
    createdAt: new Date(1998, 9, 16),
    updateAt: null,
    idUser: 2,
    idCategory: [1, 3],
  },
  {
    id: 4,
    title: 'Chainsaw man',
    resume: 'Le résumé du livre',
    image: '',
    createdAt: new Date(1998, 9, 16),
    updateAt: null,
    idUser: 3,
    idCategory: [3, 4],
  },
  {
    id: 5,
    title: 'Spy x Family',
    resume: 'Le résumé du livre',
    image: '',
    createdAt: new Date(1998, 9, 16),
    updateAt: null,
    idUser: 4,
    idCategory: [1, 4],
  },
];
