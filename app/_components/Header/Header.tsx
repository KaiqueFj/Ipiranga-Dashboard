import Image from "next/image";

const ImageInfo = {
  corp: {
    src: [
      "https://i.postimg.cc/vBFWhsgn/ipiranga-new-coon-redimensionado-para-pequeno-(1).jpg",
      "https://i.postimg.cc/GhdVcxk8/logo-km-de-vantagens-0-DIS6g.png",
      "https://i.postimg.cc/prYSfmtL/banner-flutuante-4-1.png",
      "https://i.postimg.cc/HWQFDh71/images-1.png",
    ],
  },
};

export default function Header() {
  return (
    <header className="w-full border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-6 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
        {/* TITLE */}
        <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight text-center md:text-left">
          Ipiranga - Monitoramento de serviços
        </h1>

        {/* LOGOS */}
        <div className="flex justify-center md:justify-end items-center gap-4 flex-wrap">
          {ImageInfo.corp.src.map((src, index) => (
            <Image key={index} src={src} width={60} height={60} alt={`Logo ${index}`} className="object-contain" />
          ))}
        </div>
      </div>
    </header>
  );
}
