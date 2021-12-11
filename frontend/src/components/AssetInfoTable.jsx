import { Fragment } from 'react';
import { Table } from "react-bootstrap";

export default function AssetInfoTable(props){
  const { projectName, projectCategory, projectCompliance, projectAreaList, projectAssessors ,projectStartDate, projectClient, projectEndDate, projectAgency, projectNote } = props;
  return (
    <Fragment>
      <Table id="AssetInfoTable" responsive="md" bordered>
        <colgroup>
          <col width="5%"/>
          <col width="5%"/>
          <col width="5%"/>
          <col width="5%"/>
          <col width="5%"/>
          <col width="5%"/>
          <col width="5%"/>
          <col width="5%"/>
          <col width="5%"/>
          <col width="5%"/>
          <col width="5%"/>
          <col width="5%"/>
          <col width="5%"/>
          <col width="5%"/>
          <col width="5%"/>
          <col width="5%"/>
          <col width="5%"/>
          <col width="5%"/>
          <col width="5%"/>
          <col width="5%"/>
        </colgroup>
        <tbody>
          <tr>
            <th colSpan={2} rowSpan={2}>코드</th>
            <td colSpan={2} rowSpan={2}>S100</td>
            <th colSpan={2}>자산명</th>
            <td colSpan={10}>테스트 자산</td>
            <th colSpan={2}>자산가치</th>
            <td colSpan={2}>5</td>
          </tr>
          
          <tr>
            <th colSpan={2}>담당자</th>
            <td colSpan={4}>안지영</td>
            <th colSpan={2}>담당자</th>
            <td colSpan={4}>김개똥</td>
            <th colSpan={2}>신규여뷰</th>
            <td colSpan={2}>신규</td>
          </tr>

          
          <tr>
            <th colSpan={2}>진행과정</th>
            <td colSpan={2}>완료</td>
            <th colSpan={2}>비고</th>
            <td colSpan={14}>이것은 비고입니다.</td>
          </tr>
        </tbody>
      </Table>
    </Fragment>
  );
}