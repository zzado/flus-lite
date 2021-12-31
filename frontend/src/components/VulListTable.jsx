import { Fragment, useState } from 'react';
import { Table } from "react-bootstrap";
import { useParams, Link } from 'react-router-dom';

export default function VulListTable(props){
  const { vulList, vulResultFilter, asseCodeDisplay } = props;
  const { projectId, areaAlias, assetId } = useParams();

  
  return (
    <Fragment>
      <Table responsive="md">
        <thead>
          <tr>
            <th><input type="checkbox"/></th>
            <th>번호</th>
            <th>취약점ID</th>
            <th>항목명 (취약항목 갯수)</th>
            <th>평가결과</th>
            <th>신규여부</th>
            <th>전달</th>
            <th>조치</th>
            <th>위험도</th>
          </tr>
        </thead>
        <tbody>
        { vulList && vulList.map( (vulObj, idx) => 
          (vulResultFilter === false)?
            (
              <tr key={idx}>
                <td><input type="checkbox" /></td>
                <td>{idx+1}</td>
                <td>{asseCodeDisplay ? `${vulObj.asset.code}-${vulObj.vulnerability_item.code}` : vulObj.vulnerability_item.code || ''}</td>
                <td><Link to={`/v/${projectId}/${areaAlias}/${vulObj.id}/`} state={{ vulObj:vulObj }}>{vulObj.vulnerability_item.name || ''}</Link> { vulObj.pocs.length }</td>
                <td>{vulObj.result === '' ? '미점검' : vulObj.result}</td>
                <td>{vulObj.is_new ? '신규' : '기존'}</td>
                <td>{vulObj.is_reported ? '전달' : ''}</td>
                <td>{vulObj.is_patched ? '조치' : ''}</td>
                <td>{vulObj.vulnerability_item.risk || ''}</td>
              </tr>
              )
          : (vulResultFilter === vulObj.result )?
              (
                <tr key={idx}>
                  <td><input type="checkbox"/></td>
                  <td>{idx}</td>
                  <td>{vulObj.vulnerability_item.code || ''}</td>
                  <td><Link to={`/v/${projectId}/${areaAlias}/${vulObj.id}/`} state={{ vulObj:vulObj }}>{vulObj.vulnerability_item.name || ''}</Link></td>
                  <td>{vulObj.result === '' ? '미점검' : vulObj.result}</td>
                  <td>{vulObj.is_new ? '신규' : '기존'}</td>
                  <td>{vulObj.is_reported ? '전달' : ''}</td>
                  <td>{vulObj.is_patched ? '조치' : ''}</td>
                  <td>{vulObj.vulnerability_item.risk || ''}</td>
                </tr>
              ) : null
            )}
        </tbody>
      </Table>
    </Fragment>
  );
}