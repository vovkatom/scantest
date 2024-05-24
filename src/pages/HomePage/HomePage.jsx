import { useState, useEffect } from 'react';
import Header from '../../components/Header/Header';
import SideBar from '../../components/SideBar/SideBar';
import ScreensPage from '../ScreensPage/ScreensPage';
import css from './HomePage.module.css';
import { useMediaQuery } from 'react-responsive';

const HomePage = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const viewPortWidth = useMediaQuery({ minWidth: 1440 });

  useEffect(() => {
    setIsSidebarOpen(viewPortWidth);
  }, [viewPortWidth]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <Header toggleSidebar={toggleSidebar} />
      {isSidebarOpen && (
        <SideBar viewPortWidth={viewPortWidth} isOpen={toggleSidebar} />
      )}
      <div className={css.background}>
        <div className={css.screenPageContainer}>
          <ScreensPage />
        </div>
      </div>
    </>
  );
};
export default HomePage;
