export class FakeServer {
  constructor(data) {
    this.data = data;
  }

  getData(request) {
    const { searchText } = request;

    let filteredData = this.data;

    if (searchText) {
      filteredData = filteredData.filter(item => 
        item.employeeCode.toLowerCase().includes(searchText.toLowerCase()) || 
        item.employeeName.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    const rowsThisPage = filteredData.slice(request.startRow, request.endRow);
    const lastRow = filteredData.length <= request.endRow ? filteredData.length : -1;

    return {
      success: true,
      rows: rowsThisPage,
      lastRow,
    };
  }
}
