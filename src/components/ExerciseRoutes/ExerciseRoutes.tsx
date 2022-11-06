import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Exercise1 from '../Exercise1';
import Exercise2 from '../Exercise2';

const ExerciseRoutes = () => {
  return (
    <React.Fragment>
      <Routes>
        <Route path="/" element={<Exercise1 />} />
        <Route path="/exercise1" element={<Exercise1 />} />
        <Route path="/exercise2" element={<Exercise2 />} />
      </Routes>
    </React.Fragment>
  );
};

export default ExerciseRoutes;
