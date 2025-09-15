import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { DARK_GREEN, PRIMARY_COLOR, WHITE } from '../../constants';
import useUserStore from '../../store/userStore';
import Strings from '../../constants/LanguageStrings';

interface BillProps {
  data: any;
}

const Bill = ({ data }: BillProps) => {
  const { balance } = useUserStore();
  const user = data?.user;
  const medicines = data?.prescription?.medicines ?? [];
  const total = medicines?.reduce(
    (sum: number, m: any) => sum + m.cost * m.quantity,
    0,
  );

  return (
    <View style={styles.card}>
      <View style={styles.rowSpace}>
        <Text style={styles.label}>{Strings.billNumber}</Text>
        <Text style={styles.label}>{Strings.billingDate}</Text>
      </View>

      <View style={[styles.rowSpace, { marginTop: 2 }]}>
        <Text style={styles.value}>{data?.prescription?.id}</Text>
        <Text style={styles.value}>
          {new Date(data?.prescription?.collectedAt).toLocaleDateString()}
        </Text>
      </View>

      <View style={styles.lineView}></View>

      <Text style={[styles.sectionTitle]}>{Strings.patientInformation}</Text>

      <View style={styles.infoGrid}>
        <View style={styles.rowSpace}>
          <Text style={styles.label}>{Strings.name}</Text>
          <Text style={styles.label}>{Strings.age}</Text>
        </View>
        <View style={[styles.rowSpace, { marginTop: 1 }]}>
          <Text style={styles.value}>{user?.name}</Text>
          <Text style={styles.value}>{user?.age || 'N/A'}</Text>
        </View>

        <View style={styles.rowSpace}>
          <Text style={styles.label}>{Strings.phoneNo}</Text>
          <Text style={styles.label}>{Strings.dateOfBirth}</Text>
        </View>
        <View style={[styles.rowSpace, { marginTop: 1 }]}>
          <Text style={styles.value}>{user?.phone || 'N/A'}</Text>
          <Text style={styles.value}>{user?.dob || 'N/A'}</Text>
        </View>

        <View style={styles.rowSpace}>
          <Text style={styles.label}>{Strings.email}</Text>
          <Text style={styles.label}>{Strings.gender}</Text>
        </View>
        <View style={[styles.rowSpace, { marginTop: 1 }]}>
          <Text style={styles.value}>{user?.email || 'N/A'}</Text>
          <Text style={styles.value}>{user?.gender || 'N/A'}</Text>
        </View>
        <Text style={[styles.label, { marginTop: 7 }]}>{Strings.address}</Text>
        <Text style={[styles.value]}>{user?.address || 'N/A'}</Text>
      </View>

      <View style={styles.lineView}></View>

      <Text style={styles.sectionTitle}>
        {Strings.listOfPrescribedMedicine}
      </Text>

      <View style={styles.tableHeader}>
        <Text style={[styles.tableText, { flex: 2 }]}>
          {Strings.medicationName}
        </Text>
        <Text style={[styles.tableText, { flex: 1 }]}>{Strings.totalItem}</Text>
        <Text style={[styles.tableText, { flex: 1 }]}>{Strings.totalCost}</Text>
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
          {Strings.total}
        </Text>
        <Text style={{ flex: 1 }}></Text>
        <Text style={[styles.rowTextBold, { flex: 1 }]}>
          {total.toFixed(2)}
        </Text>
      </View>

      <View style={styles.lineView}></View>

      <Text style={[styles.label, { marginLeft: 15 }]}>
        {Strings.availableAccountBalance}
      </Text>
      <Text style={[styles.value, { marginLeft: 15 }]}>Rs. {balance}</Text>
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
