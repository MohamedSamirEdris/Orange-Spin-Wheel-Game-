import WheelComponent from 'react-wheel-of-prizes';
import './style.css';
import logo from '../assets/icons/Logo.svg';
import next from '../assets/icons/Next.svg';
import frame from '../assets/icons/frame.svg';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

const Wheel = () => {
  const [resultValue, setResultValue] = useState();
  const [wonPrizes, setWonPrizes] = useState([]);
  const [won200EGPCount, setWon200EGPCount] = useState(0);
  const [won500EGPCount, setWon500EGPCount] = useState(0);
  const [won500BestwayCount, setWon500BestwayCount] = useState(0);
  const [wonBetterBunsCount, setWonBetterBunsCount] = useState(0);

  const navigate = useNavigate();
  const segments = [
    { label: '200 EGP ORANGE CASH', className: 'wheel-segment' }, //10 times won
    { label: 'HARD LUCK', className: 'wheel-segment-bold' },
    { label: '500 EGP ORANGE CASH', className: 'wheel-segment' }, // 4 times won
    { label: 'HARD LUCK', className: 'wheel-segment-bold' },
    { label: '1,000 EGP ORANGE CASH', className: 'wheel-segment' }, // one time won
    { label: 'HARD LUCK', className: 'wheel-segment-bold' },
    { label: '500 EGP BESTWAY', className: 'wheel-segment' }, // 10 times won
    { label: 'HARD LUCK', className: 'wheel-segment-bold' },
    { label: 'FREE MEAL  BETTER BUNS', className: 'wheel-segment' }, //10 times won
    { label: 'HARD LUCK', className: 'wheel-segment-bold' },
  ];

  const segColors = [
    '#000000',
    '#FFFFFF',
    '#000000',
    '#FFFFFF',
    '#000000',
    '#FFFFFF',
    '#000000',
    '#FFFFFF',
    '#000000',
    '#FFFFFF',
  ];

  const onFinished = (x) => {
    setResultValue(x);

    // Check if the prize has already been won
    if (wonPrizes.includes(x)) {
      console.log(`You've already won ${x}!`);
      // Handle the case where the prize has already been won
    } else {
      // Update the list of won prizes
      setWonPrizes((prevPrizes) => [...prevPrizes, x]);

      // Use the updated state value in the callback
      if (x === 'HARD LUCK') {
        console.log('Congratulations! You won something!', x);
      } else if (x === '1,000 EGP ORANGE CASH') {
        console.log('You won 1,000 EGP Orange Cash!');
      } else if (x === '200 EGP ORANGE CASH' && won200EGPCount < 10) {
        // Check if the count for 200 EGP ORANGE CASH is less than 10
        console.log('You won 200 EGP Orange Cash!');
        setWon200EGPCount((count) => count + 1);
      } else if (x === '500 EGP ORANGE CASH' && won500EGPCount < 4) {
        // Check if the count for 500 EGP ORANGE CASH is less than 4
        console.log('You won 500 EGP Orange Cash!');
        setWon500EGPCount((count) => count + 1);
      } else if (x === '500 EGP BESTWAY' && won500BestwayCount < 5) {
        // Check if the count for 500 EGP BESTWAY is less than 10
        console.log('You won 500 EGP Bestway!');
        setWon500BestwayCount((count) => count + 1);
      } else if (x === '500 EGP BESTWAY' && wonBetterBunsCount < 5) {
        // Check if the count for  BETTERBUNS is less than 10
        console.log('You won 500 EGP Bestway!');
        setWonBetterBunsCount((count) => count + 1);
      } else {
        console.log('Better luck next time!');
      }
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

      // Update stored date
      localStorage.setItem('lastVisitedDate', currentDate);
    }
  }, []);

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
          upDuration={100}
          downDuration={1000}
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
          style={{ width: '90%', maxWidth: '100px' }}
          onClick={handleNextButton}
        />
      </div>
    </div>
  );
};

export default Wheel;
