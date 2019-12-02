import _ from 'lodash';
import SaalPlan from './saalPlan'
import { default as sectionsPlan } from '../halls/plan1.svg'
require('../sass/styles.sass');

if(process.env.NODE_ENV !== 'production')
	console.log('DEVELOPMENT MODE');

init();

function init(){
	var appContainer = document.createElement('div');
	appContainer.id = "AppContainer"
	var saalContainer = document.createElement('div');
	saalContainer.innerHTML = sectionsPlan
	saalContainer.id = "SaalContainer"
	appContainer.appendChild(saalContainer);
	document.body.appendChild(appContainer);

	let saalPlan = new SaalPlan({
		container: '#AppContainer',
		dimensions: [600,600]
	})

	var button = document.createElement('button');
	var br = document.createElement('br');

	button.innerHTML = ('Click me and look into console!');
}
