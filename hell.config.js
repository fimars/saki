module.exports = {
  title: '|> Saki',
  base: '/saki/',
  dest: 'docs',
  ignores: ["README.md", "ignores/*"],
  head: [
    ['link', { rel: 'icon', href: './favicon.png' }]
  ],
  themeConfig: {
    nav: [
      { text: '关于我', link: '/' },
      { text: '关于HellDoc', link: '/About Hell' }
    ]
  }
}