import { SearchService } from './search.service';

jest.mock('@elastic/elasticsearch', () => ({ Client: jest.fn().mockImplementation(() => ({ search: jest.fn().mockResolvedValue({ hits: { hits: [] } }) })) }));

describe('SearchService', () => {
  it('returns hits array', async () => {
    const svc = new SearchService();
    const res = await svc.search('q');
    expect(res).toBeDefined();
  });
});

