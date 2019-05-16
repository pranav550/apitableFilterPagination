import { User } from "./../../user";
import { ApiService } from "./../../api.service";
import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
import * as XLSX from "xlsx";
import { MatSpinner } from "@angular/material";
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"]
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = [
    "id",
    "first_name",
    "last_name",
    "gender",
    "dob",
    "email",
    "phone",
    "website",
    "address",
    "status"
  ];
  // dataSource: MatTableDataSource<User>;
  dataSource: MatTableDataSource<User>;
  isLoading = true;

  allUser: User[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("table") table: ElementRef;

  constructor(private apiService: ApiService) {
    this.isLoading = true;
    this.apiService.getUsers().subscribe(data => {
      this.dataSource = new MatTableDataSource(data["result"]);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    this.isLoading = false;
  }

  ngAfterViewInit() {
    console.log("afterinit");
    setTimeout(() => {
      console.log(this.table.nativeElement.innerText);
    }, 5000);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  exportAsExcel() {
    console.log("export");
    this.table.nativeElement.style.background = "red";
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      this.table.nativeElement
    );
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

    /* save to file */
    XLSX.writeFile(wb, "SheetJS.xlsx");
    console.log("exported");
  }
}
