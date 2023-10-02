import { useContext, useEffect, useState } from 'react';
import styles from './app.module.css';
import { AppContext } from './context/context';
import { getCategories } from './services/categories';
import { setCategories } from './context/actions';
import VideosContainer from './modules/videos/videos-container';

export const App = () => {
  const { dispatch } = useContext(AppContext);
  const [dataFetched, setDataFetched] = useState(false);

  useEffect(() => {
    const fetchBaseData = async () => {
      try {
        const categories = await (getCategories());
        dispatch(setCategories(categories));
        setDataFetched(true);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchBaseData();
  }, [dispatch]);

  return (
    <>
      <header className={styles.header}>VManager </header>
      <main className={styles.main}>
        {dataFetched && <VideosContainer />}
      </main>

      <footer className={styles.footer}>VManager Demo v0.0.1</footer>
    </>
  );
};
