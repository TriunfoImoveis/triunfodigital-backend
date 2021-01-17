# MAPEANDO FEATURES DO SISTEMA

## Modulo de Usuários
### Confirmação de e-mail válido
**RF**
- O usuário deve poder receber um e-mail com um link para verificar se o e-mail é válido;

**RNF**
- Utilizar o Mailtrap para testar envios de e-mail em desenvolvimento;
- Utilizar Amazon SES para envios em produção;
- O envio de e-mails deve acontecer em segundo plano (background job);

**RN**
- O link enviado por e-mail para validar deve expirar em 2h;

### Recuperação de Senha
**RF**
- O usuário deve poder recuperar a senha informando o e-mail;
- O usuário deve poder resetar sua senha;

**RN**
- O link enviado para recuperar a senha deve expirar em 2h;
- O usuário precisa confirmar a nova senha ao resetar sua senha (repetir a senha 2 vezes);

### Atualização de Perfil
**RF**

**RNF**

**RN**

## Modulo de Vendas
### Monitorar o vencimento das parcelas em Tempo Real

### Envio de notificação em caso de vencimento de parcelas