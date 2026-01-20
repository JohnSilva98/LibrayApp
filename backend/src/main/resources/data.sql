-- Usuarios (Bloco Inicial)
INSERT INTO TB_USUARIO (nome, email, senha, telefone, role) VALUES ('Admin Teste', 'admin@teste.com', '123456', '1990-01-01', 'ADMIN');
INSERT INTO TB_USUARIO (nome, email, senha, telefone, role) VALUES ('Teste', 'teste@teste.com', '123456', '1990-01-01', 'USER');


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