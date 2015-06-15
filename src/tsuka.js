define([
	'./array.js',
	'./html.js',
	'./reflection.js'
], function(array, html, reflection) {
	var tsuka = {};

	/**
	 * 객체를 확장합니다.
	 * @param s 확장시킬 객체
	 * @returns {*|{}} 확장된 객체
	 */
	var extend = function (s) {
		s = s || {};

		for (var i = 1; i < arguments.length; i++) {
			var t = arguments[i];

			for (var p in t) {
				s[p] = t[p];
			}
		}

		return s;
	};

	extend(tsuka, {
		extend: extend,
	}, array, html, reflection);

	return tsuka;
});