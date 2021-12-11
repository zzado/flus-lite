import { Fragment } from 'react';
import { Table } from "react-bootstrap";

export default function AssetInfoTable(props){
  
  const { areaAlias, assetName } = props;

  const tableRows = () => {
    console.log(areaAlias);
    if (areaAlias === 'SRV' || areaAlias === 'DBM'){
        return (
          <Fragment>
          <tr>
            <th colSpan={2} rowSpan={2}>자산종류</th>
            <td colSpan={4} rowSpan={2}>{assetName}</td>
            <th colSpan={2}>호스트명</th>
            <td colSpan={6}>hostname</td>
            <th colSpan={3}>버전</th>
            <td colSpan={3}>R2021</td>
          </tr>
          <tr>
            <th colSpan={2}>URL</th>
            <td colSpan={6}>127.0.0.1</td>
            <th colSpan={3}>테스트/운영</th>
            <td colSpan={3}>테스트</td>
          </tr>
          
          </Fragment>
        )
    }else if(areaAlias === 'ISS'){
      return (
        <Fragment>
          <tr>
            <th colSpan={2} rowSpan={2}>자산종류</th>
            <td colSpan={4} rowSpan={2}>{assetName}</td>
            <th colSpan={2}>호스트명</th>
            <td colSpan={6}>hostname</td>
            <th colSpan={3}>버전</th>
            <td colSpan={3}>R2021</td>
          </tr>
          <tr>
            <th colSpan={2}>URL</th>
            <td colSpan={3}>127.0.0.1</td>
            <th colSpan={2}>제조사</th>
            <td colSpan={3}>테스트</td>
            <th colSpan={2}>테스트/운영</th>
            <td colSpan={2}>테스트</td>
          </tr>
        </Fragment>
      )
    }
  };


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
          {tableRows()}
          {/* if 서버, 데이터베이스, 정보보호시스템 */}
         
          


  

          <tr>
            <th colSpan={2}>비고</th>
            <td colSpan={14}>이것은 비고입니다.</td>
            <th colSpan={2}>진행과정</th>
            <td colSpan={2}>완료</td>          
          </tr>
        </tbody>
      </Table>
    </Fragment>
  );
}