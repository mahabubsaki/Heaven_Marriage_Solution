import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from './PdfDocument';


const DownloadPdf = ({ formData }) => {

    return (
        <PDFDownloadLink document={<PdfDocument formData={formData} />} fileName={'user-' + formData.member_email + '.pdf'}>

            {({ loading, error }) => (
                <button
                    disabled={loading}
                    className="px-4 py-2 bg-blue-600 flex items-center gap-3 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {loading ? 'Preparing Document' : 'Download PDF'}
                    {loading ? <span className='animate animate-pulse rounded-full size-[15px] bg-green-500 inline-block' /> : null}
                    {error && <span className="text-red-500">Error: {error.message}</span>}
                </button>
            )}
        </PDFDownloadLink>
    );
};

export default DownloadPdf;