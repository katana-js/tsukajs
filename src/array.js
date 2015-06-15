define([], function() {
	var array = {
		/**
		 * 대상이 `Array`일 경우, 배열 요소 중 동일한 값을 가지는 요소들을 제거하고 유일한 값들로 이루어진 새로운 배열로 만든다.
		 * @param t 대상
		 * @param sorting (optional) 정렬 여부
		 * @returns {*} 유일한 값들로 이루어진 배열
		 */
		unique: function (t) {
			if (!this.isArr(t)) return;

			var ua = [],
				i = -1;

			if (arguments[1]) t.sort();

			while (t.length - 1 > i++) {
				if (ua.indexOf(t[i]) === -1) {
					ua.push(t[i]);
				}
			}

			return ua;
		}
	};

	return array;
});