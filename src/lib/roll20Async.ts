//This is a modified version of the original file at
//https://github.com/onyxring/Roll20Async

function setActiveCharacterId(charId: string | boolean) {
	const oldAcid = getActiveCharacterId();
	const ev = new CustomEvent('message');
	(ev as any).data = { id: '0', type: 'setActiveCharacter', data: charId };
	self.dispatchEvent(ev);
	return oldAcid;
}

export const SetInterval = function (callback: () => void, timeout?: number) {
	const acid = getActiveCharacterId();
	setInterval(function () {
		const prevAcid = setActiveCharacterId(acid);
		callback();
		setActiveCharacterId(prevAcid);
	}, timeout);
};
export const SetTimeout = function (callback: () => void, timeout?: number) {
	const acid = getActiveCharacterId();
	setTimeout(function () {
		const prevAcid = setActiveCharacterId(acid);
		callback();
		setActiveCharacterId(prevAcid);
	}, timeout);
};
export function getAttrsAsync(attrs: string[]) {
	const acid = getActiveCharacterId(); //save the current activeCharacterID in case it has changed when the promise runs
	let prevAcid: string | boolean = false; //local variable defined here, because it needs to be shared across the promise callbacks defined below
	return new Promise<{ [attr: string]: string }>((resolve) => {
		prevAcid = setActiveCharacterId(acid); //in case the activeCharacterId has changed, restore it to what we were expecting and save the current value to restore later
		getAttrs(attrs, (values) => {
			resolve(values);
		});
	}).finally(() => {
		setActiveCharacterId(prevAcid); //restore activeCharcterId to what it was when the promise first ran
	});
}
//use the same pattern for each of the following...
export function setAttrsAsync(attrs: { [attr: string]: string }, options: { silent?: boolean }) {
	const acid = getActiveCharacterId();
	let prevAcid: string | boolean = false;
	return new Promise<{ [attr: string]: string }>((resolve) => {
		prevAcid = setActiveCharacterId(acid);
		setAttrs(attrs, options, (values) => {
			resolve(values);
		});
	}).finally(() => {
		setActiveCharacterId(prevAcid);
	});
}

export function getSectionIDsAsync(sectionName: string) {
	const acid = getActiveCharacterId();
	let prevAcid: string | boolean = false;
	return new Promise<string[]>((resolve) => {
		prevAcid = setActiveCharacterId(acid);
		getSectionIDs(sectionName, (values) => {
			resolve(values);
		});
	}).finally(() => {
		setActiveCharacterId(prevAcid);
	});
}
export function getSingleAttrAsync(attr: string) {
	const acid = getActiveCharacterId();
	let prevAcid: string | boolean = false;
	return new Promise<string>((resolve) => {
		prevAcid = setActiveCharacterId(acid);
		getAttrs([attr], (values) => {
			resolve(values[attr]);
		});
	}).finally(() => {
		setActiveCharacterId(prevAcid);
	});
}
