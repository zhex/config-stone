import { flat2nested, getExt, stripExt } from '../utils';

describe('flat2nested', () => {
	it('should convert to nested format', () => {
		const flat = {
			'a.b.c': 1,
			'a.b.d': 2,
			'a.e': 3,
		};

		const nestd = {
			a: {
				b: {
					c: 1,
					d: 2,
				},
				e: 3,
			}
		};
		expect(flat2nested(flat)).toEqual(nestd);
	});
});

describe('getExt', () => {
	it('should return file ext', () => {
		const str = 'hello.txt';
		expect(getExt(str)).toEqual('txt');
	});

	it('should return false for non ext file', () => {
		const str = 'hello';
		expect(getExt(str)).toBeNull();
	});
});

describe('stripExt', () => {
	it('should return non ext file string', () => {
		const str = 'hello.txt';
		expect(stripExt(str)).toEqual('hello');
	});

	it('should keep same for no ext file', () => {
		const str = 'hello';
		expect(stripExt(str)).toEqual('hello');
	});
});

