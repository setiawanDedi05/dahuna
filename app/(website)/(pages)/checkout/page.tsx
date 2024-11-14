"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BoxIcon,
  Check,
  CheckCircle,
  Loader,
  Map,
  MapPin,
  NotebookPen,
  Paperclip,
  Plus,
  TicketMinus,
  Truck,
} from "lucide-react";
import React, { Suspense, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { toCurrency } from "@/components/custom/Currency";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import KelurahanComponent from "@/components/modules/checkout/kelurahan";
import { Textarea } from "@/components/ui/textarea";
import KotaComponent from "@/components/modules/checkout/kota";
import KecamatanComponent from "@/components/modules/checkout/kecamatan";
import ProvinsiComponent from "@/components/modules/checkout/provinsi";
import { Address, Kecamatan, Kelurahan, Kota, Provinsi } from "@/@types";
import { saveAddress } from "@/actions/saveAddress";
import AddressList from "@/components/modules/checkout/addressList";
import { useAuth } from "@clerk/nextjs";
import useSWR, { Fetcher } from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import ExpeditionComponent from "@/components/modules/checkout/expedition";

const fetcher: Fetcher<Address[], string> = (args) =>
  fetch(args)
    .then((res) => res.json())
    .then((res) => {
      return res.content;
    });

export default function CheckoutPage() {
  const [isCheck, setIsCheck] = useState(false);
  const [provinsi, setProvinsi] = useState<Provinsi | undefined>();
  const [kota, setKota] = useState<Kota | undefined>();
  const [kecamatan, setKecamatan] = useState<Kecamatan | undefined>();
  const [kelurahan, setKelurahan] = useState<Kelurahan | undefined>();
  const [name, setName] = useState<string>();
  const [noTelp, setNoTelp] = useState<string>();
  const [kodePos, setKodePos] = useState<string>();
  const [detail, setDetail] = useState<string>();
  const [expedition, setExpedition] = useState<string>();
  const [expeditionFee, setExpeditionFee] = useState<string>();
  const { userId } = useAuth();

  const { data, error, isLoading } = useSWR<Address[]>(
    `${process.env.NEXT_PUBLIC_URL}/api/address?userId=${userId}`,
    fetcher
  );

  if (error) {
    return <>{error.toString()}</>;
  }

  if (isLoading) {
    return (
      <div className="bg-primary-foreground flex flex-col justify-center items-center p-5 gap-3">
        <Skeleton className="w-4/5 h-[200px] bg-primary-foreground rounded-md shadow-md px-5 py-3" />
        <Skeleton className="w-4/5 h-[300px] bg-primary-foreground rounded-md shadow-md px-5 py-3" />
        <Skeleton className="w-4/5 h-[300px] bg-primary-foreground rounded-md shadow-md px-5 py-3" />
      </div>
    );
  }

  return (
    <div className="bg-primary-foreground flex flex-col justify-center items-center p-5 gap-3">
      <div className="w-4/5 border-t-4 border-t-primary bg-primary-foreground rounded-md border-dashed shadow-md px-5 py-3">
        <div className="flex items-baseline gap-x-3">
          <MapPin size={32} />{" "}
          <span className="font-bold">Delivery Address</span>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[90%_10%] gap-y-5 items-center gap-3">
          {data?.length ? (
            <div className="border-2 border-dashed border-muted py-5 px-3">
              <div className="flex flex-col">
                <span>{data[0].name}</span>
                <span className="text-muted-foreground">{data[0].noTelp}</span>
                <p>{`${data[0].detail}, ${data[0].kelurahan}, ${data[0].kecamatan}, ${data[0].kota}, ${data[0].provinsi}, ${data[0].kodePos}`}</p>
              </div>
            </div>
          ) : (
            <div className="border-2 flex border-dashed border-muted py-5 px-3 justify-center items-center">
              <Map /> Tidak ada Alamat terdaftar
            </div>
          )}
          <Sheet>
            <SheetTrigger asChild>
              <Button>{data?.length ? "Ubah" : "Pilih"}</Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetTitle>Alamat Tersimpan</SheetTitle>
              <SheetDescription>
                Pilih Alamat sebagai Alamat Penerima Pesanan
              </SheetDescription>
              <AddressList />
              <Dialog>
                <DialogTrigger className="cursor-pointer">
                  <Button className="w-full font-bold">
                    <Plus />
                    Alamat Baru
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-md">
                  <h2>Alamat Baru</h2>
                  <div className="flex gap-3">
                    <Input
                      placeholder="Nama Lengkap"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setName(e.target.value)
                      }
                    />
                    <Input
                      placeholder="Nomor Telpon"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setNoTelp(e.target.value)
                      }
                    />
                  </div>
                  <Tabs defaultValue="provinsi" className="w-full">
                    <TabsList className="w-full grid grid-cols-4">
                      <TabsTrigger value="provinsi" disabled={Boolean(kota)}>
                        <div className="flex items-start gap-1">
                          Provinsi {provinsi && <CheckCircle size={16} />}
                        </div>
                      </TabsTrigger>
                      <TabsTrigger
                        value="kota"
                        disabled={!provinsi || Boolean(kecamatan)}
                      >
                        <div className="flex items-start gap-1">
                          Kota/Kab {kota && <CheckCircle size={16} />}
                        </div>
                      </TabsTrigger>
                      <TabsTrigger
                        value="kecamatan"
                        disabled={!provinsi || !kota || Boolean(kelurahan)}
                      >
                        <div className="flex items-start gap-1">
                          Kecamatan {kecamatan && <CheckCircle size={16} />}
                        </div>
                      </TabsTrigger>
                      <TabsTrigger
                        value="kelurahan"
                        disabled={!provinsi || !kota || !kecamatan}
                      >
                        <div className="flex items-start gap-1">
                          Kel/Desa {kelurahan && <CheckCircle size={16} />}
                        </div>
                      </TabsTrigger>
                    </TabsList>
                    <ProvinsiComponent
                      setProvince={setProvinsi}
                      province={provinsi}
                    />
                    {provinsi && (
                      <KotaComponent
                        setKota={setKota}
                        kota={kota}
                        provinsi={provinsi}
                      />
                    )}
                    {kota && (
                      <KecamatanComponent
                        setKecamatan={setKecamatan}
                        kecamatan={kecamatan}
                        kota={kota}
                      />
                    )}
                    {kecamatan && (
                      <KelurahanComponent
                        setKelurahan={setKelurahan}
                        kelurahan={kelurahan}
                        kecamatan={kecamatan}
                      />
                    )}
                  </Tabs>
                  <Button
                    variant="destructive"
                    onClick={() => {
                      setProvinsi(undefined);
                      setKota(undefined);
                      setKecamatan(undefined);
                      setKelurahan(undefined);
                    }}
                  >
                    Reset Alamat
                  </Button>
                  <Input
                    placeholder="Kode Pos"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      setKodePos(e.target.value)
                    }
                  />
                  <Textarea
                    placeholder="Detail Lainnya Seperti Gedung/Nomor Rumah, RT/RW dll"
                    onChange={(e) => setDetail(e.target.value)}
                  />
                  <form
                    action={saveAddress}
                    className="flex flex-col gap-y-5"
                    noValidate
                  >
                    <Input name="name" type="hidden" value={name} />
                    <Input name="noTelp" type="hidden" value={noTelp} />
                    <Input
                      type="hidden"
                      name="provinsi"
                      value={JSON.stringify(provinsi)}
                    />
                    <Input
                      type="hidden"
                      name="kota"
                      value={JSON.stringify(kota)}
                    />
                    <Input
                      type="hidden"
                      name="kecamatan"
                      value={JSON.stringify(kecamatan)}
                    />
                    <Input
                      type="hidden"
                      name="kelurahan"
                      value={JSON.stringify(kelurahan)}
                    />
                    <Input name="kodePos" type="hidden" value={kodePos} />
                    <Input
                      name="userId"
                      type="hidden"
                      value={userId as string}
                    />
                    <Input name="detail" type="hidden" value={detail} />
                    <Button type="submit">Simpan</Button>
                  </form>
                </DialogContent>
              </Dialog>
            </SheetContent>
          </Sheet>
        </div>
        <div className="flex my-5 gap-3 items-baseline border-t-2 border-secondary py-5">
          <Checkbox
            defaultChecked={isCheck}
            onCheckedChange={(value: boolean) => setIsCheck(value)}
          />{" "}
          <span>Kirim Sebagai Dropshipper</span>
        </div>
        {isCheck && (
          <div className="flex gap-5 items-end">
            <div className="flex flex-col gap-3">
              <Label>Nama</Label>
              <Input />
            </div>
            <div className="flex flex-col gap-3">
              <Label>No Telp</Label>
              <Input />
            </div>
            <Button>Simpan</Button>
          </div>
        )}
      </div>
      <div className="w-4/5 border-t-4 bg-primary-foreground rounded-md shadow-md px-5 py-3">
        <div className="flex items-baseline gap-x-3">
          <BoxIcon size={32} />{" "}
          <span className="font-bold">Order Products</span>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Harga Satuan</TableHead>
              <TableHead className="w-[100px]">Jumlah</TableHead>
              <TableHead className="text-right">Subtotal Product</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">
                <div className="flex gap-2 items-center">
                  <Image
                    src="/assets/images/default-image.jpg"
                    width={100}
                    height={50}
                    alt="product"
                  />
                  Hic quidem est quia sit officia est.
                </div>
              </TableCell>
              <TableCell>{toCurrency({ amount: 150000 })}</TableCell>
              <TableCell>1</TableCell>
              <TableCell className="text-right">
                {toCurrency({ amount: 150000 })}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <div className="border-t-2 flex justify-end gap-10 items-end pt-5">
          <span className="font-bold">Total</span>
          <span className="font-bold text-xl">
            {toCurrency({ amount: 150000 })}
          </span>
        </div>
        <div className="grid lg:grid-cols-3 gap-5 mt-10">
          <div className="flex flex-col border-dashed border-2 p-3">
            <div className="flex items-center gap-x-3">
              <NotebookPen size={32} /> <span className="font-bold">Note</span>
            </div>
            <div className="flex py-5 gap-3 items-end">
              <div className="flex w-full flex-col gap-y-3">
                <Label>Catatan</Label>
                <Input />
              </div>
            </div>
          </div>
          <div className="flex flex-col border-dashed border-2 p-3">
            <div className="flex items-center gap-x-3">
              <TicketMinus size={32} />{" "}
              <span className="font-bold">Do you Have Voucher?</span>
            </div>
            <div className="flex py-5 gap-3 items-end">
              <div className="flex w-full flex-col gap-y-3">
                <Label>Code</Label>
                <Input />
              </div>
              <Button>Use</Button>
            </div>
          </div>
          <div className="flex flex-col border-dashed border-2 p-3">
            <div className="flex items-center gap-x-3">
              <Truck size={32} />{" "}
              <span className="font-bold">Expedition Provider</span>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex flex-col py-5">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button disabled={!data?.length}>Pilih Expedisi</Button>
                  </SheetTrigger>
                  {data?.length ? <ExpeditionComponent data={data[0]} /> : null}
                </Sheet>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-4/5 border-t-4 bg-primary-foreground rounded-md shadow-md px-5 py-3">
        <div className="flex items-center gap-x-3">
          <Paperclip size={32} /> <span className="font-bold">Summary</span>
        </div>
        <div className="flex flex-col justify-between items-end gap-y-5">
          <div className="flex w-[300px] justify-between">
            <span>Subtotal Product</span>
            <span>{toCurrency({ amount: 150000 })}</span>
          </div>
          <div className="flex w-[300px] justify-between">
            <span>Subtotal Pengiriman</span>
            <span>{toCurrency({ amount: 18000 })}</span>
          </div>
          <div className="flex w-[300px] justify-between">
            <span>Biaya Layanan</span>
            <span>{toCurrency({ amount: 1000 })}</span>
          </div>
          <div className="flex w-[300px] justify-between">
            <span>Total Pembayaran</span>
            <span className="text-xl font-bold">
              {toCurrency({ amount: 169000 })}
            </span>
          </div>
          <Button className="w-[300px] font-bold">Checkout</Button>
        </div>
      </div>
    </div>
  );
}
