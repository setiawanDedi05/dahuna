import { Container } from "@/components/custom/Container";
import { Row } from "@/components/custom/Row";
import AllHistory from "@/components/modules/history/allHistory";
import Distribution from "@/components/modules/history/distribution";
import FinishHistory from "@/components/modules/history/finishHistory";
import { HistoryBreadCrumb } from "@/components/modules/history/historyBreadCrumb";
import PaidHistory from "@/components/modules/history/paidHistory";
import UnpaidHistory from "@/components/modules/history/unpaidHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

export default function HistoryPage() {
  return (
    <section className="min-h-screen">
      <Container>
        <HistoryBreadCrumb />
        <Tabs defaultValue="semua">
          <TabsList className="w-full grid grid-cols-5">
            <TabsTrigger value="semua">
              <div className="flex items-start gap-1">Semua</div>
            </TabsTrigger>
            <TabsTrigger value="belum-bayar">
              <div className="flex items-start gap-1">Belum Bayar</div>
            </TabsTrigger>
            <TabsTrigger value="sedang-dikemas">
              <div className="flex items-start gap-1">Sedang Dikemas</div>
            </TabsTrigger>
            <TabsTrigger value="dikirim">
              <div className="flex items-start gap-1">Dikirim</div>
            </TabsTrigger>
            <TabsTrigger value="selesai">
              <div className="flex items-start gap-1">Selesai</div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="semua">
            <AllHistory />
          </TabsContent>
          <TabsContent value="belum-bayar">
            <UnpaidHistory />
          </TabsContent>
          <TabsContent value="sedang-dikemas">
            <PaidHistory />
          </TabsContent>
          <TabsContent value="dikirim">
            <Distribution />
          </TabsContent>
          <TabsContent value="selesai">
            <FinishHistory />
          </TabsContent>
        </Tabs>
      </Container>
    </section>
  );
}
