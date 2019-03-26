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
      { text: '关于我', link: '/' },
      { text: '关于HellDoc', link: '/About Hell' },
      { text: 'More Webpack', link: '/More Webpack' },
      { text: 'Bash指令1', link: '/Bash Step By Step - Start && CP1' },
      { text: 'Bash指令2', link: '/Bash Step By Step - CP2' }
    ]
  }
}