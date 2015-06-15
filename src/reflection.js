define([], function() {
	var reflection = {
		/**
		 * 객체로부터, 주어진 키에 대한 프로터티만 뽑아서 가져옵니다.
		 * @param o 대상 객체
		 * @param ks 뽑아올 프로퍼티의 키 목록
		 * @returns {*} 키 목록에 의해 뽑힌 프로퍼티들의 객체
		 */
		collect: function (o, ks) {
			if (!(ks instanceof Array) || !o) return void 0;

			var co = {};

			ks.map(function (k) {
				co[k] = o[k];
			});

			return co;
		},
		/**
		 * 대상의 생성자가 무엇인지 판단합니다.
		 * @param t 대상
		 * @param c 클래스
		 * @returns {*} 대상의 생성자
		 */
		instOf: function (t, c) {
			return t.constructor === c;
		},
		/**
		 * 대상의 타입을 가져옵니다.
		 * @param t 대상
		 * @param type 대상의 타입 문자열
		 * @returns {boolean} 대상의 타입이 타입 문자열과 동일하면 true
		 */
		typeOf: function (t, type) {
			return typeof t === type;
		},

		/**
		 * 대상이 특정 프로퍼티를 가지고 있는지 판단합니다.
		 * @param t 대상
		 * @param p 프로퍼티 이름
		 * @returns {boolean} 대상이 프로퍼티 이름에 해당하는 프로퍼티를 소유하고 있으면 true
		 */
		has: function (t, p) {
			return t[p] ? true : false;
		},

		/**
		 * 대상이 숫자인지 판단합니다.
		 * 대상이 `Number`의 인스턴스인 경우에는 `false`를 반환합니다.
		 * @param t 대상
		 * @returns {boolean} 숫자면 `true`
		 */
		isNum: function (t) {
			return t + 0 === t;
		},
		/**
		 * 대상이 문자열인지 판단합니다.
		 * @param t 대상
		 * @returns {*}
		 */
		isStr: function (t) {
			return t !== void 0 && this.has(t, 'substr');
		},
		/**
		 * 대상이 함수인지 판단합니다.
		 * @param t
		 * @returns {*}
		 */
		isFn: function (t) {
			return t !== void 0 && this.instOf(t, Function);
		},
		isArr: function (t) {
			return t !== void 0 && this.instOf(t, Array);
		},
		/**
		 * 대상이 `undefined`인지 판단합니다.
		 * @param t 대상
		 * @returns {boolean} `undefined`이면 `true`
		 */
		isUndef: function (t) {
			return t === void 0;
		},
		/**
		 * 대상이 HTML 문서 요소인지 판단합니다.
		 * @param t 대상
		 * @returns {*|boolean} HTML 문서 요소이면 `true`
		 */
		isEl: function (t) {
			return t && t.nodeType === 1;
		},

		/**
		 * 함수의 이름을 가져옵니다.
		 * @param ƒ 대상 함수
		 * @returns {*} 함수의 이름
		 */
		getFnName: function (ƒ) {
			var fnName = void 0;

			if (this.isFn(ƒ)) {
				ƒ.toString().replace(/^function\s*([\w]+)\([\w]*\)[\s\r]*\{[\s\S]+}$/, function (m, p1) {
					fnName = p1;
				});
			}

			return fnName;
		}
	};

	return reflection;
});