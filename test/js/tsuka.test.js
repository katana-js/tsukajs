var assert = chai.assert;
var expect = chai.expect;

describe('tsuka', function() {
	describe('tsuka.extend()', function () {
		beforeEach(function () {
			var o1 = {'a': 'a$', 'b': 'b$'};
			var o2 = {'c': 'c$', 'd': {}, 'e': []};

			o3 = tsuka.extend(o1, o2);
		});

		it('결과 객체는 확장한 객체의 프로퍼티를 가지고 있어야 합니다.', function () {
			assert.strictEqual(o3.c, 'c$', '결과 객체가 확장한 객체의 프로퍼티를 가지고 있지 않습니다.');
		});

		it('Object나 Array도 확장할 수 있어야 합니다.', function () {
			assert.instanceOf(o3.d, Object, '확장된 객체에 Object 프로퍼티가 복사되지 않았습니다.');
			assert.instanceOf(o3.e, Array, '확장된 객체에 Array 프로퍼티가 복사되지 않았습니다.');
		});
	});

	describe('tsuka.collect()', function () {
		before(function () {
			var foo = {a: 'A', b: 'B', c: 'C'};

			bar = tsuka.collect(foo, ['a', 'b']);
		});

		it('결과 객체는 주어진 키에 대응하는 프로퍼티를 가지고 있어야 합니다.', function () {
			assert.property(bar, 'a', '프로퍼티가 존재하지 않습니다.');
			assert.property(bar, 'b', '프로퍼티가 존재하지 않습니다.');
			assert.notProperty(bar, 'c', '프로퍼티가 존재합니다.');
		});

		it('결과 객체는 주어진 키에 대응하는 값을 가지고 있어야 합니다.', function () {
			assert.propertyVal(bar, 'a', 'A', '프로퍼티의 값이 일치하지 않습니다.');
			assert.propertyVal(bar, 'b', 'B', '프로퍼티의 값이 일치하지 않습니다.');
			assert.propertyNotVal(bar, 'c', void 0, '프로퍼티를 가지고 있습니다.');
		});
	});

	describe('tsuka.unique()', function () {
		it('배열이 아닌 값이 입력될 경우, 결과는 `undefined`입니다.', function () {
			var foo = 'foo';

			assert.strictEqual(tsuka.unique(foo), undefined, '결과가 `undefined`가 아닙니다.');
		});

		it('결과의 인스턴스는 `Array`여야 합니다.', function () {
			var foo = ['a', 'b', 'c'];

			assert.isArray(tsuka.unique(foo), '결과의 인스턴스는 `Array`가 아닙니다.');
		});

		it('결과 배열의 요소들 중 같은 값을 가진 요소가 있어서는 안됩니다.', function () {
			var foo = ['a', 'b', 'c', 'a', 'B', 'c', 'C', 'd'];
			var bar = tsuka.unique(foo); // -> ['a', 'b', 'c', 'B', 'C', 'd'], Length = 6

			assert.lengthOf(bar, 6, '결과의 길이가 예상과 다릅니다.');
			assert.deepEqual(bar, ['a', 'b', 'c', 'B', 'C', 'd'], '결과의 요소가 예상과 다릅니다.');
		});
	});

	describe('tsuka.instOf()', function () {
		it('대상의 클래스가 주어진 클래스와 동일해야 합니다.', function () {
			var arr = [];

			assert.isTrue(tsuka.instOf(arr, Array), 'Array의 인스턴스가 주어졌는데, 결과는 아니라고 나옵니다.');
			assert.isFalse(tsuka.instOf(arr, Object), 'Array의 인스턴스를 Object의 인스턴스라고 했는데 맞다는 결과입니다.');
		});
	});

	describe('tsuka.typeOf()', function () {
		it('대상의 타입이 주어진 타입과 동일해야 합니다.', function () {
			assert.isTrue(tsuka.typeOf('I am a string', 'string'), '`string`에 대한 타입을 판단하지 못했습니다.');
			assert.isTrue(tsuka.typeOf(255, 'number'), '`number`에 대한 타입을 판단하지 못했습니다.');
		});

		it('`Function`이나 `Array`에 대해서도 잘 동작해야 합니다.', function () {
			assert.isTrue(tsuka.typeOf(function () {
			}, 'function'), '`Function`에 대한 타입을 판단하지 못했습니다.');
			assert.isTrue(tsuka.typeOf([], 'object'), '`Array`에 대한 타입을 판단하지 못했습니다.');
		});
	});

	describe('tsuka.has()', function () {
		before(function () {
			foo = {bar: 'I am a property of foo.'};
		});

		it('대상이 특정 프로퍼티를 소유하고 있다면 `true`를 반환해야 합니다.', function () {
			assert.isTrue(tsuka.has(foo, 'bar'), '존재하는 프로퍼티를 존재하지 않는다고 판단했습니다.');
		});

		it('대상이 특정 프로퍼티를 소유하고 있지 않다면 `false`를 반환해야 합니다.', function () {
			assert.isFalse(tsuka.has(foo, 'Bar'), '존재하지 않는 프로퍼티를 존재한다고 판단했습니다.')
		});
	});

	describe('tsuka.isNum()', function () {
		it('대상이 숫자인 경우, 결과는 `true`를 반환해야 합니다.', function () {
			assert.isTrue(tsuka.isNum(255), '숫자를 숫자가 아니라고 판단했습니다.');
		});

		it('대상이 숫자가 아닌 경우, 결과는 `false`를 반환해야 합니다.', function () {
			assert.isFalse(tsuka.isNum('255'), '숫자 아닌 대상을 숫자라고 판단했습니다.');
		});

		it('대상이 `Function`이나 `Array`, `boolean`인 경우에도 정상 동작해야 합니다.', function () {
			assert.isFalse(tsuka.isNum(function () {
			}), '`Function`을 대상으로 숫자라고 판단했습니다.');
			assert.isFalse(tsuka.isNum([]), '`Array`을 대상으로 숫자라고 판단했습니다.');
			assert.isFalse(tsuka.isNum(true), '`boolean`을 대상으로 숫자라고 판단했습니다.');
			assert.isFalse(tsuka.isNum(false), '`boolean`을 대상으로 숫자라고 판단했습니다.');
			assert.isFalse(tsuka.isNum(undefined), '`undefined`을 대상으로 숫자라고 판단했습니다.');
		});
	});

	describe('tsuka.isStr()', function () {
		it('대상이 문자열인 경우, 결과는 `true`를 반환해야 합니다.', function () {
			assert.isTrue(tsuka.isStr('I am a string.'), '문자열을 문자열이 아니라고 판단했습니다.');
		});

		it('대상이 문자열이 아닌 경우, 결과는 `false`를 반환해야 합니다.', function () {
			assert.isFalse(tsuka.isStr(255), '숫자를 문자열이라고 판단했습니다.');
			assert.isFalse(tsuka.isStr(function () {
			}, '함수를 문자열이라고 판단했습니다.'));
			assert.isFalse(tsuka.isStr([]), '배열을 문자열이라고 판단했습니다.');
			assert.isFalse(tsuka.isStr(true), '`boolean`을 문자열이라고 판단했습니다.');
			assert.isFalse(tsuka.isStr(false), '`boolean`을 문자열이라고 판단했습니다.');
			assert.isFalse(tsuka.isStr(undefined), '`undefined`를 문자열이라고 판단했습니다.');
		});
	});

	describe('tsuka.isFn()', function () {
		it('대상이 함수인 경우, 결과는 `true`를 반환해야 합니다.', function () {
			assert.isTrue(tsuka.isFn(function () {
			}, '함수를 함수가 아니라고 판단했습니다.'));
		});

		it('대상이 함수가 아닌 경우, 결과는 `false`를 반환해야 합니다.', function () {
			assert.isFalse(tsuka.isFn('I am a string.'), '문자열을 함수라고 판단했습니다.');
			assert.isFalse(tsuka.isFn(255), '숫자를 함수라고 판단했습니다.');
			assert.isFalse(tsuka.isFn([]), '배열을 함수라고 판단했습니다.');
			assert.isFalse(tsuka.isFn(true), '`boolean`을 함수라고 판단했습니다.');
			assert.isFalse(tsuka.isFn(false), '`boolean`을 함수라고 판단했습니다.');
			assert.isFalse(tsuka.isFn(undefined), '`undefined`을 함수라고 판단했습니다.');
		});
	});

	describe('tsuka.isArr()', function () {
		it('대상이 배열인 경우, 결과는 `true`를 반환해야 합니다.', function () {
			assert.isTrue(tsuka.isArr([], '배열을 배열이 아니라고 판단했습니다.'));
		});

		it('대상이 배열이 아닌 경우, 결과는 `false`를 반환해야 합니다.', function () {
			assert.isFalse(tsuka.isArr('I am a string'), '문자열을 배열이라고 판단했습니다.');
			assert.isFalse(tsuka.isArr(255), '숫자를 배열이라고 판단했습니다.');
			assert.isFalse(tsuka.isArr(function () {
			}), '함수를 배열이라고 판단했습니다.');
			assert.isFalse(tsuka.isArr(true), '`boolean`을 배열이라고 판단했습니다.');
			assert.isFalse(tsuka.isArr(false), '`boolean`을 배열이라고 판단했습니다.');
			assert.isFalse(tsuka.isArr(undefined), '`undefined`을 배열이라고 판단했습니다.');
		});
	});

	describe('tsuka.isUndef()', function () {
		it('대상이 `undefined`인 경우, 결과는 `true`를 반환해야 합니다.', function () {
			assert.isTrue(tsuka.isUndef(undefined, '`undefined`를 `undefined`가 아니라고 판단했습니다.'));
		});

		it('대상이 `undefined`이 아닌 경우, 결과는 `false`를 반환해야 합니다.', function () {
			assert.isFalse(tsuka.isUndef('I am a string'), '문자열을 `undefined`라고 판단했습니다.');
			assert.isFalse(tsuka.isUndef(255), '숫자를 `undefined`라고 판단했습니다.');
			assert.isFalse(tsuka.isUndef([]), '배열을 `undefined`라고 판단했습니다.');
			assert.isFalse(tsuka.isUndef(function () {
			}), '함수를 `undefined`라고 판단했습니다.');
			assert.isFalse(tsuka.isUndef(true), '`boolean`을 `undefined`라고 판단했습니다.');
			assert.isFalse(tsuka.isUndef(false), '`boolean`을 `undefined`라고 판단했습니다.');
		});
	});

	describe('tsuka.isEl()', function () {
		it('대상이 `HTML element`인 경우, 결과는 `true`를 반환해야 합니다.', function () {
			var foo = document.createElement('div');

			assert.isTrue(tsuka.isEl(document.documentElement), '`element`를 `element`가 아니라고 판단했습니다.');
			assert.isTrue(tsuka.isEl(document.body), '`element`를 `element`가 아니라고 판단했습니다.');
			assert.isTrue(tsuka.isEl(foo), '`element`를 `element`가 아니라고 판단했습니다.');
		});

		it('대상이 `HTML element`가 아닌 경우, 결과는 `false`를 반환해야 합니다.', function () {
			assert.isFalse(tsuka.isEl(document), '`document`를 `element`라고 판단했습니다.');
			assert.isFalse(tsuka.isEl('I am a string.'), '문자열을 `element`라고 판단했습니다.');
			assert.isFalse(tsuka.isEl(255), '숫자를 `element`라고 판단했습니다.');
			assert.isFalse(tsuka.isEl([]), '배열을 `element`라고 판단했습니다.');
			assert.isFalse(tsuka.isEl(function () {
			}), ' `element`라고 판단했습니다.');
			assert.isFalse(tsuka.isEl(true), '`boolean`을 `element`라고 판단했습니다.');
		});
	});

	describe('tsuka.getFnName()', function () {
		it('주어진 함수의 이름을 정확히 가져와야 합니다.', function () {
			var foo = function bar() {
				// 몇 가지 변수들이 있습니다.
				var i, j, k = 0;
			};

			assert.strictEqual(tsuka.getFnName(foo), 'bar', '함수 이름이 일치하지 않습니다.');
		});

		it('함수가 아닌 다른 것이 전달되면 `undefined`가 반환되어야 합니다.', function () {
			assert.strictEqual(tsuka.getFnName('I am a string'), undefined, '문자열이 전달됐으나 반환값이 올바르지 않습니다.');
			assert.strictEqual(tsuka.getFnName(255), undefined, '문자열이 전달됐으나 반환값이 올바르지 않습니다.');
			assert.strictEqual(tsuka.getFnName([]), undefined, '문자열이 전달됐으나 반환값이 올바르지 않습니다.');
			assert.strictEqual(tsuka.getFnName(true), undefined, '문자열이 전달됐으나 반환값이 올바르지 않습니다.');
			assert.strictEqual(tsuka.getFnName(undefined), undefined, '문자열이 전달됐으나 반환값이 올바르지 않습니다.');
		});
	});

	describe('tsuka.style()', function () {
		it('요소에 대한 실제 스타일 값을 가져와야 합니다.', function () {
			var el = document.querySelector('.progress');

			assert.strictEqual(tsuka.style(el, 'display'), 'block', '요소에 대한 실제 스타일 값을 가져오지 못했습니다.');
		});

		it('요소에 대한 스타일 속성 목록을 가져와야 합니다.', function () {
			var el = document.querySelector('.progress');

			assert.instanceOf(tsuka.style(el), CSSStyleDeclaration, '요소에 대한 실제 스타일 목록을 가져오지 못했습니다.');
		});
	});

	describe('tsuka.unitToNum()', function () {
		it('pixel 값을 숫자로 변환해야 합니다.', function () {
			assert.strictEqual(tsuka.unitToNum('12px'), 12, 'pixel 값을 숫자로 변환하지 못했습니다.');
		});

		it('em 값을 숫자로 변환해야 합니다.', function () {
			assert.strictEqual(tsuka.unitToNum('12em'), 12, 'em 값을 숫자로 변환하지 못했습니다.');
		});

		it('숫자는 숫자로 반환합니다.', function () {
			assert.strictEqual(tsuka.unitToNum('12'), 12, '숫자를 숫자로 반환하지 못했습니다.');
		})
	});

	describe('tsuka.dataAttr()', function () {
		it('요소에 데이터 속성을 설정할 수 있어야 하고 설정된 속성 값을 가져올 수 있어야 합니다.', function () {
			var el = document.querySelector('.progress');

			tsuka.dataAttr(el, 'example', 'test');

			assert.strictEqual(tsuka.dataAttr(el, 'example'), 'test', '데이터 속성을 요소에 설정하지 못했거나 가져오지 못했습니다.')
		});

		it('데이터 속성에 대한 값이 null일 경우 해당 값을 삭제한다.', function () {
			var el = document.querySelector('.progress');

			tsuka.dataAttr(el, 'example', null);

			assert.notProperty(el.dataset, 'example', '데이터 속성에 대한 값을 삭제하지 못했습니다.');
		});
	});
});