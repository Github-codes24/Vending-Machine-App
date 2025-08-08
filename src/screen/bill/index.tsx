import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import styles from './style';

const medicines = [
  { name: 'Paracetamol', quantity: 90, cost: 80.0 },
  { name: 'Vitamin C', quantity: 30, cost: 250.0 },
  { name: 'Vitamin D', quantity: 4, cost: 74.5 },
  { name: 'Cough Syrup', quantity: 1, cost: 110.5 },
  { name: 'Anti biotic', quantity: 60, cost: 120.0 },
];

const Bill: React.FC = () => {
  const total = medicines.reduce((sum, m) => sum + m.cost, 0);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>

        <View style={styles.rowSpace}>
          <Text style={styles.label}>Bill Number</Text>
          <Text style={styles.label}>Billing Date</Text>
        </View>
        <View style={styles.rowSpace}>
          <Text style={styles.value}>0001</Text>
          <Text style={styles.value}>25/12/2025</Text>
        </View>

        <Text style={[styles.sectionTitle, { marginTop: 16 }]}>Patient Information</Text>
        <View style={styles.infoGrid}>
          <Text style={styles.label}>Name</Text>
          <Text style={styles.value}>Aarti Gupta</Text>

          <Text style={styles.label}>Age</Text>
          <Text style={styles.value}>35</Text>

          <Text style={styles.label}>Phone No.</Text>
          <Text style={styles.value}>+91 9876542876</Text>

          <Text style={styles.label}>Date of Birth</Text>
          <Text style={styles.value}>05/11/1990</Text>

          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>aarti@123</Text>

          <Text style={styles.label}>Gender</Text>
          <Text style={styles.value}>Female</Text>

          <Text style={styles.label}>Address</Text>
          <Text style={[styles.value, { flex: 1 }]}>Lonavla Pune 165456</Text>
        </View>

        <Text style={styles.sectionTitle}>List of Prescribed Medicine</Text>
        <View style={styles.tableHeader}>
          <Text style={[styles.tableText, { flex: 2 }]}>Medication Name</Text>
          <Text style={[styles.tableText, { flex: 1, textAlign: 'center' }]}>Total Item</Text>
          <Text style={[styles.tableText, { flex: 1, textAlign: 'right' }]}>Total Cost</Text>
        </View>

        {medicines.map((med, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={[styles.rowText, { flex: 2 }]}>{med.name}</Text>
            <Text style={[styles.rowText, { flex: 1, textAlign: 'center' }]}>{med.quantity}</Text>
            <Text style={[styles.rowText, { flex: 1, textAlign: 'right' }]}>{med.cost.toFixed(2)}</Text>
          </View>
        ))}

        <View style={styles.tableRow}>
          <Text style={[styles.rowTextBold, { flex: 2 }]}>Total</Text>
          <Text style={{ flex: 1 }}></Text>
          <Text style={[styles.rowTextBold, { flex: 1, textAlign: 'right' }]}>{total}</Text>
        </View>

        <Text style={[styles.value, { marginTop: 12 }]}>Available Account Balance: Rs. 12,000</Text>
      </View>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Done</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Bill;
