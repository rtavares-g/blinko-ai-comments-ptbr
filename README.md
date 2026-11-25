# Blinko – Comentário IA (PT-BR)

Versão traduzida do plugin [blinko-ai-comments](https://github.com/quickflash2/blinko-ai-comments) para o Blinko, com interface e prompts em português do Brasil.

## O que muda em relação ao original

- 🇧🇷 **Comentários sempre em português**: o plugin envia ao agente de comentários do Blinko um prompt em português que obriga a resposta em PT-BR, mesmo que a nota esteja em outro idioma.
- 🌐 **Interface em português**: menu, avisos e painel de configurações traduzidos (inglês e chinês continuam disponíveis).
- ✍️ **Prompt de escrita "Traduzir para português"**: substitui o prompt original de tradução para inglês.

## Instalação

1. No Blinko, abra **Configurações → Plugins**.
2. Instale pelo endereço do repositório: `https://github.com/rtavares-g/blinko-ai-comments-ptbr`
   (o Blinko baixa o `release.zip` da release mais recente).
3. Ative o plugin **Comentário IA (PT-BR)**.

Se preferir, baixe o `release.zip` da [página de releases](https://github.com/rtavares-g/blinko-ai-comments-ptbr/releases) e instale manualmente.

## Como usar

1. Clique com o botão direito em qualquer nota.
2. Escolha **Comentário IA**.
3. Aguarde o aviso "Gerando comentário com IA...". O comentário aparece na nota quando terminar.

O plugin usa o modelo de IA configurado no Blinko; não há configuração extra.

## Personalizar o prompt

O prompt fica em `src/index.tsx`, na constante `COMMENT_PROMPT_PT`. Edite, recompile e publique uma nova release:

```bash
npm install
npx vite build --mode production
```

## Licença

MIT, como o projeto original.
