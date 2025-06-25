export interface IBook {
    title: string,
    author: string,
    genre: 'FICTION' | 'NON_FICTON' | 'SCIENCE' | 'HISTORY' | 'BIOGRAPHY' | 'FANTASY',
    isbn: string,
    description: string,
    copies: number,
    available: boolean
}