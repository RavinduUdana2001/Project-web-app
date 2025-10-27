import React, { useState, useEffect } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile 
} from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate } from 'react-router-dom';
// Import your API base URL if you have one, or use a hardcoded URL for the backend
const BACKEND_URL = "http://localhost:5000"; // Assuming your backend runs on port 5000

// A simple SVG icon for visual flair (kept for completeness)
const LockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
  </svg>
);

function AuthPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirects if a user is already authenticated
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // NOTE: We only redirect here. DB sync must happen on first login/signup.
        navigate('/'); 
      }
    });
    return () => unsubscribe();
  }, [navigate]);

  // *** UPDATED FUNCTION: Sync user with PostgreSQL backend ***
  const syncUserToPostgres = async (user) => {
    try {
      // 1. Get the Firebase ID Token. 
      // CRUCIAL FIX: Pass 'true' to force a token refresh. 
      // This ensures the token includes the name set by updateProfile() 
      // right before this call for new sign-ups.
      const idToken = await user.getIdToken(true); 

      // 2. Call your backend /sync endpoint
      const response = await fetch(`${BACKEND_URL}/api/auth/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 3. Send the token in the Authorization header
          'Authorization': `Bearer ${idToken}`,
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Backend Sync Error:', errorData);
        throw new Error(`Failed to sync user with database: ${errorData.error || response.statusText}`);
      }

      const syncedUser = await response.json();
      console.log('User synced with PostgreSQL:', syncedUser);

    } catch (err) {
      console.error('Sync Error:', err);
      setError("Successfully logged in/signed up with Firebase, but failed to sync user data. Please try refreshing.");
      throw err; // Re-throw to prevent immediate navigation in handleAuth
    }
  };


  const handleAuth = async (e) => {
    e.preventDefault();
    setError("");

    if (!isLogin && !name.trim()) {
      setError("Please enter your name to sign up.");
      return;
    }

    try {
      let userCredential;

      if (isLogin) {
        // --- 1. Firebase Login ---
        userCredential = await signInWithEmailAndPassword(auth, email, password);
      } else {
        // --- 1. Firebase Signup ---
        userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // Set display name
        await updateProfile(userCredential.user, {
          displayName: name.trim()
        });
      }

      // --- 2. Database Sync ---
      // The sync function now includes the token refresh!
      const user = userCredential.user; 
      await syncUserToPostgres(user);
      
      // --- 3. Navigate only AFTER both steps succeed ---
      navigate('/');
      
    } catch (err) {
      // Handle Firebase-specific errors
      if (err.code && err.code.startsWith("auth/")) {
        if (err.code === "auth/email-already-in-use") {
          setError("This email is already registered. Please log in.");
        } else if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password" || err.code === "auth/user-not-found") {
          setError("Invalid email or password. Please check and try again.");
        } else {
          setError("An unexpected authentication error occurred. Please try again later.");
          console.error("Firebase Auth Error:", err);
        }
      } else {
        // Handle errors from the syncUserToPostgres function
        setError(err.message || "An unexpected error occurred. Please try again later.");
        console.error("General Auth/Sync Error:", err);
      }
    }
  };

  // ... (rest of the component's JSX remains the same)
  return (
    <div className="min-h-screen w-full bg-white text-gray-800 flex justify-center items-center p-4">
      {/* The rest of your JSX form structure */}
      <div className="w-full max-w-5xl m-0 sm:m-10 bg-white shadow-2xl rounded-2xl grid grid-cols-1 lg:grid-cols-2 overflow-hidden">
        
        {/* === Left Panel: The Form === */}
        <div className="p-8 sm:p-10 order-2 lg:order-1 flex flex-col justify-center">
          <div className="w-full">
            <div className="text-center mb-6"> 
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                {isLogin ? "Welcome Back" : "Get Started"}
              </h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                {isLogin ? "Sign in to continue to your account." : "Create your account to start blogging."}
              </p>
            </div>

            <form onSubmit={handleAuth} className="space-y-4"> 
              
              {!isLogin && (
                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-1">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition" 
                    required
                  />
                </div>
              )}

              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition" 
                  required
                />
              </div>

              <div>
                <label className="text-sm font-semibold text-gray-600 block mb-1">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition" 
                  required
                />
              </div>

              {error && (
                <p className="text-sm text-red-600 text-center bg-red-100 p-2 rounded-lg">{error}</p>
              )}

              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-2.5 rounded-lg font-semibold tracking-wide hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all duration-300 shadow-lg transform hover:scale-105" 
              >
                {isLogin ? "Log In" : "Create Account"}
              </button>
            </form>

            <p className="mt-4 text-sm text-center text-gray-600"> 
              {isLogin ? "Don't have an account?" : "Already have an account?"}
              <span 
                onClick={() => {
                  setIsLogin(!isLogin);
                  setError("");
                }}
                className="font-semibold text-purple-600 hover:underline cursor-pointer ml-1"
              >
                {isLogin ? "Sign Up" : "Log In"}
              </span>
            </p>
          </div>
        </div>

        {/* === Right Panel: Branding & Visuals === */}
        <div className="hidden lg:flex flex-col justify-center items-center bg-cover bg-center p-12 text-center order-1 lg:order-2" style={{backgroundImage: "url('https://images.unsplash.com/photo-1593642532400-2682810df593?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')"}}>
            <div className="bg-black bg-opacity-50 p-10 rounded-xl">
              <div className="flex justify-center mb-4">
                <LockIcon />
              </div>
              <h1 className="text-4xl font-bold mb-4 tracking-tight text-white">Bharat 24/7</h1>
              <p className="text-gray-200 leading-relaxed">
                Your daily source for insightful articles and breaking news. Sign in to join the conversation.
              </p>
            </div>
        </div>
        
      </div>
    </div>
  );
}

export default AuthPage;