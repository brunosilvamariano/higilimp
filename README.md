# Higilimp

Prévia da Higilimp com header e hero, faixa de confiança e higienização empresarial, migrados do backup. As seções ainda não adaptadas permanecem no backup externo; o menu mantém a indicação de prévia para essas seções.

## Executar

Use a versão de Node indicada em .node-version.

```powershell
npm ci
npm run dev
```

## Validar

```powershell
npm run check
npm run build
```

## Estrutura

- src/app: página, layout, ícones e páginas de erro.
- src/components/higilimp: as três partes da prévia.
- src/components/ui: ícone vetorial do WhatsApp.
- src/config: navegação.
- src/styles: fontes locais.
- src/assets/fonts: Archivo e Inter Tight, com licenças.
- src/assets/images/higilimp: imagens e procedência das avaliações.

Não há public, work, docs, scripts ou testes herdados sem uso. node_modules e .next serão gerados ao instalar e executar. A prévia permanece com noindex e a imagem social existente no backup.
