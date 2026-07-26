import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import Button from "../../atoms/buttons";
import toast from "react-hot-toast";
import { loginUser, registerUser } from "../../../../api/authApi";
import supabase from "../../../../lib/supabase";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await loginUser({
          email: form.email,
          password: form.password,
        });

        localStorage.setItem("token", res.data.token);
        localStorage.setItem("user", JSON.stringify(res.data.user));
        localStorage.setItem("openChatOnLoad", "1");

        toast.success("Login successful");
        navigate("/dashboard");
      } else {
        if (form.password !== form.confirmPassword) {
          toast.error("Passwords do not match");
          return;
        }

        await registerUser({
          name: form.name,
          email: form.email,
          password: form.password,
        });

        toast.success("Account created successfully");
        navigate("/login");
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Something went wrong"
      );
    }
  };

  const handleGoogleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });

    if (error) {
      toast.error("Google sign-in failed");
    }
  };

  return (
    <Container>
      <LeftSection>
        <LeftOverlay>
          <LeftContent>
            <LogoWrap>
              <LogoMark>
                <LogoStem />
                <LogoTop />
                <LogoMid />
              </LogoMark>
              <LogoText>FinGenius</LogoText>
            </LogoWrap>

            <HeroText>
              Manage your money<br />
              <span>smarter, not harder.</span>
            </HeroText>

            <HeroSub>
              Track transactions, set budgets, and get AI-powered insights — all from one clean dashboard.
            </HeroSub>

            <Features>
              <Feature>
                <FeatureIcon>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </FeatureIcon>
                <FeatureText>Smart Transactions</FeatureText>
              </Feature>
              <Feature>
                <FeatureIcon>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21.21 15.89A10 10 0 1 1 8 2.83" /><path d="M22 12A10 10 0 0 0 12 2v10z" />
                  </svg>
                </FeatureIcon>
                <FeatureText>Budget Tracking</FeatureText>
              </Feature>
              <Feature>
                <FeatureIcon>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </FeatureIcon>
                <FeatureText>AI Assistant</FeatureText>
              </Feature>
            </Features>

            <StatsCard>
              <StatsRow>
                <Stat>
                  <StatValue>₹1.24L</StatValue>
                  <StatLabel>Total Balance</StatLabel>
                </Stat>
                <StatDivider />
                <Stat>
                  <StatValue>₹85K</StatValue>
                  <StatLabel>Income</StatLabel>
                </Stat>
                <StatDivider />
                <Stat>
                  <StatValue>₹32.5K</StatValue>
                  <StatLabel>Expenses</StatLabel>
                </Stat>
              </StatsRow>
            </StatsCard>
          </LeftContent>
        </LeftOverlay>
      </LeftSection>

      <RightSection>
        <LoginCard>
          <FormLogo>
            <LogoMarkSmall>
              <LogoStemSmall />
              <LogoTopSmall />
              <LogoMidSmall />
            </LogoMarkSmall>
          </FormLogo>

          <Title>{isLogin ? "Welcome back" : "Create account"}</Title>
          <Subtitle>
            {isLogin
              ? "Sign in to access your dashboard."
              : "Get started with your free account."}
          </Subtitle>

          {!isLogin && (
            <Field>
              <label>Full Name</label>
              <Input
                type="text"
                placeholder="John Doe"
                value={form.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </Field>
          )}

          <Field>
            <label>Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />
          </Field>

          <Field>
            <label>Password</label>
            <PasswordWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => handleChange("password", e.target.value)}
              />
              <EyeButton
                type="button"
                onClick={() => setShowPassword((v) => !v)}
              >
                {showPassword ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                    <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                    <line x1="1" y1="1" x2="23" y2="23" />
                  </svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                    <circle cx="12" cy="12" r="3" />
                  </svg>
                )}
              </EyeButton>
            </PasswordWrapper>
          </Field>

          {!isLogin && (
            <Field>
              <label>Confirm Password</label>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={form.confirmPassword}
                onChange={(e) =>
                  handleChange("confirmPassword", e.target.value)
                }
              />
            </Field>
          )}

          <Button
            variant="primary"
            style={{ width: "100%", height: "52px", fontSize: "15px", borderRadius: "14px", marginTop: "4px" }}
            onClick={handleSubmit}
          >
            {isLogin ? "Sign In" : "Create Account"}
          </Button>

          {isLogin && (
            <>
              <Divider>
                <span>OR</span>
              </Divider>

              <GoogleButton onClick={handleGoogleLogin}>
                <svg width="18" height="18" viewBox="0 0 18 18">
                  <path fill="#4285F4" d="M17.64 9.2a10.3 10.3 0 0 0-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92a8.78 8.78 0 0 0 2.68-6.62z" />
                  <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26a8.1 8.1 0 0 1-12.18-3.4A8.78 8.78 0 0 0 2.4 13.4l-2.68 2.07A9 9 0 0 0 9 18z" />
                  <path fill="#FBBC05" d="M2.4 5.52A5.4 5.4 0 0 1 9 3.6a5.34 5.34 0 0 1 3.76 1.46l2.8-2.8A9 9 0 0 0 .16 4.68L2.4 5.52z" />
                  <path fill="#EA4335" d="M9 1.8a5.1 5.1 0 0 1 3.6 1.4l2.7-2.7A9 9 0 0 0 0 9c0 1.45.35 2.82.96 4.02L3.64 10.9A5.34 5.34 0 0 1 9 1.8z" />
                </svg>
                Continue with Google
              </GoogleButton>
            </>
          )}

          <SignupText>
            {isLogin ? (
              <>
                Don't have an account?
                <ToggleLink onClick={() => navigate("/register")}> Sign Up</ToggleLink>
              </>
            ) : (
              <>
                Already have an account?
                <ToggleLink onClick={() => navigate("/login")}> Sign In</ToggleLink>
              </>
            )}
          </SignupText>
        </LoginCard>
      </RightSection>
    </Container>
  );
};

