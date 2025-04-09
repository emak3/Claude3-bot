module.exports = {
    apps : [{
      name: 'discord-bot',
      script: 'index.js',
      cwd: 'C:/Users/nana_/Documents/Program/Claude3-bot', // Botのパス
      watch: false,
      env: {
        NODE_ENV: 'production'
      }
    }]
  }
  