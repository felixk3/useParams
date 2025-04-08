// src/components/ListaUsuarios.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../config'; // Importando a URL base da API

const ListaUsuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [usuario, setUsuario] = useState({ nome: '', email: '' });
  const [erro, setErro] = useState('');
  const [idParaAtualizar, setIdParaAtualizar] = useState(null);

  // Buscar todos os usuários
  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get(`${API_URL}usuarios`);
        setUsuarios(response.data);
      } catch (error) {
        setErro('Erro ao carregar usuários.');
      }
    };

    fetchUsuarios();
  }, []);

  // Criar um novo usuário
  const handleCreate = async () => {
    try {
      const novoUsuario = { nome: usuario.nome, email: usuario.email };
      const response = await axios.post(`${API_URL}usuarios`, novoUsuario);
      setUsuarios([...usuarios, response.data]);
      setUsuario({ nome: '', email: '' });
    } catch (error) {
      setErro('Erro ao criar usuário.');
    }
  };

  // Atualizar um usuário
  const handleUpdate = async () => {
    try {
      const usuarioAtualizado = { nome: usuario.nome, email: usuario.email };
      const response = await axios.put(`${API_URL}usuarios/${idParaAtualizar}`, usuarioAtualizado);
      setUsuarios(usuarios.map((user) => (user.id === idParaAtualizar ? response.data : user)));
      setUsuario({ nome: '', email: '' });
      setIdParaAtualizar(null);
    } catch (error) {
      setErro('Erro ao atualizar usuário.');
    }
  };

  // Deletar um usuário
  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}usuarios/${id}`);
      setUsuarios(usuarios.filter((user) => user.id !== id));
    } catch (error) {
      setErro('Erro ao deletar usuário.');
    }
  };

  // Exibir dados do usuário para edição
  const handleEdit = async (id) => {
    try {
      const response = await axios.get(`${API_URL}usuarios/${id}`);
      setUsuario({ nome: response.data.nome, email: response.data.email });
      setIdParaAtualizar(id);
    } catch (error) {
      setErro('Erro ao carregar os dados para edição.');
    }
  };

  return (
    <div className="usuarios-container">
      <h1>Lista de Usuários</h1>

      {/* Exibe erro, se houver */}
      {erro && <p className="erro">{erro}</p>}

      {/* Formulário para criar ou atualizar usuário */}
      <div className="form-container">
        <input
          type="text"
          placeholder="Nome"
          value={usuario.nome}
          onChange={(e) => setUsuario({ ...usuario, nome: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={usuario.email}
          onChange={(e) => setUsuario({ ...usuario, email: e.target.value })}
        />
        {idParaAtualizar ? (
          <button onClick={handleUpdate}>Atualizar Usuário</button>
        ) : (
          <button onClick={handleCreate}>Criar Usuário</button>
        )}
      </div>

      {/* Exibindo a lista de usuários */}
      <div className="usuarios-list">
        {usuarios.length === 0 ? (
          <p>Nenhum usuário encontrado.</p>
        ) : (
          <ul>
            {usuarios.map((user) => (
              <li key={user.id} className="usuario-item">
                <strong>{user.nome}</strong> - {user.email}
                <button onClick={() => handleEdit(user.id)}>Editar</button>
                <button onClick={() => handleDelete(user.id)}>Deletar</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ListaUsuarios;
