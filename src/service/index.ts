const apiUrl = 'https://6364e0b87b209ece0f50e472.mockapi.io/';
const statusOk = 200;

export const fetchExercise = async (exerciseNumber: '1' | '2') => {
  const response = await fetch(`${apiUrl}exercise${exerciseNumber}`, {
    method: 'GET',
    mode: 'cors',
    headers: {
      'Content-type': 'application/json',
    },
  });
  if (response.status === statusOk) {
    return response.json();
  }
  throw new Error('Service error');
};
