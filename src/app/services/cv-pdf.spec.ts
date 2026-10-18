import { TestBed } from '@angular/core/testing';
import { CvPdf } from './cv-pdf';

describe('CvPdf', () => {
  let service: CvPdf;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CvPdf);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
