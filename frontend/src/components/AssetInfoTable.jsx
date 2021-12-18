import { Fragment } from 'react';
import { Table } from "react-bootstrap";

export default function AssetInfoTable(props){
  
  const { areaAlias, assetName, assetNum, assetNote, assetHostname, assetSwitchBool, assetExternalBool, assetPWDCycle, assetURL, assetIsFinancialBool, assetIsHttpsBool, assetVersion, assetAssessors, assetPlatform, assetProductModel, assetValue, assetOperator, assetIsTestBool, assetIsServerBool, assetIsNewBool, assetBackUpCycle } = props;
  
  const tableRowsByAreaAlias = () => {
    let fragment = null;
    if (global.config.INFRA_DEVICE_AREA_LIST.includes(areaAlias)){
      fragment = (
        <Fragment>
        <tr>
          <th colSpan={2} rowSpan={ (areaAlias === 'NET') ? 3 : 2}>자산종류</th>
          <td colSpan={4} rowSpan={ (areaAlias === 'NET') ? 3 : 2}>{assetPlatform}</td>
          <th colSpan={2}>호스트명</th>
          <td colSpan={6}>{assetHostname}</td>
          <th colSpan={2}>버전</th>
          <td colSpan={4}>{assetVersion}</td>
        </tr>
        </Fragment>
      )
      if(areaAlias === 'SRV' || areaAlias === 'DBM'){
        fragment = (
          <Fragment>
          {fragment}
          <tr>
            <th colSpan={2}>URL</th>
            <td colSpan={6}>{assetURL}</td>
            <th colSpan={3}>테스트/운영</th>
            <td colSpan={3}>{assetIsTestBool}</td>
          </tr>
          </Fragment>
        )
      }else{ // NET, ISS
        fragment = (
          <Fragment>
          {fragment}
          <tr>
            <th colSpan={2}>URL</th>
            <td colSpan={2}>{assetURL}</td>
            <th colSpan={2}>제조사</th>
            <td colSpan={4}>{assetProductModel}</td>
            <th colSpan={2}>테스트/운영</th>
            <td colSpan={2}>{assetIsTestBool}</td>
          </tr>
          </Fragment>
        )
        if(areaAlias === 'NET'){
          fragment = (
            <Fragment>
            {fragment}
            <tr>
            <th colSpan={2}>스위치 여부</th>
            <td colSpan={2}>{assetSwitchBool}</td>
            <th colSpan={2}>연결여부(대외)</th>
            <td colSpan={2}>{assetExternalBool}</td>
            <th colSpan={2}>백업주기</th>
            <td colSpan={1}>{assetBackUpCycle}</td>
            <th colSpan={2}>PWD 변경주기</th>
            <td colSpan={1}>{assetPWDCycle}</td>
          </tr>
            </Fragment>
          )
        }
      }
    }else if(areaAlias === 'WEB'){
      fragment = (
        <Fragment>
        <tr>
          <th colSpan={2}>URL</th>
          <td colSpan={6}>{assetURL}</td>
          <th colSpan={2}>전자금융여부</th>
          <td colSpan={2}>{assetIsFinancialBool}</td>
          <th colSpan={2}>https여부</th>
          <td colSpan={2}>{assetIsHttpsBool}</td>
          <th colSpan={2}>테스트/운영</th>
          <td colSpan={2}>{assetIsTestBool}</td>
        </tr>
        </Fragment>
      )
    }else if (areaAlias === 'MOB'){
      fragment = (
        <Fragment>
        <tr>
          <th colSpan={2}>자산종류</th>
          <td colSpan={4}>{assetPlatform}</td>
          <th colSpan={2}>전자금융여부</th>
          <td colSpan={3}>{assetIsFinancialBool}</td>
          <th colSpan={2}>서버측 여부</th>
          <td colSpan={3}>{assetIsServerBool}</td>
          <th colSpan={2}>테스트/운영</th>
          <td colSpan={2}>{assetIsTestBool}</td>
        </tr>
        </Fragment>
      )
    }else if(areaAlias === 'HTS') {
      fragment = (
        <Fragment>
        <tr>
          <th colSpan={2}>전자금융여부</th>
          <td colSpan={3}>{assetIsFinancialBool}</td>
          <th colSpan={2}>테스트/운영</th>
          <td colSpan={2}>{assetIsTestBool}</td>
        </tr>
        </Fragment>
      )
    }
    return (
      <Fragment>
        <tr>
        <th colSpan={2} rowSpan={2}>자산번호</th>
        <td colSpan={2} rowSpan={2}>{assetNum}</td>
        <th colSpan={2}>자산명</th>
        <td colSpan={8}>{assetName}</td>
        <th colSpan={2}>담당자</th>
        <td colSpan={4}>{assetOperator}</td>
      </tr>

      <tr>
        <th colSpan={2}>신규여부</th>
        <td colSpan={3}>{assetIsNewBool}</td>
        <th colSpan={2}>자산가치</th>
        <td colSpan={3}>{assetValue}</td>
        <th colSpan={2}>평가자</th>
        <td colSpan={4}>{assetAssessors}</td>
      </tr>
        {fragment}
      <tr>
        <th colSpan={2}>비고</th>
        <td colSpan={18}>{assetNote}</td>
      </tr>
      </Fragment>
    );
  };


  return (
    <Fragment>
      <Table responsive="md" bordered>
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
          {tableRowsByAreaAlias()}
        </tbody>
      </Table>
    </Fragment>
  );
}