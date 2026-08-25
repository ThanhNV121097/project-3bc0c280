'use client';

import { useEffect, useState } from 'react';
import styles from './GreetingScreen.module.css';

type GreetingResponse = {
  text: string;
};

export function GreetingScreen() {
  const [text, setText] = useState('');

  useEffect(() => {
    const apiBase = process.env.NEXT_PUBLIC_API_URL ?? '/api';

    fetch(`${apiBase}/v1/greeting`)
      .then((response) => response.json())
      .then((data: GreetingResponse) => setText(data.text))
      .catch(() => setText(''));
  }, []);

  return (
    <main className={styles['greeting-screen']}>
      <h1 className={styles['greeting-screen__heading']}>{text}</h1>
    </main>
  );
}
