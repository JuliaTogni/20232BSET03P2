# 20232BSET03P2
Inteli - Engenharia de Software | Avaliação 2023-2B P2


### Vulnerabilidades identificadas e as medidas adotadas para corrigir


#### Injeção de SQL
O código original não utiliza placeholders para inserir os valores nas consultas SQL, permitindo a possibilidade de ataques de injeção de SQL. Um invasor mal-intencionado poderia explorar essa vulnerabilidade para executar comandos SQL não autorizados no banco de dados.

- Medida adotada para corrigir:
Foi utilizada a função ```db.run``` com placeholders e parâmetros para executar as consultas SQL. Evitando a injeção de SQL, pois os valores são tratados como dados e não como parte do comando SQL.

#### Validação ID inexistente: 
O código original não verificava se o ID fornecido existia na tabela correspondente (cats ou dogs). Isso poderia permitir que um ID inválido fosse usado na consulta de atualização, resultando em uma atualização incorreta ou em um erro no banco de dados.
- Medida adotada para corrigir: Foi adicionada uma consulta SELECT antes da atualização dos votos para verificar se o ID existe na tabela correspondente (cats ou dogs). Caso o ID não seja encontrado, é retornado um status 404 indicando que o ID não existe.

#### Validação tipo de animal: 
O código original também não validava corretamente o tipo de animal fornecido (cats ou dogs). Isso poderia permitir que um tipo de animal inválido fosse usado na consulta de atualização, resultando em uma atualização incorreta ou em um erro no banco de dados.
- Medida adotada para corrigir: Foi adicionada uma verificação para garantir que o tipo de animal fornecido seja válido. Se o tipo de animal não for "cats" nem "dogs", é retornado um status 400 indicando que o tipo de animal é inválido.


#### Validação de dados: 
O código original não realiza uma validação adequada dos dados de entrada, permitindo que valores inválidos ou vazios sejam inseridos no banco de dados.

- Medida adotada para corrigir:
Foi adicionada a validação dos dados de entrada utilizando o pacote ```express-validator```. Foram adicionadas regras de validação para garantir que o campo "name" não esteja vazio antes de inserir os dados no banco de dados.

#### Melhoria e padronização das respostas de erro: 
O código original já retornava respostas de erro (status 500), mas não fornecia informações detalhadas sobre o erro que ocorreu. E também, o código original retornava respostas de sucesso com status 200 para uma rota e status 201 para outra rota.
- Medida adotada para corrigir a vulnerabilidade: Foram adicionadas respostas de erro descritivas, fornecendo mensagens de erro e códigos de status HTTP padronizados.

