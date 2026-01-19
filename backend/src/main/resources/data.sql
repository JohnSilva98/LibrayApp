-- Usuarios (Bloco Inicial)
INSERT INTO TB_USUARIO (nome, email, senha, telefone, role) VALUES ('Admin Teste', 'admin@teste.com', '123456', '1990-01-01', 'ADMIN');
INSERT INTO TB_USUARIO (nome, email, senha, telefone, role) VALUES ('Teste', 'teste@teste.com', '123456', '1990-01-01', 'USER');

-- Livros (Bloco 1)
INSERT INTO TB_LIVRO (ID, AUTOR, DESCRICAO, GENERO, NOME, DISPONIVEL, CAPA_URL) VALUES
(1, 'Clive Cussler', 'Uma emocionante aventura marítima cheia de mistério e ação.', 'Aventura', 'The Silent Sea', true, NULL),
(2, 'George R. R. Martin', 'Continuação épica da saga dos Sete Reinos, cheia de intrigas e reviravoltas.', 'Fantasia', 'Winds of Winter', true, NULL),
(3, 'Dan Brown', 'Thriller tecnológico sobre criptografia e segredos do governo.', 'Thriller', 'Digital Fortress', true, NULL),
(4, 'Dan Brown', 'Uma busca frenética por segredos maçônicos em Washington D.C.', 'Mistério', 'The Lost Symbol', false, NULL),
(5, 'Dan Brown', 'Robert Langdon desvenda enigmas inspirados em Dante Alighieri.', 'Suspense', 'Inferno', false, NULL),
(6, 'Dan Brown', 'Uma jornada por Espanha para responder às maiores perguntas da humanidade.', 'Ficção', 'Origin', false, NULL),
(7, 'Andy Weir', 'Um astronauta luta para sobreviver em Marte após ser deixado para trás.', 'Ficção Científica', 'The Martian', true, NULL),
(8, 'Andy Weir', 'Um homem acorda sozinho em uma nave espacial com a missão de salvar a humanidade.', 'Ficção Científica', 'Project Hail Mary', false, NULL),
(9, 'Andy Weir', 'Uma contrabandista lunar se envolve em uma conspiração interplanetária.', 'Ficção Científica', 'Artemis', false, NULL),
(10, 'J.R.R. Tolkien', 'Bilbo Bolseiro embarca em uma jornada inesperada repleta de perigos.', 'Fantasia', 'The Hobbit', false, NULL),
(11, 'J.R.R. Tolkien', 'A primeira parte da saga épica de O Senhor dos Anéis.', 'Fantasia', 'The Fellowship of the Ring', false, NULL),
(12, 'J.R.R. Tolkien', 'O grupo se divide, e a jornada para destruir o Anel continua.', 'Fantasia', 'The Two Towers', false, NULL),
(13, 'J.R.R. Tolkien', 'A batalha final pela Terra Média chega ao clímax.', 'Fantasia', 'The Return of the King', true, NULL),
(14, 'George Orwell', 'Um retrato sombrio de um futuro dominado por um governo totalitário.', 'Distopia', '1984', false, NULL),
(15, 'George Orwell', 'Uma alegoria política sobre revoluções e corrupção do poder.', 'Sátira', 'Animal Farm', false, NULL);

-- Livros (Bloco 2)
INSERT INTO TB_LIVRO (ID, AUTOR, DESCRICAO, GENERO, NOME, DISPONIVEL, CAPA_URL) VALUES
(16, 'Aldous Huxley', 'Uma sociedade aparentemente perfeita, mas controlada por condicionamento social.', 'Distopia', 'Brave New World', false, NULL),
(17, 'Ray Bradbury', 'Em um futuro onde livros são proibidos, um bombeiro começa a questionar o sistema.', 'Distopia', 'Fahrenheit 451', true, NULL),
(18, 'Frank Herbert', 'Uma saga épica de política, religião e ecologia no planeta desértico Arrakis.', 'Ficção Científica', 'Dune', false, NULL),
(19, 'Frank Herbert', 'Os filhos de Paul Atreides enfrentam novos desafios em Arrakis.', 'Ficção Científica', 'Children of Dune', false, NULL),
(20, 'J.D. Salinger', 'A jornada introspectiva de Holden Caulfield em busca de significado.', 'Drama', 'The Catcher in the Rye', false, NULL),
(21, 'Harper Lee', 'Uma reflexão sobre racismo e justiça no sul dos Estados Unidos.', 'Drama', 'To Kill a Mockingbird', false, NULL),
(22, 'Jane Austen', 'Um clássico romance sobre orgulho, amor e convenções sociais.', 'Romance', 'Pride and Prejudice', false, NULL),
(23, 'Jane Austen', 'A história de uma jovem que adora interferir na vida amorosa dos outros.', 'Romance', 'Emma', false, NULL),
(24, 'Bram Stoker', 'O clássico conto do vampiro que assombra a Transilvânia.', 'Terror', 'Dracula', false, NULL),
(25, 'Mary Shelley', 'Um cientista cria vida e sofre as consequências de seu experimento.', 'Terror', 'Frankenstein', false, NULL),
(26, 'Stephen King', 'Um hotel isolado, uma família em crise e uma presença maligna.', 'Terror', 'The Shining', true, NULL),
(27, 'Stephen King', 'Um grupo enfrenta o medo em sua forma mais terrível: Pennywise.', 'Terror', 'It', false, NULL),
(28, 'Stephen King', 'Um escritor é mantido em cativeiro por sua fã número um.', 'Suspense', 'Misery', false, NULL),
(29, 'Stephen King', 'Uma garota com poderes telecinéticos busca vingança.', 'Terror', 'Carrie', false, NULL),
(30, 'Stephen King', 'Um vírus mortal extingue a maior parte da humanidade.', 'Ficção', 'The Stand', false, NULL);

