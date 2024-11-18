"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Plus } from "lucide-react";
import React, { useId, useState } from "react";
import ProvinsiComponent from "./provinsi";
import KotaComponent from "./kota";
import KecamatanComponent from "./kecamatan";
import KelurahanComponent from "./kelurahan";
import { Textarea } from "@/components/ui/textarea";
import { Kecamatan, Kelurahan, Kota, Provinsi } from "@/@types";
import { saveAddress } from "@/actions/saveAddress";
import { DrawerClose } from "@/components/ui/drawer";
import { toast } from "sonner";
import { message } from "@/constants/message";
import { useAuth } from "@clerk/nextjs";
import { useDispatch } from "react-redux";
import { addAddress, selectAddress } from "@/redux/reducer/orderSlice";
import { Address } from "@prisma/client";

export default function AddAddressDialog() {
  const dispatch = useDispatch();
  const { userId } = useAuth();
  const randomId = useId();
  const [provinsi, setProvinsi] = useState<Provinsi | undefined>();
  const [kota, setKota] = useState<Kota | undefined>();
  const [kecamatan, setKecamatan] = useState<Kecamatan | undefined>();
  const [kelurahan, setKelurahan] = useState<Kelurahan | undefined>();
  const [kodePos, setKodePos] = useState<string>();
  const [detail, setDetail] = useState<string>();
  const [name, setName] = useState<string>();
  const [noTelp, setNoTelp] = useState<string>();
  const [selectedTab, setSelectedTab] = useState<
    "provinsi" | "kota" | "kecamatan" | "kelurahan"
  >("provinsi");
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <Button className="w-full font-bold">
          <Plus />
          Alamat Baru
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-md">
        <h2>Alamat Baru</h2>
        <Tabs value={selectedTab} className="w-full min-h-[200px]">
          <TabsList className="w-full grid grid-cols-4">
            <TabsTrigger
              value="provinsi"
              disabled={Boolean(kota)}
              onClick={() => setSelectedTab("provinsi")}
            >
              <div className="flex items-start gap-1">
                Provinsi {provinsi && <CheckCircle size={16} />}
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="kota"
              disabled={!provinsi || Boolean(kecamatan)}
              onClick={() => setSelectedTab("kota")}
            >
              <div className="flex items-start gap-1">
                Kota/Kab {kota && <CheckCircle size={16} />}
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="kecamatan"
              disabled={!provinsi || !kota || Boolean(kelurahan)}
              onClick={() => setSelectedTab("kecamatan")}
            >
              <div className="flex items-start gap-1">
                Kecamatan {kecamatan && <CheckCircle size={16} />}
              </div>
            </TabsTrigger>
            <TabsTrigger
              value="kelurahan"
              disabled={!provinsi || !kota || !kecamatan}
              onClick={() => setSelectedTab("kelurahan")}
            >
              <div className="flex items-start gap-1">
                Kel/Desa {kelurahan && <CheckCircle size={16} />}
              </div>
            </TabsTrigger>
          </TabsList>
          <TabsContent value="provinsi">
            <ProvinsiComponent
              setProvince={setProvinsi}
              province={provinsi}
              setSelectedTab={setSelectedTab}
            />
          </TabsContent>
          <TabsContent value="kota">
            <KotaComponent
              setKota={setKota}
              kota={kota}
              provinsi={provinsi}
              setSelectedTab={setSelectedTab}
            />
          </TabsContent>
          <TabsContent value="kecamatan">
            <KecamatanComponent
              setKecamatan={setKecamatan}
              kecamatan={kecamatan}
              kota={kota}
              setSelectedTab={setSelectedTab}
            />
          </TabsContent>
          <TabsContent value="kelurahan">
            <KelurahanComponent
              setKelurahan={setKelurahan}
              kelurahan={kelurahan}
              kecamatan={kecamatan}
            />
          </TabsContent>
        </Tabs>
        <Button
          variant="destructive"
          onClick={() => {
            setSelectedTab("provinsi");
            setProvinsi(undefined);
            setKota(undefined);
            setKecamatan(undefined);
            setKelurahan(undefined);
          }}
        >
          Reset Alamat
        </Button>
        <div className="flex gap-3">
          <Input
            placeholder="Nama Lengkap"
            name="name"
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
        <DrawerClose asChild>
          <Button
            disabled={
              !name ||
              !noTelp ||
              !kodePos ||
              !detail ||
              !provinsi ||
              !kota ||
              !kecamatan ||
              !kelurahan ||
              !userId
            }
            onClick={async () => {
              const newAddress: Address = {
                id: randomId,
                provinsi: provinsi?.name as string,
                provinsiId: provinsi?.id as string,
                kota: kota?.name as string,
                kotaId: kota?.id as string,
                kecamatan: kecamatan?.name as string,
                kecamatanId: kecamatan?.id as string,
                kelurahan: kelurahan?.name as string,
                kelurahanId: kelurahan?.id as string,
                name: name as string,
                noTelp: noTelp as string,
                kodePos: kodePos as string,
                detail: detail as string,
                userId: userId as string,
              };
              dispatch(addAddress(newAddress));
              dispatch(selectAddress(newAddress));
              try {
                await saveAddress(newAddress);
              } catch (error) {
                toast.error(message.commonStatus500);
              }
            }}
          >
            Simpan
          </Button>
        </DrawerClose>
      </DialogContent>
    </Dialog>
  );
}
