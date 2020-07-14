import React from "react";
import api from './services/api';

import "./styles.css";
import { useEffect, useState } from "react";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const res = await api.post('repositories', {
      title: `Desafio ${Date.now()}`,
	    url: 'http://github.com/...',
	    techs: ['Node.js', '...']
    });

    const repository = res.data;

    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const newRepositories = repositories.filter(r => r.id !== id);

    setRepositories(newRepositories);
  }

  useEffect(() => {
    api.get('repositories').then(res => {
      setRepositories(res.data);
    });
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(r => (
          <li key={r.id}>
          {r.title}
          <button onClick={() => handleRemoveRepository(r.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
