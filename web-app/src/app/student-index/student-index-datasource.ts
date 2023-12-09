import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {map} from 'rxjs/operators';
import {Observable, of as observableOf, merge} from 'rxjs';
import {Student} from "../../common/student";
// TODO: replace this with real data from your application
const EXAMPLE_DATA: Student[] = [
  {id: 1, address: "Kuala Lumpur City Centre Park 01", number: "0001", sex: 0, name: 'Hydrogen'},
  {id: 2, address: "Kuala Lumpur City Centre Park 02", number: "0002", sex: 0, name: 'Helium'},
  {id: 3, address: "Kuala Lumpur City Centre Park 03", number: "0003", sex: 0, name: 'Lithium'},
  {id: 4, address: "Kuala Lumpur City Centre Park 04", number: "0004", sex: 0, name: 'Beryllium'},
  {id: 5, address: "Kuala Lumpur City Centre Park 05", number: "0005", sex: 0, name: 'Boron'},
  {id: 6, address: "Kuala Lumpur City Centre Park 06", number: "0006", sex: 0, name: 'Carbon'},
  {id: 7, address: "Kuala Lumpur City Centre Park 07", number: "0007", sex: 0, name: 'Nitrogen'},
  {id: 8, address: "Kuala Lumpur City Centre Park 08", number: "0008", sex: 0, name: 'Oxygen'},
  {id: 9, address: "Kuala Lumpur City Centre Park 09", number: "0019", sex: 0, name: 'Fluorine'},
  {id: 10, address: "Kuala Lumpur City Centre Park 10", number: "0010", sex: 0, name: 'Neon'},
  {id: 11, address: "Kuala Lumpur City Centre Park 11", number: "0011", sex: 0, name: 'Sodium'},
  {id: 12, address: "Kuala Lumpur City Centre Park 12", number: "0012", sex: 0, name: 'Magnesium'},
  {id: 13, address: "Kuala Lumpur City Centre Park 13", number: "0013", sex: 0, name: 'Aluminum'},
  {id: 14, address: "Kuala Lumpur City Centre Park 14", number: "0014", sex: 0, name: 'Silicon'},
  {id: 15, address: "Kuala Lumpur City Centre Park 15", number: "0015", sex: 0, name: 'Phosphorus'},
  {id: 16, address: "Kuala Lumpur City Centre Park 16", number: "0016", sex: 0, name: 'Sulfur'},
  {id: 17, address: "Kuala Lumpur City Centre Park 17", number: "0017", sex: 0, name: 'Chlorine'},
  {id: 18, address: "Kuala Lumpur City Centre Park 18", number: "0018", sex: 0, name: 'Argon'},
  {id: 19, address: "Kuala Lumpur City Centre Park 19", number: "0019", sex: 0, name: 'Potassium'},
  {id: 20, address: "Kuala Lumpur City Centre Park 20", number: "0020", sex: 0, name: 'Calcium'},
];

/**
 * Data source for the StudentIndex view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class StudentIndexDataSource extends DataSource<Student> {
  data: Student[] = EXAMPLE_DATA;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Student[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {
  }

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Student[]): Student[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Student[]): Student[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'name':
          return compare(a.name, b.name, isAsc);
        case 'id':
          return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
