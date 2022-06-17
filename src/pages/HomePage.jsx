import HeroBanner from '../components/Banner/HeroBanner';
import DragBox from '../components/DragBox/DragBox';

import MainLayout from '../components/Layout/MainLayout';

const HomePage = () => {
  return (
    <MainLayout>
      <HeroBanner />
      <DragBox />
    </MainLayout>
  );
};

export default HomePage;
