import axios from 'axios';

const api = axios.create({
  baseURL: 'https://express-01-thiagu35x.vercel.app',
  headers: { 'Content-Type': 'application/json' }
});

// 1. Buscar todas as tarefas do NeonDB
export const getTarefas = async () => {
  const response = await api.get('/tarefas');
  return response.data.results; 
};

// 2. Buscar uma única tarefa por ID
export const getTarefa = async (id) => {
  const response = await api.get(`/tarefas/${id}`);
  return response.data;
};

// 3. Adicionar uma nova tarefa
export const adicionarTarefa = async (titulo) => {
  const response = await api.post('/tarefas', { titulo });
  return response.data;
};

// 4. Atualizar status ou título
export const atualizarTarefa = async (id, dados) => {
  const response = await api.put(`/tarefas/${id}`, dados);
  return response.data;
};

// 5. Remover uma tarefa
export const removerTarefa = async (id) => {
  const response = await api.delete(`/tarefas/${id}`);
  return response.data;
};

export default api;