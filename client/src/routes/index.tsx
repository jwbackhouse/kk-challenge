import { Routes, Route, Navigate } from 'react-router-dom';
import { Welcome } from '../pages/Welcome';

const DEFAULT_USER_ID = 'ff535484-6880-4653-b06e-89983ecf4ed5';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/welcome/:userId" element={<Welcome />} />

      {/* Redirect to a valid URL for the purposes of this exercise*/}
      <Route
        path="*"
        element={<Navigate to={`/welcome/${DEFAULT_USER_ID}`} replace />}
      />
    </Routes>
  );
}
