export function formatToCurrency(value) {
  if (value === null || value === undefined || isNaN(value)) return 'R$ 0,00';
  return parseFloat(value).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });
}

export function translateRole(role) {
  if (!role) return '';

  const roleTranslations = {
    OWNER: 'Proprietário',
    MANAGER: 'Gerente',
    SELLER: 'Vendedor',
  };

  return roleTranslations[role] || role;
}
