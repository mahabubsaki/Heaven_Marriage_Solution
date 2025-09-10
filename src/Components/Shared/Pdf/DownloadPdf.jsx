import React from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PdfDocument from './PdfDocument';


const DownloadPdf = ({ formData, men_questions, female_questions }) => {

    return (
        <PDFDownloadLink document={<PdfDocument formData={formData} men_questions={men_questions} female_questions={female_questions} />} fileName={'HMS-' + formData.name + '.pdf'}>

            {({ loading, error }) => (
                <button
                    disabled={loading}
                    className="px-4 py-2 rounded-full bg-blue-600 flex items-center gap-3 text-white hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
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