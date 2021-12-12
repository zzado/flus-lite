import { Fragment } from 'react';
import { Table } from "react-bootstrap";

export default function AssetInfoTable(props){
  
  const { projectId, areaAlias, assetName, assetCode, assetNote, assetHostname, assetSwitchBool, assetExternalBool, assetPWDCycle, assetURL, assetIsFinancialBool, assetIsHttpsBool, assetVersion, assetAssessors, assetPlatform, assetProductModel, assetValue, assetOperator, assetAnalysisDoneBool, assetIsTestBool, assetIsServerBool, assetIsNewBool } = props;
  
  const tableRows = () => {
    if (areaAlias === 'SRV' || areaAlias === 'DBM'){
        return (
          <Fragment>
          <tr>
            <th colSpan={2} rowSpan={2}>자산종류</th>
            <td colSpan={4} rowSpan={2}>{assetName}</td>
            <th colSpan={2}>호스트명</th>
            <td colSpan={6}>hostname</td>
            <th colSpan={2}>버전</th>
            <td colSpan={4}>R2021</td>
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
            <th colSpan={2}>버전</th>
            <td colSpan={4}>R2021</td>
          </tr>
          <tr>
            <th colSpan={2}>URL</th>
            <td colSpan={3}>http://zzado.kr.banking</td>
            <th colSpan={2}>제조사</th>
            <td colSpan={3}>테스트</td>
            <th colSpan={2}>테스트/운영</th>
            <td colSpan={2}>테스트</td>
          </tr>
        </Fragment>
      )
    }else if(areaAlias === 'NET'){
      return(
        <Fragment>
          <tr>
            <th colSpan={2} rowSpan={3}>자산종류</th>
            <td colSpan={4} rowSpan={3}>{assetName}</td>
            <th colSpan={2}>호스트명</th>
            <td colSpan={6}>hostname</td>
            <th colSpan={2}>버전</th>
            <td colSpan={4}>R2021</td>
          </tr>
          <tr>
            <th colSpan={2}>URL</th>
            <td colSpan={2}>http://zzado.kr.banking</td>
            <th colSpan={2}>제조사</th>
            <td colSpan={4}>테스트</td>
            <th colSpan={2}>테스트/운영</th>
            <td colSpan={2}>테스트</td>
          </tr>
          <tr>
            <th colSpan={2}>스위치 여부</th>
            <td colSpan={2}>스위치</td>
            <th colSpan={2}>연결여부(대외)</th>
            <td colSpan={2}></td>
            <th colSpan={2}>백업주기</th>
            <td colSpan={1}>0 </td>
            <th colSpan={2}>PWD 변경주기</th>
            <td colSpan={1}>0</td>
          </tr>
        </Fragment>
      )
    }else if(areaAlias === 'WEB'){
      return(
        <Fragment>
          <tr>
            <th colSpan={2}>URL</th>
            <td colSpan={6}>http://zzado.kr.banking</td>
            <th colSpan={2}>전자금융여부</th>
            <td colSpan={2}>전자금융</td>
            <th colSpan={2}>https여부</th>
            <td colSpan={2}>https</td>
            <th colSpan={2}>테스트/운영</th>
            <td colSpan={2}>테스트</td>
          </tr>
        </Fragment>
      )
    }else if (areaAlias === 'MOB'){
      return(
        <Fragment>
          <tr>
            <th colSpan={2}>자산종류</th>
            <td colSpan={4}>{assetName}</td>
            <th colSpan={2}>전자금융여부</th>
            <td colSpan={3}>전자금융</td>
            <th colSpan={2}>서버측 여부</th>
            <td colSpan={3}>https</td>
            <th colSpan={2}>테스트/운영</th>
            <td colSpan={2}>테스트</td>
          </tr>
        </Fragment>
      )
    }else if(areaAlias === 'HTS') {
      return(
        <Fragment>
          <tr>
            <th colSpan={2}>전자금융여부</th>
            <td colSpan={3}>전자금융</td>
            <th colSpan={2}>테스트/운영</th>
            <td colSpan={2}>테스트</td>
          </tr>
        </Fragment>
      )
    }else{
      return null;
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
            <td colSpan={2} rowSpan={2}>{assetCode()}</td>
            <th colSpan={2}>자산명</th>
            <td colSpan={8}>{assetName()}</td>
            <th colSpan={2}>담당자</th>
            <td colSpan={4}>{assetOperator()}</td>
          </tr>
          
          <tr>
            <th colSpan={2}>신규여부</th>
            <td colSpan={2}>{assetSwitchBool()}</td>
            <th colSpan={2}>자산가치</th>
            <td colSpan={1}>{assetValue()}</td>
            <th colSpan={2}>진행과정</th>
            <td colSpan={1}>{assetAnalysisDoneBool()}</td>
            <th colSpan={2}>평가자</th>
            <td colSpan={4}>{assetAssessors()}</td>
          </tr>
          {tableRows()}
          <tr>
            <th colSpan={2}>비고</th>
            <td colSpan={18}>{assetNote()}</td>
          </tr>
        </tbody>
      </Table>
    </Fragment>
  );
}