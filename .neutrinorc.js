const path = require('path');
module.exports = {
  options: {
    output: 'docs'
  },

  use: [
    ['neutrino-preset-react', {
      html: {
        appMountId: 'training',
        title: 'Valentin "zeropaper" Vago\'s page',
        template: path.join(__dirname,'src/index.ejs'),
        xhtml: true,
        mobile: true,
      }
    }]
  ]
};