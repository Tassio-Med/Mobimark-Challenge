export const handleApiError = (error) => {
  console.error('Erro da API:', error);
  
  if (error.response) {
    const { status, data } = error.response;
    
    switch (status) {
      case 400:
        return 'Dados inválidos enviados para o servidor';
      case 401:
        return 'Não autorizado. Faça login novamente.';
      case 403:
        return 'Você não tem permissão para esta ação';
      case 404:
        return 'Recurso não encontrado';
      case 422:
        return 'Erro de validação: ' + (data.errors ? Object.values(data.errors).flat().join(', ') : 'Dados inválidos');
      case 500:
        return 'Erro interno do servidor';
      default:
        return data.error || data.message || 'Erro desconhecido';
    }
  } else if (error.request) {
    return 'Erro de conexão. Verifique sua internet.';
  } else {
    return error.message || 'Erro desconhecido';
  }
};