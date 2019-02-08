import { Component, OnInit } from '@angular/core';
import { AppService } from '../../shared/services/app/app.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  public dataSource: any[] = [];
  public displayCount: number = 10;
  public originalData: any[] = [];
  constructor(private appService: AppService) { }

  ngOnInit() {
    this.appService.getData().subscribe((res)=> {
      this.originalData = res.campaigninfo;
      this.prepareData();
    })
  }

  public viewMore() {
    this.displayCount += 10;
    this.prepareData();
  }

  public prepareData() {
    this.dataSource = this.originalData.slice(0, this.displayCount);
  }

  public sortData(key, order, type) {
    if (type === 'string') {
      this.dataSource.sort(function(a, b){
          var x = key === 'createdBy' ? a[key]["displayName"].toLowerCase() : a[key].toLowerCase();
          var y = key === 'createdBy' ? b[key]["displayName"].toLowerCase() : b[key].toLowerCase();
          if (x < y) {return order === 'asc' ? -1 : 1;}
          if (x > y) {return order === 'asc' ? 1 : -1;}
          return 0;
      });
    } else if (type === 'number') {
      this.dataSource.sort(function(a, b){
        return order === 'asc' ? a[key]-b[key] : b[key]-a[key];
      });
    }
  }

}
