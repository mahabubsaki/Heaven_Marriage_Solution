import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from './PdfDocument';


const DownloadPdf = ({ formData }) => {

    return (
        <PDFDownloadLink document={<PdfDocument formData={formData} />} fileName={'user-' + formData.member_email + '.pdf'}>

            {({ loading, error }) => (
                <button

                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                    Download PDF
                </button>
            )}
        </PDFDownloadLink>
    );
};

export default DownloadPdf;