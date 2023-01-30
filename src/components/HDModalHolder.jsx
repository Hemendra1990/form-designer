import React from 'react'
import { useModalContext } from '../context/ModalContext';
import { useReportMetaContext, useReportUpdateMetaContext } from '../context/ReportMetaContext';

export default function HDModalHolder() {
    const modalContext = useModalContext();
    const { actions, modals } = modalContext;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const { updateMeta } = useReportUpdateMetaContext();
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const meta = useReportMetaContext();


    return (
        <>
            {modals}
        </>
    )
}
