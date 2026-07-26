import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../../../../lib/supabase";

const AuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Auth callback error:", error);
        navigate("/login");
        return;
      }

      if (data.session) {
        localStorage.setItem("token", data.session.access_token);
        localStorage.setItem(
          "user",
          JSON.stringify({
            id: data.session.user.id,
            email: data.session.user.email,
            name: data.session.user.user_metadata?.name || "",
          })
        );
        localStorage.setItem("openChatOnLoad", "1");
        navigate("/dashboard");
      } else {
        navigate("/login");
      }
    };

    handleCallback();
  }, [navigate]);

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--color-bg)",
        color: "var(--text-color)",
        fontFamily: "var(--font-primary)",
      }}
    >
      <p>Signing you in...</p>
    </div>
  );
};

export default AuthCallback;
