/** @jsxImportSource preact */
/// <reference types="systemjs" />

import { render } from 'preact/compat';
import { App } from "./app";
import type { BasePlugin } from 'blinko';
import { Setting } from './setting';
import plugin from '../plugin.json';
import en from './locales/en.json';
import zh from './locales/zh.json';
import pt from './locales/pt.json';

/**
 * Prompt em português enviado ao agente de comentários do Blinko.
 * O servidor envia este texto como mensagem do usuário e, em seguida,
 * o conteúdo da nota, então as instruções abaixo controlam o idioma.
 */
const COMMENT_PROMPT_PT = `Você é o assistente de comentários do Blinko. Escreva um comentário sobre a nota abaixo.
Regras:
1. Responda SEMPRE em português do Brasil, independentemente do idioma da nota.
2. Use formatação Markdown.
3. Inclua 1 ou 2 emojis relevantes.
4. Mantenha um tom profissional e útil: acrescente uma reflexão, sugestão ou conexão relevante.
5. Seja conciso (50 a 150 palavras).
6. Não repita a nota inteira; comente sobre ela.`;

/**
 * Main plugin entry point registered with SystemJS
 * Exports the plugin class implementing BasePlugin interface
 */
System.register([], (exports) => ({
  execute: () => {
    exports('default', class Plugin implements BasePlugin {
      constructor() {
        // Initialize plugin with metadata from plugin.json
        Object.assign(this, plugin);
      }

      // Flag indicating this plugin has a settings panel
      withSettingPanel = true;

      /**
       * Renders the settings panel UI
       * @returns {HTMLElement} Container element with rendered settings component
       */
      renderSettingPanel = () => {
        const container = document.createElement('div');
        render(<Setting />, container);
        return container;
      }

      /**
       * Initializes the plugin
       * Sets up toolbar icons, right-click menus, and AI write prompts
       */
      async init() {
        // Initialize internationalization
        this.initI18n();
        
        // Add toolbar icon with click handler
        window.Blinko.addToolBarIcon({
          name: "test",
          icon: "<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' class='lucide lucide-file'><path d='M13 3H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z'/><polyline points='14 3 14 9 19 9'/></svg>",
          placement: 'top',
          tooltip: window.Blinko.i18n.t('title'),
          content: () => {
            const container = document.createElement('div');
            container.setAttribute('data-plugin', 'my-note-plugin');
            render(<App />, container);
            return container;
          }
        });

        // Add AI Comment right-click menu item
        window.Blinko.addRightClickMenu({
          name: 'ai-comment',
          label: window.Blinko.i18n.t('aiCommentMenu'),
          icon: 'material-symbols:comment',  
          onClick: async (note) => {
            try {
              const { toast, api, i18n } = window.Blinko;
              // Save toastId when showing loading
              const toastId = toast.loading(i18n.t('aiCommentProcessing'));
              
              // Call the AI Comment API
              await api.ai.AIComment.mutate({
                content: COMMENT_PROMPT_PT,
                noteId: note.id
              });
              
              // Dismiss loading toast before showing success
              toast.dismiss(toastId);
              toast.success(i18n.t('aiCommentSuccess'));
              
              // Refresh the UI to show the new comment
              window.Blinko.globalRefresh();
            } catch (error) {
              console.error('Error adding AI comment:', error);
              // Dismiss loading toast before showing error
              window.Blinko.toast.dismiss();
              window.Blinko.toast.error(window.Blinko.i18n.t('aiCommentError'));
            }
          }
        });

        // Add AI write prompt for translation
        window.Blinko.addAiWritePrompt(
          'Traduzir para português',
          'Traduza o conteúdo a seguir para o português do Brasil, mantendo a formatação Markdown:',
          'material-symbols:translate'
        );

        // window.Blinko.showDialog({
        //   title: 'Dialog',
        //   content: () => {
        //     const container = document.createElement('div');
        //     container.setAttribute('data-plugin', 'my-note-plugin');
        //     render(<App />, container);
        //     return container;
        //   }
        // })
      }

      /**
       * Initializes internationalization resources
       * Adds English, Chinese and Portuguese translation bundles
       */
      initI18n() {
        window.Blinko.i18n.addResourceBundle('en', 'translation', en);
        window.Blinko.i18n.addResourceBundle('zh', 'translation', zh);
        window.Blinko.i18n.addResourceBundle('pt', 'translation', pt);
        window.Blinko.i18n.addResourceBundle('pt-BR', 'translation', pt);
      }

      /**
       * Cleanup function called when plugin is disabled
       */
      destroy() {
        console.log('Plugin destroyed');
      }
    });
  }
}));