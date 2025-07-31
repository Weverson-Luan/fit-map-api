# Estrutura das tabelas do banco de dados.

## Aqui estão as entidades completas para o aplicativo de agendamento de aulas com instrutores personalizados e pagamento via Pix:

## 📌 Tabela Usuário

- id (chave primária)
- nome
- email
- senha (criptografada)
- telefone
- endereço
- id_papel (chave estrangeira)
- created_at
- updated_at

## 🛡 Tabela Papel

- id (chave primária)
- nome (ex: Aluno, Instrutor, Administrador, Dono Academia)
- descrição
- ativo
- created_at
- updated_at

## 🏋️‍♂️ Academias

- id (chave primária)
- dono_academia_id (chave estrangeira referenciando a tabela Usuário)
- nome (ex: Mast Fist, Ms Musculacao, BoryBuild)
- telefone ((31) 98234-3455)
- descricao
- ativo
- latitude
- longitude
- created_at
- updated_at

## 📆 Tabela Aula

- id (chave primária)
- id_instrutor (chave estrangeira referenciando a tabela Usuário)
- id_aluno (chave estrangeira referenciando a tabela Usuário)
- data e hora
- duração
- tipo de aula (ex: treino funcional, musculação, etc.)
- valor da aula
- status (agendada, realizada, cancelada, etc.)
- created_at
- updated_at

## 🔖 Tabela Tags de Especialidade (Tipos de Treino por Instrutor

- id (chave primária)
- nome ( Ex: "Funcional", "Pilates")
- descricao
- ativo
- created_at
- updated_at

# 📦 Tabela mensagens

- id (chave primária)
- de_usuario_id
- para_usuario_id
- text
- lida - boolean
- enviada_em - Date
- created_at
- updated_at

## 💳 Tabela Pagamento

- id (chave primária)
- id_aula (chave estrangeira)
- valor
- método de pagamento (Pix)
- status (pendente, realizado, etc.)
- QR Code (gerado para pagamento)
- comprovante_url
- confirmado_por_id (usuário que recebeu pagamento)
- confirmado_em (Data/hora da confiramação)
- created_at
- updated_at

## Tabela Avaliação

- id (chave primária)
- id_aula (chave estrangeira)
- id_aluno (chave estrangeira referenciando a tabela Usuário)
- nota
- comentário
- created_at
- updated_at

# Relações entre entidades

- Um usuário pode ter muitos papéis (um-para-muitos), mas nesse caso, vamos considerar que um usuário tem apenas um papel.
- Um usuário pode ser instrutor em muitas aulas (um-para-muitos).
- Um usuário pode ser aluno em muitas aulas (um-para-muitos).
- Uma aula está relacionada a um instrutor e um aluno (muitos-para-um).
- Um pagamento está relacionado a uma aula (um-para-um).

# Pagamentos

1. Aluno agenda aula.

2. App mostra valor e chave Pix fixa.

3. Aluno envia comprovante (upload).

4. Instrutor recebe notificação e visualiza.

5. Instrutor clica em "Confirmar pagamento".

6. Pagamento atualizado como status = confirmado.
