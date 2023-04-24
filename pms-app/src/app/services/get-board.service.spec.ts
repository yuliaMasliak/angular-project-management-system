import { TestBed } from '@angular/core/testing';

import { GetBoardService } from './get-board.service';

describe('GetBoardService', () => {
  let service: GetBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
