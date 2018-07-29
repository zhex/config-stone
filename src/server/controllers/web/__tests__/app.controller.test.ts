import { Test } from '@nestjs/testing';
import { AppService } from '../../../services/app.service';
import { AppController } from '../app.controller';

describe('AppController', () => {
	let ctrl: AppController;
	let svc: AppService;

	beforeEach(async () => {
		const module = await Test.createTestingModule({
			controllers: [AppController],
			providers: [{
				provide: 'AppService',
				useValue: {
					all: () => [],
				},
			}],
		}).compile();

		ctrl = module.get<AppController>(AppController);
		svc = module.get<AppService>(AppService);
	});

	describe('all', () => {
		it('should return an array of apps', async () => {
			const result = [];
			jest.spyOn(svc, 'all').mockImplementation(() => result);
			expect(await ctrl.all()).toBe(result);
		});
	});
});
