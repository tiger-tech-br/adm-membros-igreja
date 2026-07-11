CREATE TABLE administradores (

    id SERIAL PRIMARY KEY,

    nome VARCHAR(100) NOT NULL,

    email VARCHAR(150) UNIQUE NOT NULL,

    senha VARCHAR(255) NOT NULL,

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);

CREATE TABLE membros (

    id SERIAL PRIMARY KEY,

    nome VARCHAR(150) NOT NULL,

    data_nascimento DATE,

    telefone VARCHAR(20),

    email VARCHAR(150),

    endereco TEXT,

    cargo VARCHAR(100),

    ministerio VARCHAR(100),

    sexo VARCHAR(20),

    estado_civil VARCHAR(30),

    status VARCHAR(20) DEFAULT 'Ativo',

    observacoes TEXT,

    matricula VARCHAR(30) UNIQUE,

    validade DATE,

    qr_code TEXT,

    criado_em TIMESTAMP DEFAULT CURRENT_TIMESTAMP

);