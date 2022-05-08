module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "navbar-bg":"#291547cc",
        
      },
      backgroundImage: {
        'zing-mp3': "url('https://zmp3-static.zadn.vn/skins/zmp3-v6.1/images/backgrounds/logo-dark.svg')",
        "newrelease":"linear-gradient(to bottom, rgba('#7ed56f',0.8), rgba('#28b485',0.8)), url('https://zjs.zmdcdn.me/zmp3-desktop/releases/v1.6.20/static/media/new-release-bg.73d8f976.jpg')",
        "playMp3":"url(https://zmp3-static.zmdcdn.me/skins/zmp3-v6.1/images/icons/icon-playing.gif)"
      }
    },
  },
  plugins: [],
}