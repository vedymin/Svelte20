on('clicked:tabs_switch_button', (e) => {
	setAttrs({ tabs_selected_index: e.htmlAttributes['value'] });
});
export { }