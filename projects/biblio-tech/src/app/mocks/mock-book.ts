import { Book } from '../models/book';

export const BOOKS: Book[] = [
  {
    id: 1,
    title: 'One Piece',
    resume: 'Le roi des pirates ca sera moi!',
    image: 'https://m.media-amazon.com/images/I/51v5295UzVL._SY445_SX342_.jpg',
    createdAt: new Date(1998, 9, 16),
    updateAt: null,
    idUser: 2,
  },
  {
    id: 2,
    title: 'Oshi no ko',
    resume: 'Le résumé du livre',
    image: 'https://m.media-amazon.com/images/I/51NERxjRNbL._SY445_SX342_.jpg',
    createdAt: new Date(1998, 9, 16),
    updateAt: null,
    idUser: 2,
  },
  {
    id: 3,
    title: 'Frieren',
    resume: 'Le résumé du livre',
    image: 'https://m.media-amazon.com/images/I/51TPSFO3YoL._SY445_SX342_.jpg',
    createdAt: new Date(1998, 9, 16),
    updateAt: null,
    idUser: 2,
  },
  {
    id: 4,
    title: 'Chainsaw man',
    resume: 'Le résumé du livre',
    image: 'https://m.media-amazon.com/images/I/51snC8PPYoL._SY445_SX342_.jpg',
    createdAt: new Date(1998, 9, 16),
    updateAt: null,
    idUser: 3,
  },
  {
    id: 5,
    title: 'Spy x Family',
    resume: 'Le résumé du livre',
    image: 'https://m.media-amazon.com/images/I/61OQgI-aeAL._SL1412_.jpg',
    createdAt: new Date(1998, 9, 16),
    updateAt: null,
    idUser: 4,
  },
];
