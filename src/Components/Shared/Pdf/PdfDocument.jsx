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


const PdfDocument = ({ formData }) => {
    const isFemale = formData?.gender === 'female';

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
            flexDirection: 'row',
            marginBottom: 8,
            alignItems: 'flex-start'
        },
        label: {
            fontSize: 10,
            fontWeight: 'bold',
            color: '#6b7280',
            width: '25%',
            marginRight: 10
        },
        value: {
            fontSize: 11,
            color: '#111827',
            width: '75%',
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
                                <View style={styles.row}>
                                    <Text style={styles.label}>Name:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.name) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Age:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.age) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Location:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.location) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Birth Date:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.birthDate) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Permanent Address:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.parmanent_address) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Current Address:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.current_full_address) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Whatsapp:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.whatsapp) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Email:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.member_email) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Status:</Text>
                                    <View style={styles.status}>
                                        <Text style={{ fontSize: 10, color: '#166534' }}>{fixBanglaText(formData?.status) || 'N/A'}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        {/* Physical Characteristics & Education Section */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Physical Characteristics & Education</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Height:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.height) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Body Structure:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.body_structure) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Skin Color:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.skin_color) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Physical Disability:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.physical_disability) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.row}>
                                    <Text style={styles.label}>Education Background:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.education_background) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Study Level:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.study_level) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Study Details:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.study_details) + '                    ' || 'N/A'}</Text>
                                </View>
                            </View>
                        </View>
                    </Page>

                    {/* Second Page - Professional & Financial Information */}
                    <Page size="A4" style={styles.page}>
                        {/* Professional & Financial Information Section */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Professional & Financial Information</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Income Source:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.income_source) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Current Profession:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.current_profession_details) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Monthly Income:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.monthly_income) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Own Economy:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.own_economy) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Assets Details:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.assets_details) + '                    ' || 'N/A'}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Marital Status & Family Information Section */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Marital Status & Family Information</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Marital Status:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.marital_status) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Children Count:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.children_count) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Divorce Reason:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.divorce_reason) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Mohor Support:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.mohor_support) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Post Marriage Living:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.post_marriage_living) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Wives Intention:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.wives_intention) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.row}>
                                    <Text style={styles.label}>Father Name & Job:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.father_name_job) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Mother Name & Job:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.mother_name_job) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Siblings Info:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.siblings_info) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Family Lineage:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.family_lineage) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Family Economy:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.family_economy) + '                    ' || 'N/A'}</Text>
                                </View>
                            </View>
                        </View>
                    </Page>

                    {/* Third Page - Religious Commitments & Partner Preferences */}
                    <Page size="A4" style={styles.page}>
                        {/* Religious Commitments & Partner Preferences Section */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Religious Commitments & Partner Preferences</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Will Not Violate Rights:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.will_not_violate_rights) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Follow Shariah:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.follow_shariah) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Accept TMS Rules:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.accept_tms_rules) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Wife Earning:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.wife_earning) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Sunna Beard & Purdah:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.sunna_beard_and_purdah) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Accept Other Children:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.accept_other_children) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.row}>
                                    <Text style={styles.label}>Expected Bride Age:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.expected_bride_age) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Expected Bride Height:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.expected_bride_height) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Expected Bride Color:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.expected_bride_color) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Expected Bride Education:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.expected_bride_education) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Expected Family Type:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.expected_bride_family_type) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Expected Bride Class:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.expected_bride_class) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Bride Type:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.bride_type) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Specific Dream:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.specific_dream) + '                    ' || 'N/A'}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Agreements & Registration Details Section */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Agreements & Registration Details</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Agree on False Info:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.agree_on_false_info_consequence) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Agree on Statement:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.agree_on_statement) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Registration Preference:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.registration_preference) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Districts:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.districts) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Alternate Number:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.alternate_number) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Gender:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.gender) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Role:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.role) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>UUID:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.uuid) + '                    ' || 'N/A'}</Text>
                                </View>
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
                                <View style={styles.row}>
                                    <Text style={styles.label}>Name:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.name) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Age:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.age) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Current Location:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.current_location) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Permanent Address:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.parmanent_address) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>NID/Birth Certificate:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.nid_or_birth_certificate) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Birth Date:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.birth_date) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>WhatsApp Number:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.whatsapp_number) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>WhatsApp Number Owner:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.whatsapp_number_owner) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Email:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.member_email) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Status:</Text>
                                    <View style={styles.status}>
                                        <Text style={{ fontSize: 10, color: '#166534' }}>{fixBanglaText(formData?.status) || 'N/A'}</Text>
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View style={styles.divider} />

                        {/* Physical Characteristics & Education Section */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Physical Characteristics & Education</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Height:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.height) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Physical Structure:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.physical_structure) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Physical Condition:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.physical_condition) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Skin Color:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.skin_color) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.row}>
                                    <Text style={styles.label}>Education Background:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.education_background) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Education Level:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.education_level) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Education Details:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.education_details) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Skills or Experience:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.skills_or_experience) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Current Occupation:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.current_occupation) + '                    ' || 'N/A'}</Text>
                                </View>
                            </View>
                        </View>
                    </Page>

                    {/* Second Page - Marital & Family Information */}
                    <Page size="A4" style={styles.page}>
                        {/* Marital Status & Family Information Section */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Marital Status & Family Information</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Marital Status:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.marital_status) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Children Count:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.children_count) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Income Source:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.income_source) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Delivery Type:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.delivery_type) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Child Count Plan:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.child_count_plan) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Previous Husband Rights:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.previous_husband_rights) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Divorce Reason:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.divorce_reason) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.divider} />
                                <View style={styles.row}>
                                    <Text style={styles.label}>Father Name & Occupation:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.father_name_occupation) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Mother Name & Occupation:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.mother_name_occupation) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Siblings and Position:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.siblings_and_position) + '                    ' || 'N/A'}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Husband Preferences Section */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Husband Preferences</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Favoured Husband:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.favoured_husband) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Color Choice:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.color_choice) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Financial Status:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.financial_status) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Family Lineage:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.family_lineage) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Family Economy:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.family_economy) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Own Economy:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.own_economy) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Current Expense By:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.current_expense_by) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Own Property:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.own_property) + '                    ' || 'N/A'}</Text>
                                </View>
                            </View>
                        </View>
                    </Page>

                    {/* Third Page - Religious Commitments & Agreements */}
                    <Page size="A4" style={styles.page}>
                        {/* Religious Commitments Section */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Religious Commitments & Islamic Values</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Haque Opinion:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.haque_opinion) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Polygamy Opinion:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.polygamy_opinion) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Agree Polygamous Wife:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.agree_polygamous_wife) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Agree Islamic Law:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.agree_islamic_law) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Fulfill Husband Rights:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.fulfill_husband_rights) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Accept Polygamy for Daughter:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.accept_polygamy_for_daughter) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Obey Husband Fully:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.obey_husband_fully) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Avoid Misbehavior:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.avoid_misbehavior) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Care Step Children:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.care_step_children) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Follow Shariah Completely:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.follow_shariah_completely) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Child Living Preference:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.child_living_preference) + '                    ' || 'N/A'}</Text>
                                </View>
                            </View>
                        </View>

                        {/* Registration & Additional Information */}
                        <View style={styles.sectionContainer}>
                            <View style={styles.sectionHeader}>
                                <Text style={styles.sectionTitle}>Registration & Additional Information</Text>
                            </View>
                            <View style={styles.sectionContent}>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Accept TMS Policy:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.accept_tms_policy) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Additional Info:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.additional_info) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Current Full Address:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.current_full_address) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Registration Preference:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.registration_preference) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Gender:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.gender) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>Role:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.role) + '                    ' || 'N/A'}</Text>
                                </View>
                                <View style={styles.row}>
                                    <Text style={styles.label}>UUID:</Text>
                                    <Text style={styles.value}>{fixBanglaText(formData?.uuid) + '                    ' || 'N/A'}</Text>
                                </View>
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