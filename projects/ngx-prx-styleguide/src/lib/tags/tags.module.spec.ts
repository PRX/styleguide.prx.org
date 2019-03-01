import { TagsModule } from './tags.module';

describe('TagsModule', () => {
  let tagsModule: TagsModule;

  beforeEach(() => {
    tagsModule = new TagsModule();
  });

  it('should create an instance', () => {
    expect(tagsModule).toBeTruthy();
  });
});
