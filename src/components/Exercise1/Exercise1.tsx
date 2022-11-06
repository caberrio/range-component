import React, { useEffect, useState } from 'react';
import { fetchExercise } from '../../service';
import Range from '../Range';

const Exercise1 = () => {
  const [range, setRange] = useState();
  useEffect(() => {
    fetchExercise('1').then(
      (response) => {
        setRange(response.data);
      },
      (error) => {
        window.alert(`An error occurred, try again later, (${error})`);
      }
    );
  }, []);

  return (
    <div>
      Exercise 1:
      {range ? <Range range={range} isEditable /> : <div>loading...</div>}
    </div>
  );
};

export default Exercise1;
