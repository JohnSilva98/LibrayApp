-- Usuarios (Bloco Inicial)
INSERT INTO TB_USUARIO (nome, email, senha, telefone, role) VALUES ('Admin Teste', 'admin@teste.com', '123456', '1990-01-01', 'ADMIN');
INSERT INTO TB_USUARIO (nome, email, senha, telefone, role) VALUES ('Teste', 'teste@teste.com', '123456', '1990-01-01', 'USER');

-- Livros (Bloco 1)
INSERT INTO TB_LIVRO (AUTOR, DESCRICAO, GENERO, NOME, DISPONIVEL, CAPA_URL) VALUES
('Clive Cussler', 'Uma emocionante aventura marítima cheia de mistério e ação.', 'Aventura', 'The Silent Sea', true, NULL),
('George R. R. Martin', 'Continuação épica da saga dos Sete Reinos, cheia de intrigas e reviravoltas.', 'Fantasia', 'Winds of Winter', true, NULL),
('Dan Brown', 'Thriller tecnológico sobre criptografia e segredos do governo.', 'Thriller', 'Digital Fortress', true, NULL),
('Dan Brown', 'Uma busca frenética por segredos maçônicos em Washington D.C.', 'Mistério', 'The Lost Symbol', false, NULL),
('Dan Brown', 'Robert Langdon desvenda enigmas inspirados em Dante Alighieri.', 'Suspense', 'Inferno', false, NULL),
('Dan Brown', 'Uma jornada por Espanha para responder às maiores perguntas da humanidade.', 'Ficção', 'Origin', false, NULL),
('Andy Weir', 'Um astronauta luta para sobreviver em Marte após ser deixado para trás.', 'Ficção Científica', 'The Martian', true, NULL),
('Andy Weir', 'Um homem acorda sozinho em uma nave espacial com a missão de salvar a humanidade.', 'Ficção Científica', 'Project Hail Mary', false, NULL),
('Andy Weir', 'Uma contrabandista lunar se envolve em uma conspiração interplanetária.', 'Ficção Científica', 'Artemis', false, NULL),
('J.R.R. Tolkien', 'Bilbo Bolseiro embarca em uma jornada inesperada repleta de perigos.', 'Fantasia', 'The Hobbit', false, NULL),
('J.R.R. Tolkien', 'A primeira parte da saga épica de O Senhor dos Anéis.', 'Fantasia', 'The Fellowship of the Ring', false, NULL),
('J.R.R. Tolkien', 'O grupo se divide, e a jornada para destruir o Anel continua.', 'Fantasia', 'The Two Towers', false, NULL),
('J.R.R. Tolkien', 'A batalha final pela Terra Média chega ao clímax.', 'Fantasia', 'The Return of the King', true, NULL),
('George Orwell', 'Um retrato sombrio de um futuro dominado por um governo totalitário.', 'Distopia', '1984', false, NULL),
('George Orwell', 'Uma alegoria política sobre revoluções e corrupção do poder.', 'Sátira', 'Animal Farm', false, NULL);

-- Livros (Bloco 2)
INSERT INTO TB_LIVRO (AUTOR, DESCRICAO, GENERO, NOME, DISPONIVEL, CAPA_URL) VALUES
('Aldous Huxley', 'Uma sociedade aparentemente perfeita, mas controlada por condicionamento social.', 'Distopia', 'Brave New World', false, NULL),
('Ray Bradbury', 'Em um futuro onde livros são proibidos, um bombeiro começa a questionar o sistema.', 'Distopia', 'Fahrenheit 451', true, NULL),
('Frank Herbert', 'Uma saga épica de política, religião e ecologia no planeta desértico Arrakis.', 'Ficção Científica', 'Dune', false, NULL),
('Frank Herbert', 'Os filhos de Paul Atreides enfrentam novos desafios em Arrakis.', 'Ficção Científica', 'Children of Dune', false, NULL),
('J.D. Salinger', 'A jornada introspectiva de Holden Caulfield em busca de significado.', 'Drama', 'The Catcher in the Rye', false, NULL),
('Harper Lee', 'Uma reflexão sobre racismo e justiça no sul dos Estados Unidos.', 'Drama', 'To Kill a Mockingbird', false, NULL),
('Jane Austen', 'Um clássico romance sobre orgulho, amor e convenções sociais.', 'Romance', 'Pride and Prejudice', false, NULL),
('Jane Austen', 'A história de uma jovem que adora interferir na vida amorosa dos outros.', 'Romance', 'Emma', false, NULL),
('Bram Stoker', 'O clássico conto do vampiro que assombra a Transilvânia.', 'Terror', 'Dracula', false, NULL),
('Mary Shelley', 'Um cientista cria vida e sofre as consequências de seu experimento.', 'Terror', 'Frankenstein', false, NULL),
('Stephen King', 'Um hotel isolado, uma família em crise e uma presença maligna.', 'Terror', 'The Shining', true, NULL),
('Stephen King', 'Um grupo enfrenta o medo em sua forma mais terrível: Pennywise.', 'Terror', 'It', false, NULL),
('Stephen King', 'Um escritor é mantido em cativeiro por sua fã número um.', 'Suspense', 'Misery', false, NULL),
('Stephen King', 'Uma garota com poderes telecinéticos busca vingança.', 'Terror', 'Carrie', false, NULL),
('Stephen King', 'Um vírus mortal extingue a maior parte da humanidade.', 'Ficção', 'The Stand', false, NULL);

