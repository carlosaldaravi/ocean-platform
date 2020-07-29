import { Test, TestingModule } from '@nestjs/testing';
import { LanguageService } from '../language.service';
import { LanguageRepository } from '../language.reposity';

const mockLanguageRepository = () => ({
  find: jest.fn(),
});

describe('LanguageService', () => {
  let languageService: LanguageService;
  let languageRepository: LanguageRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LanguageService,
        { provide: LanguageRepository, useFactory: mockLanguageRepository },
      ],
    }).compile();

    languageService = module.get<LanguageService>(LanguageService);
    languageRepository = module.get<LanguageRepository>(LanguageRepository);
  });

  describe('getAll', () => {
    it('gets all languages from the repository', async () => {
      languageRepository.find.mockResolvedValue('someValue');

      expect(languageRepository.find).not.toHaveBeenCalled();
      const result = await languageService.getAll();
      expect(languageRepository.find).toHaveBeenCalled();
      expect(result).toEqual('someValue');
    });
  });
});
