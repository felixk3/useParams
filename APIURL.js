// src/config.js
const API_URL = 'https://api.soufelixjuliano.com/khoza/';  
export default API_URL;


// src/components/ListaItens.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../config';  // Importando a URL da API

const ListaItens = () => {
  const [itens, setItens] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    const fetchItens = async () => {
      try {
        // Usando a URL centralizada
        const response = await axios.get(`${API_URL}itens`);  // Agora a URL está vindo do config.js
        setItens(response.data);
      } catch (error) {
        setErro('Erro ao carregar os itens.');
      }
    };

    fetchItens();
  }, []);

  return (
    <div>
      <h1>Lista de Itens</h1>
      {erro && <p>{erro}</p>}
      <ul>
        {itens.length === 0 ? (
          <li>Carregando...</li>
        ) : (
          itens.map((item) => (
            <li key={item.id}>
              {item.nome} - {item.descricao}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default ListaItens;