export default Login;

/* ================= STYLES ================= */

const Container = styled.div`
  height: 100vh;
  overflow: hidden;
  display: flex;
  background: var(--color-bg);

  @media (max-width: 900px) {
    flex-direction: column;
    overflow-y: auto;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  height: 100vh;
  background: linear-gradient(160deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%);
  color: white;
  position: relative;
  overflow: hidden;

  @media (max-width: 900px) {
    display: none;
  }

  &::before {
    content: "";
    position: absolute;
    top: -200px;
    right: -200px;
    width: 500px;
    height: 500px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(99, 102, 241, 0.25) 0%, transparent 70%);
  }

  &::after {
    content: "";
    position: absolute;
    bottom: -150px;
    left: -150px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(139, 92, 246, 0.2) 0%, transparent 70%);
  }
`;

const LeftOverlay = styled.div`
  position: relative;
  z-index: 1;
  height: 100%;
  padding: 60px 56px;
  display: flex;
  align-items: center;
`;

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 36px;
  max-width: 480px;
`;

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const LogoMark = styled.span`
  display: inline-flex;
  width: 48px;
  height: 48px;
  border-radius: 14px;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(8px);
  position: relative;
  flex-shrink: 0;
`;

const LogoStem = styled.span`
  position: absolute;
  left: 12px;
  top: 8px;
  width: 11px;
  height: 30px;
  border-radius: 8px;
  background: #818cf8;
`;

const LogoTop = styled.span`
  position: absolute;
  left: 21px;
  top: 8px;
  width: 18px;
  height: 8px;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.9);
`;

const LogoMid = styled.span`
  position: absolute;
  left: 21px;
  top: 20px;
  width: 14px;
  height: 8px;
  border-radius: 8px;
  background: #c4b5fd;
`;

const LogoText = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: white;
  letter-spacing: 0.3px;
`;

const HeroText = styled.h1`
  font-size: 42px;
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.5px;

  span {
    background: linear-gradient(135deg, #818cf8, #c084fc);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const HeroSub = styled.p`
  font-size: 16px;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.6);
  max-width: 400px;
