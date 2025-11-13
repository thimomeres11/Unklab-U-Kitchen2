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
  background: "rgba(255,255,255,0.95)",
  borderRadius: "16px",
  padding: "80px 24px 32px 24px",
  minWidth: "320px",
  maxWidth: "90vw",
  boxShadow: "0 6px 32px rgba(0,0,0,0.09)",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  position: "relative",
};

const inputStyle: React.CSSProperties = {
  padding: "10px",
  margin: "8px 0 20px 0",
  borderRadius: "8px",
  border: "1px solid #ABD3D2",
  background: "#9D8311",
  fontSize: "1em",
};

const labelStyle: React.CSSProperties = {
  fontWeight: 500,
  marginBottom: "3px",
};

const buttonStyle: React.CSSProperties = {
  background: "linear-gradient(90deg, #ffe259 10%, #ff6a00 90%)",
  border: "none",
  borderRadius: "10px",
  color: "#fff",
  fontWeight: 700,
  fontSize: "1.1em",
  padding: "12px",
  marginTop: "10px",
  cursor: "pointer",
  boxShadow: "0 2px 10px rgba(255,106,0,0.08)",
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
    // Simpan nama ke localStorage untuk diambil di Home page
    localStorage.setItem("nama", nama);
    navigate("/home");
  };

  return (
    <div style={gradientBg}>
      <form onSubmit={handleSubmit} style={cardStyle}>
        <Logo />
        <div style={{ width: "100%" }}>
          <label style={labelStyle} htmlFor="nama">
            Nama
          </label>
          <input
            id="nama"
            type="text"
            style={inputStyle}
            placeholder="Masukkan nama"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            required
          />
        </div>
        <div style={{ width: "100%" }}>
          <label style={labelStyle} htmlFor="nomorhp">
            Nomor HP
          </label>
          <input
            id="nomorhp"
            type="tel"
            style={inputStyle}
            placeholder="08xxxxxx"
            value={nomorHp}
            onChange={(e) => setNomorHp(e.target.value)}
            pattern="^[0-9]{10,15}$"
            required
          />
        </div>
        <div style={{ width: "100%" }}>
          <label style={labelStyle} htmlFor="alamat">
            Asrama
          </label>
          <select
            id="alamat"
            style={inputStyle}
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
        <button type="submit" style={buttonStyle}>
          Login
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default Login;
