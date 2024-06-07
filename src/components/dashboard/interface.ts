export interface lobData {
    id: number;
      grade: string;
      LOB: string;
    eligibility: string;
    designation: string;
    certificateType: string;
  }
  
  export interface employeeData {
      employeeCode: string;
      employeeName: string;
      grade: string;
      nismStatus: string;
      LOB: string;
      officialMailAddress: string;
      designation: string;
      employeeStatus:string;
      statusOfCertificate:string;
  }
  export interface designationData {
     designation:string;
     
  }
  export interface PreviewCellRendererParams {
      data: employeeData;
    }
    export interface FakeServerRequest {
      filterModel: { [key: string]: any };
      sortModel: Array<{ colId: string; sort: string }>;
      startRow: number;
      endRow: number;
    }
    export interface FakeServerResponse {
      success: boolean;
      rows: employeeData[];
      lastRow: number;
    }
  export interface employeeDataWithId extends employeeData, lobData,designationData,FakeServerRequest ,PreviewCellRendererParams,FakeServerResponse{
      id: number;
      emailIcon?: string;
      editAction?: string;
     deleteAction?: string;
  }