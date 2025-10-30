CREATE SCHEMA IF NOT EXISTS administrativo;
CREATE SCHEMA IF NOT EXISTS voluntariado;
CREATE SCHEMA IF NOT EXISTS pacientes;
CREATE SCHEMA IF NOT EXISTS estoque;
CREATE SCHEMA IF NOT EXISTS servicos;

GRANT ALL ON SCHEMA administrativo TO postgres;
GRANT ALL ON SCHEMA voluntariado TO postgres;
GRANT ALL ON SCHEMA pacientes TO postgres;
GRANT ALL ON SCHEMA estoque TO postgres;
GRANT ALL ON SCHEMA servicos TO postgres;
