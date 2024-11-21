import { Container } from "@/components/custom/Container";
import AllHistory from "@/components/modules/history/allHistory";
import { HistoryBreadCrumb } from "@/components/modules/history/historyBreadCrumb";
import PaidHistory from "@/components/modules/history/paidHistory";
import UnpaidHistory from "@/components/modules/history/unpaidHistory";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";
import FinishOrder from "@/components/modules/history/finishHistory";
import SentOrder from "@/components/modules/history/sent";

export default function HistoryPage() {
  return (
    <section className="min-h-[600px] mb-20">
      <Container>
        <HistoryBreadCrumb />
        <Tabs defaultValue="unpaid">
          <TabsList className="w-full grid grid-cols-5">
            <TabsTrigger value="all">
              <div className="flex items-start gap-1">Semua</div>
            </TabsTrigger>
            <TabsTrigger value="unpaid">
              <div className="flex items-start gap-1">Belum Bayar</div>
            </TabsTrigger>
            <TabsTrigger value="paid">
              <div className="flex items-start gap-1">Sedang Dikemas</div>
            </TabsTrigger>
            <TabsTrigger value="sent">
              <div className="flex items-start gap-1">Dikirim</div>
            </TabsTrigger>
            <TabsTrigger value="finish">
              <div className="flex items-start gap-1">Selesai</div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="all">
            <AllHistory />
          </TabsContent>
          <TabsContent value="unpaid">
            <UnpaidHistory />
          </TabsContent>
          <TabsContent value="paid">
            <PaidHistory />
          </TabsContent>
          <TabsContent value="sent">
            <SentOrder />
          </TabsContent>
          <TabsContent value="finish">
            <FinishOrder />
          </TabsContent>
        </Tabs>
      </Container>
    </section>
  );
}
