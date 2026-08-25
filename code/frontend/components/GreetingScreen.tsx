import { greetingResponse } from '../lib/mock/serve-centered-greeting-page';

export function GreetingScreen() {
  return (
    <main aria-label="Greeting screen" className="greeting-screen">
      <h1 className="greeting-screen__heading">{greetingResponse.text}</h1>
    </main>
  );
}
