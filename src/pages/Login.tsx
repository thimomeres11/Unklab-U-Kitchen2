import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Logo component dengan styling bulat dan di tengah
const Logo = () => (
  <div
    style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: "-70px",
      marginBottom: "8px",
      width: "100%",
    }}
  >
    <div
      style={{
        width: "140px",
        height: "140px",
        borderRadius: "50%",
        background: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0 6px 24px rgba(0,0,0,0.2)",
        padding: "12px",
        border: "5px solid rgba(255,255,255,1)",
        overflow: "hidden",
      }}
    >
      <img
        src="/images/menu/LogoUkitchen.png"
        alt="U-Kitchen Logo"
        style={{
          width: "100%",
          height: "100%",
          objectFit: "contain",
          borderRadius: "50%",
        }}
      />
    </div>
  </div>
);

const dormOptions = [
  "Crystal",
  "Jasmin 1",
  "Jasmin 2",
  "Edelweis",
  "Guesthouse",
  "Outsdier",
];

const gradientBg: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #ffe259 0%, #ff6a00 100%)",
};

const cardStyle: React.CSSProperties = {
  background: "rgba(255,255,255,0.98)",
  borderRadius: "20px",
  padding: "88px 32px 36px",
  minWidth: "320px",
  maxWidth: "380px",
  width: "90vw",
  boxShadow: "0 20px 60px rgba(0,0,0,0.12)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
  rowGap: "10px",
};

const inputStyle: React.CSSProperties = {
  padding: "12px",
  margin: "6px 0 18px",
  borderRadius: "12px",
  border: "1px solid #E4D9C5",
  background: "#FFFFFF",
  fontSize: "1em",
  width: "100%",
  color: "#2F1F0C",
  boxShadow: "0 2px 6px rgba(0,0,0,0.04)",
};

const labelStyle: React.CSSProperties = {
  fontWeight: 500,
  marginBottom: "6px",
  color: "#4B3310",
};

const buttonStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, #f0c04a 0%, #f07c00 100%)",
  border: "none",
  borderRadius: "14px",
  color: "#fff",
  fontWeight: 700,
  fontSize: "1.1em",
  padding: "14px",
  marginTop: "12px",
  cursor: "pointer",
  boxShadow: "0 8px 24px rgba(240,124,0,0.35)",
  width: "100%",
};

const Footer = () => (
  <div
    style={{
      marginTop: "32px",
      textAlign: "center",
      color: "#fff",
      fontWeight: 500,
    }}
  >
    © {new Date().getFullYear()} UNKLAB Cafeteria
  </div>
);

const Login: React.FC = () => {
  const [nama, setNama] = useState("");
  const [nomorHp, setNomorHp] = useState("");
  const [alamat, setAlamat] = useState(dormOptions[0]);
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("nama", nama);
    navigate("/home");
  };

  return (
    <div style={gradientBg}>
      <form onSubmit={handleSubmit} style={cardStyle}>
        <Logo />
        <div style={{ width: "100%", marginBottom: "4px" }}>
          <label style={labelStyle} htmlFor="nama">
            Nama
          </label>
          <input
            id="nama"
            type="text"
            style={inputStyle}
            className="login-input"
            placeholder="Masukkan nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>
        <div style={{ width: "100%", marginBottom: "4px" }}>
          <label style={labelStyle} htmlFor="nomorhp">
            Nomor HP
          </label>
          <input
            id="nomorhp"
            type="tel"
            style={inputStyle}
            className="login-input"
            placeholder="08xxxxxx"
            value={nomorHp}
            onChange={(e) => setNomorHp(e.target.value)}
            pattern="^[0-9]{10,15}$"
            required
          />
        </div>
        <div style={{ width: "100%", marginBottom: "4px" }}>
          <label style={labelStyle} htmlFor="alamat">
            Asrama
          </label>
          <select
            id="alamat"
            style={inputStyle}
            className="login-input"
            value={alamat}
            onChange={(e) => setAlamat(e.target.value)}
            required
          >
            {dormOptions.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" style={buttonStyle} className="login-button">
          Login
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default Login;
