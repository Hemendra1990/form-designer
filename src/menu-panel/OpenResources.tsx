import {Dialog} from "primereact/dialog";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {DataTable} from 'primereact/datatable';
import {Column} from 'primereact/column';
import {HttpFormResourceService} from "../http-service/HttpFormResourceService";
import {PageMetaData} from "../model/PageMetaData";
import {useUpdateMetaContext} from "../context/MetaContext";

const OpenResources = () => {
    let navigate = useNavigate();
    const [showModal, setShowModal] = useState(true);
    const [resources, setResources] = useState([]);
    const [isLoading, setLoading] = useState(true);

    let { openReport } = useUpdateMetaContext();

    const httpResourceService = new HttpFormResourceService();

    //after view rendered load the data from the server
    useEffect(() => {
        let param:PageMetaData = new PageMetaData();
        param.pageNumber=0;
        param.pageSize=10;

        httpResourceService.getAll(param).then(res => {
            console.log(res);
            const {data} = res.data;
            setResources(data);
        }).catch(err => {console.error(err)});
    }, []);

    const convertToDate = (rowData: any) => {
        const date = new Date(rowData.creationTime)
        return <>{""+ date.toISOString() }</>
    }

    const eitFormDesign = (rowData: any) => {
        const {resourceId} = rowData;
        httpResourceService.getFormJson(resourceId).then(res => {
            openReport(res.data);
            setTimeout(()=> {
                setShowModal(false);
                navigate(-1);
            }, 1);

        }).catch(err => {
            console.error("Failed to fetch the form data from server.", err);
        })
    }

    const actionTemplate = (rowData: any) => {
        return (
            <>
                <div className="grid">
                    <div className="col-3"><i className="pi pi-pencil" onClick={(e)=>eitFormDesign(rowData)}></i></div>
                    <div className="col-3"><i className="pi pi-eye"></i></div>
                </div>


            </>
        )
    }

    return (
        <Dialog onHide={() => {
            setShowModal(false);
            navigate(-1);
        }} visible={true} header={"Form Designs"}>
            <DataTable
                emptyMessage={"No Resources Found"}
                value={resources}
                responsiveLayout={"scroll"}
                scrollHeight="290px"
                style={{width: "70vw", height: "50vh"}}
                tableStyle={{
                    minHeight: "8rem",
                }}
                breakpoint="960px">
                <Column header={"Name"} field={"resourceName"}/>
                <Column header={"Description"} field={"description"}/>
                <Column header={"Created Date"} field={"creationTime"} body={convertToDate}/>
                <Column header={"Created Date"} field={"creationTime"} body={actionTemplate}/>
            </DataTable>
        </Dialog>
    )
}

export default OpenResources;