E-commerce de Tênis

📖 Visão Geral
Este projeto consistindo em uma página de produto para um e-commerce fictício de tênis. A página foi desenvolvida com foco em funcionalidade, usabilidade e flexibilidade. Todas as interações do usuário são salvas localmente por 15 minutos.

🚀 Funcionalidades

Galeria de Imagens:
Uma imagem principal ocupando aproximadamente 35% da tela.
Miniaturas de outras imagens do produto exibidas abaixo da imagem principal.
Ao clicar em uma miniatura, a imagem principal é atualizada dinamicamente.


Título e Preço:
Exibição do nome do produto e seu preço, formatado em reais (R$).


Seletores de Variantes:
Campos dinâmicos para seleção de tamanho e cor, gerados a partir de um array/objeto de dados.
As opções são renderizadas apenas com base nos dados disponíveis, garantindo flexibilidade.


Disponibilidade de Entrega:
Campo para inserção de CEP, com validação e formatação (ex.: 12345-678).
Integração com a API ViaCEP para verificar o CEP e exibir o endereço completo (logradouro, bairro, cidade e estado) se válido.
Feedback visual para CEPs inválidos.


Persistência de Ações:
Todas as ações do usuário (seleção de imagem, tamanho, cor e CEP) são salvas no localStorage e mantidas por 15 minutos, mesmo após atualização da página.



🛠️ Tecnologias Utilizadas

Front-end: HTML, CSS, JavaScript, react.js e next.js
Estilização: Tailwind CSS para design responsivo e moderno
Persistência: localStorage para salvar ações do usuário
API: Integração com ViaCEP para consulta de CEPs
Ferramentas: Git, npm, (para build e desenvolvimento)


🔍 Notas para o Avaliador

A página foi desenvolvida com boas práticas de código, como componentes reutilizáveis, tratamento de erros e modularidade.
A galeria de imagens e os seletores de variantes são gerados dinamicamente a partir de dados mockados, garantindo escalabilidade.
A integração com a API ViaCEP inclui validação de entrada e feedback ao usuário em caso de CEPs inválidos.
A persistência de dados usa localStorage com um timestamp para expirar após 15 minutos, mantendo as ações do usuário mesmo após refresh.
A interface é responsiva, com inspiração em e-commerces populares, e prioriza flexibilidade para futuras alterações (ex.: adição de novas variantes ou APIs).
Estou aberto a feedback e sugestões para melhorias!

📝 Possíveis Melhorias Futuras

Adição de um carrinho de compras integrado à página.
Suporte a múltiplos produtos com navegação entre páginas.
Validação avançada de CEP com debounce para otimizar chamadas à API.
Animações suaves para troca de imagens e feedback de interação.

📬 Contato
Para dúvidas ou mais informações sobre o projeto, entre em contato:

Nome: [Michel Oliveira Cordeiro]
E-mail: [cadastromichel@gmail.com]
GitHub: [https://github.com/Michel-O-Cordeiro]


Obrigado por avaliar meu projeto! 😊
