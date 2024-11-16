import React from "react";
import { MainLayout } from "@/components/shared/layout/MainLayout";
import { AgroProductionHomeSection } from "@/components/agroproducts/layout";

export default function Home() {
  return (
    <MainLayout>
      <AgroProductionHomeSection />
    </MainLayout>
  );
}
