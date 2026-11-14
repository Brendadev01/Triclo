const MS_PER_DAY = 1000 * 60 * 60 * 24;

export function startOfDay(date) {
  const result = new Date(date);
  result.setHours(0, 0, 0, 0);
  return result;
}

export function addMonths(date, months) {
  const result = new Date(date);
  const originalDay = result.getDate();
  result.setMonth(result.getMonth() + months);
  // Ex.: 31/01 + 1 mês cairia em março; volta para o último dia do mês certo
  if (result.getDate() !== originalDay) {
    result.setDate(0);
  }
  return result;
}

export function daysBetween(startDate, endDate) {
  return Math.round((startOfDay(endDate) - startOfDay(startDate)) / MS_PER_DAY);
}

export function formatDate(date) {
  const value = new Date(date);
  const day = String(value.getDate()).padStart(2, '0');
  const month = String(value.getMonth() + 1).padStart(2, '0');
  return `${day}/${month}/${value.getFullYear()}`;
}