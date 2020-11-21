const htmlmin = require('html-minifier');
const i18n = require('eleventy-plugin-i18n');
const translations = require('./src/_data/i18n');

/**
 * HTML minification using html-minifier
 */
function minifyHTML(content, outputPath) {
  if (outputPath.endsWith('.html')) {
    let minified = htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      collapseWhitespace: true
    });

    return minified;
  }

  return content;
}

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({
    'src/assets': '/assets',
    'src/scripts': '/scripts',
    'src/styles/css': '/styles'
  });

  // i18n plugin
  eleventyConfig.addPlugin(i18n, {
    translations,
    fallbackLocales: {
      '*': 'en'
    }
  });

  // HTML Minification
  eleventyConfig.addTransform('htmlmin', minifyHTML);

  return {
    passthroughCopy: true,
    markdownTemplateEngine: 'njk',
    templateFormats: ['html', 'md', 'njk'],
    dir: {
      input: 'src/pages',
      output: 'docs',
      data: '../_data',
      layouts: '../_layouts'
    }
  };
};

