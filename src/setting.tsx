import { useState, useEffect } from 'preact/hooks';
import type { JSXInternal } from 'preact/src/jsx';

/**
 * Setting component for AI Comment plugin
 */
export function Setting(): JSXInternal.Element {
  const i18n = window.Blinko.i18n;

  return (
    <div className="max-w-2xl mx-auto p-2 rounded-lg">
      <h2 className="text-lg font-semibold mb-4">{i18n.t('title')}</h2>
      <div className="space-y-4">
        <p>{i18n.t('pluginDescription')}</p>
        <div className="bg-gray-100 p-3 rounded">
          <h3 className="font-medium mb-2">{i18n.t('howToUse')}</h3>
          <ul className="list-disc list-inside space-y-1 text-sm">
            <li>{i18n.t('step1')}</li>
            <li>{i18n.t('step2')}</li>
            <li>{i18n.t('step3')}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
