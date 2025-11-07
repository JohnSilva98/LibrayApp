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
    },
    {
      id: 2,
      title: 'Winds of Winter',
      author: 'George R. R. Martin',
      image: 'https://i.imgur.com/j0j8j8P.png',
      isNew: true,
    },
    {
      id: 3,
      title: 'Digital Fortress',
      author: 'Dan Brown',
      image: 'https://i.imgur.com/8Km9tLL.png',
      isNew: true,
    },
    {
      id: 4,
      title: 'The Martian',
      author: 'Andy Weir',
      image: 'https://i.imgur.com/2yaf2wb.png',
      isNew: true,
    },
    {
      id: 5,
      title: 'Educated',
      author: 'Tara Westover',
      image: 'https://i.imgur.com/5M0g9Qy.png',
      isNew: true,
    },
    {
      id: 6,
      title: 'Atomic Habits',
      author: 'James Clear',
      image: 'https://i.imgur.com/7yUVE1Z.png',
      isNew: true,
    },
    {
      id: 7,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      image: 'https://i.imgur.com/Xs2G9UZ.png',
      isNew: true,
    },
    {
      id: 8,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      image: 'https://i.imgur.com/LrM9S1Q.png',
      isNew: true,
    },
    {
      id: 9,
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      image: 'https://i.imgur.com/m1xwR5E.png',
      isNew: true,
    },
    {
      id: 10,
      title: 'Becoming',
      author: 'Michelle Obama',
      image: 'https://i.imgur.com/RdM2yJw.png',
      isNew: true,
    },
    {
      id: 11,
      title: 'Dune',
      author: 'Frank Herbert',
      image: 'https://i.imgur.com/z2W1D8N.png',
      isNew: true,
    },
    {
      id: 12,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      image: 'https://i.imgur.com/W2M2n5H.png',
      isNew: true,
    },
    {
      id: 13,
      title: '1984',
      author: 'George Orwell',
      image: 'https://i.imgur.com/NLz3A7h.png',
      isNew: true,
    },
    {
      id: 14,
      title: 'Brave New World',
      author: 'Aldous Huxley',
      image: 'https://i.imgur.com/2gCj1eN.png',
      isNew: true,
    },
    {
      id: 15,
      title: 'The Road',
      author: 'Cormac McCarthy',
      image: 'https://i.imgur.com/jP3BtKZ.png',
      isNew: true,
    },
    {
      id: 16,
      title: 'Shantaram',
      author: 'Gregory David Roberts',
      image: 'https://i.imgur.com/vTzYQdV.png',
      isNew: true,
    },
    {
      id: 17,
      title: 'It',
      author: 'Stephen King',
      image: 'https://i.imgur.com/0XKxvZP.png',
      isNew: true,
    },
    {
      id: 18,
      title: 'Pet Sematary',
      author: 'Stephen King',
      image: 'https://i.imgur.com/KbYbOVS.png',
    },
    {
      id: 19,
      title: 'Carrie',
      author: 'Stephen King',
      image: 'https://i.imgur.com/A2u0WZt.png',
    },
    {
      id: 20,
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      image: 'https://i.imgur.com/ij8DyQF.png',
    },
    {
      id: 21,
      title: 'The 7 Habits of Highly Effective People',
      author: 'Stephen Covey',
      image: 'https://i.imgur.com/xl8XZlf.png',
    },
    {
      id: 22,
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      image: 'https://i.imgur.com/40Vw5tR.png',
    },
    {
      id: 23,
      title: 'Deep Work',
      author: 'Cal Newport',
      image: 'https://i.imgur.com/vcIz5uT.png',
    },
    {
      id: 24,
      title: 'Hooked',
      author: 'Nir Eyal',
      image: 'https://i.imgur.com/4XdfkEZ.png',
    },
    {
      id: 25,
      title: 'The Lean Startup',
      author: 'Eric Ries',
      image: 'https://i.imgur.com/pO2jqez.png',
    },
    {
      id: 26,
      title: 'Zero to One',
      author: 'Peter Thiel',
      image: 'https://i.imgur.com/S3xY4AQ.png',
    },
    {
      id: 27,
      title: 'The Power of Now',
      author: 'Eckhart Tolle',
      image: 'https://i.imgur.com/rlgY8N7.png',
    },
    {
      id: 28,
      title: 'Man’s Search for Meaning',
      author: 'Viktor Frankl',
      image: 'https://i.imgur.com/qgC6H7G.png',
    },
    {
      id: 29,
      title: '12 Rules for Life',
      author: 'Jordan Peterson',
      image: 'https://i.imgur.com/0U2Xblx.png',
    },
    {
      id: 30,
      title: 'Can’t Hurt Me',
      author: 'David Goggins',
      image: 'https://i.imgur.com/EqK0wB1.png',
    },
    {
      id: 31,
      title: 'Born a Crime',
      author: 'Trevor Noah',
      image: 'https://i.imgur.com/Y5j3k2m.png',
    },
    {
      id: 32,
      title: 'The Subtle Art of Not Giving a F*ck',
      author: 'Mark Manson',
      image: 'https://i.imgur.com/VYbHu4F.png',
    },
    {
      id: 33,
      title: 'Everything is F*cked',
      author: 'Mark Manson',
      image: 'https://i.imgur.com/dq5pKkB.png',
    },
    {
      id: 34,
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      image: 'https://i.imgur.com/B5n0QK2.png',
    },
    {
      id: 35,
      title: 'The Millionaire Next Door',
      author: 'Thomas Stanley',
      image: 'https://i.imgur.com/kD31KQA.png',
    },
    {
      id: 36,
      title: 'Think and Grow Rich',
      author: 'Napoleon Hill',
      image: 'https://i.imgur.com/8UqYpFo.png',
    },
    {
      id: 37,
      title: 'Principles',
      author: 'Ray Dalio',
      image: 'https://i.imgur.com/5M4pHcA.png',
    },
    {
      id: 38,
      title: 'Tools of Titans',
      author: 'Tim Ferriss',
      image: 'https://i.imgur.com/kj4BlM2.png',
    },
    {
      id: 39,
      title: 'Tribe of Mentors',
      author: 'Tim Ferriss',
      image: 'https://i.imgur.com/yVD0v8v.png',
    },
    {
      id: 40,
      title: 'The Four Agreements',
      author: 'Don Miguel Ruiz',
      image: 'https://i.imgur.com/zwBv7LH.png',
    },
    {
      id: 41,
      title: 'The Untethered Soul',
      author: 'Michael Singer',
      image: 'https://i.imgur.com/L6UoQnb.png',
    },
    {
      id: 42,
      title: 'The Body Keeps the Score',
      author: 'Bessel van der Kolk',
      image: 'https://i.imgur.com/4RLf6dG.png',
    },
    {
      id: 43,
      title: 'Grit',
      author: 'Angela Duckworth',
      image: 'https://i.imgur.com/1HPrzv7.png',
    },
    {
      id: 44,
      title: 'Quiet',
      author: 'Susan Cain',
      image: 'https://i.imgur.com/RDhoYHO.png',
    },
    {
      id: 45,
      title: 'The Art of Happiness',
      author: 'Dalai Lama',
      image: 'https://i.imgur.com/hHnMqzT.png',
    },
    {
      id: 46,
      title: 'The Art of War',
      author: 'Sun Tzu',
      image: 'https://i.imgur.com/9F1lhMW.png',
    },
    {
      id: 47,
      title: 'Meditations',
      author: 'Marcus Aurelius',
      image: 'https://i.imgur.com/LQ5StmH.png',
    },
    {
      id: 48,
      title: 'Ego is the Enemy',
      author: 'Ryan Holiday',
      image: 'https://i.imgur.com/k8WqSx2.png',
    },
    {
      id: 49,
      title: 'The Obstacle is the Way',
      author: 'Ryan Holiday',
      image: 'https://i.imgur.com/gOQOrW7.png',
    },
    {
      id: 50,
      title: 'Discipline is Destiny',
      author: 'Ryan Holiday',
      image: 'https://i.imgur.com/2EXbWfK.png',
    },
  ]);

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
};

export default DadosContext;
