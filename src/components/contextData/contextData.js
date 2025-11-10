import React, {createContext, useState} from 'react';

export const DadosContext = createContext();

export const DadosProvider = ({children}) => {
  const [books, setBooks] = useState([
    {
      id: 1,
      title: 'The Silent Sea',
      author: 'Clive Cussler',
      image: 'https://i.imgur.com/DvpvklR.png',
      isNew: true,
      description:
        'Uma emocionante aventura marítima cheia de mistério e ação.',
      genre: 'Aventura',
    },
    {
      id: 2,
      title: 'Winds of Winter',
      author: 'George R. R. Martin',
      image: 'https://i.imgur.com/j0j8j8P.png',
      isNew: true,
      description:
        'Continuação épica da saga dos Sete Reinos, cheia de intrigas e reviravoltas.',
      genre: 'Fantasia',
    },
    {
      id: 3,
      title: 'Digital Fortress',
      author: 'Dan Brown',
      image: 'https://i.imgur.com/8Km9tLL.png',
      isNew: true,
      description:
        'Thriller tecnológico sobre criptografia e segredos do governo.',
      genre: 'Thriller',
    },
    {
      id: 4,
      title: 'The Lost Symbol',
      author: 'Dan Brown',
      image: 'https://i.imgur.com/5xQz4fH.png',
      isNew: false,
      description:
        'Uma busca frenética por segredos maçônicos em Washington D.C.',
      genre: 'Mistério',
    },
    {
      id: 5,
      title: 'Inferno',
      author: 'Dan Brown',
      image: 'https://i.imgur.com/TbVZQzY.png',
      isNew: false,
      description:
        'Robert Langdon desvenda enigmas inspirados em Dante Alighieri.',
      genre: 'Suspense',
    },
    {
      id: 6,
      title: 'Origin',
      author: 'Dan Brown',
      image: 'https://i.imgur.com/NhVjPYP.png',
      isNew: false,
      description:
        'Uma jornada por Espanha para responder às maiores perguntas da humanidade.',
      genre: 'Ficção',
    },
    {
      id: 7,
      title: 'The Martian',
      author: 'Andy Weir',
      image: 'https://i.imgur.com/fkTtV0R.png',
      isNew: true,
      description:
        'Um astronauta luta para sobreviver em Marte após ser deixado para trás.',
      genre: 'Ficção Científica',
    },
    {
      id: 8,
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      image: 'https://i.imgur.com/VQp0E6y.png',
      isNew: false,
      description:
        'Um homem acorda sozinho em uma nave espacial com a missão de salvar a humanidade.',
      genre: 'Ficção Científica',
    },
    {
      id: 9,
      title: 'Artemis',
      author: 'Andy Weir',
      image: 'https://i.imgur.com/FuOP4Em.png',
      isNew: false,
      description:
        'Uma contrabandista lunar se envolve em uma conspiração interplanetária.',
      genre: 'Ficção Científica',
    },
    {
      id: 10,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      image: 'https://i.imgur.com/Z0yqvC4.png',
      isNew: false,
      description:
        'Bilbo Bolseiro embarca em uma jornada inesperada repleta de perigos.',
      genre: 'Fantasia',
    },
    {
      id: 11,
      title: 'The Fellowship of the Ring',
      author: 'J.R.R. Tolkien',
      image: 'https://i.imgur.com/AnxvDqK.png',
      isNew: false,
      description: 'A primeira parte da saga épica de O Senhor dos Anéis.',
      genre: 'Fantasia',
    },
    {
      id: 12,
      title: 'The Two Towers',
      author: 'J.R.R. Tolkien',
      image: 'https://i.imgur.com/h6iUuH3.png',
      isNew: false,
      description:
        'O grupo se divide, e a jornada para destruir o Anel continua.',
      genre: 'Fantasia',
    },
    {
      id: 13,
      title: 'The Return of the King',
      author: 'J.R.R. Tolkien',
      image: 'https://i.imgur.com/F3yDmpZ.png',
      isNew: true,
      description: 'A batalha final pela Terra Média chega ao clímax.',
      genre: 'Fantasia',
    },
    {
      id: 14,
      title: '1984',
      author: 'George Orwell',
      image: 'https://i.imgur.com/1lmzVwY.png',
      isNew: false,
      description:
        'Um retrato sombrio de um futuro dominado por um governo totalitário.',
      genre: 'Distopia',
    },
    {
      id: 15,
      title: 'Animal Farm',
      author: 'George Orwell',
      image: 'https://i.imgur.com/qU6C3nP.png',
      isNew: false,
      description:
        'Uma alegoria política sobre revoluções e corrupção do poder.',
      genre: 'Sátira',
    },
    {
      id: 16,
      title: 'Brave New World',
      author: 'Aldous Huxley',
      image: 'https://i.imgur.com/6VgWJrA.png',
      isNew: false,
      description:
        'Uma sociedade aparentemente perfeita, mas controlada por condicionamento social.',
      genre: 'Distopia',
    },
    {
      id: 17,
      title: 'Fahrenheit 451',
      author: 'Ray Bradbury',
      image: 'https://i.imgur.com/JvK1xO4.png',
      isNew: true,
      description:
        'Em um futuro onde livros são proibidos, um bombeiro começa a questionar o sistema.',
      genre: 'Distopia',
    },
    {
      id: 18,
      title: 'Dune',
      author: 'Frank Herbert',
      image: 'https://i.imgur.com/5f7Yfms.png',
      isNew: false,
      description:
        'Uma saga épica de política, religião e ecologia no planeta desértico Arrakis.',
      genre: 'Ficção Científica',
    },
    {
      id: 19,
      title: 'Children of Dune',
      author: 'Frank Herbert',
      image: 'https://i.imgur.com/MR0nm0Z.png',
      isNew: false,
      description:
        'Os filhos de Paul Atreides enfrentam novos desafios em Arrakis.',
      genre: 'Ficção Científica',
    },
    {
      id: 20,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      image: 'https://i.imgur.com/Z1WUtql.png',
      isNew: false,
      description:
        'A jornada introspectiva de Holden Caulfield em busca de significado.',
      genre: 'Drama',
    },
    {
      id: 21,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      image: 'https://i.imgur.com/3Xw6VfO.png',
      isNew: false,
      description:
        'Uma reflexão sobre racismo e justiça no sul dos Estados Unidos.',
      genre: 'Drama',
    },
    {
      id: 22,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      image: 'https://i.imgur.com/MpCn6Hw.png',
      isNew: false,
      description:
        'Um clássico romance sobre orgulho, amor e convenções sociais.',
      genre: 'Romance',
    },
    {
      id: 23,
      title: 'Emma',
      author: 'Jane Austen',
      image: 'https://i.imgur.com/cLXXtrn.png',
      isNew: false,
      description:
        'A história de uma jovem que adora interferir na vida amorosa dos outros.',
      genre: 'Romance',
    },
    {
      id: 24,
      title: 'Dracula',
      author: 'Bram Stoker',
      image: 'https://i.imgur.com/GXWZdnP.png',
      isNew: false,
      description: 'O clássico conto do vampiro que assombra a Transilvânia.',
      genre: 'Terror',
    },
    {
      id: 25,
      title: 'Frankenstein',
      author: 'Mary Shelley',
      image: 'https://i.imgur.com/lX9U8eF.png',
      isNew: false,
      description:
        'Um cientista cria vida e sofre as consequências de seu experimento.',
      genre: 'Terror',
    },
    {
      id: 26,
      title: 'The Shining',
      author: 'Stephen King',
      image: 'https://i.imgur.com/4QmDDr9.png',
      isNew: true,
      description:
        'Um hotel isolado, uma família em crise e uma presença maligna.',
      genre: 'Terror',
    },
    {
      id: 27,
      title: 'It',
      author: 'Stephen King',
      image: 'https://i.imgur.com/Y5hC6lC.png',
      isNew: false,
      description:
        'Um grupo enfrenta o medo em sua forma mais terrível: Pennywise.',
      genre: 'Terror',
    },
    {
      id: 28,
      title: 'Misery',
      author: 'Stephen King',
      image: 'https://i.imgur.com/xHpp6QF.png',
      isNew: false,
      description: 'Um escritor é mantido em cativeiro por sua fã número um.',
      genre: 'Suspense',
    },
    {
      id: 29,
      title: 'Carrie',
      author: 'Stephen King',
      image: 'https://i.imgur.com/gCkDlUa.png',
      isNew: false,
      description: 'Uma garota com poderes telecinéticos busca vingança.',
      genre: 'Terror',
    },
    {
      id: 30,
      title: 'The Stand',
      author: 'Stephen King',
      image: 'https://i.imgur.com/NHCeAr7.png',
      isNew: false,
      description: 'Um vírus mortal extingue a maior parte da humanidade.',
      genre: 'Ficção',
    },
    {
      id: 31,
      title: 'The Green Mile',
      author: 'Stephen King',
      image: 'https://i.imgur.com/M4tG6rO.png',
      isNew: false,
      description:
        'Um prisioneiro com dons sobrenaturais muda a vida de um carcereiro.',
      genre: 'Drama',
    },
    {
      id: 32,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      image: 'https://i.imgur.com/V8G7nAq.png',
      isNew: false,
      description:
        'Um jovem pastor embarca em uma jornada espiritual em busca de seu destino.',
      genre: 'Filosófico',
    },
    {
      id: 33,
      title: 'Veronika Decides to Die',
      author: 'Paulo Coelho',
      image: 'https://i.imgur.com/2N9eU8C.png',
      isNew: false,
      description:
        'Uma mulher encontra novo sentido para a vida após tentar acabar com ela.',
      genre: 'Drama',
    },
    {
      id: 34,
      title: 'Eleven Minutes',
      author: 'Paulo Coelho',
      image: 'https://i.imgur.com/eqnOsyO.png',
      isNew: false,
      description: 'Uma história de autodescoberta e amor verdadeiro.',
      genre: 'Romance',
    },
    {
      id: 35,
      title: 'The Pilgrimage',
      author: 'Paulo Coelho',
      image: 'https://i.imgur.com/yQzLUnL.png',
      isNew: true,
      description: 'Uma jornada espiritual pelo Caminho de Santiago.',
      genre: 'Filosófico',
    },
    {
      id: 36,
      title: 'The Kite Runner',
      author: 'Khaled Hosseini',
      image: 'https://i.imgur.com/jQbP5Hh.png',
      isNew: false,
      description: 'Uma amizade marcada por culpa e redenção no Afeganistão.',
      genre: 'Drama',
    },
    {
      id: 37,
      title: 'A Thousand Splendid Suns',
      author: 'Khaled Hosseini',
      image: 'https://i.imgur.com/yMfKSpV.png',
      isNew: false,
      description: 'Duas mulheres enfrentam décadas de opressão e guerra.',
      genre: 'Drama',
    },
    {
      id: 38,
      title: 'And the Mountains Echoed',
      author: 'Khaled Hosseini',
      image: 'https://i.imgur.com/FtXv2YB.png',
      isNew: false,
      description:
        'Uma história sobre famílias separadas e destinos entrelaçados.',
      genre: 'Drama',
    },
    {
      id: 39,
      title: 'Gone Girl',
      author: 'Gillian Flynn',
      image: 'https://i.imgur.com/zIdA3Of.png',
      isNew: false,
      description:
        'O desaparecimento de uma mulher revela segredos sombrios de um casamento.',
      genre: 'Suspense',
    },
    {
      id: 40,
      title: 'Sharp Objects',
      author: 'Gillian Flynn',
      image: 'https://i.imgur.com/zA4i3Mo.png',
      isNew: false,
      description:
        'Uma repórter retorna à sua cidade natal para cobrir um assassinato e enfrentar seu passado.',
      genre: 'Suspense',
    },
    {
      id: 41,
      title: 'Dark Places',
      author: 'Gillian Flynn',
      image: 'https://i.imgur.com/V7Ieo4P.png',
      isNew: false,
      description:
        'Uma mulher investiga o massacre de sua família décadas depois.',
      genre: 'Suspense',
    },
    {
      id: 42,
      title: 'The Girl on the Train',
      author: 'Paula Hawkins',
      image: 'https://i.imgur.com/rA6D3o7.png',
      isNew: true,
      description:
        'Uma mulher se envolve em um mistério após testemunhar algo chocante pela janela do trem.',
      genre: 'Thriller',
    },
    {
      id: 43,
      title: 'Into the Water',
      author: 'Paula Hawkins',
      image: 'https://i.imgur.com/PKxGJ5k.png',
      isNew: false,
      description:
        'Mortes misteriosas em um rio revelam segredos profundos de uma cidade pequena.',
      genre: 'Mistério',
    },
    {
      id: 44,
      title: 'The Da Vinci Code',
      author: 'Dan Brown',
      image: 'https://i.imgur.com/ncDs9Ud.png',
      isNew: false,
      description:
        'Uma conspiração milenar envolvendo a Igreja e sociedades secretas.',
      genre: 'Suspense',
    },
    {
      id: 45,
      title: 'Angels & Demons',
      author: 'Dan Brown',
      image: 'https://i.imgur.com/4Zx4lT5.png',
      isNew: false,
      description:
        'Langdon enfrenta uma sociedade secreta que ameaça o Vaticano.',
      genre: 'Aventura',
    },
    {
      id: 46,
      title: 'Deception Point',
      author: 'Dan Brown',
      image: 'https://i.imgur.com/k3AqL3R.png',
      isNew: false,
      description:
        'Um thriller político envolvendo a NASA e uma descoberta misteriosa.',
      genre: 'Thriller',
    },
    {
      id: 47,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      image: 'https://i.imgur.com/0kYpFQW.png',
      isNew: false,
      description:
        'Uma mulher entre a vida e a morte descobre uma biblioteca de possibilidades infinitas.',
      genre: 'Ficção',
    },
    {
      id: 48,
      title: 'The Book Thief',
      author: 'Markus Zusak',
      image: 'https://i.imgur.com/xK4wHzq.png',
      isNew: true,
      description:
        'Uma menina encontra consolo nos livros durante a Segunda Guerra Mundial.',
      genre: 'Drama',
    },
    {
      id: 49,
      title: 'All the Light We Cannot See',
      author: 'Anthony Doerr',
      image: 'https://i.imgur.com/pCslVCr.png',
      isNew: false,
      description:
        'O encontro de dois jovens durante a ocupação nazista da França.',
      genre: 'Drama',
    },
    {
      id: 50,
      title: 'Cloud Atlas',
      author: 'David Mitchell',
      image: 'https://i.imgur.com/N8wQtmB.png',
      isNew: false,
      description:
        'Histórias interligadas que atravessam séculos e reencarnações.',
      genre: 'Ficção',
    },
  ]);

  // Seus livros pessoais (por exemplo, já alugados anteriormente)
  const [myBooks, setMyBooks] = useState([
    {
      title: 'Just My Type',
      author: 'Simon Garfield',
      image: 'https://i.imgur.com/j0j8j8P.png',
      returnDate: 'Return until 25.03.2020',
      progress: 0.7,
    },
    {
      title: 'Life Lessons',
      author: 'Jane Smith',
      image: 'https://i.imgur.com/DvpvklR.png',
    },
    {
      title: 'The Explorer',
      author: 'Carl Sagan',
      image: 'https://i.imgur.com/DvpvklR.png',
    },
  ]);

  // 🔥 Novo estado para livros alugados
  const [rentedBooks, setRentedBooks] = useState([]);

  // 👉 Alugar um livro (adiciona no carrinho)
  const rentBook = book => {
    const alreadyRented = rentedBooks.find(b => b.id === book.id);
    if (!alreadyRented) {
      setRentedBooks([...rentedBooks, book]);
    }
  };

  // 👉 Verificar se um livro já está alugado
  const isBookRented = bookId => {
    return rentedBooks.some(b => b.id === bookId);
  };

  // 👉 (Opcional) Devolver um livro
  const returnBook = bookId => {
    setRentedBooks(rentedBooks.filter(b => b.id !== bookId));
  };

  return (
    <DadosContext.Provider
      value={{
        books,
        setBooks,
        myBooks,
        setMyBooks,
        rentedBooks,
        rentBook,
        isBookRented,
        returnBook, // opcional, caso queira devolver
      }}>
      {children}
    </DadosContext.Provider>
  );
};

export default DadosContext;
