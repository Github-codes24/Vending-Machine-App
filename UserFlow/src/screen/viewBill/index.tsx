import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {
  BACKGROUNDCOLOR,
  DARK_GREEN,
  Images,
  PRIMARY_COLOR,
  WHITE,
} from '../../constants';
import useUserStore from '../../store/userStore';
import apiService from '../../services/service';
import Strings from '../../constants/LanguageStrings';

const ViewBill: React.FC<any> = ({ navigation, route }) => {
  const { user, isLoading, balance, getUserBalance } = useUserStore();
  const [billData, setBillData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBillData();
    getUserBalance(user?.rfid || route.params?.rfid);
  }, []);

  const fetchBillData = async () => {
    try {
      setLoading(true);

      const userRfid = user?.rfid || route.params?.rfid;

      if (!userRfid) {
        Alert.alert('Error', 'No RFID found');
        setLoading(false);
        return;
      }

      console.log('Fetching bills for RFID:', userRfid);

      const data = await apiService.getViewBill(userRfid);
      console.log('Bills data received:', data);

      const billToDisplay = Array.isArray(data) ? data[data.length - 1] : data;

      setBillData(billToDisplay);
    } catch (error: any) {
      console.error('Error fetching bill:', error);
      console.error('Error response:', error.response);
      Alert.alert(
        'Error',
        error.response?.data?.message || 'Failed to fetch bill details',
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading || isLoading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color={DARK_GREEN} />
        <Text style={styles.loadingText}>Loading bill details...</Text>
      </View>
    );
  }

  if (!billData) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>No bill data found</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchBillData}>
          <Text style={styles.retryText}>{Strings.retry}</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const patientInfo = billData?.patient || billData?.user || {};
  const medicines =
    billData?.medicines || billData?.prescription?.medicines || [];
  const billNumber = billData?.billNumber || billData?.id || 'N/A';
  const billingDate =
    billData?.billingDate || billData?.createdAt
      ? new Date(
          billData?.billingDate || billData?.createdAt,
        ).toLocaleDateString()
      : new Date().toLocaleDateString();
  const total = billData?.total || 0;
  // Add this before the return statement to calculate the total
  const calculateTotal = () => {
    if (!medicines || medicines.length === 0) return 0;

    return medicines.reduce((sum: number, med: any) => {
      const totalCostPerMedicine = (med.quantity || 0) * (med.costPerUnit || 0);
      return sum + totalCostPerMedicine;
    }, 0);
  };

  const calculatedTotal = calculateTotal();

  return (
    <ImageBackground
      style={styles.backImageView}
      source={Images.ic_backgroundImage}
      resizeMode="stretch"
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.subContainer}>
          <View style={styles.card}>
            <View style={styles.rowSpace}>
              <Text style={styles.label}>{Strings.billNumber}</Text>
              <Text style={styles.label}>{Strings.billingDate}</Text>
            </View>

            <View style={[styles.rowSpace, { marginTop: 2 }]}>
              <Text style={styles.value}>{billNumber}</Text>
              <Text style={styles.value}>{billingDate}</Text>
            </View>

            <View style={styles.lineView}></View>

            <Text style={[styles.sectionTitle]}>
              {Strings.patientInformation}
            </Text>

            <View style={styles.infoGrid}>
              <View style={styles.rowSpace}>
                <Text style={styles.label}>{Strings.name}</Text>
                <Text style={styles.label}>{Strings.age}</Text>
              </View>
              <View style={[styles.rowSpace, { marginTop: 1 }]}>
                <Text style={styles.value}>
                  {patientInfo.name || user?.name || 'N/A'}
                </Text>
                <Text style={styles.value}>{patientInfo.age || 'N/A'}</Text>
              </View>

              <View style={styles.rowSpace}>
                <Text style={styles.label}>{Strings.phoneNo}</Text>
                <Text style={styles.label}>{Strings.dateOfBirth}</Text>
              </View>
              <View style={[styles.rowSpace, { marginTop: 1 }]}>
                <Text style={styles.value}>{patientInfo.phone || 'N/A'}</Text>
                <Text style={styles.value}>
                  {patientInfo.dateOfBirth || patientInfo.dob || 'N/A'}
                </Text>
              </View>

              <View style={styles.rowSpace}>
                <Text style={styles.label}>{Strings.email}</Text>
                <Text style={styles.label}>{Strings.gender}</Text>
              </View>
              <View style={[styles.rowSpace, { marginTop: 1 }]}>
                <Text style={styles.value}>
                  {patientInfo.email || user?.email || 'N/A'}
                </Text>
                <Text style={styles.value}>{patientInfo.gender || 'N/A'}</Text>
              </View>

              <Text style={[styles.label, { marginTop: 7 }]}>
                {Strings.address}
              </Text>
              <Text style={[styles.value, { flex: 1 }]}>
                {patientInfo.address || 'N/A'}
              </Text>
            </View>

            <View style={styles.lineView}></View>

            <Text style={styles.sectionTitle}>
              {Strings.listOfPrescribedMedicine}
            </Text>

            <View style={styles.tableHeader}>
              <Text style={[styles.tableText, { flex: 2 }]}>
                {Strings.medicationName}
              </Text>
              <Text style={[styles.tableText, { flex: 1 }]}>
                {Strings.totalItem}
              </Text>
              <Text style={[styles.tableText, { flex: 1 }]}>
                {Strings.totalCost}
              </Text>
            </View>

            {medicines.length > 0 ? (
              medicines.map((med: any, index: number) => {
                // Calculate total cost for each medicine
                const totalCostPerMedicine =
                  (med.quantity || 0) * (med.costPerUnit || 0);

                return (
                  <View
                    key={index}
                    style={[
                      styles.tableRow,
                      {
                        borderBottomWidth:
                          index === medicines.length - 1 ? 0 : 0.5,
                      },
                    ]}
                  >
                    <Text style={[styles.rowText, { flex: 2 }]}>
                      {med.name}
                    </Text>
                    <Text style={[styles.rowText, { flex: 1 }]}>
                      {med.quantity || 0}
                    </Text>
                    <Text style={[styles.rowText, { flex: 1 }]}>
                      {totalCostPerMedicine.toFixed(2)}
                    </Text>
                  </View>
                );
              })
            ) : (
              <View style={styles.tableRow}>
                <Text
                  style={[styles.rowText, { flex: 1, textAlign: 'center' }]}
                >
                  {Strings.noMedicinesFound}
                </Text>
              </View>
            )}

            <View
              style={[
                styles.tableRow,
                {
                  borderBottomWidth: 0,
                },
              ]}
            >
              <Text
                style={[styles.rowTextBold, { flex: 2, fontWeight: '700' }]}
              >
                {Strings.total}
              </Text>
              <Text style={{ flex: 1 }}></Text>
              <Text style={[styles.rowTextBold, { flex: 1 }]}>
                {calculatedTotal}
              </Text>
            </View>

            <View style={styles.lineView}></View>

            <Text style={[styles.label, { marginLeft: 15 }]}>
              {Strings.availableAccountBalance}
            </Text>
            <Text style={[styles.value, { marginLeft: 15 }]}>
              Rs. {balance.toLocaleString()}
            </Text>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Home')}
      >
        <Text style={styles.buttonText}>{Strings.done}</Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backImageView: {
    flex: 1,
    backgroundColor: BACKGROUNDCOLOR,
    justifyContent: 'center',
  },
  container: {
    padding: 15,
    flexGrow: 1,
    justifyContent: 'center',
  },
  centerContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: DARK_GREEN,
  },
  errorText: {
    fontSize: 16,
    color: 'red',
    textAlign: 'center',
    marginBottom: 20,
  },
  retryButton: {
    backgroundColor: PRIMARY_COLOR,
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 5,
  },
  retryText: {
    color: WHITE,
    fontWeight: '600',
  },
  subContainer: {
    flex: 0.9,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: WHITE,
    borderRadius: 5,
    padding: 15,
    borderColor: DARK_GREEN,
    borderWidth: 0.5,
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginTop: 7,
  },
  label: {
    color: DARK_GREEN,
    fontWeight: '500',
    fontSize: 10,
  },
  value: {
    color: DARK_GREEN,
    fontSize: 10,
    fontWeight: '300',
  },
  lineView: {
    height: 1,
    marginVertical: 12,
    backgroundColor: PRIMARY_COLOR,
  },
  sectionTitle: {
    fontWeight: '600',
    fontSize: 12,
    marginBottom: 10,
    color: DARK_GREEN,
  },
  infoGrid: {
    paddingHorizontal: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#D9D9D9',
    paddingVertical: 5,
    marginTop: 7,
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomColor: '#D9D9D9',
  },
  tableText: {
    fontWeight: '500',
    color: DARK_GREEN,
    fontSize: 10,
    textAlign: 'center',
  },
  rowText: {
    fontWeight: '400',
    color: DARK_GREEN,
    fontSize: 10,
    textAlign: 'center',
  },
  rowTextBold: {
    fontWeight: '400',
    color: DARK_GREEN,
    fontSize: 10,
    textAlign: 'center',
  },
  button: {
    backgroundColor: PRIMARY_COLOR,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 15,
    marginBottom: 35,
  },
  buttonText: {
    color: WHITE,
    fontWeight: '700',
    fontSize: 16,
  },
});

export default ViewBill;
