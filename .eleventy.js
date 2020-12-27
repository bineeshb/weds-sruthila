const htmlmin = require('html-minifier');
const pluginSass = require('eleventy-plugin-sass');

const srcRoot = 'src';
const srcAssets = `${srcRoot}/assets`;
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
    [srcAssets]: '/assets'
  });

  // Sass plugin
  eleventyConfig.addPlugin(pluginSass, {
    watch: `${srcStyles}/**/*.scss`,
    outputDir: distStyles
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

