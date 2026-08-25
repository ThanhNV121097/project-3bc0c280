import styles from './GreetingScreen.module.css';
import { greetingResponse } from '../lib/mock/serve-centered-greeting-page';

export function GreetingScreen() {
  return (
    <main className={styles['greeting-screen']}>
      <h1 className={styles['greeting-screen__heading']}>{greetingResponse.text}</h1>
    </main>
  );
}
