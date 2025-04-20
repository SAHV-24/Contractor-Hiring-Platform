export function isValidMessage(message) {
  const regex = /^[a-zA-Z\s]+$/;

  return regex.test(message);
}
