module.exports = {
  title: '|> Saki',
  base: '/saki/',
  dest: 'docs',
  ignores: ["ignores/*"],
  head: [
    ['link', { rel: 'icon', href: './favicon.png' }]
  ],
  themeConfig: {
    nav: [
      { text: '/Saki', link: '/' },
      { text: '关于我', link: '/About Me' }
    ]
  }

}
