import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';

import souce1 from '../../../assets/Nirmala UI.ttf';


Font.register({
    family: 'Nirmala UI',
    src: souce1,
    fontStyle: 'normal',
    fontWeight: 'normal'
});
function fixBanglaText(text) {
    if (typeof text === 'number') return text;
    return text;
}


const PdfDocument = ({ formData, men_questions, female_questions }) => {
    const isFemale = formData?.gender === 'female';

    // console.log(formData);
    // console.log(men_questions);
    // console.log(female_questions);


    const styles = StyleSheet.create({
        page: {
            padding: 30,
            backgroundColor: '#ffffff',
            fontFamily: 'Nirmala UI',
        },
        header: {
            backgroundColor: '#2563eb',
            color: 'white',
            padding: 15,
            marginBottom: 20,
            textAlign: 'center',
            borderRadius: 5
        },
        headerTitle: {
            fontSize: 20,
            fontWeight: 'bold',
            marginBottom: 5
        },
        headerSubtitle: {
            fontSize: 12,
            opacity: 0.9
        }, sectionContainer: {
            marginBottom: 15,
            borderWidth: 1,
            borderColor: '#e5e7eb',
            borderRadius: 5
        },
        sectionHeader: {
            backgroundColor: '#f3f4f6',
            padding: 10,
            borderBottomWidth: 1,
            borderBottomColor: '#e5e7eb'
        },
        sectionTitle: {
            fontSize: 14,
            fontWeight: 'bold',
            color: '#374151'
        },
        sectionContent: {
            padding: 12
        },
        row: {
            flexDirection: 'col',
            marginBottom: 8,
            alignItems: 'flex-start'
        },
        label: {
            fontSize: 10,
            fontWeight: 'bold',
            color: '#6b7280',
            width: '100%',
            marginRight: 10
        },
        value: {
            fontSize: 11,
            color: '#111827',
            width: '100%',
            lineHeight: 1.4
        },
        divider: {
            height: 1,
            backgroundColor: '#e5e7eb',
            marginVertical: 10
        },
        footer: {
            marginTop: 20,
            padding: 10,
            backgroundColor: '#f9fafb',
            textAlign: 'center',
            borderRadius: 5
        },
        footerText: {
            fontSize: 10,
            color: '#6b7280'
        }, status: {
            fontSize: 10,
            padding: 4,
            borderRadius: 3,
            backgroundColor: '#dcfce7',
            color: '#166534',
            textAlign: 'center',
            width: 60
        }
    });

    return (
        <>
            {!isFemale ? (
                // Male Document Structure
                <Document language='bn'>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Heaven Marriage Solution</Text>
                            <Text style={styles.headerSubtitle}>Member Profile - {fixBanglaText(formData?.form_uuId) || 'N/A'}</Text>
                        </View>

                        {/* Personal Information Section */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Personal Information</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                {
                                    men_questions.slice(0, 6).map((got, idx) => (
                                        <View key={idx} style={styles.row}>
                                            <Text style={styles.value}>{got?.question}</Text>
                                            <Text style={styles.label}>{fixBanglaText(formData?.[got?.name]) + '                    ' || 'N/A'}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>

                        <View style={styles.divider} />

                        {/* Education Section and Occupation */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Education & Occupation</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                {
                                    men_questions.slice(6, 14).map((got, idx) => (
                                        <View key={idx} style={styles.row}>
                                            <Text style={styles.value}>{got?.question}</Text>
                                            <Text style={styles.label}>{fixBanglaText(formData?.[got?.name]) + '                    ' || 'N/A'}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    </Page>

                    {/* Second Page - Professional & Financial Information */}
                    <Page size="A4" style={styles.page}>
                        {/* Professional & Financial Information Section */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Physical</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                {
                                    men_questions.slice(14, 18).map((got, idx) => (
                                        <View key={idx} style={styles.row}>
                                            <Text style={styles.value}>{got?.question}</Text>
                                            <Text style={styles.label}>{fixBanglaText(formData?.[got?.name]) + '                    ' || 'N/A'}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>

                        {/* Marital Status & Family Information Section */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Marital Status</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                {
                                    men_questions.slice(18, 24).map((got, idx) => (
                                        <View key={idx} style={styles.row}>
                                            <Text style={styles.value}>{got?.question}</Text>
                                            <Text style={styles.label}>{fixBanglaText(formData?.[got?.name]) + '                    ' || 'N/A'}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>

                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Family Information</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                {
                                    men_questions.slice(24, 29).map((got, idx) => (
                                        <View key={idx} style={styles.row}>
                                            <Text style={styles.value}>{got?.question}</Text>
                                            <Text style={styles.label}>{fixBanglaText(formData?.[got?.name]) + '                    ' || 'N/A'}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>

                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Characteristics</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                {
                                    men_questions.slice(29, 37).map((got, idx) => (
                                        <View key={idx} style={styles.row}>
                                            <Text style={styles.value}>{got?.question}</Text>
                                            <Text style={styles.label}>{fixBanglaText(formData?.[got?.name]) + '                    ' || 'N/A'}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>

                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Marital Information</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                {
                                    men_questions.slice(37, 48).map((got, idx) => (
                                        <View key={idx} style={styles.row}>
                                            <Text style={styles.value}>{got?.question}</Text>
                                            <Text style={styles.label}>{fixBanglaText(formData?.[got?.name]) + '                    ' || 'N/A'}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>

                        {/* Professional Footer */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                Generated on {new Date().toLocaleDateString('en-GB')} | Heaven Marriage Solution
                            </Text>
                        </View>

                    </Page>


                </Document>
            ) : (
                // Female Document Structure
                <Document language='bn'>
                    <Page size="A4" style={styles.page}>
                        <View style={styles.header}>
                            <Text style={styles.headerTitle}>Heaven Marriage Solution</Text>
                            <Text style={styles.headerSubtitle}>Member Profile - {fixBanglaText(formData?.form_uuId) || 'N/A'}</Text>
                        </View>

                        {/* Personal Information Section */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Personal Information</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                {
                                    female_questions.slice(0, 6).map((got, idx) => (
                                        <View key={idx} style={styles.row}>
                                            <Text style={styles.value}>{got?.question}</Text>
                                            <Text style={styles.label}>{fixBanglaText(formData?.[got?.name]) + '                    ' || 'N/A'}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>

                        <View style={styles.divider} />

                        {/* Education Section and Occupation */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Education & Occupation</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                {
                                    female_questions.slice(6, 11).map((got, idx) => (
                                        <View key={idx} style={styles.row}>
                                            <Text style={styles.value}>{got?.question}</Text>
                                            <Text style={styles.label}>{fixBanglaText(formData?.[got?.name]) + '                    ' || 'N/A'}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>
                    </Page>

                    {/* Second Page - Professional & Financial Information */}
                    <Page size="A4" style={styles.page}>
                        {/* Professional & Financial Information Section */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Physical</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                {
                                    female_questions.slice(11, 15).map((got, idx) => (
                                        <View key={idx} style={styles.row}>
                                            <Text style={styles.value}>{got?.question}</Text>
                                            <Text style={styles.label}>{fixBanglaText(formData?.[got?.name]) + '                    ' || 'N/A'}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>

                        {/* Marital Status & Family Information Section */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Marital Status</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                {
                                    female_questions.slice(15, 21).map((got, idx) => (
                                        <View key={idx} style={styles.row}>
                                            <Text style={styles.value}>{got?.question}</Text>
                                            <Text style={styles.label}>{fixBanglaText(formData?.[got?.name]) + '                    ' || 'N/A'}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>

                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Family Information</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                {
                                    female_questions.slice(21, 29).map((got, idx) => (
                                        <View key={idx} style={styles.row}>
                                            <Text style={styles.value}>{got?.question}</Text>
                                            <Text style={styles.label}>{fixBanglaText(formData?.[got?.name]) + '                    ' || 'N/A'}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>

                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Marital Information</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                {
                                    female_questions.slice(29, 35).map((got, idx) => (
                                        <View key={idx} style={styles.row}>
                                            <Text style={styles.value}>{got?.question}</Text>
                                            <Text style={styles.label}>{fixBanglaText(formData?.[got?.name]) + '                    ' || 'N/A'}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>

                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Characteristics</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                {
                                    female_questions.slice(35, 48).map((got, idx) => (
                                        <View key={idx} style={styles.row}>
                                            <Text style={styles.value}>{got?.question}</Text>
                                            <Text style={styles.label}>{fixBanglaText(formData?.[got?.name]) + '                    ' || 'N/A'}</Text>
                                        </View>
                                    ))
                                }
                            </View>
                        </View>

                        {/* Professional Footer */}
                        <View style={styles.footer}>
                            <Text style={styles.footerText}>
                                Generated on {new Date().toLocaleDateString('en-GB')} | Heaven Marriage Solution
                            </Text>
                        </View>

                    </Page>
                </Document>
            )}
        </>
    );
};

export default PdfDocument;