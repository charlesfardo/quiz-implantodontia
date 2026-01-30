# Instruções Finais - Quizzes

O sistema já está instalado no seu computador. Agora só falta conectar a planilha.

## 1. O Sistema está Rodando?
Eu enviei um comando para iniciar o site. Se você aprovou, ele deve estar acessível neste link:
👉 **http://localhost:5173**

*(Clique para testar. Se não abrir, verifique se aceitou o comando no terminal)*

## 2. Conectar com Google Sheets (Único passo manual)
Como envolve sua conta pessoal do Google, eu não consigo fazer isso por você.

**Siga o passo a passo:**

1.  Acesse **[sheets.new](https://sheets.new)** para abrir uma planilha vazia.
2.  No menu superior, clique em **Extensões** > **Apps Script**.
3.  Vai abrir uma tela de código. Apague tudo e **COLE** o código abaixo:

```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([new Date(), data.name, data.whatsapp, data.quizId, data.score, data.percentage + '%', data.resultStatus, JSON.stringify(data.answers)]);
  return ContentService.createTextOutput(JSON.stringify({'result': 'success'})).setMimeType(ContentService.MimeType.JSON);
}
```

4.  Clique no ícone de **Disquete 💾** para salvar.
5.  No canto direito superior, clique no botão azul **Implantar** (Deploy) > **Nova implantação**.
6.  Na engrenagem ⚙️ (ao lado de "Selecione o tipo"), escolha **App da Web**.
7.  **MUITO IMPORTANTE**: Em "Quem pode acessar", mude para **Qualquer pessoa**.
8.  Clique em **Implantar**. Autrorize o acesso (clique em "Avançado" > "Acessar (inseguro)" se o Google perguntar).
9.  O Google vai te dar uma URL (link). **COPIE ESSE LINK.**

## 3. Finalizar
Volte para o chat e **cole o link aqui**. Eu vou configurar o sistema para você.
