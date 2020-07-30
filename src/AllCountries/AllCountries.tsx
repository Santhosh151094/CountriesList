import React, { useEffect } from 'react';
import { useSortData } from '../SortingOption/SortingOption'
import ss from './AllCountries.module.scss'
import { Table} from 'antd';

import CountryDetail from '../CountryDetail/CountryDetail';

const columns = [
    {
        title: "Code",
        dataIndex: "alpha3Code",
        key: 'alpha3Code',
        render: (text: any, row: any) => <a> {row.alpha3Code} </a>
      },
    {
        title: "Flag",
        dataIndex: "flag",
        key: "flag",
        render: (theImageURL: string | undefined) => <img alt={theImageURL} src={theImageURL} width={50} />
      },
    {
      title: 'Country',
      dataIndex: 'name',
      key: 'name',
      sorter: (a: any, b: any) => a.name.localeCompare(b.name)
    },
    {
      title: 'Population',
      dataIndex: 'population',
      key: 'population',
      sorter: {
        compare: (a: any, b: any) => a.population - b.population,
        multiple: 2,
      },
    },
    {
        title: "Region",
        dataIndex: "region",
        key: "region",
    },
  ];

interface props {
    Countries: Array<Object>,

}

declare global {
    interface This {
        toggleLoanCard:any;
    }
}
const AllCountries = (props: props) => {

    const { items } = useSortData(props.Countries)
    const [show, setShow] = React.useState<boolean>(false)
    const [clickedModalItem,setClickedModalItem]=React.useState<number>(0);
    const [modalData,setModalData]=React.useState<any>({});
    const [lang,setLang] = React.useState([]);
    const [currency,setCurrency]=React.useState([]);
    const [loading,setLoading]=React.useState<boolean>(false);

    const closeModal=()=>{
        setShow(false)
    }

    const toggleLoanCard=(detail:any)=>{
        setLoading(true)
        fetch('https://restcountries.eu/rest/v2/name/' + detail.name + '?fullText=true')
        .then(res => res.json())
        .then(res => {
          setLoading(false)
          setLang(res[0].languages)
          setCurrency(res[0].currencies)
        setModalData(res[0])  
      })

       setShow(true)
        setClickedModalItem(detail);
    }

    useEffect(()=>{
         const index=clickedModalItem;
         let modalData;
         let languageData;
         let currencyData;
         if(items.length===0){
            modalData=[];
            languageData=[];
            currencyData=[];
         }
         else{
             modalData=items[index];
             languageData=modalData !== undefined ? modalData.languages : '';
             currencyData=modalData !== undefined ? modalData.currencies : '';
         }
        setLang(languageData);
        setCurrency(currencyData);
        setModalData(modalData)  
    },[clickedModalItem,items])
  
    return (
      <div>
        <Table 
            columns={columns}
            dataSource={props.Countries}
            bordered={true}
            rowKey="id"
            className={ss.tableStyle}
            sortDirections={["ascend", "descend", "ascend"]}
            onRow={(record, index) => {
                return {
                onClick: (event) => {
                    toggleLoanCard(record);
                },
                };
            }}
        />
        
          {(items.length===0)?"":
            <CountryDetail loading={loading} handleClose={closeModal} show={show} currency={currency} languages={lang} modalData={modalData}/>
          }
      </div>
    )
}
export default AllCountries;