import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";

// Import all the page components that your app will have
import AuthPage from "./pages/AuthPage.jsx";
import HomePage from "./pages/HomePage.jsx";
import PostsPage from "./pages/PostsPage.jsx";
import CreatePostPage from "./pages/CreatePostPage.jsx";

// This is a helper component to protect routes that require a user to be logged in.
const ProtectedRoute = ({ children }) => {
  const user = getAuth().currentUser;
  // If no user is logged in, this component will redirect them to the /login page.
  return user ? children : <Navigate to="/login" replace />;
};

// This helper component is for public routes like /login.
// If a user is already logged in, it will redirect them away from the login page to the homepage.
const PublicRoute = ({ children }) => {
  const user = getAuth().currentUser;
  return user ? <Navigate to="/" replace /> : children;
};

function App() {
  const [initializing, setInitializing] = useState(true);

  // This effect listens for Firebase auth changes. It is crucial for making sure
  // the app doesn't try to render a protected route before Firebase has checked if the user is logged in.
  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      // Once this check runs for the first time, we are done initializing.
      setInitializing(false);
    });
    // Cleanup the listener when the component is no longer needed
    return unsubscribe;
  }, []);

  // Show a simple loading message while Firebase checks the user's session.
  // This prevents the user from being briefly shown the login page even if they are already logged in.
  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        Loading Application...
      </div>
    );
  }

  return (
    <Routes>
      {/* === PUBLIC ROUTES === */}
      {/* These routes are only accessible to users who are NOT logged in. */}
      <Route
        path="/login"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />
      <Route
        path="/signup"
        element={
          <PublicRoute>
            <AuthPage />
          </PublicRoute>
        }
      />

      {/* === PROTECTED ROUTES === */}
      {/* These routes are only accessible to users who ARE logged in. */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/posts"
        element={
          <ProtectedRoute>
            <PostsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-post"
        element={
          <ProtectedRoute>
            <CreatePostPage />
          </ProtectedRoute>
        }
      />

      {/* A "catch-all" route to handle any URLs that don't match our defined routes. */}
      {/* It will redirect the user to the homepage. */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
