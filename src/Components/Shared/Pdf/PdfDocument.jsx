import React from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const PdfDocument = ({ formData }) => {

    const styles = StyleSheet.create({
        page: { padding: 30 },
        section: { marginBottom: 10 },
        text: { fontSize: 12 },
    });

    return (

        <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <Text style={styles.text}>Name: {formData.name}</Text>
                    <Text style={styles.text}>Email: {formData.email}</Text>
                    <Text style={styles.text}>Phone: {formData.phone}</Text>
                    {/* Add more fields as needed */}
                </View>
            </Page>
        </Document>

    );
};

export default PdfDocument;