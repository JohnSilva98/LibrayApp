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
      title: 'The Martian',
      author: 'Andy Weir',
      image: 'https://i.imgur.com/2yaf2wb.png',
      isNew: true,
      description:
        'Um astronauta preso em Marte luta para sobreviver usando ciência e engenhosidade.',
      genre: 'Ficção Científica',
    },
    {
      id: 5,
      title: 'Educated',
      author: 'Tara Westover',
      image: 'https://i.imgur.com/5M0g9Qy.png',
      isNew: true,
      description:
        'Memórias de uma mulher que busca educação apesar de uma infância difícil.',
      genre: 'Biografia',
    },
    {
      id: 6,
      title: 'Atomic Habits',
      author: 'James Clear',
      image: 'https://i.imgur.com/7yUVE1Z.png',
      isNew: true,
      description:
        'Guia prático sobre como formar hábitos positivos e eliminar hábitos ruins.',
      genre: 'Autoajuda',
    },
    {
      id: 7,
      title: 'The Midnight Library',
      author: 'Matt Haig',
      image: 'https://i.imgur.com/Xs2G9UZ.png',
      isNew: true,
      description:
        'Uma biblioteca misteriosa que explora escolhas de vida e segundas chances.',
      genre: 'Ficção',
    },
    {
      id: 8,
      title: 'The Alchemist',
      author: 'Paulo Coelho',
      image: 'https://i.imgur.com/LrM9S1Q.png',
      isNew: true,
      description:
        'Uma jornada espiritual sobre seguir os sonhos e encontrar o destino.',
      genre: 'Ficção',
    },
    {
      id: 9,
      title: 'Sapiens',
      author: 'Yuval Noah Harari',
      image: 'https://i.imgur.com/m1xwR5E.png',
      isNew: true,
      description:
        'Uma análise da história da humanidade, suas culturas e evolução.',
      genre: 'História',
    },
    {
      id: 10,
      title: 'Becoming',
      author: 'Michelle Obama',
      image: 'https://i.imgur.com/RdM2yJw.png',
      isNew: true,
      description: 'Memórias inspiradoras da ex-primeira-dama dos EUA.',
      genre: 'Biografia',
    },
    {
      id: 11,
      title: 'Dune',
      author: 'Frank Herbert',
      image: 'https://i.imgur.com/z2W1D8N.png',
      isNew: true,
      description:
        'Ficção científica épica sobre política, religião e ecologia em um planeta deserto.',
      genre: 'Ficção Científica',
    },
    {
      id: 12,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      image: 'https://i.imgur.com/W2M2n5H.png',
      isNew: true,
      description:
        'Uma aventura fantástica de Bilbo Bolseiro pelo mundo da Terra-média.',
      genre: 'Fantasia',
    },
    {
      id: 13,
      title: '1984',
      author: 'George Orwell',
      image: 'https://i.imgur.com/NLz3A7h.png',
      isNew: true,
      description:
        'Distopia sobre vigilância governamental, propaganda e controle social.',
      genre: 'Distopia',
    },
    {
      id: 14,
      title: 'Brave New World',
      author: 'Aldous Huxley',
      image: 'https://i.imgur.com/2gCj1eN.png',
      isNew: true,
      description:
        'Um futuro distópico onde a sociedade é controlada pela tecnologia e prazer.',
      genre: 'Distopia',
    },
    {
      id: 15,
      title: 'The Road',
      author: 'Cormac McCarthy',
      image: 'https://i.imgur.com/jP3BtKZ.png',
      isNew: true,
      description:
        'Uma jornada pós-apocalíptica de pai e filho em busca de sobrevivência.',
      genre: 'Ficção',
    },
    {
      id: 16,
      title: 'Shantaram',
      author: 'Gregory David Roberts',
      image: 'https://i.imgur.com/vTzYQdV.png',
      isNew: true,
      description: 'História de fuga, crime e redenção na Índia contemporânea.',
      genre: 'Romance/Autobiografia',
    },
    {
      id: 17,
      title: 'It',
      author: 'Stephen King',
      image: 'https://i.imgur.com/0XKxvZP.png',
      isNew: true,
      description:
        'Horror sobre um mal antigo que aterroriza a cidade de Derry.',
      genre: 'Horror',
    },
    {
      id: 18,
      title: 'Pet Sematary',
      author: 'Stephen King',
      image: 'https://i.imgur.com/KbYbOVS.png',
      isNew: true,
      description: 'Horror psicológico sobre perda, morte e o sobrenatural.',
      genre: 'Horror',
    },
    {
      id: 19,
      title: 'Carrie',
      author: 'Stephen King',
      image: 'https://i.imgur.com/A2u0WZt.png',
      isNew: true,
      description:
        'Uma adolescente com poderes telecinéticos enfrenta bullying e vingança.',
      genre: 'Horror',
    },
    {
      id: 20,
      title: 'Project Hail Mary',
      author: 'Andy Weir',
      image: 'https://i.imgur.com/ij8DyQF.png',
      isNew: true,
      description:
        'Um astronauta luta para salvar a humanidade de uma ameaça cósmica.',
      genre: 'Ficção Científica',
    },
    {
      id: 21,
      title: 'The 7 Habits of Highly Effective People',
      author: 'Stephen Covey',
      image: 'https://i.imgur.com/xl8XZlf.png',
      isNew: true,
      description: 'Guia clássico de desenvolvimento pessoal e profissional.',
      genre: 'Autoajuda',
    },
    {
      id: 22,
      title: 'Thinking, Fast and Slow',
      author: 'Daniel Kahneman',
      image: 'https://i.imgur.com/40Vw5tR.png',
      isNew: true,
      description:
        'Explora como nossa mente funciona entre pensamento rápido e lento.',
      genre: 'Psicologia',
    },
    {
      id: 23,
      title: 'Deep Work',
      author: 'Cal Newport',
      image: 'https://i.imgur.com/vcIz5uT.png',
      isNew: true,
      description:
        'Como alcançar foco profundo para produtividade e excelência.',
      genre: 'Produtividade',
    },
    {
      id: 24,
      title: 'Hooked',
      author: 'Nir Eyal',
      image: 'https://i.imgur.com/4XdfkEZ.png',
      isNew: true,
      description:
        'Manual sobre como criar produtos e serviços que geram hábitos.',
      genre: 'Marketing',
    },
    {
      id: 25,
      title: 'The Lean Startup',
      author: 'Eric Ries',
      image: 'https://i.imgur.com/pO2jqez.png',
      isNew: true,
      description:
        'Como criar startups enxutas e inovadoras de maneira eficiente.',
      genre: 'Negócios',
    },
    {
      id: 26,
      title: 'Zero to One',
      author: 'Peter Thiel',
      image: 'https://i.imgur.com/S3xY4AQ.png',
      isNew: true,
      description: 'Ideias sobre inovação e criação de novos mercados.',
      genre: 'Negócios',
    },
    {
      id: 27,
      title: 'The Power of Now',
      author: 'Eckhart Tolle',
      image: 'https://i.imgur.com/rlgY8N7.png',
      isNew: true,
      description:
        'Explora a importância do momento presente para a vida e espiritualidade.',
      genre: 'Espiritualidade',
    },
    {
      id: 28,
      title: 'Man’s Search for Meaning',
      author: 'Viktor Frankl',
      image: 'https://i.imgur.com/qgC6H7G.png',
      isNew: true,
      description:
        'Reflexões sobre sobrevivência e propósito baseadas em experiências no Holocausto.',
      genre: 'Filosofia',
    },
    {
      id: 29,
      title: '12 Rules for Life',
      author: 'Jordan Peterson',
      image: 'https://i.imgur.com/0U2Xblx.png',
      isNew: true,
      description:
        'Regras práticas para uma vida significativa e disciplinada.',
      genre: 'Autoajuda',
    },
    {
      id: 30,
      title: 'Can’t Hurt Me',
      author: 'David Goggins',
      image: 'https://i.imgur.com/EqK0wB1.png',
      isNew: true,
      description:
        'Memórias e lições de superação de um ex-militar e ultramaratonista.',
      genre: 'Autoajuda',
    },
    {
      id: 31,
      title: 'Born a Crime',
      author: 'Trevor Noah',
      image: 'https://i.imgur.com/Y5j3k2m.png',
      isNew: true,
      description:
        'Memórias do comediante sobre crescer na África do Sul durante o apartheid.',
      genre: 'Biografia',
    },
    {
      id: 32,
      title: 'The Subtle Art of Not Giving a F*ck',
      author: 'Mark Manson',
      image: 'https://i.imgur.com/VYbHu4F.png',
      isNew: true,
      description:
        'Uma abordagem direta para lidar com problemas e prioridades na vida.',
      genre: 'Autoajuda',
    },
    {
      id: 33,
      title: 'Everything is F*cked',
      author: 'Mark Manson',
      image: 'https://i.imgur.com/dq5pKkB.png',
      isNew: true,
      description: 'Explora esperança e desesperança no mundo moderno.',
      genre: 'Autoajuda',
    },
    {
      id: 34,
      title: 'Rich Dad Poor Dad',
      author: 'Robert Kiyosaki',
      image: 'https://i.imgur.com/B5n0QK2.png',
      isNew: true,
      description:
        'Diferenças entre mentalidades financeira de ricos e pobres.',
      genre: 'Finanças',
    },
    {
      id: 35,
      title: 'The Millionaire Next Door',
      author: 'Thomas Stanley',
      image: 'https://i.imgur.com/kD31KQA.png',
      isNew: true,
      description:
        'Estudo sobre hábitos e comportamentos de milionários comuns.',
      genre: 'Finanças',
    },
    {
      id: 36,
      title: 'Think and Grow Rich',
      author: 'Napoleon Hill',
      image: 'https://i.imgur.com/8UqYpFo.png',
      isNew: true,
      description: 'Estratégias clássicas de sucesso financeiro e pessoal.',
      genre: 'Autoajuda',
    },
    {
      id: 37,
      title: 'Principles',
      author: 'Ray Dalio',
      image: 'https://i.imgur.com/5M4pHcA.png',
      isNew: true,
      description:
        'Princípios para negócios e vida pessoal de um grande investidor.',
      genre: 'Negócios',
    },
    {
      id: 38,
      title: 'Tools of Titans',
      author: 'Tim Ferriss',
      image: 'https://i.imgur.com/kj4BlM2.png',
      isNew: true,
      description:
        'Coleção de hábitos e estratégias de pessoas de alta performance.',
      genre: 'Produtividade',
    },
    {
      id: 39,
      title: 'Tribe of Mentors',
      author: 'Tim Ferriss',
      image: 'https://i.imgur.com/yVD0v8v.png',
      isNew: true,
      description:
        'Conselhos de líderes, empreendedores e especialistas para sucesso e bem-estar.',
      genre: 'Produtividade',
    },
    {
      id: 40,
      title: 'The Four Agreements',
      author: 'Don Miguel Ruiz',
      image: 'https://i.imgur.com/zwBv7LH.png',
      isNew: true,
      description: 'Quatro princípios para liberdade pessoal e felicidade.',
      genre: 'Espiritualidade',
    },
    {
      id: 41,
      title: 'The Untethered Soul',
      author: 'Michael Singer',
      image: 'https://i.imgur.com/L6UoQnb.png',
      isNew: true,
      description: 'Explora a consciência e como viver livremente do ego.',
      genre: 'Espiritualidade',
    },
    {
      id: 42,
      title: 'The Body Keeps the Score',
      author: 'Bessel van der Kolk',
      image: 'https://i.imgur.com/4RLf6dG.png',
      isNew: true,
      description: 'Como traumas afetam corpo e mente e caminhos de cura.',
      genre: 'Psicologia',
    },
    {
      id: 43,
      title: 'Grit',
      author: 'Angela Duckworth',
      image: 'https://i.imgur.com/1HPrzv7.png',
      isNew: true,
      description:
        'A importância da paixão e perseverança para alcançar objetivos.',
      genre: 'Psicologia',
    },
    {
      id: 44,
      title: 'Quiet',
      author: 'Susan Cain',
      image: 'https://i.imgur.com/RDhoYHO.png',
      isNew: true,
      description:
        'O poder dos introvertidos em um mundo que não para de falar.',
      genre: 'Psicologia',
    },
    {
      id: 45,
      title: 'The Art of Happiness',
      author: 'Dalai Lama',
      image: 'https://i.imgur.com/hHnMqzT.png',
      isNew: true,
      description:
        'Reflexões sobre felicidade e bem-estar do líder espiritual.',
      genre: 'Espiritualidade',
    },
    {
      id: 46,
      title: 'The Art of War',
      author: 'Sun Tzu',
      image: 'https://i.imgur.com/9F1lhMW.png',
      isNew: true,
      description: 'Clássico sobre estratégia, liderança e tomada de decisão.',
      genre: 'Estratégia',
    },
    {
      id: 47,
      title: 'Meditations',
      author: 'Marcus Aurelius',
      image: 'https://i.imgur.com/LQ5StmH.png',
      isNew: true,
      description:
        'Reflexões filosóficas de um imperador estoico sobre vida e virtude.',
      genre: 'Filosofia',
    },
    {
      id: 48,
      title: 'Ego is the Enemy',
      author: 'Ryan Holiday',
      image: 'https://i.imgur.com/k8WqSx2.png',
      isNew: true,
      description: 'Como superar o ego para alcançar sucesso e maturidade.',
      genre: 'Autoajuda',
    },
    {
      id: 49,
      title: 'The Obstacle is the Way',
      author: 'Ryan Holiday',
      image: 'https://i.imgur.com/gOQOrW7.png',
      isNew: true,
      description: 'Como transformar desafios em oportunidades.',
      genre: 'Autoajuda',
    },
    {
      id: 50,
      title: 'Discipline is Destiny',
      author: 'Ryan Holiday',
      image: 'https://i.imgur.com/2EXbWfK.png',
      isNew: true,
      description: 'Como disciplina e hábitos moldam o destino de uma pessoa.',
      genre: 'Autoajuda',
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
