define([], function() {
	var html = {
		/**
		 * 요소의 실제 스타일 프로퍼티를 가져옵니다.
		 * @param el 요소
		 * @param property 프로퍼티 이름
		 * @returns {string} 프로퍼티 이름에 대한 스타일 프로퍼티
		 */
		style: function (el, property) {
			if (window.getComputedStyle) {
				return this.isStr(property) ?
					document.defaultView.getComputedStyle(el, null)[property] :
					document.defaultView.getComputedStyle(el, null);
			}

			if (el.currentStyle) {
				return el.currentStyle[property];
			}
		},
		/**
		 * 모든 단위의 값을 숫자로 변환합니다.
		 * @param val 어떤 단위에 해당하는 값
		 * @returns {number} 단위 값의 숫자
		 */
		unitToNum: function (val) {
			return this.isNum(val) ? val : parseInt(val.replace(/[^-\d\.]/g, ''));
		},
		/**
		 * 요소에 데이터 속성을 설정하거나 해당되는 값을 가져옵니다.
		 * @param el 요소
		 * @param name 데이터 속성의 이름
		 * @param value 설정하려는 값
		 * @returns {*} 값이 전달되지 않은 경우, 데이터 속성에 대한 값이 반환됩니다.
		 */
		dataAttr: function (el, name, value) {
			if (this.isUndef(value)) {
				return el.dataset[name];
			} else if (value === null) {
				delete el.dataset[name];
			} else {
				el.dataset[name] = value;
			}
		}
	};

	return html;
});