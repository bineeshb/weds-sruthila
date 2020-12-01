const htmlmin = require('html-minifier');
const i18n = require('eleventy-plugin-i18n');
const pluginSass = require('eleventy-plugin-sass');
const translations = require('./src/_data/i18n');

const srcRoot = 'src';
const srcAssets = `${srcRoot}/assets`;
const srcScripts = `${srcRoot}/scripts`;
const srcStyles = `${srcRoot}/styles`;
const distRoot = 'docs';
const distStyles = `${distRoot}/styles`;

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
    [srcAssets]: '/assets',
    [srcScripts]: '/scripts'
  });

  // Sass plugin
  eleventyConfig.addPlugin(pluginSass, {
    watch: `${srcStyles}/**/*.scss`,
    outputDir: distStyles
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
      input: `${srcRoot}/pages`,
      output: distRoot,
      data: '../_data',
      layouts: '../_layouts'
    }
  };
};

