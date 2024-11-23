import crockFaceIcon from "@/public/croak-face.svg";
import Image from "next/image";

export default function CroakFace() {
  return <Image src={crockFaceIcon} width={20} height={20} alt="Croak face" />;
}
