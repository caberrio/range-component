import React, { useEffect, useState } from 'react';
import { fetchExercise } from '../../service';
import Range from '../Range';

const Exercise2 = () => {
  const [values, setValues] = useState();
  useEffect(() => {
    fetchExercise('2').then(
      (response) => {
        setValues(response.data);
      },
      (error) => {
        window.alert(`An error occurred, try again later, (${error})`);
      }
    );
  }, []);
  return (
    <div>
      Exercise 2:
      {values ? <Range values={values} /> : <div>loading...</div>}
    </div>
  );
};

export default Exercise2;
