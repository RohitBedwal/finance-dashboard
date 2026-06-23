import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import styled from "styled-components";
import Button from "../../atoms/buttons";
import toast from "react-hot-toast";
import { loginUser, registerUser } from "../../../../api/authApi";


const Login = (isMobileDrawer = false) => {
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
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
  try {
    if (isLogin) {
      const res = await loginUser({
        email: form.email,
        password: form.password,
      });

      localStorage.setItem(
        "token",
        res.data.token
      );
      localStorage.setItem(
  "user",
  JSON.stringify(res.data.user)
);

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

      toast.success(
        "Account created successfully"
      );

      navigate("/login");
    }
  } catch (error) {
    toast.error(
      error?.response?.data?.message ||
        "Something went wrong"
    );
  }
};

  return (
    <Container>
      <LeftSection>
        <Brand>
          <Logo $mobileDrawer={isMobileDrawer}>
                  <LogoMark>
                    <LogoStem />
                    <LogoTop />
                    <LogoMid />
                  </LogoMark>
                  <LogoFull $mobileDrawer={isMobileDrawer}>finance</LogoFull>
                </Logo>

          {/* <h1>Finance</h1> */}

          <p>
            Manage transactions, budgets and savings
            from one powerful dashboard.
          </p>
        </Brand>

        <StatsCard>
          <h3>Total Balance</h3>
          <h2>₹1,24,500</h2>

          <StatsRow>
            <Stat>
              <span>Income</span>
              <strong>₹85,000</strong>
            </Stat>

            <Stat>
              <span>Expense</span>
              <strong>₹32,500</strong>
            </Stat>
          </StatsRow>
        </StatsCard>
      </LeftSection>

      <RightSection>
        <LoginCard>
          <Title>
            {isLogin
              ? "Welcome Back 👋"
              : "Create Account 🚀"}
          </Title>

          <Subtitle>
            {isLogin
              ? "Sign in to continue managing your finances."
              : "Create your account and start managing your finances."}
          </Subtitle>

          {!isLogin && (
            <Field>
              <label>Full Name</label>

              <Input
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) =>
                  handleChange("name", e.target.value)
                }
              />
            </Field>
          )}

          <Field>
            <label>Email Address</label>

            <Input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) =>
                handleChange("email", e.target.value)
              }
            />
          </Field>

          <Field>
            <label>Password</label>

            <PasswordWrapper>
              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                value={form.password}
                onChange={(e) =>
                  handleChange("password", e.target.value)
                }
              />

              <EyeButton
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? "🙈" : "👁"}
              </EyeButton>
            </PasswordWrapper>
          </Field>

          {!isLogin && (
            <Field>
              <label>Confirm Password</label>

              <Input
                type={showPassword ? "text" : "password"}
                placeholder="Confirm password"
                value={form.confirmPassword}
                onChange={(e) =>
                  handleChange(
                    "confirmPassword",
                    e.target.value
                  )
                }
              />
            </Field>
          )}

          {isLogin && (
            <OptionsRow>
              <Remember>
                <input type="checkbox" />
                Remember me
              </Remember>

              <ForgotPassword>
                Forgot Password?
              </ForgotPassword>
            </OptionsRow>
          )}

          <Button
            variant="primary"
            style={{ width: "100%" }}
            onClick={handleSubmit}
          >
            {isLogin
              ? "Sign In"
              : "Create Account"}
          </Button>

          <Divider>
            <span>OR</span>
          </Divider>

          

          <SignupText>
  {isLogin ? (
    <>
      Don't have an account?
      <ToggleLink
        onClick={() => navigate("/register")}
      >
        {" "}
        Sign Up
      </ToggleLink>
    </>
  ) : (
    <>
      Already have an account?
      <ToggleLink
        onClick={() => navigate("/login")}
      >
        {" "}
        Sign In
      </ToggleLink>
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
  min-height: 100vh;
  display: flex;
  background: var(--color-bg);

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

const LeftSection = styled.div`
  flex: 1;
  background: linear-gradient(
    135deg,
    var(--primary-600),
    var(--primary-800)
  );

  color: white;

  padding: 60px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 40px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Brand = styled.div`
  h1 {
    font-size: 48px;
    margin-bottom: 16px;
  }

  p {
    font-size: 18px;
    max-width: 420px;
    opacity: 0.9;
  }
`;

// const Logo = styled.div`
//   width: 72px;
//   height: 72px;

//   border-radius: 20px;

//   background: rgba(255,255,255,0.15);

//   display: flex;
//   align-items: center;
//   justify-content: center;

//   font-size: 32px;
//   margin-bottom: 20px;
// `;

const StatsCard = styled.div`
  background: rgba(255,255,255,0.15);

  backdrop-filter: blur(20px);

  padding: 24px;
  border-radius: 24px;

  h3 {
    font-weight: 400;
    margin-bottom: 10px;
  }

  h2 {
    font-size: 32px;
  }
`;

const StatsRow = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 20px;
`;

const Stat = styled.div`
  display: flex;
  flex-direction: column;

  span {
    opacity: 0.8;
  }
`;

const RightSection = styled.div`
  flex: 1;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 24px;
`;

const LoginCard = styled.div`
  width: 100%;
  max-width: 480px;

  padding: 40px;

  border-radius: 32px;

  background: var(--color-bg);

  border: 1px solid var(--border-color);

  box-shadow: 0 10px 40px rgba(0,0,0,0.05);
`;

const Title = styled.h2`
  font-size: 32px;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: var(--muted-text);
  margin-bottom: 30px;
`;

const Field = styled.div`
  margin-bottom: 20px;

  label {
    display: block;
    margin-bottom: 8px;
    font-size: 14px;
  }
`;

const Input = styled.input`
  width: 100%;
  height: 52px;

  border: 1px solid var(--border-color);

  border-radius: 14px;

  padding: 0 16px;

  background: var(--color-bg);
  color: var(--text-color);

  outline: none;
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
`;

const OptionsRow = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 24px;
`;

const Remember = styled.label`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const ForgotPassword = styled.a`
  color: var(--primary-600);
  cursor: pointer;
`;

const Divider = styled.div`
  margin: 24px 0;
  text-align: center;
  position: relative;

  span {
    background: var(--color-bg);
    padding: 0 12px;
    position: relative;
    z-index: 1;
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
  height: 52px;

  border-radius: 14px;
  border: 1px solid var(--border-color);

  background: transparent;

  cursor: pointer;
`;

const SignupText = styled.p`
  text-align: center;
  margin-top: 24px;

  a {
    color: var(--primary-600);
    text-decoration: none;
    font-weight: 500;
  }
`;

const ToggleLink = styled.span`
  color: var(--primary-600);
  cursor: pointer;
  font-weight: 500;

  &:hover {
    text-decoration: underline;


  }
`;

export const Logo = styled.h2`
  font-size: 24px;
  margin-bottom: 28px;
  align-items: center;
  justify-content: flex-start;
  display: flex;
  gap: 16px;
  height: 100px;
  width: 100%;
  white-space: nowrap;

  @media (max-width: 1400px) {
    ${({ $mobileDrawer }) =>
      !$mobileDrawer &&
      css`
        justify-content: center;
        gap: 0;
      `}
  }

  ${Container}:hover & {
    @media (max-width: 1400px) {
      ${({ $mobileDrawer }) =>
        !$mobileDrawer &&
        css`
          justify-content: flex-start;
          gap: 16px;
        `}
    }
  }
`;

export const LogoMark = styled.span`
  display: inline-flex;
  width: 60px;
  height: 60px;
  border-radius: 999px;
  align-items: center;
  justify-content: center;
  background: var(--text-color);
  position: relative;
  flex-shrink: 0;

  @media (max-width: 1400px) {
    width: 50px;
    height: 50px;
  }
`;

export const LogoStem = styled.span`
  position: absolute;
  left: 14px;
  top: 10px;
  width: 14px;
  height: 38px;
  border-radius: 10px;
  background: var(--primary-600);
`;

export const LogoTop = styled.span`
  position: absolute;
  left: 26px;
  top: 10px;
  width: 24px;
  height: 10px;
  border-radius: 10px;
  background: var(--color-bg);
`;

export const LogoMid = styled.span`
  position: absolute;
  left: 26px;
  top: 26px;
  width: 18px;
  height: 10px;
  border-radius: 10px;
  background: var(--primary-300);
`;

export const LogoFull = styled.span`
  color: var(--text-color);
  font-size: 24px;
  font-weight: 700;
  letter-spacing: 0.3px;

  @media (max-width: 1400px) {
    ${({ $mobileDrawer }) =>
      !$mobileDrawer &&
      css`
        opacity: 0;
        width: 0;
        overflow: hidden;
        white-space: nowrap;
        transition: opacity 0.2s ease;
      `}
  }

  ${Container}:hover & {
    @media (max-width: 1400px) {
      opacity: 1;
      width: auto;
      overflow: visible;
    }
  }
`;