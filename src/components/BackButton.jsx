import { useNavigate } from 'react-router-dom';

export default function BackButton() {
  const navigate = useNavigate();

  function handleBack() {
    if (window.history.state?.idx > 0) {
      navigate(-1);
    } else {
      navigate('/');
    }
  }

  return (
    <button className="secondary-button" onClick={handleBack}>
      Voltar
    </button>
  );
}
