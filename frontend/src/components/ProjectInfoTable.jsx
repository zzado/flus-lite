import { Fragment } from 'react';
import { Table } from "react-bootstrap";

export default function ProjectInfoTable(props){
  const { projectName, projectCategory, projectCompliance, projectAreaList, projectAssessors ,projectStartDate, projectClient, projectEndDate, projectAgency, projectNote } = props;
  return (
    <Fragment>
      <Table responsive="md" bordered>
        <colgroup>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
          <col width="10%"/>
        </colgroup>
        <thead/>
        <tbody>
          <tr>
            <th colSpan={1}>프로젝트명</th>
            <td colSpan={6}>{projectName}</td>
            <th colSpan={1}>종합/공개용</th>
            <td colSpan={2}>{projectCategory}</td>
          </tr>
          <tr>
            <th colSpan={1}>평가기준</th>
            <td colSpan={2}>{projectCompliance}</td>
            <th colSpan={1}>평가분야</th>
            <td colSpan={6}>{projectAreaList}</td>
          </tr>
          <tr>
            <th colSpan={1}>프로젝트 시작일</th>
            <td colSpan={2}>{projectStartDate}</td>
            <th colSpan={1}>평가대상 기관</th>
            <td colSpan={2}>{projectClient}</td>
            <th colSpan={1} rowSpan={2}>평가자</th>
            <td colSpan={3} rowSpan={2}>{projectAssessors}</td>
          </tr>
          <tr>
            <th colSpan={1}>프로젝트 종료일</th>
            <td colSpan={2}>{projectEndDate}</td>
            <th colSpan={1}>평가 기관</th>
            <td colSpan={2}>{projectAgency}</td>
          </tr>            
          <tr>
            <th colSpan={1}>비고</th>
            <td colSpan={9}>{projectNote}</td>
          </tr>
        </tbody>
      </Table>
    </Fragment>
  );
}