import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react'
import { useMetaContext, useUpdateMetaContext } from '../context/MetaContext';
import { useReportMetaContext, useReportUpdateMetaContext } from '../context/ReportMetaContext';
import { ControlStyleModel } from '../control-styles/ControlStyleModel';

import { useForm, Controller } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { Calendar } from 'primereact/calendar';
import { Password } from 'primereact/password';
import { Checkbox } from 'primereact/checkbox';
import { Dialog } from 'primereact/dialog';
import { Divider } from 'primereact/divider';

import { classNames } from 'primereact/utils';
import { InputNumber } from 'primereact/inputnumber';
import { deepClone } from '../utils/Utils';


export const HDForm = forwardRef((props, ref) => {
    const [showMessage, setShowMessage] = useState(false);
    const [countries, setCountries] = useState([]);
    const [formData, setFormData] = useState({});

    const [formFields, setFormFields] = useState([]);

    const defaultValues = {
        name: '',
        email: '',
        password: '',
        date: null,
        country: null,
        accept: false
    }
    const { control, formState: { errors }, handleSubmit, reset } = useForm({ defaultValues });
    const onSubmit = (data) => {
        setFormData(data);
        setShowMessage(true);
        reset();
    };

    const getFormErrorMessage = (name) => {
        return errors[name] && <small className="p-error">{errors[name].message}</small>
    };
    const [columns, setColumns] = useState([]);
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(false);
    const [controlStyle, setControlStyle] = useState();
    const { element } = props;

    /* const { updateMeta } = useUpdateMetaContext();
    const meta = useMetaContext(); */

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { updateMeta } = element.isInReportContainer ? useReportUpdateMetaContext() : useUpdateMetaContext();//figured out contexts can be used conditionally
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const meta = element.isInReportContainer ? useReportMetaContext() : useMetaContext();

    const gridColRef = useRef();
    const gridRef = useRef();

    const [dataTableProps, setDataTableProps] = useState({});

    const [refreshgrid, setRefreshgrid] = useState(""); //tried to refresh the grid on applying to attributes, need to change this later after anlysing the impact of this line.
    const [showHideFlag, setShowHideFlag] = useState(true);

    const passwordHeader = <h6>Pick a password</h6>;
    const passwordFooter = (
        <React.Fragment>
            <Divider />
            <p className="mt-2">Suggestions</p>
            <ul className="pl-2 ml-2 mt-0" style={{ lineHeight: '1.5' }}>
                <li>At least one lowercase</li>
                <li>At least one uppercase</li>
                <li>At least one numeric</li>
                <li>Minimum 8 characters</li>
            </ul>
        </React.Fragment>
    );

    const showHide = (value) => {//expecing the value to be boolean
        setShowHideFlag(value);
    }

    useImperativeHandle(ref, () => ({
        setResult,
        startLoader(value) {
            setLoading(value);
        },
        getStyleAttributes: () => {
            return ControlStyleModel.getGridStyle();
        },
        addStyle(style = "") {
            setControlStyle(style);
        },
        showHide
    }));

    useEffect(() => {
        element.formMeta = element.formMeta || {};
        element.formMeta.fields = element.formMeta.fields || [];
        element.formMeta.fields = deepClone(formFields);
        console.log(element.formMeta.fields);
    }, [formFields, element]);

    function setResult({ columns, rows, header }) {
        console.log({ columns, rows, header });
        setFormFields(header || []);
        setLoading(false);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="card">
                <h5 className="text-center">Register</h5>
                <div className="p-fluid grid formgrid">
                    {
                        (formFields ?? []).map(({ name, type }) => {
                            switch (type) {
                                case "string":
                                    return (
                                        <div className="field col-12 md:col-4">
                                            <label htmlFor={name} className={classNames({ 'p-error': errors.name })}>{name.toUpperCase()}*</label>
                                            <Controller name={name} control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                                <InputText id={field.name} autoFocus {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                            )} />
                                            {getFormErrorMessage('name')}
                                        </div>
                                    )
                                case "date":
                                case "timestamp":
                                    return (
                                        <div className="field col-12 md:col-4">
                                            <label htmlFor={name} className={classNames({ 'p-error': errors.name })}>{name.toUpperCase()}*</label>
                                            <Controller name={name} control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                                <Calendar id={field.name} autoFocus {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                            )} />
                                            {getFormErrorMessage('name')}
                                        </div>
                                    );
                                case "number":
                                    return (
                                        <div className="field col-12 md:col-4">
                                            <label htmlFor={name} className={classNames({ 'p-error': errors.name })}>{name.toUpperCase()}*</label>
                                            <Controller name={name} control={control} rules={{ required: 'Name is required.' }} render={({ field, fieldState }) => (
                                                <InputNumber id={field.name} autoFocus {...field} className={classNames({ 'p-invalid': fieldState.invalid })} />
                                            )} />
                                            {getFormErrorMessage('name')}
                                        </div>
                                    );
                                default: <></>
                            }
                        })
                    }
                </div>
                <Button type="submit" label="Submit" className="mt-2" />
            </div>
        </form>
    )
});
