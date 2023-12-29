import WheelComponent from 'react-wheel-of-prizes';
import './style.css';
import logo from '../assets/icons/Logo.svg';
import next from '../assets/icons/Next.svg';
import frame from '../assets/icons/frame.svg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Wheel = () => {
  const [resultValue, setResultValue] = useState();
  const [wonPrizes, setWonPrizes] = useState(() => {
    const storedWonPrizes = localStorage.getItem('wonPrizes');
    return storedWonPrizes ? JSON.parse(storedWonPrizes) : [];
  });
  const [won1000EGPCount, setWon1000EGPCount] = useState(
    () => Number(localStorage.getItem('won1000EGPCount')) || 0
  );
  const [won200EGPCount, setWon200EGPCount] = useState(
    () => Number(localStorage.getItem('won200EGPCount')) || 0
  );
  const [won500EGPCount, setWon500EGPCount] = useState(
    () => Number(localStorage.getItem('won500EGPCount')) || 0
  );
  const [won500BestwayCount, setWon500BestwayCount] = useState(
    () => Number(localStorage.getItem('won500BestwayCount')) || 0
  );
  const [wonBetterBunsCount, setWonBetterBunsCount] = useState(
    () => Number(localStorage.getItem('wonBetterBunsCount')) || 0
  );

  const navigate = useNavigate();
  const segments = [
    ...(wonBetterBunsCount < 10
      ? [{ label: '200 EGP ORANGE CASH', className: 'wheel-segment' }]
      : [{ label: 'HARD LUCK', className: 'wheel-segment-bold' }]),
    //10 times won
    { label: 'HARD LUCK', className: 'wheel-segment-bold' },
    ...(wonBetterBunsCount < 4
      ? [{ label: '500 EGP ORANGE CASH', className: 'wheel-segment' }]
      : [{ label: 'HARD LUCK', className: 'wheel-segment-bold' }]),
    // 4 times won
    // { label: 'HARD LUCK', className: 'wheel-segment-bold' },
    ...(won1000EGPCount === 0
      ? [{ label: '1,000 EGP ORANGE CASH', className: 'wheel-segment' }]
      : [{ label: '200 EGP ORANGE CASH', className: 'wheel-segment' }]), // one time won
    // { label: 'HARD LUCK', className: 'wheel-segment-bold' },
    ...(won500BestwayCount < 1
      ? [{ label: '500 EGP BESTWAY', className: 'wheel-segment' }]
      : [{ label: 'HARD LUCK', className: 'wheel-segment-bold' }]),  // 10 times won
    // { label: 'HARD LUCK', className: 'wheel-segment-bold' },
    ...(wonBetterBunsCount < 5
      ? [{ label: 'FREE MEAL  BETTER BUNS', className: 'wheel-segment' }]
      : [{ label: 'HARD LUCK', className: 'wheel-segment-bold' }]), //10 times won
    // { label: 'HARD LUCK', className: 'wheel-segment-bold' },
  ];

  const segColors = [
    '#000000',
    '#FFFFFF',

    '#000000',
    '#FFFFFF',

    // won500BestwayCount >= 1 ? '#FFFFFF' : '#000000',

    '#000000',
    '#FFFFFF',

    // '#000000',
    // '#FFFFFF',
    // '#000000',
    // '#FFFFFF',
  ];

  const onFinished = (x) => {
    setResultValue(x);

    if (wonPrizes.includes(x)) {
      console.log(`You've already won ${x}!`);
    } else {
      if (x === 'HARD LUCK') {
        console.log('Congratulations! You won something!', x);
      } else if (x === '1,000 EGP ORANGE CASH' && won1000EGPCount === 0) {
        // Check if the count for 1,000 EGP ORANGE CASH is 0 (not won before)
        console.log('You won 1,000 EGP Orange Cash!');
        setWon1000EGPCount(1);
      } else if (x === '200 EGP ORANGE CASH' && won200EGPCount < 10) {
        console.log('You won 200 EGP Orange Cash!');
        setWon200EGPCount((count) => count + 1);
      } else if (x === '500 EGP ORANGE CASH' && won500EGPCount < 4) {
        console.log('You won 500 EGP Orange Cash!');
        setWon500EGPCount((count) => count + 1);
      } else if (x === '500 EGP BESTWAY' && won500BestwayCount < 5) {
        console.log('You won 500 EGP Bestway!');
        setWon500BestwayCount((count) => count + 1);
      } else if (x === 'FREE MEAL  BETTER BUNS' && wonBetterBunsCount < 5) {
        console.log('You won FREE MEAL BETTER BUNS!');
        setWonBetterBunsCount((count) => count + 1);
      } else {
        console.log('Better luck next time!');
      }

      // Update the list of won prizes
      setWonPrizes((prevPrizes) => [...prevPrizes, x]);
    }
  };

  const handleNextButton = () => {
    // Navigate to next page
    navigate('/result', { state: { resultValue } });
  };

  // logic for reset data if we reach a new day
  useEffect(() => {
    // Check if a new day has started
    const storedDate = localStorage.getItem('lastVisitedDate');
    const currentDate = new Date().toLocaleDateString();

    if (storedDate !== currentDate) {
      // Reset data for a new day
      setWonPrizes([]);
      setWon200EGPCount(0);
      setWon500EGPCount(0);
      setWon500BestwayCount(0);
      setWonBetterBunsCount(0);

      // Update stored date
      localStorage.setItem('lastVisitedDate', currentDate);
    }
  }, []);

  useEffect(() => {
    // Save state to localStorage whenever relevant state variables change
    localStorage.setItem('wonPrizes', JSON.stringify(wonPrizes));
    localStorage.setItem('won1000EGPCount', won1000EGPCount.toString());
    localStorage.setItem('won200EGPCount', won200EGPCount.toString());
    localStorage.setItem('won500EGPCount', won500EGPCount.toString());
    localStorage.setItem('won500BestwayCount', won500BestwayCount.toString());
    localStorage.setItem('wonBetterBunsCount', wonBetterBunsCount.toString());
  }, [
    wonPrizes,
    won1000EGPCount,
    won200EGPCount,
    won500EGPCount,
    won500BestwayCount,
    wonBetterBunsCount,
  ]);

  return (
    <div id="spin">
      <h1 className="text-titleColor text-9xl bg-primary font-bold mt-10">
        SPIN
      </h1>
      <h1 className="text-titleSub text-5xl font-bold">THE WHEEL</h1>
      <img
        src={frame}
        alt="frame"
        className="mb-10"
        style={{ width: '100%', maxWidth: '890px' }}
      />
      <div
        id="wheel-container"
        style={{
          position: 'absolute',
          top: '56%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      >
        <WheelComponent
          segments={segments.map((segment) => segment.label)}
          segColors={segColors}
          // winningSegment="HARD LUCK"
          onFinished={(x) => onFinished(x)}
          primaryColor="#FF7900"
          contrastColor="#FF7900"
          buttonText="Spin"
          isOnlyOnce={false}
          upDuration={10}
          downDuration={100}
        />
      </div>
      <div className="flex flex-row justify-between">
        <img
          src={logo}
          alt="logo"
          className="mb-10"
          style={{ width: '90%', maxWidth: '150px' }}
        />
        <img
          src={next}
          alt="next"
          className="mb-10 ml-40"
          style={{ width: '90%', maxWidth: '150px' }}
          onClick={handleNextButton}
        />
      </div>
    </div>
  );
};

export default Wheel;
