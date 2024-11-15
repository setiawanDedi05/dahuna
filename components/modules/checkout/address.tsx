"use client";

import { Address, Kecamatan, Kelurahan, Kota, Provinsi } from "@/@types";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { CheckCircle, Map, MapPin, Plus } from "lucide-react";
import React, { useState } from "react";
import AddressList from "./addressList";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import ProvinsiComponent from "./provinsi";
import KotaComponent from "./kota";
import KecamatanComponent from "./kecamatan";
import KelurahanComponent from "./kelurahan";
import { saveAddress } from "@/actions/saveAddress";
import { useAuth } from "@clerk/nextjs";

export default function AddressComponent({
  data,
  isCheck,
  setIsCheck,
  name,
  setName,
  noTelp,
  setNoTelp,
  note,
  setNote
}: {
  data: Address[];
  isCheck: boolean;
  name: string | null | undefined;
  noTelp: string | null | undefined;
  setIsCheck: (value: boolean) => void;
  setName: (value: string) => void;
  setNoTelp: (value: string) => void;
  note: string;
  setNote: (value: string) => void;
}) {
  const { userId } = useAuth();
  const [provinsi, setProvinsi] = useState<Provinsi | undefined>();
  const [kota, setKota] = useState<Kota | undefined>();
  const [kecamatan, setKecamatan] = useState<Kecamatan | undefined>();
  const [kelurahan, setKelurahan] = useState<Kelurahan | undefined>();
  const [kodePos, setKodePos] = useState<string>();
  const [detail, setDetail] = useState<string>();
  return (
    <div className="w-4/5 border-t-4 border-t-primary bg-primary-foreground rounded-md border-dashed shadow-md px-5 py-3">
      <div className="flex items-baseline gap-x-3">
        <MapPin size={32} /> <span className="font-bold">Delivery Address</span>
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
                  <Input name="name" type="hidden" value={name as string} />
                  <Input name="noTelp" type="hidden" value={noTelp as string} />
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
                  <Input name="userId" type="hidden" value={userId as string} />
                  <Input name="detail" type="hidden" value={detail} />
                  <Button type="submit">Simpan</Button>
                </form>
              </DialogContent>
            </Dialog>
          </SheetContent>
        </Sheet>
      </div>
      <div className="flex flex-col p-3">
        <div className="flex py-5 gap-3 items-end">
          <div className="flex w-full flex-col gap-y-3">
            <Label>Catatan</Label>
            <Input
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Belakang SD"
            />
          </div>
        </div>
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
            <Input placeholder="Ikhsan" />
          </div>
          <div className="flex flex-col gap-3">
            <Label>No Telp</Label>
            <Input placeholder="081********" />
          </div>
          <Button>Simpan</Button>
        </div>
      )}
    </div>
  );
}
