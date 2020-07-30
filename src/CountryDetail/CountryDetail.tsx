import React from 'react';
import { Modal, Row, Col, Tag, Spin } from 'antd';
import { TeamOutlined } from '@ant-design/icons';

interface props {
    modalData: any,
    languages:any,
    currency:any,
    show: boolean,
    handleClose: VoidFunction,
    loading: boolean
}

const CountryDetail = (props: props) => { 
    return (
      <div>
        <Modal
          title={props.modalData !== undefined ? props.modalData.name: ''}
          visible={props.show}
          width={1000}
          onOk={props.handleClose}
          onCancel={props.handleClose}
          footer={null}
        >
          {props.loading && (
            <Spin />
          )}
          {props.loading === false && (
            <Row gutter={16}>
              <Col span={12}>
                <img
                  alt={"flag"}
                  src={`${props.modalData !== undefined ? props.modalData.flag : ''}`}
                  height={300}
                  width={400}
                />
              </Col>
                <Col span={10} style={{marginTop: '10px'}}>
                {props.modalData !== undefined ? <p> <strong>Country :-</strong> {props.modalData.name}</p> : ''}
                {(props.modalData !== undefined && props.modalData.capital !== '') ? <p> <strong>Capital :-</strong> {props.modalData.capital}</p> : ''}
                  <div>
                    <strong>Language Used :-</strong><br/>
                        {props.languages.length >= 1 ? props.languages.map((p:any,id:number)=>
                            (<Tag color="#1890ff" key={id} style={{marginTop: '5px'}}>{p.name} <span>{"("+p.nativeName+")"}</span></Tag>)
                        ) : ''}
                </div>
                <br/>
                <p>
                    <strong>Currency :- </strong>
                    {props.currency.length >= 1 ? props.currency.map((c:any,key:number)=>(
                        c.name + ', ' + c.symbol
                    )) : ''}
                </p>
                {props.modalData !== undefined ? <p> <strong>Region :-</strong> {props.modalData.region}</p> : ''}
                {props.modalData !== undefined ? <p> <strong>Population :-</strong> <Tag color="#f50" style={{marginTop: '5px'}}><TeamOutlined /> {props.modalData.population}</Tag></p> : ''}
                </Col>
            </Row>
          )}
        </Modal>
      </div>
    )
}
export default CountryDetail;