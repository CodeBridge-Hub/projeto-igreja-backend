import { body } from 'express-validator';
import { cpf as cpfValidator } from 'cpf-cnpj-validator'; // Renomeado para evitar conflito com o nome do campo

// --- 1. DADOS PESSOAIS ---
export const CadastroValidacao = [
    // Validação do Nome Completo
    body('nome_completo')
        .trim()
        .notEmpty().withMessage('O nome completo é obrigatório.')
        .isLength({ min: 5, max: 100 }).withMessage('O nome deve ter até no máximo 100 caracteres'),
    
    // Validação de E-mail
    body('email')
        .trim()
        .notEmpty().withMessage('O E-email é obrigatório.')
        .isEmail().withMessage('O E-mail deve possuir um endereço válido.'),

    // Validação de CPF
    body('cpf')
        .custom((value, { req }) => {
            if (!value) {
                throw new Error('O CPF é obrigatório.');
            }
            // Verifica a validade do CPF usando a biblioteca
            if (!cpfValidator.isValid(value)) {
                throw new Error('O CPF informado é inválido.');
            }
            // Remover a formatação (pontos e traços) aqui antes de salvar
            req.body.cpf = cpfValidator.strip(value);
            return true;
        }),

    // Validação do telefone
    body('telefone')
        .trim()
        .notEmpty().withMessage('O telefone é obrigatório')
        .isMobilePhone('pt-BR')
        .withMessage('Telefone inválido'),

    // Validação do sexo
    body('sexo')
        .isIn(['Masculino', 'Feminino'])
        .withMessage('O campo sexo é inválido.'),

    // Validação da Data de Nascimento (Apenas verifica se não está vazia)
    body('data_nascimento')
        .notEmpty()
        .withMessage('A data de nascimento é obrigatória.'),

    // Regra Condicional para 'Outra Condição de Saúde'
    body('condicao_saude_outro')
        .custom((value, { req }) => {
            // Assume que 'condicoes_saude' é um array de strings (como ['Diabetes', 'Outro'])
            const condicoes = req.body.condicoes_saude || [];
            if (condicoes.includes('Outro') && (!value || value.trim() === '')) {
                throw new Error('Se "Outro" for selecionado em Condição de Saúde, o detalhe é obrigatório.');
            }
            return true;
        })
        .optional({ checkFalsy: true })
        .trim()
        .escape(), // Sanitiza se o campo for preenchido

    // Regra Condicional para 'Deficiência'
    body('deficiencia_qual')
        .custom((value, { req }) => {
            // Assume que 'possui_deficiencia' é um booleano ou string 'Sim'/'Não'
            if (req.body.possui_deficiencia === 'Sim' && (!value || value.trim() === '')) {
                throw new Error('Se Deficiência for "Sim", a descrição da deficiência é obrigatória.');
            }
            return true;
        })
        .optional({ checkFalsy: true })
        .trim()
        .escape(), // Sanitiza se o campo for preenchido

    // Campo de Observações (Sanitização)
    body('observacoes')
        .optional({ checkFalsy: true })
        .trim()
        .escape(),
];

// --- 2. DADOS DE ENDEREÇO ---
export const EnderecoValidacao = [
    // Validação do Endereço
    body('endereco_completo')
        .trim()
        .notEmpty().withMessage('O endereço completo é obrigatório.')
        .escape(),
    
    // Validação para bairro
    body('bairro')
        .trim()
        .notEmpty().withMessage('O bairro é obrigatório.')
        .escape(),

    // Validação para numero de residência
    body('numero_residencia')
        .trim()
        .notEmpty().withMessage('O número de residência.')
        .escape(), 

    // Validação para CEP
    body('cep')
        .trim()
        .notEmpty().withMessage('O CEP é obrigatório.')
        .isPostalCode('BR').withMessage('O CEP deve ser válido.')
        .escape(),
];

// --- 3. DADOS DE OCUPAÇÃO ---
export const OcupacaoValidacao = [
    body('profissao')
        .notEmpty().withMessage('A profissão é obrigatória.')
        .trim()
        .escape(),

    body('situacao_empregaticia')
        .notEmpty().withMessage('A situação empregatícia é obrigatória.')
        .isIn(['Empregado', 'Desempregado', 'Autônomo', 'Aposentado', 'Outro']).withMessage('Valor de situação empregatícia inválido.'),

    // Regra Condicional para 'Outro'
    body('situacao_empregaticia_outra_descricao')
        .custom((value, { req }) => {
            if (req.body.situacao_empregaticia === 'Outro' && (!value || value.trim() === '')) {
                throw new Error('A descrição é obrigatória se "Outro" for selecionado.');
            }
            return true;
        })
        .optional({ checkFalsy: true }).trim().escape()
];