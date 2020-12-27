module.exports = {
  bannerSizes: [
    { maxWidth: '575', imageSize: 'xs' },
    { maxWidth: '767', imageSize: 'sm' },
    { maxWidth: '991', imageSize: 'md' },
    { maxWidth: '1199', imageSize: 'lg' }
  ],
  bannerImages: [
    { name: 'banner1', description: 'Engagement rings' },
    // { name: 'banner2', description: 'Bride and Groom', class: 'img-banner2' }
  ],
  baseHref: process.env.NODE_ENV === 'production' ? '/weds-sruthila/' : '/'
};
