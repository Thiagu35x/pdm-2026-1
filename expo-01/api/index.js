import axios from 'axios';

const api = axios.create({
  // IMPORTANTE: Substitua pela URL que aparece no seu dashboard da Vercel
  baseURL: 'https://express-01-seu-link-real.vercel.app', 
});

export async function adicionarTarefa(novaTarefa) {
  const response = await api.post('/tarefas', novaTarefa);
  return response.data;
}

export default api;