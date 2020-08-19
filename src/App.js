import React, { useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const res = await api.post("repositories", {
      title: `New Repository ${Date.now()}`,
      url: `https://github.com/lala/${Date.now()}`,
      techs: ["Node", "React", "Native"],
    });
    console.log(res.data);

    setRepositories([...repositories, res.data]);
  }

  async function handleRemoveRepository(id) {
    const repoIndex = repositories.findIndex(
      (repository) => repository.id === id
    );

    api.delete(`repositories/${id}`);

    repositories.splice(repoIndex, 1);

    setRepositories([...repositories]);
  }

  useEffect(() => {
    api.get("repositories").then((res) => setRepositories(res.data));
  }, []);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(({ title, id }) => (
          <li key={id}>
            {title}
            <button onClick={() => handleRemoveRepository(id)}>Remover</button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
