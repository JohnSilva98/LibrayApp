import React, {createContext, useState} from 'react';

export const DadosContext = createContext();

export const DadosProvider = ({children}) => {
  const [books, setBooks] = useState([
    {
      title: 'muscle',
      author: 'Alan trotter',
      image: 'https://i.imgur.com/DvpvklR.png',
    },
    {
      title: 'dominicana',
      author: 'Angie cruz',
      image: 'https://i.imgur.com/DvpvklR.png',
    },
    {
      title: 'a new begining',
      author: 'david neeson',
      image: 'https://i.imgur.com/DvpvklR.png',
    },
    {
      title: 'art of war',
      author: 'hideo kojima',
      image: 'https://i.imgur.com/DvpvklR.png',
    },
    {
      title: 'f1',
      author: 'alan prost',
      image: 'https://i.imgur.com/DvpvklR.png',
    },
  ]);
};

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

return (
  <DadosContext.Provider value={{books, myBooks, setBooks, setMyBooks}}>
    {children}
  </DadosContext.Provider>
);
