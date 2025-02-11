import { Routes, Route, Navigate } from 'react-router-dom';

const DEFAULT_USER_ID = '618f4ed6-1c5b-4993-a149-f64700bf31dd';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/welcome/:userId" element={<h1>hello world</h1>} />

      {/* Redirect to a valid URL for the purposes of this exercise*/}
      <Route
        path="*"
        element={<Navigate to={`/welcome/${DEFAULT_USER_ID}`} replace />}
      />
    </Routes>
  );
}
