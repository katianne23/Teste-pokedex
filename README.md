## Pokedex 

![Listagem de Pokemons ](https://github.com/katianne23/Teste-pokedex/blob/Main/src/assets/img/preview.png)

> 💻 Aplicação Web que funciona como uma Pokédex, que permitir pesquisar, visualizar e filtrar informações sobre os Pokémon, utilizando a PokeAPI.

[Clique aqui para acessar](https://teste-pokedex.vercel.app/)

## Tecnologias ⚙️

- [VueJs](https://vuejs.org/)
- [Vite](https://vite.dev/).
- [TypeScript](https://www.typescriptlang.org/)
- [PokéAPI](https://pokeapi.co/docs/v2)

## Passos para instalar as dependências e executar o projeto ⌨️

Siga os passos abaixo para configurar e executar o projeto localmente:

### 1. Clone o repositório

 Primeiro, faça o clone deste repositório para sua máquina local:
 git clone https://github.com/katianne23/Teste-pokedex.git

### 2.Acesse o diretório do projeto

 Entre no diretório do projeto clonado:
 Exempo: cd pokedex
 
 ### 3.Instale as dependências
 Para instalar todas as dependências necessárias para o projeto, execute o seguinte comando:
 npm install

 ### 4. Executar o servidor de desenvolvimento
 Após instalar as dependências, você pode iniciar o servidor de desenvolvimento com o seguinte comando:
 npm run dev

  ## Funcionalidades 🧷
  - Exibir uma lista de Pokémons com imagens, nomes e números
  - Opção de adicionar seus pokémons favoritos e tela de listagem  desse pokémons
  - Paginação para navegar entrer a listagem de Pokémons
  - Exibição de detalhes de cada pokémon
  - Na tela de detalhes é possivel visualizar estatísticas, tipos e evolução do pokémon do seu interesse
  - O campo de busca facilitar para exibir o pokémon que deseja ser exibido 
  - O filtro lista os tipos de pokémon que deseja ser exibido
  - Layout simples e adptado para diferentes dispositivos
  - Adcionado Loading animado enquanto os pokémons carregar
  - Adcionado animação leve ao iniciar a pagina de detalhes
  - Mensagem de erro quando o pokémon filtrado e buscado não existe

  ## Descrições 📑
  - Realizada a conexão com a API utilizando lógica de consumo de API, utilizando composable que facilitar o carregamento de dados.
  - Utiliza-se ref da API reativa do Vue.js para armazenar os dados dos Pokémon e o axios para realizar requisições HTTP
  - A interface Pokemon define a estrutura dos dados que serão armazenados para cada:
  - interface Pokemon {
    id: number;
    name: string;
    sprites: {
        front_default: string;
    };
    types: string[];}
  - Loop para criar múltiplas requisições:
  - for (let offset = 0; offset < totalPokemons; offset += limit) {
    requests.push(axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`));}
  - O loop faz requisições paginadas para a PokeAPI, criando promessas para buscar grupos de 100 Pokémon até alcançar o total de 1000.
  - A URL contém os parâmetros limit (quantidade de Pokémon) e offset (a partir de qual Pokémon começar a busca).







Feito com ♥ by  Katianne Araújo 
## ♥ Contato

 <a href="https://instagram.com/katianne.araujo" target="_blank"><img src="https://img.shields.io/badge/-Instagram-%23E4405F?style=for-the-badge&logo=instagram&logoColor=white" target="_blank"></a>
 	<a href="https://t.me/Katiannearaujo" target="_blank"><img src="https://img.shields.io/badge/Telegram-2CA5E0?style=for-the-badge&logo=telegram&logoColor=white"></a>
 <a href="https://discord.gg/jSpXMenR" target="_blank"><img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" target="_blank"></a> 
  <a href = "mailto:katianne40@gmail.com"><img src="https://img.shields.io/badge/-Gmail-%23333?style=for-the-badge&logo=gmail&logoColor=white" target="_blank"></a>
  <a href="https://www.linkedin.com/in/katianne-ara%C3%BAjo-dos-santos-a7ab44204/" target="_blank"><img src="https://img.shields.io/badge/-LinkedIn-%230077B5?style=for-the-badge&logo=linkedin&logoColor=white" target="_blank"></a>
