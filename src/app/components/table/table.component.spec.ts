import { async, ComponentFixture, TestBed, inject  } from '@angular/core/testing';

import { TableComponent } from './table.component';
import { FormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SearchPipe } from '../../shared/pipes/search/search.pipe';
import { HttpClientModule, HttpClient } from '@angular/common/http';

import { AppService } from '../../shared/services/app/app.service';


import { of } from 'rxjs';

describe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;
  let appService: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableComponent, SearchPipe ],
      imports: [FormsModule, HttpClientModule],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [HttpClient]
    })
    .compileComponents();
  }));

  beforeEach(inject([AppService], s => {
    appService = s;
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    // element = fixture.nativeElement;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Should execute oninit() method properly', () => {
    const response: any = {campaigninfo : []};
    spyOn(appService, 'getData').and.returnValue(of(response));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.originalData).toEqual(response.campaigninfo);
  });

  it('Should excute viewMore() method properly', () => {
    component.viewMore();
    fixture.detectChanges();
    expect(component.displayCount).toBe(20);
  });
});
