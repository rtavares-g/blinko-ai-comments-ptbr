import { useState } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';

export function App(): JSXInternal.Element {
  const [count, setCount] = useState(0);
  const i18n = window.Blinko.i18n;

  return (
    <>
      <h1>{i18n.t('title')}</h1>
      <div class="card">
        <p>{i18n.t('pluginInstalled')}</p>
        <p>{i18n.t('pluginHint')}</p>
      </div>
    </>
  );
}
