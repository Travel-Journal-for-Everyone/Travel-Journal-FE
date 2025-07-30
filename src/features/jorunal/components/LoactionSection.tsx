// import Script from "next/script";
// import KakaoMap from "@/features/test/KakaoMap";

// interface Props {
//   imagesWithMeta: {
//     file: File;
//     lat?: number;
//     lng?: number;
//     keyword?: string;
//   }[];
//   locationNames: string[];
// }

// export const API = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JS_KEY}&libraries=services,clusterer&autoload=false`;

// export default function LocationMapSection({ imagesWithMeta, locationNames }: Props) {
//   return (
//     <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 space-y-3">
//       <h3 className="text-sm font-semibold">1일차</h3>
//       <input
//         type="text"
//         placeholder="1일차의 내용을 적어주세요"
//         className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
//       />

//       <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm overflow-hidden">
//         <Script src={API} strategy="beforeInteractive" />

//         <KakaoMap
//           places={imagesWithMeta
//             .filter((img) => img.lat && img.lng)
//             .map((img, index) => ({
//               id: index.toString(),
//               lat: img.lat!,
//               lng: img.lng!,
//               name: img.keyword ?? `장소 ${index + 1}`,
//             }))}
//         />
//       </div>
//       <ul className="text-sm text-gray-700 list-disc pl-5 space-y-1">
//         {locationNames.map((name, idx) => (
//           <li key={idx}>
//             {String.fromCharCode(65 + idx)}. {name}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }
