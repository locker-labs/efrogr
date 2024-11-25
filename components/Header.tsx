import { useDynamicLoading } from "@/providers/DynamicLoadingProvider";
import { DynamicWidget } from "@dynamic-labs/sdk-react-core";
import Image from "next/image";

export default function Header() {
  const { isDynamicLoading } = useDynamicLoading();

  return (
    <div className="py-3 flex flex-row justify-between items-center space-y-3 w-full">
      <Image src="/efrogr.png" alt="Efrogr by Locker" width={50} height={50} />
      <div className="flex flex-row justify-end items-center">
        {!isDynamicLoading && <DynamicWidget />}
      </div>
    </div>
  );
}
