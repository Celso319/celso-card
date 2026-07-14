# Celso Card

Site pessoal estático e cartão de visita digital de **Celso Arthur**.

O projeto foi desenvolvido em HTML, CSS e JavaScript puro, sem framework e
sem etapa de compilação. Ele pode ser hospedado diretamente em Nginx,
Apache, GitHub Pages, Cloudflare Pages ou qualquer serviço de arquivos
estáticos.

## Funcionalidades

- Layout responsivo para computadores e celulares
- Cartão profissional com contatos
- Fundo animado com ícones SVG
- Ícones coloridos de tecnologias self-hosted
- Favicon próprio
- Respeito à preferência de redução de movimento do navegador
- Remoção automática de ícones ausentes
- Ano do rodapé atualizado automaticamente
- Sem dependências JavaScript

## Estrutura

```text
celso-card/
├── index.html
├── README.md
├── .gitignore
├── assets/
│   ├── favicon.svg
│   └── icons/
│       ├── selfhst--cloudflare.svg
│       ├── selfhst--docker.svg
│       ├── selfhst--esphome.svg
│       ├── selfhst--gitlab.svg
│       ├── selfhst--grafana.svg
│       ├── selfhst--home-assistant.svg
│       ├── selfhst--jellyfin.svg
│       ├── selfhst--matrix-light.svg
│       ├── selfhst--postgresql.svg
│       ├── selfhst--prometheus.svg
│       ├── selfhst--proxmox.svg
│       ├── selfhst--traefik.svg
│       ├── selfhst--vaultwarden-light.svg
│       └── selfhst--victoriametrics-light.svg
├── css/
│   └── style.css
└── js/
    └── main.js
```

## Adicionando os ícones

Copie seus arquivos SVG para:

```text
assets/icons/
```

Os nomes dos arquivos precisam corresponder aos nomes configurados no
arquivo `js/main.js`.

Exemplo:

```javascript
{
  name: "Docker",
  file: "selfhst--docker.svg",
  featured: true
}
```

A propriedade `featured` controla se o ícone também aparece dentro do
cartão:

```javascript
featured: true
```

Os ícones continuam aparecendo no fundo animado mesmo quando
`featured` for `false`.

## Executando localmente

Como o projeto é estático, ele pode ser aberto diretamente pelo navegador.
Entretanto, para reproduzir melhor o ambiente de produção, use um servidor
HTTP local.

Com Python:

```bash
python3 -m http.server 8080
```

Depois acesse:

```text
http://localhost:8080
```

## Publicação no AlmaLinux com Nginx

Instale e habilite o Nginx:

```bash
sudo dnf install nginx -y
sudo systemctl enable --now nginx
```

Clone o repositório:

```bash
cd /tmp
git clone https://github.com/Celso319/celso-card.git
```

Copie o site para o diretório público:

```bash
sudo rsync -av --delete celso-card/ /usr/share/nginx/html/
```

Ajuste os contextos do SELinux:

```bash
sudo restorecon -Rv /usr/share/nginx/html
```

Valide e recarregue o Nginx:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

## Atualizando o site

```bash
cd /tmp/celso-card
git pull
sudo rsync -av --delete ./ /usr/share/nginx/html/
sudo restorecon -Rv /usr/share/nginx/html
sudo nginx -t
sudo systemctl reload nginx
```

Para evitar copiar arquivos internos do Git para a raiz pública, use:

```bash
sudo rsync -av   --delete   --exclude ".git/"   --exclude ".gitignore"   --exclude "README.md"   ./ /usr/share/nginx/html/
```

## Criando o repositório

Dentro da pasta do projeto:

```bash
git init
git add .
git commit -m "feat: adiciona cartão pessoal"
git branch -M main
git remote add origin https://github.com/Celso319/celso-card.git
git push -u origin main
```

Crie previamente o repositório vazio no GitHub, sem README automático, para
evitar conflito no primeiro envio.

## Personalização

Os dados pessoais ficam em `index.html`.

As cores, espaçamentos e animações ficam em:

```text
css/style.css
```

A lista de tecnologias e a geração dos ícones ficam em:

```text
js/main.js
```

As principais cores podem ser alteradas pelas variáveis no início do CSS:

```css
:root {
  --background: #020617;
  --accent: #38bdf8;
  --text: #f8fafc;
}
```

## Privacidade e segurança

O site exibe tecnologias e áreas de conhecimento, mas não publica:

- endereços IP
- nomes internos de hosts
- portas
- topologia real da rede
- versões dos serviços
- credenciais ou tokens
- rotas administrativas

Evite transformar a página pública em documentação detalhada da
infraestrutura.

## Créditos dos ícones

Os SVGs utilizados pelo projeto devem manter as condições de licença e
atribuição da coleção de onde foram obtidos.

Este repositório não inclui os ícones de terceiros por padrão. Adicione os
arquivos que você já possui em `assets/icons/` e confira a licença da coleção
antes de redistribuí-los.

## Licença

O código do site pode ser licenciado conforme sua preferência. Uma opção
simples para projeto público é a licença MIT.
