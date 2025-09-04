import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DARK_GREEN, PRIMARY_COLOR, WHITE } from '../../constants';

interface BillProps {
  prescription: any;
  user: string;
}

const Bill = ({ user, prescription }: BillProps) => {
  const medicines = prescription?.medicines ?? [];
  const total = medicines?.reduce((sum: number, m: any) => sum + m.cost, 0);
  console.log('medicines', medicines);
  console.log('user', user);
  return (
    <View style={styles.card}>
      <View style={styles.rowSpace}>
        <Text style={styles.label}>Bill Number</Text>
        <Text style={styles.label}>Billing Date</Text>
      </View>

      <View style={[styles.rowSpace, { marginTop: 2 }]}>
        <Text style={styles.value}>0001</Text>
        <Text style={styles.value}>25/12/2025</Text>
      </View>

      <View style={styles.lineView}></View>

      <Text style={[styles.sectionTitle]}>Patient Information</Text>

      <View style={styles.infoGrid}>
        <View style={styles.rowSpace}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.label}>Age</Text>
        </View>
        <View style={[styles.rowSpace, { marginTop: 1 }]}>
          <Text style={styles.value}>Aarti Gupta</Text>
          <Text style={styles.value}>35</Text>
        </View>

        <View style={styles.rowSpace}>
          <Text style={styles.label}>Phone No.</Text>
          <Text style={styles.label}>Date of Birth</Text>
        </View>
        <View style={[styles.rowSpace, { marginTop: 1 }]}>
          <Text style={styles.value}>+91 9876542876</Text>
          <Text style={styles.value}>05/11/1990</Text>
        </View>

        <View style={styles.rowSpace}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.label}>Gender</Text>
        </View>
        <View style={[styles.rowSpace, { marginTop: 1 }]}>
          <Text style={styles.value}>aarti@123</Text>
          <Text style={styles.value}>Female</Text>
        </View>
        <Text style={[styles.label, { marginTop: 7 }]}>Address</Text>
        <Text style={[styles.value, { flex: 1 }]}>Lonavla Pune 165456</Text>
      </View>

      <View style={styles.lineView}></View>

      <Text style={styles.sectionTitle}>List of Prescribed Medicine</Text>

      <View style={styles.tableHeader}>
        <Text style={[styles.tableText, { flex: 2 }]}>Medication Name</Text>
        <Text style={[styles.tableText, { flex: 1 }]}>Total Item</Text>
        <Text style={[styles.tableText, { flex: 1 }]}>Total Cost</Text>
      </View>

      {medicines?.map((med: any, index: number) => (
        <View
          key={index}
          style={[
            styles.tableRow,
            {
              borderBottomWidth: index == 5 ? 0 : 0.5,
            },
          ]}
        >
          <Text style={[styles.rowText, { flex: 2 }]}>{med.name}</Text>
          <Text style={[styles.rowText, { flex: 1 }]}>{med.quantity}</Text>
          <Text style={[styles.rowText, { flex: 1 }]}>
            {med.cost.toFixed(2)}
          </Text>
        </View>
      ))}

      <View
        style={[
          styles.tableRow,
          {
            borderBottomWidth: 0,
          },
        ]}
      >
        <Text style={[styles.rowTextBold, { flex: 2, fontWeight: '700' }]}>
          Total
        </Text>
        <Text style={{ flex: 1 }}></Text>
        <Text style={[styles.rowTextBold, { flex: 1 }]}>{total}</Text>
      </View>

      <View style={styles.lineView}></View>

      <Text style={[styles.label, { marginLeft: 15 }]}>
        Available Account Balance
      </Text>
      <Text style={[styles.value, { marginLeft: 15 }]}>Rs. 12,000</Text>
    </View>
  );
};

export default Bill;

const styles = StyleSheet.create({
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
});
