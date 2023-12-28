import { useLocation, useNavigate } from 'react-router-dom';
import HardLuck from '../assets/results/hardluck.svg';
import Orange200 from '../assets/results/orange1.svg';
import Orange500 from '../assets/results/orange2.svg';
import Orange1000 from '../assets/results/orange3.svg';
import Bestway from '../assets/results/bestway.svg';
import Betbuns from '../assets/results/bettbuns.svg';
import logo from '../assets/icons/Logo.svg';
import refresh from '../assets/icons/Return.svg';

const Result = () => {
  const location = useLocation();
  const resultValue = location.state?.resultValue || null;
  const navigate = useNavigate();

  const resultSwitch = (result) => {
    switch (result) {
      case 'HARD LUCK':
        return <img src={HardLuck} alt="Hard Luck" />;
      case '200 EGP ORANGE CASH':
        return <img src={Orange200} alt="Hard Luck" />;
      case '500 EGP ORANGE CASH':
        return <img src={Orange500} alt="Hard Luck" />;
      case '1,000 EGP ORANGE CASH':
        return <img src={Orange1000} alt="Hard Luck" />;
      case '500 EGP BESTWAY':
        return <img src={Bestway} alt="Hard Luck" />;
      case 'FREE MEAL  BETTER BUNS':
        return <img src={Betbuns} alt="Hard Luck" />;
      default:
        return '';
    }
  };

  const handleRefreshButton = () => {
    navigate('/')
  };

  return (
    <div id="result">
      <div style={{ width: '100%', maxWidth: '500px' }}>
        {' '}
        {resultSwitch(resultValue)}
      </div>
      <div className="flex flex-row justify-around">
        <img
          src={logo}
          alt="logo"
          className="mb-10"
          style={{ width: '90%', maxWidth: '100px' }}
        />
        <img
          src={refresh}
          alt="next"
          className="mb-10 ml-40"
          style={{ width: '90%', maxWidth: '100px' }}
          onClick={handleRefreshButton}
        />
      </div>
    </div>
  );
};

export default Result;
