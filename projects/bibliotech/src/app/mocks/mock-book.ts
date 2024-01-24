import { Book } from '../models/book';

export const BOOKS: Book[] = [
  {
    id: 0,
    title: 'One Piece',
    resume:
      'Gol D Roger est le seigneur des pirates. À sa mort, une grande vague de piraterie s’abat sur le monde. Ces pirates partent à la recherche du One Piece, le fabuleux trésor amassé par Gol D Roger durant tout sa vie. Monkey D. Luffy, notre héros, est un petit garçon qui rêve de devenir pirate. Un jour, Luffy mange par erreur l’un des fruits du démon, qui ont la réputation de donner des pouvoirs spéciaux. C’est ainsi que Luffy devient un homme élastique. Toutefois, le mangeur d’un fruit du démon se retrouve dans l’incapacité de nager… Dix ans plus tard, nous retrouvons Luffy qui décide de prendre la mer à la recherche d’un équipage à lui et avec pour objectif de devenir le seigneur des pirates !',
    image: 'https://m.media-amazon.com/images/I/51v5295UzVL._SY445_SX342_.jpg',
    createdAt: new Date(1998, 9, 16),
    updateAt: null,
    idUser: 2,
  },
  {
    id: 1,
    title: 'Oshi no ko',
    resume:
      'Le docteur Gorô est obstétricien dans un hôpital de campagne. Il est loin du monde de paillettes dans lequel évolue Ai Hoshino, une chanteuse au succès grandissant dont il est “un fan absolu”. Ces deux-là vont peut-être se rencontrer dans des circonstances peu favorables, mais cet événement changera leur vie à jamais !',
    image: 'https://m.media-amazon.com/images/I/51NERxjRNbL._SY445_SX342_.jpg',
    createdAt: new Date(1998, 9, 16),
    updateAt: null,
    idUser: 2,
  },
  {
    id: 2,
    title: 'Frieren',
    resume: 'Le résumé du livre',
    image: 'https://m.media-amazon.com/images/I/51TPSFO3YoL._SY445_SX342_.jpg',
    createdAt: new Date(1998, 9, 16),
    updateAt: null,
    idUser: 2,
  },
  {
    id: 3,
    title: 'Chainsaw man',
    resume: 'Le résumé du livre',
    image: 'https://m.media-amazon.com/images/I/51snC8PPYoL._SY445_SX342_.jpg',
    createdAt: new Date(1998, 9, 16),
    updateAt: null,
    idUser: 3,
  },
  {
    id: 4,
    title: 'Spy x Family',
    resume: 'Le résumé du livre',
    image: 'https://m.media-amazon.com/images/I/61OQgI-aeAL._SL1412_.jpg',
    createdAt: new Date(1998, 9, 16),
    updateAt: null,
    idUser: 4,
  },
];