-- Livros (Bloco 3)
INSERT INTO TB_LIVRO (ID, AUTOR, DESCRICAO, GENERO, NOME, DISPONIVEL, CAPA_URL) VALUES
(31, 'Stephen King', 'Um prisioneiro com dons sobrenaturais muda a vida de um carcereiro.', 'Drama', 'The Green Mile', false, NULL),
(32, 'Paulo Coelho', 'Um jovem pastor embarca em uma jornada espiritual em busca de seu destino.', 'Filosófico', 'The Alchemist', false, NULL),
(33, 'Paulo Coelho', 'Uma mulher encontra novo sentido para a vida após tentar acabar com ela.', 'Drama', 'Veronika Decides to Die', false, NULL),
(34, 'Paulo Coelho', 'Uma história de autodescoberta e amor verdadeiro.', 'Romance', 'Eleven Minutes', false, NULL),
(35, 'Paulo Coelho', 'Uma jornada espiritual pelo Caminho de Santiago.', 'Filosófico', 'The Pilgrimage', true, NULL),
(36, 'Khaled Hosseini', 'Uma amizade marcada por culpa e redenção no Afeganistão.', 'Drama', 'The Kite Runner', false, NULL),
(37, 'Khaled Hosseini', 'Duas mulheres enfrentam décadas de opressão e guerra.', 'Drama', 'A Thousand Splendid Suns', false, NULL),
(38, 'Khaled Hosseini', 'Uma história sobre famílias separadas e destinos entrelaçados.', 'Drama', 'And the Mountains Echoed', false, NULL),
(39, 'Gillian Flynn', 'O desaparecimento de uma mulher revela segredos sombrios de um casamento.', 'Suspense', 'Gone Girl', false, NULL),
(40, 'Gillian Flynn', 'Uma repórter retorna à sua cidade natal para cobrir um assassinato e enfrentar seu passado.', 'Suspense', 'Sharp Objects', false, NULL),
(41, 'Gillian Flynn', 'Uma mulher investiga o massacre de sua família décadas depois.', 'Suspense', 'Dark Places', false, NULL),
(42, 'Paula Hawkins', 'Uma mulher se envolve em um mistério após testemunhar algo chocante pela janela do trem.', 'Thriller', 'The Girl on the Train', true, NULL),
(43, 'Paula Hawkins', 'Mortes misteriosas em um rio revelam segredos profundos de uma cidade pequena.', 'Mistério', 'Into the Water', false, NULL),
(44, 'Dan Brown', 'Uma conspiração milenar envolvendo a Igreja e sociedades secretas.', 'Suspense', 'The Da Vinci Code', false, NULL),
(45, 'Dan Brown', 'Langdon enfrenta uma sociedade secreta que ameaça o Vaticano.', 'Aventura', 'Angels & Demons', false, NULL),
(46, 'Dan Brown', 'Um thriller político envolvendo a NASA e uma descoberta misteriosa.', 'Thriller', 'Deception Point', false, NULL),
(47, 'Matt Haig', 'Uma mulher entre a vida e a morte descobre uma biblioteca de possibilidades infinitas.', 'Ficção', 'The Midnight Library', false, NULL),
(48, 'Markus Zusak', 'Uma menina encontra consolo nos livros durante a Segunda Guerra Mundial.', 'Drama', 'The Book Thief', true, NULL),
(49, 'Anthony Doerr', 'O encontro de dois jovens durante a ocupação nazista da França.', 'Drama', 'All the Light We Cannot See', false, NULL),
(50, 'David Mitchell', 'Histórias interligadas que atravessam séculos e reencarnações.', 'Ficção', 'Cloud Atlas', false, NULL);

-- Usuarios adicionais (Certifique-se que as colunas batem com sua entidade Usuario)
INSERT INTO TB_USUARIO (ID, EMAIL, NOME, ROLE, SENHA, TELEFONE) VALUES
(3, 'admin@exemplo.com', 'Administrador Geral', 'ADMIN', 'senha123', '11999990001'),
(4, 'joao.silva@exemplo.com', 'João Silva', 'USER', 'senha123', '11999990002'),
(5, 'maria.santos@exemplo.com', 'Maria Santos', 'USER', 'senha123', '11999990003'),
(6, 'carlos.oliveira@exemplo.com', 'Carlos Oliveira', 'USER', 'senha123', '11999990004'),
(7, 'ana.pereira@exemplo.com', 'Ana Pereira', 'USER', 'senha123', '11999990005'),
(8, 'lucas.costa@exemplo.com', 'Lucas Costa', 'USER', 'senha123', '11999990006'),
(9, 'fernanda.lima@exemplo.com', 'Fernanda Lima', 'USER', 'senha123', '11999990007'),
(10, 'rafael.almeida@exemplo.com', 'Rafael Almeida', 'USER', 'senha123', '11999990008'),
(11, 'beatriz.rocha@exemplo.com', 'Beatriz Rocha', 'USER', 'senha123', '11999990009'),
(12, 'paulo.mendes@exemplo.com', 'Paulo Mendes', 'USER', 'senha123', '11999990010');