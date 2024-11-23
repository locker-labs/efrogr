import { useDynamicLoading } from "@/providers/DynamicLoadingProvider";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";

export default function Header() {
  const { isDynamicLoading } = useDynamicLoading();

  return (
    <div className="py-3 flex flex-row justify-between items-center space-y-3 w-[300px]">
      <Image src="/efrogr.png" alt="Efrogr by Locker" width={40} height={40} />
      <div className="w-2/3 flex flex-row justify-end items-center">
        {!isDynamicLoading && <DynamicWidget />}
      </div>
    </div>
  );
}
