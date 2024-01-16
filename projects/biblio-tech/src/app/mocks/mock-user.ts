import { User } from "../models/user";

export const USERS: User [] = [
    {
        id: 1,
        firstName: 'Maxime',
        lastName: 'Devillepoix',
        email: 'maxime.devillepoix@exemple.com',
        password: 'max123',
        role: 'admin',
    },
    {
        id: 2,
        firstName: 'Enzo',
        lastName: 'De Sousa',
        email: 'enzo.desousa@exemple.com',
        password: 'enz123',
        role: 'user',
    },
    {
        id: 3,
        firstName: 'Matthieu',
        lastName: 'Cellier',
        email: 'matthieu.cellier@exemple.com',
        password: 'mat123',
        role: 'user',
    },
    {
        id: 4,
        firstName: 'Alister',
        lastName: 'Flandrinck',
        email: 'alister.flandrinck@exemple.com',
        password: 'ali123',
        role: 'user',
    },
    {
        id: 5,
        firstName: 'admin',
        lastName: 'admin',
        email: 'admin@test.com',
        password: 'admin',
        role: 'admin',
    },
]