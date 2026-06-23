/* ================= STYLES ================= */
import styled from "styled-components";

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

const Logo = styled.div`
  width: 72px;
  height: 72px;

  border-radius: 20px;

  background: rgba(255,255,255,0.15);

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 32px;
  margin-bottom: 20px;
`;

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

