// App.js

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Post from './Post';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/post/:id" component={Post} />
      </Switch>
    </Router>
  );
}

export default App;


// Post.js

import { useParams } from 'react-router-dom';

function Post() {
  const { id } = useParams(); // Pega o valor do parâmetro 'id' da URL
  return (
    <div>
      <h1>Post {id}</h1>
      <p>Exibindo o conteúdo do post com o ID: {id}</p>
    </div>
  );
}

export default Post;


//Exemplos adicionais de uso:
//Vários parâmetros na URL:

// Configuração de rota
<Route path="/post/:id/comment/:commentId" component={Comment} />


import { useParams } from 'react-router-dom';

function Comment() {
  const { id, commentId } = useParams();
  return (
    <div>
      <h1>Post ID: {id}</h1>
      <h2>Comentário ID: {commentId}</h2>
    </div>
  );
}


