// client/src/hooks/useAuth.js

export function useAuth() {
    const userId = localStorage.getItem("userId");
    const userName = localStorage.getItem("userName"); // optional
    const token = localStorage.getItem("token"); // optional
  
    return {
      isAuthenticated: !!userId,
      user: userId ? { _id: userId, name: userName } : null,
      token,
      logout: () => {
        localStorage.clear();
        window.location.href = "/login/user";
      }
    };
  }
  