`;

const Features = styled.div`
  display: flex;
  gap: 20px;
`;

const Feature = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const FeatureIcon = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  color: #a5b4fc;
  flex-shrink: 0;
`;

const FeatureText = styled.span`
  font-size: 13px;
  color: rgba(255, 255, 255, 0.7);
  font-weight: 500;
`;

const StatsCard = styled.div`
  background: rgba(255, 255, 255, 0.06);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  padding: 24px 28px;
`;

const StatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const StatValue = styled.span`
  font-size: 22px;
  font-weight: 700;
  color: white;
`;

const StatLabel = styled.span`
  font-size: 12px;
  color: rgba(255, 255, 255, 0.5);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatDivider = styled.div`
  width: 1px;
  height: 36px;
  background: rgba(255, 255, 255, 0.12);
`;

const RightSection = styled.div`
  flex: 1;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 520px;
  padding: 44px;
  border: 1px solid var(--border-color);
  border-radius: 24px;
  background: var(--color-bg);
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.04);
`;

const FormLogo = styled.div`
  margin-bottom: 32px;
`;

const LogoMarkSmall = styled.span`
  display: inline-flex;
  width: 44px;
  height: 44px;
  border-radius: 12px;
  align-items: center;
  justify-content: center;
  background: var(--text-color);
  position: relative;
`;

const LogoStemSmall = styled.span`
  position: absolute;
  left: 10px;
  top: 7px;
  width: 10px;
  height: 28px;
  border-radius: 7px;
  background: var(--primary-600);
`;

const LogoTopSmall = styled.span`
  position: absolute;
  left: 18px;
  top: 7px;
  width: 16px;
  height: 7px;
  border-radius: 7px;
  background: var(--color-bg);
`;

const LogoMidSmall = styled.span`
  position: absolute;
  left: 18px;
  top: 18px;
  width: 12px;
  height: 7px;
  border-radius: 7px;
  background: var(--primary-300);
`;

const Title = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-color);
  margin-bottom: 8px;
`;

const Subtitle = styled.p`
  font-size: 15px;
  color: var(--muted-text);
  margin-bottom: 32px;
`;

const Field = styled.div`
  margin-bottom: 18px;

  label {
    display: block;
    margin-bottom: 6px;
    font-size: 13px;
    font-weight: 500;
    color: var(--text-color);
  }
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  padding: 0 14px;
  background: var(--color-bg);
  color: var(--text-color);
  font-size: 14px;
  font-family: var(--font-primary);
  outline: none;
  transition: border-color 0.15s ease;

  &::placeholder {
    color: var(--muted-text);
  }

  &:focus {
    border-color: var(--primary-600);
  }
`;

const PasswordWrapper = styled.div`
  position: relative;
`;

const EyeButton = styled.button`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  border: none;
  background: none;
  cursor: pointer;
  color: var(--muted-text);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;

  &:hover {
    color: var(--text-color);
  }
`;

const Divider = styled.div`
  margin: 20px 0;
  text-align: center;
  position: relative;

  span {
    background: var(--color-bg);
    padding: 0 12px;
    position: relative;
    z-index: 1;
    font-size: 12px;
    color: var(--muted-text);
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    height: 1px;
    background: var(--border-color);
  }
`;

const GoogleButton = styled.button`
  width: 100%;
  height: 48px;
  border-radius: 12px;
  border: 1px solid var(--border-color);
  background: var(--color-bg);
  color: var(--text-color);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-size: 14px;
  font-family: var(--font-primary);
  font-weight: 500;
  transition: all 0.15s ease;

  &:hover {
    background: var(--surface-hover);
    border-color: var(--gray-300);
  }
`;

const SignupText = styled.p`
  text-align: center;
  margin-top: 24px;
  font-size: 14px;
  color: var(--muted-text);
`;

const ToggleLink = styled.span`
  color: var(--primary-600);
  cursor: pointer;
  font-weight: 600;

  &:hover {
    text-decoration: underline;
  }
`;
