# Higilimp — proposta de header e hero

Escopo: apresentação apenas com header e hero; demais seções existentes ficam preservadas fora da renderização. Referência de composição: https://biizuv.webflow.io/.

Direção: painel azul com cantos arredondados, menu central recortado no topo, tipografia grande em degradê atrás do retrato, conteúdo branco nos cantos inferiores e CTA em cápsula com acabamento luminoso. Azul Higilimp, branco e marinho; DM Sans local. Mobile: navegação recolhida, retrato central, texto e ação abaixo, sem sobreposição.

Estrutura final desta apresentação: app/layout.tsx → fontes e metadados Higilimp; app/page.tsx → HigilimpPreview; components/higilimp/preview.tsx + preview.css → header, menu acessível e hero; src/assets/images/higilimp → logo e retrato WebP.

Imagem preparada com ferramenta nativa image_gen. Prompt final: extrair o proprietário central da captura fornecida, preservar identidade, óculos, barba, expressão, polo e braços cruzados; remover fundo, montagem e textos; reconstruir parte inferior do polo e braços com iluminação natural; recorte realista em transparência. Arquivo final: src/assets/images/higilimp/proprietario.webp. Logo obtido do site oficial.

Contato confirmado no site oficial: (47) 99250-9755. Links de navegação apontam ao site existente; esta apresentação não inventa seções nem métricas.

## Ajuste da navegação — 19/10/2026

Manter a composição do header/hero da Biizuv e a hierarquia de navegação do Fritz: Serviços, Resultados, Sobre e Contato na barra; dez entradas no painel completo. A navegação compartilhada existente é a fonte das entradas; apenas o nome da empresa e a âncora de Sobre são adaptados. Painel modal com fechamento por Escape, foco contido e retorno ao toggle. Demais seções continuam preservadas em src/sections/home e não são montadas na prévia. Links dessas seções informam que o conteúdo permanece oculto; Contato abre o WhatsApp real. Imagens locais passam a imports estáticos em src/assets/images/higilimp, seguindo a organização do repositório.

## Correspondência com a referência — fontes, cores e movimento

Fontes oficiais Google Fonts, hospedadas localmente com OFL: Archivo 500 para chamada, 600 para palavra de fundo; Inter Tight 500/16px no menu, 400/18px no texto e 600/16px no CTA. Substituem DM Sans apenas na apresentação Higilimp. Cores medidas: #2d78e4 no céu/fundo, #2739ff nas ações, #111214 no grafite, #fff no branco. Curva do menu utiliza as coordenadas do clip-path da referência.

Entrada reproduzida com GSAP e SplitText já instalados: expansão central de .25 a 1.75s, imagem de escala 1.25 a 1 em 1.25s, palavra de fundo a partir de 1.59s, chamada em caracteres a partir de 2.11s (stagger .02s), parágrafo/ação a partir de 2.94s (.15s). Redução de movimento respeitada; divisões de texto revertidas ao terminar para preservar responsividade e seleção. Sem scripts/CDN da referência em produção.
