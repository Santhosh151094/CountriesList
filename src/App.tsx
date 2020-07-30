import React, { useEffect } from 'react';
import AllCountries from './AllCountries/AllCountries';
import "antd/dist/antd.css";
import { Input, Row, Col, Spin, BackTop, Result } from 'antd';
import ss from './app.module.scss';

export interface props {
 name:string, 
}

function App(this: any) {

  const [result, setResult] = React.useState<Array<object>>([]);
  const [loading,setLoading]=React.useState<boolean>(false);
  const [data,setData]=React.useState<Array<object>>(result);
  const [searchText, setSearchText] = React.useState<string>("");

  const [modalData,setModalData]=React.useState<any>({});
  

   useEffect(() => {
     setLoading(true)
    fetch('https://restcountries.eu/rest/v2/all')
      .then(res => res.json())
      .then(res => {
        setResult(res)
        setLoading(false)
        setModalData(modalData)  
      })
      .catch(err=>console.log(err))
  }, [])


  useEffect(()=>{
       const value=searchText;
       const filterProperty=["name","region","alpha2Code","alpha3Code"]
      const lowerCaseValue=value.toLowerCase().trim();
      if (lowerCaseValue===''){
        setData(result)
        console.log(result)
      }
      else{
        const filteredData=result.filter((item:any)=> {
           
          return Object.keys(item).some((key:any)=>
            filterProperty.includes(key)? item[key].toString().toLowerCase().includes(lowerCaseValue) :false)
        })
      setData(filteredData) 
      console.log(filteredData);
      }
  },[searchText,result])
  
 
  if(loading){
    return <div className={ss.loader}>
    <Spin />
  </div>
  }

  return (
    <div>
      <BackTop />
      <Row gutter={16}>
      <Col className="gutter-row" span={18}>
        <div></div>
      </Col>
      <Col className="gutter-row" span={6}>
        <div><Input placeholder="Search Countries.." allowClear onChange={(e)=>setSearchText(e.target.value)} style={{ padding: '10px', marginBottom: '10px' }} name="search-filter"/></div>
      </Col>
      </Row>
      {data.length === 0 && (
        <Result
        status="500"
        title="No data available for this Search!!"
      />
      )}
      {data.length >= 1 && (
        <AllCountries Countries={data} />
      )}
        
        
    </div>
  );
}

export default App;
