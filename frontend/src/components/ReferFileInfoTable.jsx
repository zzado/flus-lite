import { Fragment, useRef } from 'react';
import { Table, Button } from "react-bootstrap";
import { createRefFileReq, deleteRefFileReq } from '../utils'

export default function ReferFileInfoTable(props){
  const { refFileList, setRefFileList, vulId } = props;
  const isFileUploadRef = useRef()
  console.log('2')

  const uploadRefFile = (fileObjs) =>{
    for(let fileObj of fileObjs){
      let reader = new FileReader();
      reader.readAsDataURL(fileObj);
      reader.onloadend = () => {
        console.log(reader.result)
        createRefFileReq({ vulnerability : vulId, file: reader.result }).then(([result, jsonData])=> result? setRefFileList([...refFileList, jsonData]) : console.log(jsonData));
      }
    }
  }


  return (
    <Fragment>
      <Table responsive="md" bordered>
        <tbody>
          <tr>
            <th width="10%">참고파일 <Button size="sm" onClick={() => isFileUploadRef.current.click() } style={{float: 'none'}}>업로드</Button></th>
            <td width="90%">
              { refFileList.map( (e, idx) =>
                <div key={idx}>
                  {e.file}
                <Button size="sm" onClick={() => { deleteRefFileReq(e.id).then(([result, jsonData]) => result ? setRefFileList(refFileList.filter(e2=>e2.id !== e.id)) : console.log(jsonData)) }} style={{float: 'none'}}>삭제</Button>
                </div>
              )}
              <input ref={isFileUploadRef} onChange={(e)=> uploadRefFile(e.target.files)} type="file" multiple style={{display:'none'}}/>
            </td>
          </tr>
        </tbody>
      </Table>
    </Fragment>
  );
}