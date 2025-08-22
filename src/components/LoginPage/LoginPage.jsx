import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

export default function LoginPage() {
  const [nm_medico, setNmMedico] = useState("");
  const [cod_medico, setCodMedico] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3001/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome: nm_medico, codigo: cod_medico }),
      });

      const data = await response.json();

      if (data.success) {
        alert(`Bem-vindo Dr(a). ${data.medico.nome}!`);
        navigate("/dashboard");
      } else {
        setErro(data.message);
      }
    } catch (err) {
      console.error(err);
      setErro("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="login-page-wrapper">
      {/* Header */}
      <header className="login-header">
        <img 
            src="https://portal.senneliquor.com.br/static/media/logoHeaderReset.494673687d8bf62ae835b9a508bc09c3.svg" 
            alt="Visual login" 
          />
      </header>

      {/* Conteúdo principal: lado esquerdo imagem, lado direito login */}
      <div className="login-page">
        <div className="login-left">
          <img 
            src="https://portal.senneliquor.com.br/static/media/loginImage.f3ae72c261b5325c22b1.png" 
            alt="Visual login" 
          />
        </div>

        <div className="login-right">
          <div className="login-box">
            <h2 className="login-title">Login</h2>
            <form onSubmit={handleLogin} className="login-form">
          <div className="form-group">
            <label>Código do Médico</label>
            <input
              type="password"
              value={cod_medico}
              onChange={(e) => setCodMedico(e.target.value)}
              placeholder="Digite seu código"
              required
            />
          </div>
          <div className="form-group">
            <label>Nome do Médico</label>
            <input
              type="text"
              value={nm_medico}
              onChange={(e) => setNmMedico(e.target.value)}
              placeholder="Digite seu nome"
              required
            />
          
          </div>
          {erro && <p className="error-message">{erro}</p>}
          <button type="submit" className="btn-login">Entrar</button>
        </form>
          </div>
        </div>
      </div>
    </div>
  );
}