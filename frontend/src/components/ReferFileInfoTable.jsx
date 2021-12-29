import { Fragment, useState, useRef } from 'react';
import { faCaretSquareDown, faCaretSquareUp } from '@fortawesome/free-solid-svg-icons'
import { Table, Button } from "react-bootstrap";
import { createRefFileReq, deleteRefFileReq } from '../utils'

export default function ReferFileInfoTable(props){
  const { refFileList, setRefFileList, vulId } = props;
//  const { VUL_FIELD } = global.config;
//  const [ hideField, setHideField ] = useState();
  const isFileUploadRef = useRef()


  const uploadImageFile = (fileObjs) =>{
    for(let fileObj of fileObjs){
      let reader = new FileReader();
      reader.readAsDataURL(fileObj);
      reader.onloadend = () => {
        createRefFileReq(vulId, { vulnerability : vulId, image: reader.result }).then(([result, jsonData])=> result? setRefFileList([...refFileList, jsonData]) : console.log('error'));
      }
    }
  }


  return (
    <Fragment>
      <Table responsive="md" bordered>
        <tbody>
          <tr>
            <th width="10%">첨부파일 <Button size="sm" onClick={() => isFileUploadRef.current.click() } style={{float: 'none'}}>업로드</Button></th>
            <td width="90%">
              { refFileList.map( (e, idx) =>
                <div key={idx}>
                <Button size="sm" onClick={() => { deleteRefFileReq(e.id).then(result => result ? setRefFileList(refFileList.filter(e2=>e2.id !== e.id)) : console.log('error')) }} style={{float: 'none'}}>삭제</Button>
                </div>
              )}
              <input ref={isFileUploadRef} onChange={(e)=> uploadImageFile(e.target.files)} type="file" multiple style={{display:'none'}}/>
            </td>
          </tr>
        </tbody>
      </Table>
    </Fragment>
  );
}