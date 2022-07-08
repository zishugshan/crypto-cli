const React = require('react');
const importJsx = require('import-jsx');
const {render} = require('ink');
const meow = require('meow');

const ui = importJsx('./ui');

const cli = meow(`
	Usage
	  $ cli-crypto-coins

	Options
		--name  Your name

	Examples
	  $ cli-crypto-coins --name=Zissu
	  Hello, Zissu
`);

render(React.createElement(ui, cli.flags));
