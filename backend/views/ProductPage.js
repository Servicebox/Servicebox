const React = require('react');

function ProductPage({ product }) {
  return React.createElement(
    'html',
    null,
    React.createElement(
      'head',
      null,
      React.createElement('title', null, product.name),
      React.createElement('meta', {
        name: 'description',
        content: product.description.substring(0, 160)
      })
    ),
    React.createElement(
      'body',
      null,
      React.createElement('h1', null, product.name),
      React.createElement('div', null, product.description),
      React.createElement('script', { src: '/client-bundle.js' })
    )
  );
}

module.exports = ProductPage;