-- Livros (Bloco 3)
INSERT INTO TB_LIVRO (AUTOR, DESCRICAO, GENERO, NOME, DISPONIVEL, CAPA_URL) VALUES
('Stephen King', 'Um prisioneiro com dons sobrenaturais muda a vida de um carcereiro.', 'Drama', 'The Green Mile', false, NULL),
('Paulo Coelho', 'Um jovem pastor embarca em uma jornada espiritual em busca de seu destino.', 'Filosófico', 'The Alchemist', false, NULL),
('Paulo Coelho', 'Uma mulher encontra novo sentido para a vida após tentar acabar com ela.', 'Drama', 'Veronika Decides to Die', false, NULL),
('Paulo Coelho', 'Uma história de autodescoberta e amor verdadeiro.', 'Romance', 'Eleven Minutes', false, NULL),
('Paulo Coelho', 'Uma jornada espiritual pelo Caminho de Santiago.', 'Filosófico', 'The Pilgrimage', true, NULL),
('Khaled Hosseini', 'Uma amizade marcada por culpa e redenção no Afeganistão.', 'Drama', 'The Kite Runner', false, NULL),
('Khaled Hosseini', 'Duas mulheres enfrentam décadas de opressão e guerra.', 'Drama', 'A Thousand Splendid Suns', false, NULL),
('Khaled Hosseini', 'Uma história sobre famílias separadas e destinos entrelaçados.', 'Drama', 'And the Mountains Echoed', false, NULL),
('Gillian Flynn', 'O desaparecimento de uma mulher revela segredos sombrios de um casamento.', 'Suspense', 'Gone Girl', false, NULL),
('Gillian Flynn', 'Uma repórter retorna à sua cidade natal para cobrir um assassinato e enfrentar seu passado.', 'Suspense', 'Sharp Objects', false, NULL),
('Gillian Flynn', 'Uma mulher investiga o massacre de sua família décadas depois.', 'Suspense', 'Dark Places', false, NULL),
('Paula Hawkins', 'Uma mulher se envolve em um mistério após testemunhar algo chocante pela janela do trem.', 'Thriller', 'The Girl on the Train', true, NULL),
('Paula Hawkins', 'Mortes misteriosas em um rio revelam segredos profundos de uma cidade pequena.', 'Mistério', 'Into the Water', false, NULL),
('Dan Brown', 'Uma conspiração milenar envolvendo a Igreja e sociedades secretas.', 'Suspense', 'The Da Vinci Code', false, NULL),
('Dan Brown', 'Langdon enfrenta uma sociedade secreta que ameaça o Vaticano.', 'Aventura', 'Angels & Demons', false, NULL),
('Dan Brown', 'Um thriller político envolvendo a NASA e uma descoberta misteriosa.', 'Thriller', 'Deception Point', false, NULL),
('Matt Haig', 'Uma mulher entre a vida e a morte descobre uma biblioteca de possibilidades infinitas.', 'Ficção', 'The Midnight Library', false, NULL),
('Markus Zusak', 'Uma menina encontra consolo nos livros durante a Segunda Guerra Mundial.', 'Drama', 'The Book Thief', true, NULL),
('Anthony Doerr', 'O encontro de dois jovens durante a ocupação nazista da França.', 'Drama', 'All the Light We Cannot See', false, NULL),
('David Mitchell', 'Histórias interligadas que atravessam séculos e reencarnações.', 'Ficção', 'Cloud Atlas', false, NULL);

-- Usuarios adicionais
INSERT INTO TB_USUARIO (EMAIL, NOME, ROLE, SENHA, TELEFONE) VALUES
('admin@exemplo.com', 'Administrador Geral', 'ADMIN', 'senha123', '11999990001'),
('joao.silva@exemplo.com', 'João Silva', 'USER', 'senha123', '11999990002'),
('maria.santos@exemplo.com', 'Maria Santos', 'USER', 'senha123', '11999990003'),
('carlos.oliveira@exemplo.com', 'Carlos Oliveira', 'USER', 'senha123', '11999990004'),
('ana.pereira@exemplo.com', 'Ana Pereira', 'USER', 'senha123', '11999990005'),
('lucas.costa@exemplo.com', 'Lucas Costa', 'USER', 'senha123', '11999990006'),
('fernanda.lima@exemplo.com', 'Fernanda Lima', 'USER', 'senha123', '11999990007'),
('rafael.almeida@exemplo.com', 'Rafael Almeida', 'USER', 'senha123', '11999990008'),
('beatriz.rocha@exemplo.com', 'Beatriz Rocha', 'USER', 'senha123', '11999990009'),
('paulo.mendes@exemplo.com', 'Paulo Mendes', 'USER', 'senha123', '11999990010');