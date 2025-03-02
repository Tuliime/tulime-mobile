import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { MainLayout } from "@/components/shared/layout";

const VacanciesAndTenders: React.FC = () => {
  return (
    <MainLayout title="Vacancies & Tenders">
      <View style={{ gap: 16, flex: 1 }}>
        <Text>Vacancies and Tender</Text>
      </View>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default VacanciesAndTenders;
